import { createContext, useContext } from 'react'

/**
 * Context behind the site-wide booking panel. Kept apart from the provider
 * component so each file exports only one kind of thing and fast refresh
 * keeps working.
 */
export const BookingContext = createContext(null)

export function useBooking() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBooking must be used inside <BookingProvider>')
  return ctx
}
