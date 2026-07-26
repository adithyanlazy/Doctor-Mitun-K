import { createContext, useContext } from 'react'

/**
 * True once the preloader has let go of the page.
 *
 * The hero mounts behind the preloader, so anything it animates on mount plays
 * out while the curtain is still down and is over before the visitor ever sees
 * it. Gating the hero's entrance on this makes the sequence run as the curtain
 * lifts, which is the point of having it.
 */
export const AppReadyContext = createContext(true)

export function useAppReady() {
  return useContext(AppReadyContext)
}
