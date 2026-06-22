import { motion } from 'framer-motion'
import { easeOutExpo } from '../lib/variants'
import imgTakashimaya from '../assets/projects/Takashimaya S.C Website.svg'
import imgAppBuilder from '../assets/projects/App-builder Platform.svg'
import imgRedesign from '../assets/projects/Re-design Website .svg'
import imgFinTouch from '../assets/projects/Fin-Teach Mobile App.svg'

const COL_HEIGHT = 580

type ColItem = { src: string; caption: string; delay: number }

function Col({ items, delay, flex = 1, className }: { items: ColItem[]; delay: number; flex?: number; className?: string}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: easeOutExpo }}
      className={`min-w-0 space-y-2 flex-${flex} ${className}`}
    >
      {items.map((item) => (
        <div
          key={item.src}
          className="flex min-h-0 flex-col"
          style={{ flex: 1 }}
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            className={`group relative min-h-0 flex-1 overflow-hidden`}
          >
            <img
              src={item.src}
              alt={item.caption}
              className="w-full"
              style={{ display: 'block', objectFit: 'contain' }}
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 flex items-end p-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <span className="translate-y-2 text-[13px] font-bold text-black transition-transform duration-300 group-hover:translate-y-0">
                View case →
              </span>
            </div>
          </motion.div>
          <p className="mt-2 shrink-0 text-[12px] text-ink-soft">{item.caption}</p>
        </div>
      ))}
    </motion.div>
  )
}

export default function ProjectsOverview() {
  return (
    <div className="px-6 pt-6 h-[calc(100vh-100px)]">
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6, ease: easeOutExpo }}
        style={{marginTop: "auto", marginBottom: "auto"}}
      >
        <h2 className="font-space text-xl font-bold text-ink">
          <motion.span
            initial={{ backgroundSize: '0% 2px' }}
            animate={{ backgroundSize: '100% 2px' }}
            transition={{ delay: 0.4, duration: 0.6, ease: easeOutExpo }}
            className="inline-block pb-1"
            style={{
              backgroundImage: 'linear-gradient(currentColor, currentColor)',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: '0 100%',
            }}
          >
            Selected Work(s)
          </motion.span>
        </h2>

        {/* 3-col flex — height set on parent, cols stretch to fill */}
        <div className="mt-12 flex gap-4 h-max w-fit m-auto">
          <Col
            delay={0.25}
            items={[{ src: imgTakashimaya, caption: 'Takashimaya S.C Website', delay: 0.25 }]}
            flex={2}
            className='w-[45.8%]'
          />
          <Col
            delay={0.35}
            items={[
              { src: imgAppBuilder, caption: 'App-builder Platform', delay: 0.35 },
              { src: imgRedesign, caption: 'Re-design Website', delay: 0.5 },
            ]}
          />
          <Col
            delay={0.4}
            items={[{ src: imgFinTouch, caption: 'Fin-Touch Mobile App', delay: 0.4 }]}
          />
        </div>
      </motion.section>
    </div>
  )
}
