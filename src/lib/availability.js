/**
 * When he sits at a given clinic.
 *
 * Every clinic's `consultingDays` is null until the client supplies it, so the
 * honest answer for now is "not published" — never "open" and never "closed".
 * The three states below are kept distinct throughout so the form can say that
 * plainly instead of implying an availability it does not know.
 */
export const OPEN = 'open'
export const CLOSED = 'closed'
export const UNKNOWN = 'unknown'

export const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

/** How far ahead the date picker will let anyone book. */
export const BOOKING_WINDOW_DAYS = 90

const pad = (n) => String(n).padStart(2, '0')

/** A Date as `YYYY-MM-DD` in the visitor's own timezone (not UTC). */
export function toISO(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

/** `YYYY-MM-DD` back to a local-midnight Date — plain `new Date(iso)` is UTC. */
export function fromISO(iso) {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function todayISO() {
  return toISO(new Date())
}

export function isoPlusDays(iso, days) {
  const d = fromISO(iso)
  d.setDate(d.getDate() + days)
  return toISO(d)
}

/** "Thursday, 30 July" — for the WhatsApp message and the inline confirmation. */
export function formatLong(iso) {
  if (!iso) return ''
  return fromISO(iso).toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

/** "Thu 30 Jul" — for the compact "next available" chips. */
export function formatShort(iso) {
  return fromISO(iso).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })
}

/**
 * Is he at this clinic on this date? UNKNOWN when the clinic has no consulting
 * days on file, or when no clinic has been chosen yet.
 */
export function availabilityOn(clinic, iso) {
  if (!clinic || !iso) return UNKNOWN
  const days = clinic.consultingDays
  if (!Array.isArray(days) || days.length === 0) return UNKNOWN
  return days.includes(fromISO(iso).getDay()) ? OPEN : CLOSED
}

/** The clinic's consulting days as prose: "Mondays & Thursdays". */
export function consultingDaysLabel(clinic) {
  const days = clinic?.consultingDays
  if (!Array.isArray(days) || days.length === 0) return null
  const names = [...days].sort((a, b) => a - b).map((d) => `${WEEKDAYS[d]}s`)
  if (names.length === 1) return names[0]
  return `${names.slice(0, -1).join(', ')} & ${names[names.length - 1]}`
}

/**
 * The next few dates he is actually at this clinic, starting from `fromIso`.
 * Empty while the clinic's consulting days are unknown — nothing to suggest.
 */
export function nextOpenDates(clinic, count = 3, fromIso = todayISO()) {
  const days = clinic?.consultingDays
  if (!Array.isArray(days) || days.length === 0) return []

  const out = []
  for (let i = 0; i <= BOOKING_WINDOW_DAYS && out.length < count; i += 1) {
    const iso = isoPlusDays(fromIso, i)
    if (days.includes(fromISO(iso).getDay())) out.push(iso)
  }
  return out
}
