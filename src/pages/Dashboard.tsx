import { motion, type Variants } from 'framer-motion'
import BentoCard from '../components/ui/BentoCard'
import RadarChart from '../components/ui/RadarChart'
import CountUp from '../components/ui/CountUp'
import SplitText from '../components/ui/SplitText'
import { focal, slideFromRight, fadeUp, blurFade, pop } from '../lib/variants'

/** Clone a base variant with an explicit entrance delay (non-linear orchestration). */
function withDelay(base: Variants, delay: number): Variants {
  const visible = base.visible as Record<string, unknown>
  return {
    hidden: base.hidden,
    visible: {
      ...visible,
      transition: { ...(visible.transition as object), delay },
    },
  }
}

const Label = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[11px] tracking-[0.02em] text-ink-faint">{children}</span>
)

export default function Dashboard() {
  return (
    <div className="px-6" style={{ height: '100dvh', paddingTop: 24, paddingBottom: 96 }}>
      {/* Grid */}
      <motion.div
        initial="hidden"
        animate="visible"
        className="grid h-full grid-cols-12 gap-3"
        style={{ gridTemplateRows: '2fr 3fr' }}
      >
        {/* Row 1 */}
        <BentoCard variants={withDelay(blurFade, 0.55)} className="col-span-12 sm:col-span-3">
          <div className="flex h-full flex-col justify-between gap-6">
            <div className="space-y-3">
              <div>
                <Label>Contact</Label>
                <p className="mt-1 text-[12px]">Email:</p>
                <p className="text-[12px] text-ink-soft">vuthanhmai.work@gmail.com</p>
              </div>
              <div>
                <p className="text-[12px]">My CV:</p>
                <a className="text-[12px] text-ink underline underline-offset-2" href="#">
                  Click here
                </a>
              </div>
            </div>
            <div className="flex gap-2 text-ink-soft">
              <SocialDot label="Dr" />
              <SocialDot label="Ig" />
            </div>
          </div>
        </BentoCard>

        <BentoCard variants={withDelay(pop, 0.45)} className="col-span-6 sm:col-span-2">
          <div className="flex h-full flex-col justify-between gap-4">
            <div>
              <Label>Experience</Label>
              <p className="mt-1 font-space text-[48px] font-bold">3 Yrs</p>
            </div>
            <div>
              <Label>Projects</Label>
              <p className="mt-1 font-space text-[48px] font-bold">
                <CountUp to={20} suffix="+" delay={0.55} />
              </p>
            </div>
          </div>
        </BentoCard>

        <BentoCard variants={withDelay(focal, 0)} className="col-span-12 sm:col-span-4">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <Label>Available for work</Label>
          </div>
          <h2 className="mt-3 font-space text-[64px] font-bold italic">
            <SplitText text="Hi, Iam Mai" delay={0.15} />
          </h2>
          <p className="mt-3 text-[12.5px] leading-relaxed text-ink-soft">
            I'm an UI/UX designer with a business background. My design focus on
            combining usability-driven design with thoughtful visual aesthetics.
          </p>
        </BentoCard>

        <BentoCard variants={withDelay(slideFromRight, 0.1)} className="col-span-12 sm:col-span-3">
          <div className="flex h-full flex-col">
            <Label>Currently at:</Label>
            <div className='w-fit m-auto'>
              <p className="mb-3 text-[12px] text-ink-soft">From 2023 - until present.</p>
              <p className="font-space text-[36px] font-bold italic tracking-tight">
                FPT <span className="rounded bg-ink px-1.5 py-0.5 text-card">DESIGN</span>
              </p>
            </div>
          </div>
        </BentoCard>

        {/* Row 2 */}
        <BentoCard variants={withDelay(fadeUp, 0.3)} className="col-span-12 sm:col-span-5">
          <div className="flex h-full flex-col justify-between">
            <div><Label>Quote for work and inspiration</Label>
            <h2 className="font-space text-[48px] font-bold italic leading-tight md:text-4xl">
              <SplitText text="Communication is a key" delay={0.45} by="word" stagger={0.06} />
            </h2></div>
            <p className="text-[11px] leading-relaxed text-ink-faint">
              Love crafting.
              <br />
              Love creating pixel-perfect work.
            </p>
          </div>
        </BentoCard>

        <BentoCard variants={withDelay(pop, 0.25)} className="col-span-12 sm:col-span-7">
          <div className="mx-auto flex h-full w-full max-w-[360px] items-center">
            <RadarChart delay={0.4} />
          </div>
        </BentoCard>
      </motion.div>
    </div>
  )
}

function SocialDot({ label }: { label: string }) {
  return (
    <motion.span
      whileHover={{ scale: 1.18 }}
      className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-black/5 text-[10px]"
    >
      {label}
    </motion.span>
  )
}
