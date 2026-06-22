import { motion, type Variants } from 'framer-motion'

export type Project = {
  name: string
  caption: string
  /** Background tint of the card frame (matches Figma). */
  tint: string
  /** Optional mockup image (drop into /assets/projects). */
  image?: string
  /** Short device hint shown in the placeholder. */
  device?: string
}

type Props = {
  project: Project
  variants?: Variants
  className?: string
}

export default function ProjectCard({ project, variants, className = '' }: Props) {
  return (
    <motion.figure
      variants={variants}
      whileHover="hover"
      initial="rest"
      animate="rest"
      className={'group relative m-0 flex flex-col ' + className}
    >
      <motion.div
        variants={{
          rest: { scale: 1 },
          hover: { scale: 1.02, transition: { type: 'spring', stiffness: 300, damping: 24 } },
        }}
        className="relative flex-1 overflow-hidden rounded-xl"
      >
        {project.image ? (
          <img
            src={project.image}
            alt={project.name}
            className="h-full w-full object-contain"
          />
        ) : (
          <div className="flex h-full min-h-[140px] w-full items-center justify-center">
            <span className="rounded-md bg-black/5 px-3 py-1 text-[11px] tracking-wide text-ink-soft">
              {project.device ?? 'mockup'}
            </span>
          </div>
        )}

        {/* Hover overlay */}
        <motion.div
          variants={{
            rest: { opacity: 0 },
            hover: { opacity: 1 },
          }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0 flex items-end bg-gradient-to-t from-black/45 via-black/10 to-transparent p-4"
        >
          <motion.span
            variants={{
              rest: { y: 8, opacity: 0 },
              hover: { y: 0, opacity: 1 },
            }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-[13px] font-bold text-white"
          >
            View case →
          </motion.span>
        </motion.div>
      </motion.div>

      <figcaption className="mt-2 text-[12px] text-ink-soft">{project.caption}</figcaption>
    </motion.figure>
  )
}
