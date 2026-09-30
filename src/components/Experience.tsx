import { sections, type Lang } from '../content'
import Section from './Section'
import { TimelineList, TimelineItem } from './Timeline'
export default function Experience({ lang }: { lang: Lang }) {
  const s = sections[lang], h = s.head.experience
  return <Section id="experience" num="02" title={h.title} subtitle={h.subtitle}>
    <TimelineList>{s.experience.map((x, i) => {
      const cur = /Present|الآن/.test(x.years)
      return <TimelineItem key={x.role} i={i} current={cur}>
        <div className="flex flex-wrap items-center gap-3">
          <p className="micro text-muted">{x.years}</p>
          {cur && <span className="micro inline-flex items-center gap-2 text-accent"><span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />{s.current}</span>}
        </div>
        <h3 className="font-bold tracking-tight text-xl md:text-3xl mt-1">{x.role}</h3>
        <p className="text-fg2 font-bold mt-1">{x.company}</p>
        <p className="text-sm text-muted max-w-xl mt-3">{x.desc}</p>
        <ul className="flex flex-wrap gap-2 mt-4">{x.tags.map(t => <li key={t} className="micro px-2.5 py-1 rounded-full border border-line text-fg2 hover:text-accent hover:border-accent transition-colors">{t}</li>)}</ul>
      </TimelineItem>
    })}</TimelineList>
  </Section>
}
