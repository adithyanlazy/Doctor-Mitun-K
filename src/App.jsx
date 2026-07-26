import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import Layout from './components/Layout'
import Home from './pages/Home'
import AboutPage from './pages/AboutPage'
import AcademicsPage from './pages/AcademicsPage'
import TreatmentsPage from './pages/TreatmentsPage'
import ClinicsPage from './pages/ClinicsPage'
import ProcessPage from './pages/ProcessPage'
import ResultsPage from './pages/ResultsPage'
import BlogPage from './pages/BlogPage'
import ContactPage from './pages/ContactPage'

export default function App() {
  return (
    <MotionConfig reducedMotion="never">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="academics" element={<AcademicsPage />} />
            <Route path="treatments" element={<TreatmentsPage />} />
            <Route path="clinics" element={<ClinicsPage />} />
            <Route path="process" element={<ProcessPage />} />
            <Route path="results" element={<ResultsPage />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="contact" element={<ContactPage />} />
            {/* old paths from earlier drafts — keep any shared links working */}
            <Route path="lectures" element={<Navigate to="/academics" replace />} />
            <Route path="invisalign" element={<Navigate to="/treatments" replace />} />
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MotionConfig>
  )
}
