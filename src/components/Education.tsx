import { sections, type Lang } from '../content'
import Section from './Section'
import { TimelineList, TimelineItem } from './Timeline'
export default function Education({ lang }: { lang: Lang }) {
  const s = sections[lang], e = s.education, h = s.head.education
  return <Section id="education" num="01" title={h.title} subtitle={h.subtitle}>
    <TimelineList><TimelineItem i={0}>
      <p className="micro text-muted">{e.years}</p>
      <h3 className="font-bold tracking-tight text-xl md:text-3xl mt-1">{e.degree}</h3>
      <p className="text-fg2 font-bold mt-1">{e.school} <span className="text-accent">·</span> {e.gpa}</p>
      <p className="text-sm text-muted max-w-xl mt-3">{e.desc}</p>
    </TimelineItem></TimelineList>
  </Section>
}
