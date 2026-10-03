// All site text and data lives in data.json (keys: ar / en, same structure). This file only holds the types and exports it.
import data from './data.json'
export type Lang = 'ar' | 'en'
export const SECTION_IDS = ['education','experience','knowledge','certificates','projects','tools','testimonials','testing','contact'] as const
type Head = { title: string; subtitle: string }
export interface Content {
  meta: { title: string; description: string }
  logo: string
  nav: Record<(typeof SECTION_IDS)[number], string>
  hero: {
    profile_image: string | undefined; greeting: string; name: string; title: string; bio: string; identities: string[]; skills: string[];
    cv: string; cvLabel: string; work: string; phone: string; email: string; linkedin: string; github: string; whatsapp: string; photoAlt: string }
  labels: { theme: string; lang: string; menu: string; toTop: string; skip: string; close: string; prev: string; next: string }
}
export interface Sections {
  head: Record<'education' | 'experience' | 'knowledge' | 'certificates', Head>
  current: string
  education: { degree: string; school: string; years: string; gpa: string; desc: string }
  experience: { role: string; company: string; years: string; desc: string; tags: string[] }[]
  knowledge: { name: string; items: string[] }[]
  certificates: { name: string; org: string; year: string; img: string }[]
}
export interface Work {
  head: Record<'projects' | 'tools', Head>
  release: string; github: string; allProjects: string; repoBase: string
  projects: { title: string; desc: string; tags: string[]; repo: string; img?: string }[]
  tools: { name: string; desc: string; users: string; url: string }[]
}
export interface More {
  head: Record<'testimonials' | 'testing' | 'contact', Head>
  testimonials: { name: string; role: string; rating: number; quote: string }[]
  testing: { title: string; desc: string; benefits: string[]; cta: string; url: string }
  contact: { intro: string; endpoint: string; handles: Record<'linkedin' | 'github', string>
    labels: Record<'name' | 'email' | 'subject' | 'message', string>; placeholders: Record<'name' | 'email' | 'subject' | 'message', string>
    send: string; sending: string; success: string; error: string; details: Record<'email' | 'phone' | 'whatsapp' | 'linkedin' | 'github', string>; whatsappText: string }
  footer: { designed: string; made: string; rights: string }
}
interface Data { site: Content; sections: Sections; work: Work; more: More }
const d = data as unknown as Record<Lang, Data>
const pick = <K extends keyof Data>(k: K) => ({ ar: d.ar[k], en: d.en[k] }) as Record<Lang, Data[K]>
export const content = pick('site')
export const sections = pick('sections')
export const work = pick('work')
export const more = pick('more')
