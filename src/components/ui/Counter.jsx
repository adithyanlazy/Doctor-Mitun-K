import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

/**
 * Counts up to `value` when scrolled into view. Respects reduced motion.
 */
export default function Counter({ value, decimals = 0, suffix = '', className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    let raf
    const start = performance.now()
    const dur = 1600
    const tick = (now) => {
      const p = Math.min(1, (now - start) / dur)
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplay(value * eased)
      if (p < 1) raf = requestAnimationFrame(tick)
      else setDisplay(value)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value])

  const formatted =
    decimals > 0
      ? display.toFixed(decimals)
      : Math.round(display).toLocaleString('en-IN')

  return (
    <span ref={ref} className={`tabular ${className}`}>
      {formatted}
      {suffix}
    </span>
  )
}
