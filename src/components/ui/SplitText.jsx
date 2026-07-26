import { motion, useReducedMotion } from 'framer-motion'

/**
 * Word-by-word rise-in for display headlines.
 * Pass an array of "lines" (each a string) to preserve line breaks.
 */
export default function SplitText({ lines = [], className = '', delay = 0, stagger = 0.055 }) {
  const reduce = useReducedMotion()

  if (reduce) {
    return (
      <span className={className}>
        {lines.map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </span>
    )
  }

  let idx = 0
  return (
    <span className={className}>
      {lines.map((line, li) => (
        <span key={li} className="block overflow-hidden pb-[0.08em]">
          {line.split(' ').map((word, wi) => {
            const myDelay = delay + idx * stagger
            idx += 1
            return (
              <span key={wi} className="inline-block overflow-hidden align-top">
                <motion.span
                  className="inline-block"
                  initial={{ y: '110%' }}
                  whileInView={{ y: '0%' }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.8, delay: myDelay, ease: [0.22, 1, 0.36, 1] }}
                >
                  {word}
                  {wi < line.split(' ').length - 1 ? ' ' : ''}
                </motion.span>
              </span>
            )
          })}
        </span>
      ))}
    </span>
  )
}
