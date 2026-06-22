import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

type Props = {
  to: number
  suffix?: string
  duration?: number
  delay?: number
  className?: string
}

/** Eases a number from 0 → `to` once it scrolls into view. */
export default function CountUp({
  to,
  suffix = '',
  duration = 1.1,
  delay = 0,
  className,
}: Props) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const [value, setValue] = useState(reduce ? to : 0)

  useEffect(() => {
    if (reduce || !inView) return
    let raf = 0
    let start: number | null = null
    const startTimeout = setTimeout(() => {
      const tick = (now: number) => {
        if (start === null) start = now
        const p = Math.min((now - start) / (duration * 1000), 1)
        // easeOutExpo
        const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p)
        setValue(Math.round(eased * to))
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }, delay * 1000)

    return () => {
      clearTimeout(startTimeout)
      cancelAnimationFrame(raf)
    }
  }, [inView, to, duration, delay, reduce])

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  )
}
