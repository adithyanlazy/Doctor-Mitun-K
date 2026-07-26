import { useCallback, useMemo, useState } from 'react'
import { BookingContext } from './bookingContext'

/**
 * One booking panel for the whole site.
 *
 * Every "Book" call to action opens this panel instead of scrolling the visitor
 * to a section at the foot of the page — the request is made where it was
 * asked for, and the visitor keeps their place on the page.
 *
 * `openBooking(slug)` may name a clinic; the panel then opens with that clinic
 * already chosen (used by the clinic list). Called with nothing, the visitor
 * picks the location themselves.
 */
export default function BookingProvider({ children }) {
  const [open, setOpen] = useState(false)
  const [preset, setPreset] = useState(null)

  const openBooking = useCallback((slug = null) => {
    setPreset(typeof slug === 'string' ? slug : null)
    setOpen(true)
  }, [])

  const closeBooking = useCallback(() => setOpen(false), [])

  const value = useMemo(
    () => ({ open, preset, openBooking, closeBooking }),
    [open, preset, openBooking, closeBooking],
  )

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
}
