import { Check } from 'lucide-react'
import { more, type Lang } from '../content'
import Section from './Section'
export default function Testing({ lang }: { lang: Lang }) {
  const m = more[lang], t = m.testing, h = m.head.testing
  return <Section id="testing" num="08" title={h.title} subtitle={h.subtitle}>
    <div className="navy rounded-3xl border border-strong p-8 md:p-12 grid gap-10 md:grid-cols-2 items-center reveal">
      <div>
        <h3 className="font-bold tracking-tight text-3xl md:text-5xl leading-none">{t.title}</h3>
        <p className="text-sm text-muted max-w-sm mt-5">{t.desc}</p>
        <a href={t.url} target="_blank" rel="noreferrer" className="micro inline-flex items-center h-11 px-6 rounded-xl mt-8 bg-accent text-white hover:opacity-90 transition-opacity">{t.cta}</a>
      </div>
      <ul className="border-t border-line">{t.benefits.map(b =>
        <li key={b} className="flex items-center gap-3 py-4 border-b border-line text-sm font-bold"><Check size={16} className="text-accent shrink-0" aria-hidden />{b}</li>)}</ul>
    </div>
  </Section>
}
