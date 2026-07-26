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
