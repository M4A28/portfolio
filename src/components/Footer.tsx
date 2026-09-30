import { Heart } from 'lucide-react'
import { more, content, type Lang } from '../content'
export default function Footer({ lang }: { lang: Lang }) {
  const f = more[lang].footer
  return <footer className="border-t border-line py-10"><div className="max-w-grid mx-auto px-6 flex flex-wrap items-center justify-between gap-4 text-xs text-muted">
    <p>{f.designed}</p>
    <p className="inline-flex items-center gap-1.5">{f.made}<Heart size={12} className="text-accent fill-current" aria-hidden /></p>
    <p>© {new Date().getFullYear()} {content[lang].hero.name}. {f.rights}</p>
  </div></footer>
}
