import { brand } from './data'

/**
 * Hand a composed message to WhatsApp.
 *
 * Every booking on this site ends here — there is no backend. `window.open`
 * with `_blank` is fine on desktop, but on a phone it is the fragile path:
 * in-app browsers (Instagram, Facebook) and iOS Safari with pop-ups blocked
 * return a null handle and the visitor is left staring at a form that did
 * nothing. When that happens, navigate this tab instead — WhatsApp opens, and
 * the back button brings them back to the site.
 */
export function openWhatsApp(lines) {
  const text = Array.isArray(lines) ? lines.join('\n') : lines
  const url = `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(text)}`
  const win = window.open(url, '_blank', 'noopener')
  if (!win) window.location.href = url
}
