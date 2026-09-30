import type { CSSProperties } from 'react'
import { Hash, Palette, Gift, Link2, Regex, FileSpreadsheet } from 'lucide-react'
import { work, type Lang } from '../content'
import Section from './Section'
const icons = [Hash, Palette, Gift, Link2, Regex, FileSpreadsheet]
export default function Tools({ lang }: { lang: Lang }) {
  const w = work[lang], h = w.head.tools
  return <Section id="tools" num="06" title={h.title} subtitle={h.subtitle}>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{w.tools.map((t, i) => { const I = icons[i]
      return <a key={t.name} href={t.url} target="_blank" rel="noreferrer" className="group bg-card hover:bg-hover transition-colors p-6 border border-line rounded-2xl flex flex-col reveal" style={{ '--d': `${i * 60}ms` } as CSSProperties}>
        <I size={22} className="text-fg2 group-hover:text-accent transition-colors" aria-hidden />
        <h3 className="font-bold tracking-tight text-lg mt-5">{t.name}</h3>
        <p className="text-sm text-muted mt-1 flex-1">{t.desc}</p>
        <span className="micro self-start mt-5 px-2 py-1 rounded-full border border-line text-fg2">{t.users}</span>
      </a> })}</div>
  </Section>
}
