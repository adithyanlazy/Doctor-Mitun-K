import { useCallback, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

const AUTO_MS = 5000
const RESUME_MS = AUTO_MS * 2

const DEFAULT_SLIDE_CLASS =
  'w-[min(100%,22rem)] shrink-0 snap-center sm:w-[min(88%,26rem)]'

/**
 * Horizontal snap carousel with auto-advance, dot nav, and pause on interaction.
 */
export default function SwipeCarousel({
  items,
  renderSlide,
  ariaLabel,
  idPrefix = 'carousel-slide',
  slideClassName = DEFAULT_SLIDE_CLASS,
  trackClassName = '',
  centerSlideAt = '22rem',
  getItemKey,
  getDotLabel,
}) {
  const trackRef = useRef(null)
  const pauseTimerRef = useRef(null)
  const pausedRef = useRef(false)
  const [active, setActive] = useState(0)
  const reduce = useReducedMotion()

  const scrollToIndex = useCallback(
    (index, behavior = reduce ? 'auto' : 'smooth') => {
      const track = trackRef.current
      const slide = track?.children[index]
      if (!slide) return
      slide.scrollIntoView({ behavior, inline: 'center', block: 'nearest' })
      setActive(index)
    },
    [reduce],
  )

  const pauseAuto = useCallback(() => {
    pausedRef.current = true
    window.clearTimeout(pauseTimerRef.current)
  }, [])

  const resumeAutoLater = useCallback(() => {
    window.clearTimeout(pauseTimerRef.current)
    pauseTimerRef.current = window.setTimeout(() => {
      pausedRef.current = false
    }, RESUME_MS)
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let frame = 0
    const onScroll = () => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(() => {
        const slides = [...track.children]
        const center = track.scrollLeft + track.clientWidth / 2
        let closest = 0
        let minDist = Infinity

        slides.forEach((slide, i) => {
          const slideCenter = slide.offsetLeft + slide.clientWidth / 2
          const dist = Math.abs(center - slideCenter)
          if (dist < minDist) {
            minDist = dist
            closest = i
          }
        })

        setActive(closest)
      })
    }

    track.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      track.removeEventListener('scroll', onScroll)
      window.cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    if (reduce) return undefined

    const id = window.setInterval(() => {
      if (pausedRef.current) return
      setActive((prev) => {
        const next = (prev + 1) % items.length
        scrollToIndex(next)
        return next
      })
    }, AUTO_MS)

    return () => window.clearInterval(id)
  }, [reduce, scrollToIndex, items.length])

  useEffect(
    () => () => {
      window.clearTimeout(pauseTimerRef.current)
    },
    [],
  )

  return (
    <div
      className="relative"
      onMouseEnter={pauseAuto}
      onMouseLeave={resumeAutoLater}
      onFocusCapture={pauseAuto}
      onBlurCapture={resumeAutoLater}
    >
      <div
        ref={trackRef}
        role="region"
        aria-roledescription="carousel"
        aria-label={ariaLabel}
        className={`flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${trackClassName}`}
        style={{ paddingInline: `max(0px, calc((100% - min(100%, ${centerSlideAt})) / 2))` }}
        onTouchStart={pauseAuto}
        onTouchEnd={resumeAutoLater}
        onPointerDown={pauseAuto}
        onPointerUp={resumeAutoLater}
      >
        {items.map((item, i) => (
          <div
            key={getItemKey ? getItemKey(item, i) : i}
            id={`${idPrefix}-${i}`}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${items.length}`}
            className={slideClassName}
          >
            {renderSlide(item, i)}
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center gap-2" role="tablist" aria-label={`Choose a ${ariaLabel.toLowerCase()}`}>
        {items.map((item, i) => (
          <button
            key={getItemKey ? getItemKey(item, i) : i}
            type="button"
            role="tab"
            aria-selected={active === i}
            aria-controls={`${idPrefix}-${i}`}
            aria-label={getDotLabel ? getDotLabel(item, i) : `Show slide ${i + 1}`}
            onClick={() => {
              pauseAuto()
              scrollToIndex(i)
              resumeAutoLater()
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              active === i ? 'w-6 bg-gold' : 'w-2 bg-line hover:bg-gold/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
