import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

const GLYPHS = '!<>-_\\/[]{}—=+*^?#________'

type Props = {
  text: string
  /** Seconds before the scramble starts. */
  delay?: number
  /** Total scramble duration in ms. */
  duration?: number
  className?: string
}

/**
 * Decodes each character from random glyphs to its final value.
 * Feels like a system "booting up" — used for page titles.
 */
export default function ScrambleText({
  text,
  delay = 0,
  duration = 900,
  className,
}: Props) {
  const reduce = useReducedMotion()
  const [display, setDisplay] = useState(reduce ? text : '')
  const frame = useRef(0)
  const raf = useRef<number>(0)

  useEffect(() => {
    if (reduce) {
      setDisplay(text)
      return
    }

    let startTime: number | null = null
    let startTimeout: ReturnType<typeof setTimeout>

    const tick = (now: number) => {
      if (startTime === null) startTime = now
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Each char resolves at a staggered point in the timeline.
      const out = text
        .split('')
        .map((ch, i) => {
          if (ch === ' ') return ' '
          const charStart = (i / text.length) * 0.6
          const charProgress = (progress - charStart) / 0.4
          if (charProgress >= 1) return ch
          if (charProgress <= 0)
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        })
        .join('')
      setDisplay(out)
      frame.current++
      if (progress < 1) {
        raf.current = requestAnimationFrame(tick)
      } else {
        setDisplay(text)
      }
    }

    startTimeout = setTimeout(() => {
      raf.current = requestAnimationFrame(tick)
    }, delay * 1000)

    return () => {
      clearTimeout(startTimeout)
      cancelAnimationFrame(raf.current)
    }
  }, [text, delay, duration, reduce])

  return (
    <span className={className} aria-label={text}>
      {display || ' '}
    </span>
  )
}
