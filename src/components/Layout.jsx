import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useLenis, scrollTop } from '../lib/useLenis'
import BookingProvider from '../lib/booking'
import { AppReadyContext } from '../lib/appReady'
import Preloader from './Preloader'
import Nav from './Nav'
import Footer from './Footer'
import Floating from './Floating'
import BookingPanel from './BookingPanel'

function ScrollReset() {
  const { pathname } = useLocation()
  useEffect(() => {
    scrollTop(true)
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function Layout() {
  // Skip the curtain in dev so local previews are never a blank screen behind it.
  const [loading, setLoading] = useState(import.meta.env.PROD)
  useLenis()

  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : ''
    if (!loading) {
      // Belt and braces: Lenis initialises behind the preloader, so pin it to
      // the top at the moment scrolling is handed back to the visitor.
      scrollTop(true)
      return
    }
    const t = setTimeout(() => setLoading(false), 1800)
    return () => clearTimeout(t)
  }, [loading])

  useEffect(() => () => {
    document.body.style.overflow = ''
  }, [])

  return (
    <BookingProvider>
      <AppReadyContext.Provider value={!loading}>
        <AnimatePresence>{loading && <Preloader key="preloader" />}</AnimatePresence>
        <ScrollReset />
        <Nav />
        <main>
          <Outlet />
        </main>
        <Footer />
        <Floating />
        <BookingPanel />
      </AppReadyContext.Provider>
    </BookingProvider>
  )
}
