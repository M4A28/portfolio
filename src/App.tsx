import { useEffect } from 'react'
import { content } from './content'
import { usePrefs } from './hooks/usePrefs'
import { useReveal } from './hooks/useReveal'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Education from './components/Education'
import Experience from './components/Experience'
import Knowledge from './components/Knowledge'
import Certificates from './components/Certificates'
import Projects from './components/Projects'
import Tools from './components/Tools'
import Testimonials from './components/Testimonials'
import Testing from './components/Testing'
import Contact from './components/Contact'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'
export default function App() {
  const p = usePrefs(), c = content[p.lang]
  useReveal(p.lang)
  useEffect(() => {
    document.title = c.meta.title
    const set = (sel: string, v: string) => document.querySelector(sel)?.setAttribute('content', v)
    set('meta[name="description"]', c.meta.description); set('meta[property="og:title"]', c.meta.title); set('meta[property="og:description"]', c.meta.description)
  }, [c])
  return <>
    <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:start-3 focus:z-[90] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-accent focus:text-white">{c.labels.skip}</a>
    <Navbar {...p} />
    <main id="main"><Hero lang={p.lang} /><Education lang={p.lang} /><Experience lang={p.lang} /><Knowledge lang={p.lang} /><Certificates lang={p.lang} /><Projects lang={p.lang} /><Tools lang={p.lang} /><Testimonials lang={p.lang} /><Testing lang={p.lang} /><Contact lang={p.lang} /></main>
    <Footer lang={p.lang} />
    <BackToTop lang={p.lang} />
  </>
}
