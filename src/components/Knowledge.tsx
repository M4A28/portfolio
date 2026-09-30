import type { CSSProperties } from 'react'
import { Smartphone, Database, PenTool, Server, Sparkles } from 'lucide-react'
import { sections, type Lang } from '../content'
import Section from './Section'
const icons = [Smartphone, Database, PenTool, Server, Sparkles]
export default function Knowledge({ lang }: { lang: Lang }) {
  const s = sections[lang], h = s.head.knowledge
  return <Section id="knowledge" num="03" title={h.title} subtitle={h.subtitle}>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{s.knowledge.map((k, i) => { const I = icons[i]
      return <article key={k.name} className="bg-card hover:bg-hover transition-colors p-6 border border-line rounded-2xl reveal" style={{ '--d': `${i * 80}ms` } as CSSProperties}>
        <span className="w-10 h-10 grid place-items-center rounded-xl bg-[var(--brand-soft)]"><I size={20} className="text-accent" aria-hidden /></span>
        <h3 className="font-bold tracking-tight text-lg mt-4">{k.name}</h3>
        <ul className="flex flex-wrap gap-2 mt-4">{k.items.map(t => <li key={t} className="micro px-2.5 py-1 rounded-full border border-line text-fg2">{t}</li>)}</ul>
      </article> })}</div>
  </Section>
}
