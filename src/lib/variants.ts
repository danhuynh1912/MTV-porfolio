import type { Variants, Transition } from 'framer-motion'

/**
 * Centralised motion language for the whole portfolio.
 *
 * Design intent: motion should feel like a real product — confident, quick,
 * slightly non-linear. We lean on custom cubic-beziers (no default "ease")
 * and spring physics for anything that "lands".
 */

// ---- Easings ----------------------------------------------------------------
// A snappy out-curve used for most entrances.
export const easeOutExpo: Transition['ease'] = [0.16, 1, 0.3, 1]
// A soft settle for text / secondary elements.
export const easeOutSoft: Transition['ease'] = [0.22, 0.61, 0.36, 1]

export const springSoft: Transition = {
  type: 'spring',
  stiffness: 260,
  damping: 26,
  mass: 0.9,
}

export const springSnappy: Transition = {
  type: 'spring',
  stiffness: 420,
  damping: 30,
}

// ---- Stagger orchestration --------------------------------------------------
// Parent container — children animate via their own variants.
// `delayChildren` lets a section breathe before its contents resolve.
export const stage = (delayChildren = 0, stagger = 0.07): Variants => ({
  hidden: {},
  visible: {
    transition: {
      delayChildren,
      staggerChildren: stagger,
    },
  },
})

// ---- Reusable item variants -------------------------------------------------
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOutExpo },
  },
}

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springSoft,
  },
}

export const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 44 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: easeOutExpo },
  },
}

export const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -44, rotate: -2 },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: { duration: 0.7, ease: easeOutExpo },
  },
}

// Focal hero — scales in from slightly small. Used for the headline card.
export const focal: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.62, ease: easeOutExpo },
  },
}

// Blur-fade — premium feel for understated cards.
export const blurFade: Variants = {
  hidden: { opacity: 0, filter: 'blur(8px)', y: 16 },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: { duration: 0.7, ease: easeOutSoft },
  },
}

// Drop with a little spring bounce — for cards that "fall" into place.
export const drop: Variants = {
  hidden: { opacity: 0, y: -34, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: springSoft,
  },
}

// Scale-pop — subtle.
export const pop: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: easeOutExpo },
  },
}

// Per-character reveal (used by SplitText).
export const charReveal: Variants = {
  hidden: { opacity: 0, y: '0.6em' },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOutExpo },
  },
}

// Page-level wrapper for route transitions.
export const pageVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}
