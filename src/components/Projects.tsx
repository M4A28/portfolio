import type { CSSProperties } from 'react'
import { ArrowUpRight, Smartphone } from 'lucide-react'
import { content, work, type Lang } from '../content'
import Section from './Section'
const btn = 'micro inline-flex items-center h-8 px-3 rounded-lg border border-strong text-fg2 hover:text-accent hover:border-accent transition-colors'
export default function Projects({ lang }: { lang: Lang }) {
  const w = work[lang], h = w.head.projects
  const aside = <a href={content[lang].hero.github} target="_blank" rel="noreferrer" className="micro inline-flex items-center gap-2 text-fg2 hover:text-accent transition-colors">
    {w.allProjects}<ArrowUpRight size={14} className="rtl:-scale-x-100" aria-hidden /></a>
  return <Section id="projects" num="05" title={h.title} subtitle={h.subtitle} aside={aside}>
    <ol className="grid gap-4 md:gap-0 md:border-t md:border-line">{w.projects.map((p, i) =>
      <li key={p.repo} className="group grid md:grid-cols-12 items-center gap-4 md:gap-6 border border-line rounded-2xl md:rounded-none bg-card md:bg-transparent md:border-0 md:border-b p-4 md:py-8 md:px-0 reveal" style={{ '--d': `${i * 60}ms` } as CSSProperties}>
        <span className="hidden md:block md:col-span-1 font-mono text-xs text-muted">{String(i + 1).padStart(2, '0')}</span>
        <div className="md:col-span-2 overflow-hidden bg-alt aspect-[9/16] max-h-52 w-fit mx-0 border border-line rounded-xl">
          {p.img ? <img src={p.img} alt={p.title} loading="lazy" className="h-full w-auto object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition duration-500" />
            : <div role="img" aria-label={p.title} className="h-full aspect-[9/16] grid place-items-center text-muted group-hover:text-accent transition-colors"><Smartphone size={28} aria-hidden /></div>}
        </div>
        <div className="md:col-span-6">
          <h3 className="font-bold tracking-tight text-lg md:text-xl">{p.title}</h3>
          <p className="text-sm text-muted mt-1 max-w-lg">{p.desc}</p>
          <ul className="flex flex-wrap gap-2 mt-3">{p.tags.map(t => <li key={t} className="micro px-2 py-1 rounded-full border border-line text-fg2 hover:text-accent hover:border-accent transition-colors">{t}</li>)}</ul>
        </div>
        <div className="md:col-span-3 flex items-center gap-2 md:justify-end">
          <a href={`${w.repoBase}${p.repo}/releases`} target="_blank" rel="noreferrer" className={btn}>{w.release}</a>
          <a href={`${w.repoBase}${p.repo}`} target="_blank" rel="noreferrer" className={btn}>{w.github}</a>
          <span aria-hidden className="text-fg2 group-hover:text-accent transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 rtl:group-hover:-translate-x-1"><ArrowUpRight size={18} className="rtl:-scale-x-100" /></span>
        </div>
      </li>)}</ol>
  </Section>
}
