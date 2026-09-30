import { useEffect, useState } from 'react'
import type { Lang } from '../content'
const read = (k: string) => { try { return localStorage.getItem(k) } catch { return null } }
const write = (k: string, v: string) => { try { localStorage.setItem(k, v) } catch {} }
export type Theme = 'light' | 'dark'
export function usePrefs() {
  const [lang, setLang] = useState<Lang>(() => (read('lang') as Lang) || 'ar')
  const [theme, setTheme] = useState<Theme>(() => (read('theme') as Theme) || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'))
  useEffect(() => { const h = document.documentElement; h.lang = lang; h.dir = lang === 'ar' ? 'rtl' : 'ltr'; write('lang', lang) }, [lang])
  useEffect(() => { document.documentElement.dataset.theme = theme; write('theme', theme) }, [theme])
  return { lang, theme, toggleLang: () => setLang(l => (l === 'ar' ? 'en' : 'ar')), toggleTheme: () => setTheme(t => (t === 'dark' ? 'light' : 'dark')) }
}
