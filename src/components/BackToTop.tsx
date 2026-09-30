import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { content, type Lang } from '../content'
export default function BackToTop({ lang }: { lang: Lang }) {
  const [show, setShow] = useState(false)
  useEffect(() => { const f = () => setShow(scrollY > 600); f(); addEventListener('scroll', f, { passive: true }); return () => removeEventListener('scroll', f) }, [])
  return <button onClick={() => scrollTo({ top: 0 })} aria-label={content[lang].labels.toTop} tabIndex={show ? 0 : -1}
    className={`fixed bottom-6 end-6 z-40 w-11 h-11 rounded-full grid place-items-center border border-strong bg-bg text-fg2 hover:text-accent hover:border-accent transition duration-300 ${show ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}><ArrowUp size={16} /></button>
}
