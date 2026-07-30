/* Minimal brand social glyphs (lucide-react dropped these). currentColor. */
const base = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'currentColor',
  'aria-hidden': true,
}

export function Instagram({ size = 18 }) {
  return (
    <svg {...base} width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function Facebook({ size = 18 }) {
  return (
    <svg {...base} width={size} height={size}>
      <path d="M14 8.5V6.8c0-.8.2-1.3 1.4-1.3H17V2.6C16.6 2.5 15.7 2.4 14.7 2.4c-2.3 0-3.8 1.4-3.8 3.9v2.2H8.4V12h2.5v9h3.1v-9h2.5l.4-3.5H14z" />
    </svg>
  )
}

export function Youtube({ size = 18 }) {
  return (
    <svg {...base} width={size} height={size}>
      <path d="M22.5 7.3c-.25-1.05-.99-1.83-2-2.05C18.7 4.8 12 4.8 12 4.8s-6.7 0-8.5.45c-1 .22-1.75 1-2 2.05C1 9.1 1 12 1 12s0 2.9.5 4.7c.25 1.05.99 1.8 2 2.06C5.3 19.2 12 19.2 12 19.2s6.7 0 8.5-.44c1.01-.26 1.75-1.01 2-2.06C23 14.9 23 12 23 12s0-2.9-.5-4.7zM9.8 15.3V8.7l5.7 3.3-5.7 3.3z" />
    </svg>
  )
}

export function Linkedin({ size = 18 }) {
  return (
    <svg {...base} width={size} height={size}>
      <path d="M4.98 3.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM3.3 9h3.4v11H3.3V9zm5.5 0h3.25v1.5h.05c.45-.85 1.56-1.75 3.2-1.75 3.42 0 4.05 2.25 4.05 5.18V20h-3.4v-4.9c0-1.17-.02-2.67-1.63-2.67-1.63 0-1.88 1.27-1.88 2.58V20H8.8V9z" />
    </svg>
  )
}

export function WhatsApp({ size = 18, className = '' }) {
  return (
    <svg
      {...base}
      width={size}
      height={size}
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  )
}

export const socialLinks = [
  {
    Icon: Instagram,
    label: 'Instagram',
    className:
      'bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white hover:opacity-90',
  },
  {
    Icon: Facebook,
    label: 'Facebook',
    className: 'bg-[#1877F2] text-white hover:brightness-110',
  },
  {
    Icon: Youtube,
    label: 'YouTube',
    className: 'bg-[#FF0000] text-white hover:brightness-110',
  },
  {
    Icon: Linkedin,
    label: 'LinkedIn',
    className: 'bg-[#0A66C2] text-white hover:brightness-110',
  },
]
