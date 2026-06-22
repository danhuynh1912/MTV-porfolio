import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/layout/Navbar'
import Dashboard from './pages/Dashboard'
import ProjectsOverview from './pages/ProjectsOverview'
import { pageVariants } from './lib/variants'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.main variants={pageVariants} initial="hidden" animate="visible" exit="exit">
              <Dashboard />
            </motion.main>
          }
        />
        <Route
          path="/projects"
          element={
            <motion.main variants={pageVariants} initial="hidden" animate="visible" exit="exit">
              <ProjectsOverview />
            </motion.main>
          }
        />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-canvas">
        <AnimatedRoutes />
        <Navbar />
      </div>
    </BrowserRouter>
  )
}
