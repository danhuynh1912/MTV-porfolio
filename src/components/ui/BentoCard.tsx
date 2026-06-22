import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  variants?: Variants
  className?: string
  /** Subtle lift on hover. */
  interactive?: boolean
  style?: React.CSSProperties
}

/**
 * The base card surface used across the Dashboard bento grid.
 * Owns the cream surface, radius, and a restrained hover lift.
 */
export default function BentoCard({
  children,
  variants,
  className = '',
  interactive = true,
  style,
}: Props) {
  return (
    <motion.div
      variants={variants}
      style={style}
      whileHover={
        interactive
          ? { y: -4, transition: { type: 'spring', stiffness: 300, damping: 22 } }
          : undefined
      }
      className={
        'relative overflow-hidden rounded-2xl bg-card p-5 ' +
        'shadow-[0_1px_0_rgba(255,255,255,0.6)_inset,0_8px_24px_-16px_rgba(0,0,0,0.25)] ' +
        className
      }
    >
      {children}
    </motion.div>
  )
}
