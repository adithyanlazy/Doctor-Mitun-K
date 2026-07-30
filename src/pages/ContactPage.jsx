import { useState } from 'react'
import { Phone, MessageCircle, Mail, Send } from 'lucide-react'
import PageHero from '../components/PageHero'
import Reveal from '../components/ui/Reveal'
import Eyebrow from '../components/ui/Eyebrow'
import Practice from '../components/Practice'
import { brand } from '../lib/data'
import { openWhatsApp } from '../lib/whatsapp'

const details = [
  { Icon: Phone, label: 'Call', value: brand.phone, href: `tel:${brand.phoneHref}` },
  { Icon: MessageCircle, label: 'WhatsApp', value: 'Message the booking desk', href: `https://wa.me/${brand.whatsapp}` },
  { Icon: Mail, label: 'Email', value: brand.email, href: `mailto:${brand.email}` },
]

function Form() {
  const [f, setF] = useState({ name: '', phone: '', concern: 'Orthodontic consultation', message: '' })
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    openWhatsApp([
      `Hi, I'd like to book a consultation with ${brand.doctor}.`,
      '',
      `Name: ${f.name}`,
      `Phone: ${f.phone}`,
      `Interested in: ${f.concern}`,
      '',
      f.message,
    ])
  }

  const field =
    'w-full rounded-xl border border-line bg-cream px-4 py-3 text-ink placeholder:text-ink/40 focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/20 transition'

  return (
    <form onSubmit={submit} className="card-cream p-7 md:p-9">
      <h2 className="font-display text-ink text-2xl">Request a callback</h2>
      <p className="text-ink/55 mt-2 text-sm">
        Send your details and the booking desk will confirm your consultation on WhatsApp.
      </p>

      <div className="mt-6 space-y-4">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink/70">
            Full name
          </label>
          <input
            id="name"
            required
            autoComplete="name"
            value={f.name}
            onChange={set('name')}
            className={field}
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-ink/70">
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            value={f.phone}
            onChange={set('phone')}
            className={field}
            placeholder="+91 …"
          />
        </div>
        <div>
          <label htmlFor="concern" className="mb-1.5 block text-sm font-medium text-ink/70">
            I’m interested in
          </label>
          <select id="concern" value={f.concern} onChange={set('concern')} className={field}>
            <option>Orthodontic consultation</option>
            <option>Clear aligners</option>
            <option>Braces (metal or ceramic)</option>
            <option>Early treatment for a child</option>
            <option>Adult orthodontics</option>
            <option>Complex or surgical case</option>
            <option>Second opinion</option>
          </select>
        </div>
        <div>
          <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink/70">
            Message <span className="text-ink/40">(optional)</span>
          </label>
          <textarea
            id="message"
            rows={4}
            value={f.message}
            onChange={set('message')}
            className={`${field} resize-none`}
            placeholder="Tell us a little about what you’d like to fix…"
          />
        </div>
        <button type="submit" className="btn btn-gold w-full">
          Send via WhatsApp <Send size={16} />
        </button>
        <p className="text-ink/40 text-center text-xs">
          Opens WhatsApp with your details pre-filled. No data is stored on this demo site.
        </p>
      </div>
    </form>
  )
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumb="Contact"
        eyebrow="Get in touch"
        title="Start with a"
        titleEm="consultation."
        sub={`Book a consultation and digital scan — ${brand.doctor} will see you at whichever partner clinic suits you best. Or simply ask a question first.`}
      />

      <section className="bg-cream section">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* details */}
          <div>
            <Eyebrow>Reach us</Eyebrow>
            <h2 className="d-section text-ink mt-6">We’re here to help.</h2>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {details.map(({ Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="card-cream group flex flex-col gap-3 p-5 transition-colors hover:border-gold/50"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-emerald text-gold-400">
                    <Icon size={20} strokeWidth={1.7} />
                  </span>
                  <span className="eyebrow text-gold-deep">{label}</span>
                  <span className="text-ink/75 text-sm leading-relaxed">{value}</span>
                </a>
              ))}
            </div>
          </div>

          {/* form */}
          <Reveal>
            <Form />
          </Reveal>
        </div>
      </section>

      <Practice />
    </>
  )
}
