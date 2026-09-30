import type { Lang } from '../content'
export default function LangToggle({ lang, onClick, label }: { lang: Lang; onClick: () => void; label: string }) {
  return <button onClick={onClick} aria-label={label} className="micro h-8 px-3 rounded-lg border border-strong text-fg2 hover:text-accent hover:border-accent transition-colors">
    {lang === 'ar' ? 'EN' : 'ع'}</button>
}
