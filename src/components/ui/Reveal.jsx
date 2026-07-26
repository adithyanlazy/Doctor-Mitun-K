import { motion, useReducedMotion } from 'framer-motion'

/**
 * Scroll-in reveal: fade + rise (+ optional blur). Once.
 */
export default function Reveal({
  children,
  as = 'div',
  delay = 0,
  y = 24,
  className = '',
  amount = 0.35,
}) {
  const reduce = useReducedMotion()
  const M = motion[as] || motion.div

  if (reduce) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <M
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </M>
  )
}
