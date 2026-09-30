import type { CSSProperties } from 'react'
import { Star } from 'lucide-react'
import { more, type Lang } from '../content'
import Section from './Section'
export default function Testimonials({ lang }: { lang: Lang }) {
  const m = more[lang], h = m.head.testimonials
  return <Section id="testimonials" num="07" title={h.title} subtitle={h.subtitle}>
    <div className="grid gap-4 md:grid-cols-2">{m.testimonials.map((t, i) =>
      <figure key={t.name} className="bg-card p-6 md:p-8 flex flex-col border border-line rounded-2xl reveal" style={{ '--d': `${i * 80}ms` } as CSSProperties}>
        <div role="img" aria-label={`${t.rating} / 5`} className="flex gap-1">{[1, 2, 3, 4, 5].map(n =>
          <Star key={n} size={14} aria-hidden className={n <= t.rating ? 'text-accent fill-current' : 'text-strong'} />)}</div>
        <blockquote className="text-base md:text-lg font-bold tracking-tight mt-5 flex-1">{t.quote}</blockquote>
        <figcaption className="mt-6"><span className="block font-bold">{t.name}</span><span className="micro text-muted">{t.role}</span></figcaption>
      </figure>)}</div>
  </Section>
}
