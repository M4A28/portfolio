import type { CSSProperties } from 'react'
import { Smartphone, PenTool, Code2, Mail, Phone, Download } from 'lucide-react'
import { FaLinkedinIn, FaGithub, FaWhatsapp } from 'react-icons/fa6'
import { content, type Lang } from '../content'
const icons = [Smartphone, PenTool, Code2]
const d = (ms: number) => ({ '--d': `${ms}ms` } as CSSProperties)
export default function Hero({ lang }: { lang: Lang }) {
  const h = content[lang].hero, tel = `tel:${h.phone.replace(/\s/g, '')}`
  const socials = [[FaLinkedinIn, h.linkedin, 'LinkedIn'], [FaGithub, h.github, 'GitHub'], [Mail, `mailto:${h.email}`, 'Email'],
    [FaWhatsapp, h.whatsapp, 'WhatsApp'], [Phone, tel, 'Phone']] as const
  return <section id="top" className="aurora min-h-screen flex items-end pt-28 pb-12">
    <div className="max-w-grid mx-auto px-6 w-full">
      <p className="micro text-fg2 mb-6 reveal">{h.greeting}</p>
      <div className="grid grid-cols-12 gap-y-10 gap-x-6 items-end">
        <div className="col-span-12 md:col-span-7">
          <h1 className="hero-name reveal" style={d(80)}>{h.name}</h1>
          <h2 className="text-xl font-bold text-fg2 mt-6 reveal" style={d(160)}>{h.title}</h2>
          <p className="max-w-lg text-sm text-muted mt-4 reveal" style={d(240)}>{h.bio}</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 mt-6 reveal" style={d(320)}>
            {h.identities.map((t, i) => { const I = icons[i]; return <li key={t} className="flex items-center gap-2 text-xs font-bold"><I size={14} className="text-accent" />{t}</li> })}
          </ul>
        </div>
        <div className="col-span-12 md:col-span-5 flex flex-col items-start md:items-end gap-5 reveal" style={d(200)}>
          <img src={h.profile_image} alt={h.photoAlt} loading="lazy" className="w-48 h-48 md:w-56 md:h-56 object-cover rounded-3xl border-2 border-accent bg-alt glow" />
          <div className="flex gap-2">{socials.map(([I, href, label]) =>
            <a key={label} href={href} aria-label={label} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
              className="w-10 h-10 grid place-items-center rounded-xl bg-card border border-strong text-fg2 hover:text-accent hover:border-accent transition-colors"><I size={16} /></a>)}</div>
        </div>
      </div>
      <ul className="flex flex-wrap gap-2 mt-12 reveal">{h.skills.map(s =>
        <li key={s} className="micro px-3 py-1.5 rounded-full bg-card border border-line text-fg2 hover:text-accent hover:border-accent transition-colors">{s}</li>)}</ul>
      <div className="mt-8 pt-8 border-t border-line flex flex-wrap items-center gap-4 reveal">
        <a href={h.cv} download className="micro inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-accent text-white hover:opacity-90 transition-opacity"><Download size={14} />{h.cvLabel}</a>
        <a href="#projects" className="micro inline-flex items-center h-11 px-6 rounded-xl bg-card border border-strong hover:border-accent hover:text-accent transition-colors">{h.work}</a>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-fg2 ms-auto">
          <a href={tel} className="inline-flex items-center gap-2 hover:text-fg" dir="ltr"><Phone size={12} className="text-accent" />{h.phone}</a>
          <a href={`mailto:${h.email}`} className="inline-flex items-center gap-2 hover:text-fg"><Mail size={12} className="text-accent" />{h.email}</a>
        </div>
      </div>
    </div>
  </section>
}
