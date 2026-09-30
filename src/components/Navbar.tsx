import { useEffect, useState } from 'react'
import { content, SECTION_IDS, type Lang } from '../content'
import ThemeToggle from './ThemeToggle'
import LangToggle from './LangToggle'
interface P { lang: Lang; theme: string; toggleLang: () => void; toggleTheme: () => void }
export default function Navbar({ lang, theme, toggleLang, toggleTheme }: P) {
  const c = content[lang], [scrolled, setScrolled] = useState(false), [open, setOpen] = useState(false), [active, setActive] = useState('')
  useEffect(() => { const f = () => setScrolled(scrollY > 8); f(); addEventListener('scroll', f, { passive: true }); return () => removeEventListener('scroll', f) }, [])
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-40% 0px -55% 0px' })
    SECTION_IDS.forEach(id => { const el = document.getElementById(id); el && io.observe(el) })
    return () => io.disconnect()
  }, [lang])
  const links = SECTION_IDS.map(id => <a key={id} href={`#${id}`} onClick={() => setOpen(false)} aria-current={active === id}
    className={`nav-link micro ${active === id ? 'text-fg' : 'text-fg2'} hover:text-fg transition-colors`}>{c.nav[id]}</a>)
  return <>
    <header className={`fixed top-0 inset-x-0 h-16 z-50 bg-[var(--header-bg)] backdrop-blur-xl border-b transition-colors ${scrolled ? 'border-line' : 'border-transparent'}`}>
      <div className="max-w-grid mx-auto px-6 h-full flex items-center gap-8">
        <a href="#top" className="font-bold text-xl tracking-tight" aria-label={c.hero.name}>{c.logo}</a>
        <nav className="hidden lg:flex items-center gap-6 ms-auto" aria-label="Sections">{links}</nav>
        <div className="flex items-center gap-2 ms-auto lg:ms-0">
          <ThemeToggle theme={theme} onClick={toggleTheme} label={c.labels.theme} />
          <LangToggle lang={lang} onClick={toggleLang} label={c.labels.lang} />
          <button className="lg:hidden w-8 h-8 flex flex-col justify-center gap-[6px] items-center" aria-label={c.labels.menu} aria-expanded={open} onClick={() => setOpen(o => !o)}>
            <span className={`block w-5 h-px bg-fg transition-transform ${open ? 'translate-y-[3.5px] rotate-45' : ''}`} />
            <span className={`block w-5 h-px bg-fg transition-transform ${open ? '-translate-y-[3.5px] -rotate-45' : ''}`} />
          </button>
        </div>
      </div>
      {open && <nav className="lg:hidden absolute top-full inset-x-0 bg-bg border-b border-line rounded-b-2xl px-6 py-6 flex flex-col gap-5">{links}</nav>}
    </header>
  </>
}
