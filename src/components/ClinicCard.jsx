import { useId, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, MapPin, Clock, Phone, ArrowUpRight, Send } from 'lucide-react'
import { brand, bookingConcerns, bookingTimes, treatmentTypes } from '../lib/data'

const field =
  'w-full rounded-xl border border-line bg-cream px-4 py-2.5 text-sm text-ink placeholder:text-ink/40 focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/20 transition'

/**
 * Booking for one clinic. Composes a single WhatsApp message to the booking
 * desk naming this location — there is no backend and nothing is stored.
 * The clinic's own reception line is not published yet, so every booking
 * routes through the doctor's number.
 */
function BookingForm({ clinic }) {
  const uid = useId()
  const [f, setF] = useState({
    name: '',
    phone: '',
    when: bookingTimes[0],
    concern: bookingConcerns[0],
  })
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    const where = clinic.area ? `${clinic.name}, ${clinic.area}` : clinic.name
    const lines = [
      `Hi, I'd like to book an orthodontic consultation with ${brand.doctor} at ${where}.`,
      '',
      `Name: ${f.name}`,
      `Phone: ${f.phone}`,
      `Preferred time: ${f.when}`,
      `For: ${f.concern}`,
    ]
    const text = encodeURIComponent(lines.join('\n'))
    window.open(`https://wa.me/${brand.whatsapp}?text=${text}`, '_blank', 'noopener')
  }

  return (
    <form onSubmit={submit} className="card-cream p-5 sm:p-6">
      <h4 className="font-display text-ink text-lg leading-snug">Book at this clinic</h4>
      <p className="text-ink/55 mt-1.5 text-sm leading-relaxed">
        Send your details and the booking desk confirms your slot on WhatsApp.
      </p>

      <div className="mt-5 space-y-3.5">
        <div>
          <label htmlFor={`${uid}-name`} className="text-ink/70 mb-1.5 block text-sm font-medium">
            Full name
          </label>
          <input
            id={`${uid}-name`}
            required
            value={f.name}
            onChange={set('name')}
            className={field}
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor={`${uid}-phone`} className="text-ink/70 mb-1.5 block text-sm font-medium">
            Phone
          </label>
          <input
            id={`${uid}-phone`}
            type="tel"
            required
            value={f.phone}
            onChange={set('phone')}
            className={field}
            placeholder="+91 …"
          />
        </div>
        <div className="grid gap-3.5 sm:grid-cols-2">
          <div>
            <label htmlFor={`${uid}-when`} className="text-ink/70 mb-1.5 block text-sm font-medium">
              Preferred time
            </label>
            <select id={`${uid}-when`} value={f.when} onChange={set('when')} className={field}>
              {bookingTimes.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor={`${uid}-concern`}
              className="text-ink/70 mb-1.5 block text-sm font-medium"
            >
              For
            </label>
            <select
              id={`${uid}-concern`}
              value={f.concern}
              onChange={set('concern')}
              className={field}
            >
              {bookingConcerns.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        <button type="submit" className="btn btn-gold w-full">
          Book on WhatsApp <Send size={15} />
        </button>
        <p className="text-ink/40 text-center text-xs leading-relaxed">
          Opens WhatsApp with your details pre-filled. Nothing is stored on this site.
        </p>
      </div>
    </form>
  )
}

/** One fact line. Renders nothing when the client has not supplied the value. */
function Fact({ Icon, label, value, href }) {
  if (!value) return null
  const body = <span className="text-ink/75 text-sm leading-relaxed">{value}</span>
  return (
    <li className="flex items-start gap-3">
      <Icon size={15} className="text-gold-deep mt-1 shrink-0" strokeWidth={1.8} />
      <span className="min-w-0">
        <span className="eyebrow text-ink/40 block text-[0.62rem]">{label}</span>
        {href ? (
          <a href={href} className="text-ink hover:text-gold-deep text-sm transition-colors">
            {value}
          </a>
        ) : (
          body
        )}
      </span>
    </li>
  )
}

/**
 * A partner clinic, as an accordion row. Collapsed it is a name and a locality;
 * open it carries the detail, an embedded map and its own booking form.
 * Deep-linked from the home list as /clinics#<slug>, which opens the card.
 */
export default function ClinicCard({ clinic, index, open, onToggle, highlighted }) {
  const panelId = `panel-${clinic.slug}`
  const sub = clinic.area || clinic.note

  return (
    <article
      id={clinic.slug}
      className={`card-cream scroll-mt-28 overflow-hidden transition-shadow duration-500 ${
        highlighted
          ? 'border-gold ring-gold/25 shadow-[0_24px_60px_-40px_rgba(11,31,58,0.55)] ring-2'
          : ''
      }`}
    >
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="group flex w-full items-start gap-4 p-5 text-left sm:p-6"
        >
          <span className="font-mono text-gold-deep/70 pt-1 text-sm">
            {String(index + 1).padStart(2, '0')}
          </span>

          <span className="min-w-0 flex-1">
            <span className="font-display text-ink group-hover:text-gold-deep block text-lg leading-snug transition-colors">
              {clinic.name}
            </span>
            {sub && (
              <span className="text-ink/55 mt-1 flex items-start gap-1.5 text-sm">
                {clinic.area && <MapPin size={13} className="text-gold-deep mt-1 shrink-0" />}
                {sub}
              </span>
            )}
          </span>

          <span
            className={`text-ink/50 group-hover:text-gold-deep mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line transition-all duration-300 ${
              open ? 'bg-emerald text-cream rotate-180 border-transparent' : ''
            }`}
          >
            <ChevronDown size={17} />
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="border-line grid gap-6 border-t p-5 sm:p-6 lg:grid-cols-2 lg:gap-8">
              {/* detail + map */}
              <div>
                <ul className="space-y-4">
                  <Fact Icon={MapPin} label="Address" value={clinic.address} />
                  <Fact Icon={Clock} label="Consulting days" value={clinic.days} />
                  <Fact
                    Icon={Phone}
                    label="Clinic reception"
                    value={clinic.phone}
                    href={clinic.phone ? `tel:${clinic.phone.replace(/\s/g, '')}` : undefined}
                  />
                </ul>

                <div className="mt-5">
                  <p className="eyebrow text-ink/40 text-[0.62rem]">Treatments at this location</p>
                  <ul className="mt-2.5 flex flex-wrap gap-1.5">
                    {treatmentTypes.map((t) => (
                      <li
                        key={t.name}
                        className="border-line text-ink/70 rounded-full border bg-sage/60 px-3 py-1 text-xs"
                      >
                        {t.name}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/treatments"
                    className="text-gold-deep mt-3 inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
                  >
                    What each involves
                    <ArrowUpRight size={14} />
                  </Link>
                </div>

                <div className="border-line mt-5 overflow-hidden rounded-xl border">
                  <iframe
                    title={`Map — ${clinic.name}`}
                    src={`https://www.google.com/maps?q=${encodeURIComponent(clinic.mapQuery)}&output=embed`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="block h-56 w-full border-0 grayscale-[0.25]"
                  />
                </div>

                {clinic.mapUrl && (
                  <a
                    href={clinic.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-ink/55 hover:text-gold-deep mt-3 inline-flex items-center gap-1.5 text-sm transition-colors"
                  >
                    Open in Google Maps
                    <ArrowUpRight size={14} />
                  </a>
                )}
              </div>

              <BookingForm clinic={clinic} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  )
}
