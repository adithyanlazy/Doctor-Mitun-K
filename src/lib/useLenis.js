import { useEffect } from 'react'
import Lenis from 'lenis'

let lenisInstance = null

/** Jump to top instantly on route change (Lenis-aware). */
export function scrollTop(immediate = true) {
  if (lenisInstance) lenisInstance.scrollTo(0, { immediate })
  else window.scrollTo(0, 0)
}

/** Smooth-scroll to an element, clearing the fixed header (Lenis-aware). */
export function scrollToEl(el, offset = -96) {
  if (!el) return
  if (lenisInstance) lenisInstance.scrollTo(el, { offset, duration: 1.2 })
  else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset, behavior: 'smooth' })
}

/**
 * Freeze the page behind an overlay. Native scroll and Lenis both have to be
 * stopped — Lenis keeps driving the transform otherwise.
 */
export function lockScroll(locked) {
  document.body.style.overflow = locked ? 'hidden' : ''
  if (!lenisInstance) return
  if (locked) lenisInstance.stop()
  else lenisInstance.start()
}

/**
 * Smooth-scroll via Lenis. Respects prefers-reduced-motion (skips init).
 */
export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    })
    lenisInstance = lenis

    let raf
    const loop = (time) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    // same-page anchor links -> smooth scroll
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]')
      if (!a) return
      const id = a.getAttribute('href')
      if (id.length < 2) return
      const el = document.querySelector(id)
      if (!el) return
      e.preventDefault()
      lenis.scrollTo(el, { offset: -84, duration: 1.2 })
    }
    document.addEventListener('click', onClick)

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('click', onClick)
      lenis.destroy()
      lenisInstance = null
    }
  }, [])
}
