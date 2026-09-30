import { Sun, Moon } from 'lucide-react'
export default function ThemeToggle({ theme, onClick, label }: { theme: string; onClick: () => void; label: string }) {
  return <button onClick={onClick} aria-label={label} className="w-8 h-8 grid place-items-center text-fg2 hover:text-accent transition-colors">
    {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}</button>
}
