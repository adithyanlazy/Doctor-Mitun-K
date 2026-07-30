import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Search, MapPin, Check, CheckCircle2, Send, CalendarDays, AlertTriangle } from 'lucide-react'
import {
  areasIn,
  bookingCities,
  bookingConcerns,
  bookingTimes,
  brand,
  locationBySlug,
  locations,
} from '../lib/data'
import { useBooking } from '../lib/bookingContext'
import { lockScroll } from '../lib/useLenis'
import { openWhatsApp } from '../lib/whatsapp'
import {
  BOOKING_WINDOW_DAYS,
  CLOSED,
  UNKNOWN,
  availabilityOn,
  consultingDaysLabel,
  formatLong,
  formatShort,
  isoPlusDays,
  nextOpenDates,
  todayISO,
} from '../lib/availability'

const field =
  'w-full rounded-xl border border-line bg-ivory px-4 py-2.5 text-sm text-ink placeholder:text-ink/40 focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/20 transition'

const label = 'text-ink/70 mb-1.5 block text-sm font-medium'

const ANY_AREA = 'Any area'
const ANY_CITY = 'All'
/** Chosen when the visitor would rather the desk suggest the nearest chair. */
const NO_PREFERENCE = '__any__'

/** One selectable clinic row. */
function ClinicOption({ clinic, selected, onSelect }) {
  const sub = clinic.area || clinic.note
  // Some localities already name their town ("Periya, Kasaragod") — don't say it twice.
  const showCity = clinic.area && !clinic.area.includes(clinic.city)

  return (
    <li>
      <button
        type="button"
        onClick={() => onSelect(clinic.slug)}
        aria-pressed={selected}
        className={`flex w-full items-start gap-3 rounded-xl border px-3.5 py-2.5 text-left transition ${
          selected
            ? 'border-gold bg-sage/70 ring-1 ring-gold/40'
            : 'border-line bg-ivory hover:border-gold/60 hover:bg-sage/40'
        }`}
      >
        <span
          className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border transition ${
            selected ? 'border-transparent bg-emerald text-cream' : 'border-line text-transparent'
          }`}
        >
          <Check size={12} strokeWidth={3} />
        </span>

        <span className="min-w-0 flex-1">
          <span className="text-ink block text-sm font-medium leading-snug">{clinic.name}</span>
          {sub && (
            <span className="text-ink/55 mt-0.5 flex items-start gap-1.5 text-xs leading-relaxed">
              {clinic.area && <MapPin size={12} className="text-gold-deep mt-0.5 shrink-0" />}
              {sub}
              {showCity && <span className="text-ink/35">· {clinic.city}</span>}
            </span>
          )}
        </span>
      </button>
    </li>
  )
}

/**
 * Site-wide booking modal, built on the same pattern as the White Teeth site:
 * a centred card over a blurred backdrop, a short form, and an "almost done"
 * confirmation once WhatsApp has been handed the message — rather than a page
 * section the visitor has to be scrolled down to.
 *
 * What is specific to this practice: he consults at fifteen partner clinics, so
 * the first thing the form asks is where — filtered by town, by locality, or by
 * a plain search.
 *
 * There is no backend. Submitting opens WhatsApp with the message composed,
 * exactly as the per-clinic form on /clinics does.
 */
export default function BookingPanel() {
  const { open, preset, closeBooking } = useBooking()

  const [city, setCity] = useState(ANY_CITY)
  const [area, setArea] = useState(ANY_AREA)
  const [q, setQ] = useState('')
  const [chosen, setChosen] = useState(NO_PREFERENCE)
  const [sent, setSent] = useState(false)
  const [f, setF] = useState({
    name: '',
    phone: '',
    date: '',
    when: bookingTimes[0],
    concern: bookingConcerns[0],
  })

  const set = (k) => (e) => setF((prev) => ({ ...prev, [k]: e.target.value }))

  // Opening resets the filters, and honours a clinic named by the caller.
  useEffect(() => {
    if (!open) return
    const clinic = preset ? locationBySlug(preset) : null
    setChosen(clinic ? clinic.slug : NO_PREFERENCE)
    setCity(clinic ? clinic.city : ANY_CITY)
    setArea(ANY_AREA)
    setQ('')
    setSent(false)
    setF((prev) => ({ ...prev, date: '' }))
  }, [open, preset])

  // Hold the page still behind the modal — native scroll and Lenis both.
  useEffect(() => {
    if (!open) return
    lockScroll(true)
    const onKey = (e) => {
      if (e.key === 'Escape') closeBooking()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      lockScroll(false)
      window.removeEventListener('keydown', onKey)
    }
  }, [open, closeBooking])

  const areaOptions = useMemo(() => areasIn(city === ANY_CITY ? null : city), [city])

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return locations.filter((l) => {
      if (city !== ANY_CITY && l.city !== city) return false
      if (area !== ANY_AREA && l.area !== area) return false
      if (!needle) return true
      return [l.name, l.area, l.note, l.city]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(needle)
    })
  }, [city, area, q])

  const chosenClinic = chosen === NO_PREFERENCE ? null : locationBySlug(chosen)

  // Is he at that clinic on the date picked? UNKNOWN until the client supplies
  // consulting days — in which case the form still accepts the date and says so.
  const today = todayISO()
  const availability = availabilityOn(chosenClinic, f.date)
  const daysLabel = consultingDaysLabel(chosenClinic)
  const suggestions = useMemo(
    () => (availability === CLOSED ? nextOpenDates(chosenClinic, 3, today) : []),
    [availability, chosenClinic, today],
  )

  const submit = (e) => {
    e.preventDefault()
    const where = chosenClinic
      ? [chosenClinic.name, chosenClinic.area].filter(Boolean).join(', ')
      : `whichever clinic in ${brand.city} is nearest — please suggest one`
    const lines = [
      `Hi, I'd like to book an orthodontic consultation with ${brand.doctor}.`,
      '',
      `Clinic: ${where}`,
      `Name: ${f.name}`,
      `Phone: ${f.phone}`,
      `Preferred date: ${f.date ? formatLong(f.date) : 'Any day — you suggest'}`,
      `Preferred time: ${f.when}`,
      `For: ${f.concern}`,
    ]
    openWhatsApp(lines)
    setSent(true)
  }

  const changeCity = (next) => {
    setCity(next)
    setArea(ANY_AREA)
  }

  const clearFilters = () => {
    setCity(ANY_CITY)
    setArea(ANY_AREA)
    setQ('')
  }

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            className="bg-emerald/55 absolute inset-0 backdrop-blur-[3px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeBooking}
          />

          {/* max-h is dvh, not vh: on a phone `vh` measures the viewport with the
              address bar collapsed, so the card ran under the browser chrome and
              the submit button sat below the fold. */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-title"
            data-lenis-prevent
            className="bg-cream border-line relative max-h-[92dvh] w-full max-w-[30rem] overflow-y-auto overscroll-contain rounded-[1.75rem] border p-5 shadow-[0_40px_90px_-40px_rgba(7,20,38,0.7)] sm:p-8"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              onClick={closeBooking}
              aria-label="Close booking"
              className="bg-sage text-ink/60 hover:bg-sage-200 hover:text-ink absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full transition-colors"
            >
              <X size={18} />
            </button>

            <div className="text-center">
              <p className="eyebrow text-gold-deep text-[0.62rem]">Booking desk</p>
              <h2 id="booking-title" className="font-display text-ink mt-2.5 text-2xl leading-tight">
                Book an <span className="italic-fraunces text-gold-deep">appointment.</span>
              </h2>
              <p className="text-ink/55 mx-auto mt-2 max-w-xs text-sm leading-relaxed">
                Share a few details — the desk confirms your slot on WhatsApp.
              </p>
            </div>

            {sent ? (
              <div className="mt-7">
                <div className="border-line bg-sage/60 flex items-start gap-3.5 rounded-2xl border p-5">
                  <CheckCircle2 size={26} className="text-gold-deep mt-0.5 shrink-0" strokeWidth={1.7} />
                  <p className="text-ink/70 text-sm leading-relaxed">
                    <strong className="text-ink font-semibold">Almost done!</strong> WhatsApp has
                    opened with your details filled in — hit send there and the desk will confirm
                    your appointment
                    {chosenClinic ? ` at ${chosenClinic.name}` : ''}
                    {f.date ? ` for ${formatLong(f.date)}` : ''}.
                  </p>
                </div>
                <button type="button" onClick={closeBooking} className="btn btn-outline mt-4 w-full">
                  Close
                </button>
                <p className="text-ink/45 mt-4 text-center text-sm">
                  Nothing came through?{' '}
                  <a href={`tel:${brand.phoneHref}`} className="text-gold-deep font-medium">
                    Call {brand.phone}
                  </a>
                </p>
              </div>
            ) : (
              <form onSubmit={submit} className="mt-7 space-y-4">
                {/* where */}
                <div>
                  <span className={label}>Where would you like to be seen?</span>

                  <div className="flex flex-wrap gap-2">
                    {[ANY_CITY, ...bookingCities].map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => changeCity(c)}
                        className={`rounded-full border px-4 py-2.5 text-xs font-medium transition sm:py-1.5 ${
                          city === c
                            ? 'border-transparent bg-emerald text-cream'
                            : 'border-line text-ink/65 hover:border-gold hover:text-gold-deep'
                        }`}
                      >
                        {c === ANY_CITY ? 'All towns' : c}
                      </button>
                    ))}
                  </div>

                  <div className="mt-2.5 grid gap-2.5 sm:grid-cols-2">
                    <label className="block">
                      <span className="sr-only">Filter by area</span>
                      <select
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        className={field}
                        disabled={areaOptions.length === 0}
                      >
                        <option value={ANY_AREA}>{ANY_AREA}</option>
                        {areaOptions.map((a) => (
                          <option key={a} value={a}>
                            {a}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="relative block">
                      <span className="sr-only">Search clinics</span>
                      <Search
                        size={15}
                        className="text-ink/40 pointer-events-none absolute left-4 top-1/2 -translate-y-1/2"
                      />
                      <input
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder="Search name or area…"
                        className={`${field} pl-10`}
                      />
                    </label>
                  </div>

                  <ul
                    data-lenis-prevent
                    className="mt-2.5 max-h-52 space-y-2 overflow-y-auto overscroll-contain pr-1"
                  >
                    <li>
                      <button
                        type="button"
                        onClick={() => setChosen(NO_PREFERENCE)}
                        aria-pressed={chosen === NO_PREFERENCE}
                        className={`flex w-full items-start gap-3 rounded-xl border px-3.5 py-2.5 text-left transition ${
                          chosen === NO_PREFERENCE
                            ? 'border-gold bg-sage/70 ring-1 ring-gold/40'
                            : 'border-line bg-ivory hover:border-gold/60 hover:bg-sage/40'
                        }`}
                      >
                        <span
                          className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border transition ${
                            chosen === NO_PREFERENCE
                              ? 'border-transparent bg-emerald text-cream'
                              : 'border-line text-transparent'
                          }`}
                        >
                          <Check size={12} strokeWidth={3} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="text-ink block text-sm font-medium">
                            No preference — nearest to me
                          </span>
                          <span className="text-ink/55 mt-0.5 block text-xs leading-relaxed">
                            The desk places you at whichever of the {locations.length} clinics suits
                            you.
                          </span>
                        </span>
                      </button>
                    </li>

                    {shown.map((l) => (
                      <ClinicOption
                        key={l.slug}
                        clinic={l}
                        selected={chosen === l.slug}
                        onSelect={setChosen}
                      />
                    ))}

                    {shown.length === 0 && (
                      <li className="text-ink/55 px-1 py-5 text-center text-sm">
                        No clinic matches those filters.{' '}
                        <button type="button" onClick={clearFilters} className="text-gold-deep underline">
                          Clear filters
                        </button>
                      </li>
                    )}
                  </ul>
                </div>

                {/* who */}
                <div>
                  <label htmlFor="bk-name" className={label}>
                    Full name <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="bk-name"
                    required
                    autoComplete="name"
                    value={f.name}
                    onChange={set('name')}
                    className={field}
                    placeholder="Your name"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="bk-phone" className={label}>
                      Phone <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="bk-phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      required
                      value={f.phone}
                      onChange={set('phone')}
                      className={field}
                      placeholder="10-digit mobile"
                    />
                  </div>
                  <div>
                    <label htmlFor="bk-concern" className={label}>
                      For
                    </label>
                    <select id="bk-concern" value={f.concern} onChange={set('concern')} className={field}>
                      {bookingConcerns.map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="bk-date" className={label}>
                      Preferred date
                    </label>
                    <input
                      id="bk-date"
                      type="date"
                      value={f.date}
                      onChange={set('date')}
                      min={today}
                      max={isoPlusDays(today, BOOKING_WINDOW_DAYS)}
                      className={field}
                      aria-describedby="bk-date-note"
                    />
                  </div>
                  <div>
                    <label htmlFor="bk-when" className={label}>
                      Preferred time
                    </label>
                    <select id="bk-when" value={f.when} onChange={set('when')} className={field}>
                      {bookingTimes.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* what we know about that date at that clinic */}
                <div id="bk-date-note">
                  {availability === CLOSED && (
                    <div className="border-gold/40 bg-sage/60 rounded-xl border p-3.5">
                      <p className="text-ink/75 flex items-start gap-2.5 text-sm leading-relaxed">
                        <AlertTriangle size={15} className="text-gold-deep mt-0.5 shrink-0" />
                        <span>
                          {brand.short} consults at {chosenClinic.name} on {daysLabel}, so he is not
                          there on {formatLong(f.date)}. Pick another date — or send it anyway and
                          the desk will offer the closest slot.
                        </span>
                      </p>
                      {suggestions.length > 0 && (
                        <div className="mt-2.5 flex flex-wrap gap-2">
                          {suggestions.map((iso) => (
                            <button
                              key={iso}
                              type="button"
                              onClick={() => setF((prev) => ({ ...prev, date: iso }))}
                              className="border-line bg-ivory text-ink/75 hover:border-gold hover:text-gold-deep rounded-full border px-3 py-1.5 text-xs font-medium transition"
                            >
                              {formatShort(iso)}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {availability !== CLOSED && f.date && daysLabel && (
                    <p className="text-ink/55 flex items-start gap-2 text-xs leading-relaxed">
                      <CalendarDays size={13} className="text-gold-deep mt-0.5 shrink-0" />
                      {brand.short} consults at {chosenClinic.name} on {daysLabel} —{' '}
                      {formatLong(f.date)} works.
                    </p>
                  )}

                  {/* TODO(client): consulting days per clinic are not supplied yet. Until they
                      are, no date can honestly be called available or unavailable. */}
                  {availability === UNKNOWN && (
                    <p className="text-ink/45 flex items-start gap-2 text-xs leading-relaxed">
                      <CalendarDays size={13} className="text-ink/40 mt-0.5 shrink-0" />
                      {chosenClinic
                        ? `Consulting days at ${chosenClinic.name} are not published yet — the desk confirms the day when it replies.`
                        : 'Pick a clinic above and the desk confirms his consulting day there when it replies.'}
                    </p>
                  )}
                </div>

                <button type="submit" className="btn btn-gold w-full py-3.5">
                  Confirm request <Send size={15} />
                </button>

                <p className="text-ink/45 text-center text-sm">
                  Or call{' '}
                  <a href={`tel:${brand.phoneHref}`} className="text-gold-deep font-medium">
                    {brand.phone}
                  </a>
                </p>
                <p className="text-ink/40 text-center text-xs leading-relaxed">
                  {chosenClinic
                    ? `Booking at ${chosenClinic.name}${chosenClinic.area ? `, ${chosenClinic.area}` : ''}.`
                    : 'The desk will suggest the clinic nearest you.'}{' '}
                  Nothing is stored on this site.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
