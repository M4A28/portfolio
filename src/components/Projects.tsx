import { useEffect, useState, type CSSProperties } from 'react'
import { ArrowUpRight, ChevronLeft, ChevronRight, Images, Smartphone, X } from 'lucide-react'
import { content, work, type Lang } from '../content'
import { shotsFor, extraProjects } from '../screenshots'
import Section from './Section'
const btn = 'micro inline-flex items-center h-8 px-3 rounded-lg border border-strong text-fg2 hover:text-accent hover:border-accent transition-colors'
type Shot = { title: string; imgs: string[]; idx: number }
export default function Projects({ lang }: { lang: Lang }) {
  const w = work[lang], h = w.head.projects, labels = content[lang].labels
  const projects = [...w.projects, ...extraProjects(w.projects)]
  const [open, setOpen] = useState<Shot | null>(null)
  const isOpen = open !== null
  useEffect(() => {
    if (!isOpen) return
    const k = (e: KeyboardEvent) => {
      const d = document.documentElement.dir === 'rtl' ? -1 : 1
      if (e.key === 'Escape') setOpen(null)
      if (e.key === 'ArrowRight') setOpen(o => o && { ...o, idx: (o.idx + d + o.imgs.length) % o.imgs.length })
      if (e.key === 'ArrowLeft') setOpen(o => o && { ...o, idx: (o.idx - d + o.imgs.length) % o.imgs.length })
    }
    addEventListener('keydown', k); const prev = document.body.style.overflow; document.body.style.overflow = 'hidden'
    return () => { removeEventListener('keydown', k); document.body.style.overflow = prev }
  }, [isOpen])
  const nav = (d: number) => setOpen(o => o && { ...o, idx: (o.idx + d + o.imgs.length) % o.imgs.length })
  const aside = <a href={content[lang].hero.github} target="_blank" rel="noreferrer" className="micro inline-flex items-center gap-2 text-fg2 hover:text-accent transition-colors">
    {w.allProjects}<ArrowUpRight size={14} className="rtl:-scale-x-100" aria-hidden /></a>
  return <Section id="projects" num="05" title={h.title} subtitle={h.subtitle} aside={aside}>
    <ol className="grid gap-4 md:gap-0 md:border-t md:border-line">{projects.map((p, i) => {
      const shots = shotsFor(p.repo)
      const imgs = shots.length ? shots : p.img ? [p.img] : []
      return <li key={p.repo} className="group grid md:grid-cols-12 items-center gap-4 md:gap-6 border border-line rounded-2xl md:rounded-none bg-card md:bg-transparent md:border-0 md:border-b p-4 md:py-8 md:px-0 reveal" style={{ '--d': `${i * 60}ms` } as CSSProperties}>
        <span className="hidden md:block md:col-span-1 font-mono text-xs text-muted">{String(i + 1).padStart(2, '0')}</span>
        <div className="md:col-span-2">
          {imgs.length ? <button type="button" aria-haspopup="dialog" onClick={() => setOpen({ title: p.title, imgs, idx: 0 })}
            className="relative block overflow-hidden bg-alt aspect-[9/16] max-h-52 w-fit mx-0 border border-line rounded-xl cursor-zoom-in hover:border-accent transition-colors">
            <img src={imgs[0]} alt={p.title} loading="lazy" className="h-full w-auto object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition duration-500" />
            {imgs.length > 1 && <span className="absolute bottom-1.5 start-1.5 inline-flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[11px] leading-none text-white"><Images size={12} aria-hidden />{imgs.length}</span>}
          </button>
            : <div role="img" aria-label={p.title} className="overflow-hidden bg-alt aspect-[9/16] max-h-52 w-fit mx-0 border border-line rounded-xl grid place-items-center text-muted group-hover:text-accent transition-colors"><Smartphone size={28} aria-hidden /></div>}
        </div>
        <div className="md:col-span-6">
          <h3 className="font-bold tracking-tight text-lg md:text-xl">{p.title}</h3>
          {p.desc && <p className="text-sm text-muted mt-1 max-w-lg">{p.desc}</p>}
          {p.tags.length > 0 && <ul className="flex flex-wrap gap-2 mt-3">{p.tags.map(t => <li key={t} className="micro px-2 py-1 rounded-full border border-line text-fg2 hover:text-accent hover:border-accent transition-colors">{t}</li>)}</ul>}
        </div>
        <div className="md:col-span-3 flex items-center gap-2 md:justify-end">
          <a href={`${w.repoBase}${p.repo}/releases`} target="_blank" rel="noreferrer" className={btn}>{w.release}</a>
          <a href={`${w.repoBase}${p.repo}`} target="_blank" rel="noreferrer" className={btn}>{w.github}</a>
          <span aria-hidden className="text-fg2 group-hover:text-accent transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 rtl:group-hover:-translate-x-1"><ArrowUpRight size={18} className="rtl:-scale-x-100" /></span>
        </div>
      </li>
    })}</ol>
    {open && <div role="dialog" aria-modal="true" aria-label={open.title} onClick={() => setOpen(null)}
      className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-sm grid place-items-center p-4 md:p-10">
      <button autoFocus type="button" onClick={() => setOpen(null)} aria-label={labels.close}
        className="absolute top-4 end-4 w-11 h-11 grid place-items-center rounded-full bg-card text-fg hover:text-accent"><X size={18} /></button>
      {open.imgs.length > 1 && <button type="button" onClick={e => { e.stopPropagation(); nav(-1) }} aria-label={labels.prev}
        className="absolute start-2 md:start-4 top-1/2 -translate-y-1/2 w-11 h-11 grid place-items-center rounded-full bg-card text-fg hover:text-accent"><ChevronLeft size={20} className="rtl:-scale-x-100" /></button>}
      {open.imgs.length > 1 && <button type="button" onClick={e => { e.stopPropagation(); nav(1) }} aria-label={labels.next}
        className="absolute end-2 md:end-4 top-1/2 -translate-y-1/2 w-11 h-11 grid place-items-center rounded-full bg-card text-fg hover:text-accent"><ChevronRight size={20} className="rtl:-scale-x-100" /></button>}
      <figure onClick={e => e.stopPropagation()} className="max-w-4xl">
        <img src={open.imgs[open.idx]} alt={open.title} className="max-h-[78vh] max-w-full w-auto mx-auto object-contain rounded-xl bg-card" />
        <figcaption className="text-center text-sm text-white/80 mt-3">{open.title}{open.imgs.length > 1 && ` · ${open.idx + 1} / ${open.imgs.length}`}</figcaption>
      </figure>
    </div>}
  </Section>
}
