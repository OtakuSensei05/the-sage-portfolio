import { motion } from 'framer-motion'

export default function Timeline({ items, accent = '#6fb7ff' }) {
  return (
    <ol className="relative space-y-6 border-l border-white/10 pl-6">
      {items.map((item, i) => (
        <motion.li
          key={item.year + item.title}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ delay: i * 0.08, duration: 0.5 }}
          className="relative"
        >
          <span
            className="absolute -left-[27px] top-1.5 h-2.5 w-2.5 rounded-full"
            style={{ background: accent, boxShadow: `0 0 10px ${accent}` }}
            aria-hidden="true"
          />
          <p className="font-mono text-xs tracking-widest text-slate-500">{item.year}</p>
          <h3 className="mt-1 font-display text-base">{item.title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-slate-400">{item.text}</p>
        </motion.li>
      ))}
    </ol>
  )
}
