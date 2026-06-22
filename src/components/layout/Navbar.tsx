import { motion } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'

const TABS = [
  { label: 'Dashboard', path: '/' },
  { label: 'Projects', path: '/projects' },
]

function Globe() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" />
    </svg>
  )
}

function Instagram() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export default function Navbar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  return (
    <motion.nav
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, type: 'spring', stiffness: 280, damping: 26 }}
      className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full bg-card/85 p-1.5 backdrop-blur-md shadow-[0_8px_30px_-8px_rgba(0,0,0,0.3)]"
    >
      {TABS.map((tab) => {
        const active = pathname === tab.path
        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            className="relative rounded-full px-4 py-1.5 text-[13px] transition-colors"
          >
            {active && (
              <motion.span
                layoutId="nav-pill"
                className="absolute inset-0 rounded-full bg-white shadow-sm"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <span
              className={
                'relative z-10 ' + (active ? 'text-ink' : 'text-ink-soft hover:text-ink')
              }
            >
              {tab.label}
            </span>
          </button>
        )
      })}

      <span className="mx-1 h-4 w-px bg-line" />

      {[<Globe key="g" />, <Instagram key="i" />].map((icon, i) => (
        <motion.button
          key={i}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.92 }}
          className="flex h-7 w-7 items-center justify-center rounded-full text-ink-soft hover:text-ink"
        >
          {icon}
        </motion.button>
      ))}
    </motion.nav>
  )
}
