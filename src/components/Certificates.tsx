import { useEffect, useState, type CSSProperties } from 'react'
import { Award, X } from 'lucide-react'
import { content, sections, type Lang } from '../content'
import Section from './Section'
export default function Certificates({ lang }: { lang: Lang }) {
  const s = sections[lang], h = s.head.certificates
  const [open, setOpen] = useState<number | null>(null)
  const [failed, setFailed] = useState<number[]>([])
  const fail = (i: number) => setFailed(f => (f.includes(i) ? f : [...f, i]))
  useEffect(() => {
    if (open === null) return
    const k = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null)
    addEventListener('keydown', k); const prev = document.body.style.overflow; document.body.style.overflow = 'hidden'
    return () => { removeEventListener('keydown', k); document.body.style.overflow = prev }
  }, [open])
  return <Section id="certificates" num="04" title={h.title} subtitle={h.subtitle}>
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{s.certificates.map((c, i) => {
      const ok = !failed.includes(i)
      return <li key={c.name} className="reveal" style={{ '--d': `${i * 60}ms` } as CSSProperties}>
        <button type="button" disabled={!ok} onClick={() => setOpen(i)} aria-haspopup="dialog"
          className="group w-full h-full flex flex-col text-start bg-card border border-line rounded-2xl overflow-hidden hover:border-accent transition-colors disabled:cursor-default">
          <div className="aspect-[4/3] bg-alt grid place-items-center overflow-hidden border-b border-line">
            {ok ? <img src={c.img} alt={c.name} loading="lazy" onError={() => fail(i)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              : <span className="w-12 h-12 grid place-items-center rounded-xl bg-[var(--brand-soft)]"><Award size={22} className="text-accent" aria-hidden /></span>}
          </div>
          <div className="p-5 flex-1">
            <h3 className="font-bold tracking-tight text-lg group-hover:text-accent transition-colors">{c.name}</h3>
            <p className="text-sm text-muted mt-1">{c.org} <span className="text-accent">·</span> {c.year}</p>
          </div>
        </button>
      </li>
    })}</ul>
    {open !== null && <div role="dialog" aria-modal="true" aria-label={s.certificates[open].name} onClick={() => setOpen(null)}
      className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-sm grid place-items-center p-4 md:p-10">
      <button autoFocus type="button" onClick={() => setOpen(null)} aria-label={content[lang].labels.close}
        className="absolute top-4 end-4 w-11 h-11 grid place-items-center rounded-full bg-card text-fg hover:text-accent"><X size={18} /></button>
      <figure onClick={e => e.stopPropagation()} className="max-w-4xl w-full">
        <img src={s.certificates[open].img} alt={s.certificates[open].name} className="w-full max-h-[80vh] object-contain rounded-xl bg-card" />
        <figcaption className="text-center text-sm text-white/80 mt-3">{s.certificates[open].name} · {s.certificates[open].org} · {s.certificates[open].year}</figcaption>
      </figure>
    </div>}
  </Section>
}
