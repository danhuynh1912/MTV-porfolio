import { motion } from 'framer-motion'
import { charReveal, stage } from '../../lib/variants'

type Props = {
  text: string
  className?: string
  delay?: number
  stagger?: number
  /** Split by 'char' or 'word'. */
  by?: 'char' | 'word'
}

/**
 * Reveals text per character (or word) with an overflow-clipped slide-up.
 * Each glyph rides its own variant inside a staggered container.
 */
export default function SplitText({
  text,
  className,
  delay = 0,
  stagger = 0.028,
  by = 'char',
}: Props) {
  const units = by === 'word' ? text.split(' ') : text.split('')

  return (
    <motion.span
      className={className}
      style={{ display: 'inline-block' }}
      variants={stage(delay, stagger)}
      initial="hidden"
      animate="visible"
      aria-label={text}
    >
      {units.map((u, i) => (
        <span
          key={i}
          style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top' }}
          aria-hidden
        >
          <motion.span style={{ display: 'inline-block' }} variants={charReveal}>
            {u === ' ' ? ' ' : u}
            {by === 'word' && i < units.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}
