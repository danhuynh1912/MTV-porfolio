import { motion, useReducedMotion } from 'framer-motion'

type Axis = { label: string; value: number } // value 0..1

const AXES: Axis[] = [
  { label: 'Communication', value: 0.92 },
  { label: 'UX Research', value: 0.6 },
  { label: 'Visual design', value: 0.72 },
  { label: 'Product thinking', value: 0.86 },
  { label: 'Design system', value: 0.55 },
]

const SIZE = 280
const CENTER = SIZE / 2
const RADIUS = 96
const RINGS = 4

function pointAt(angleDeg: number, r: number) {
  const a = (angleDeg * Math.PI) / 180
  return [CENTER + r * Math.cos(a), CENTER + r * Math.sin(a)] as const
}

// Start at top (-90), step clockwise.
const angles = AXES.map((_, i) => -90 + (360 / AXES.length) * i)

export default function RadarChart({ delay = 0 }: { delay?: number }) {
  const reduce = useReducedMotion()

  const dataPoints = AXES.map((ax, i) => pointAt(angles[i], RADIUS * ax.value))
  const dataPath =
    dataPoints.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x},${y}`).join(' ') + ' Z'

  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className="h-full w-full overflow-visible"
      role="img"
      aria-label="Skill radar chart"
    >
      {/* Concentric grid rings */}
      {Array.from({ length: RINGS }).map((_, ring) => {
        const r = (RADIUS / RINGS) * (ring + 1)
        const pts = angles
          .map((a) => pointAt(a, r))
          .map(([x, y]) => `${x},${y}`)
          .join(' ')
        return (
          <motion.polygon
            key={ring}
            points={pts}
            fill="none"
            stroke="rgba(123,63,242,0.18)"
            strokeWidth={1}
            strokeDasharray="3 4"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: delay + ring * 0.05,
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ transformOrigin: 'center' }}
          />
        )
      })}

      {/* Axis spokes */}
      {angles.map((a, i) => {
        const [x, y] = pointAt(a, RADIUS)
        return (
          <motion.line
            key={i}
            x1={CENTER}
            y1={CENTER}
            x2={x}
            y2={y}
            stroke="rgba(123,63,242,0.18)"
            strokeWidth={1}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: delay + 0.1 + i * 0.04, duration: 0.4 }}
          />
        )
      })}

      {/* Data polygon — fill fades, stroke draws */}
      <motion.path
        d={dataPath}
        fill="rgba(123,63,242,0.18)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.55, duration: 0.6 }}
      />
      <motion.path
        d={dataPath}
        fill="none"
        stroke="#7b3ff2"
        strokeWidth={1.6}
        strokeLinejoin="round"
        initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: delay + 0.25, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Vertex dots */}
      {dataPoints.map(([x, y], i) => (
        <motion.circle
          key={i}
          cx={x}
          cy={y}
          r={3}
          fill="#7b3ff2"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: delay + 0.7 + i * 0.06, type: 'spring', stiffness: 400, damping: 18 }}
        />
      ))}

      {/* Labels */}
      {AXES.map((ax, i) => {
        const [x, y] = pointAt(angles[i], RADIUS + 26)
        const anchor =
          x < CENTER - 5 ? 'end' : x > CENTER + 5 ? 'start' : 'middle'
        return (
          <motion.text
            key={ax.label}
            x={x}
            y={y}
            textAnchor={anchor}
            dominantBaseline="middle"
            className="fill-ink"
            style={{ fontSize: 10, fontFamily: 'var(--font-mono)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.8 + i * 0.05, duration: 0.4 }}
          >
            {ax.label}
          </motion.text>
        )
      })}
    </svg>
  )
}
