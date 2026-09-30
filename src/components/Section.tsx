import type { ReactNode } from 'react'
export default function Section({ id, num, title, subtitle, aside, children }: { id: string; num: string; title: string; subtitle: string; aside?: ReactNode; children: ReactNode }) {
  return <section id={id} className="py-20 md:py-28 border-t border-line">
    <div className="max-w-grid mx-auto px-6">
      <header className="mb-12 flex flex-wrap items-end justify-between gap-6 reveal">
        <div>
          <p className="micro text-fg2">{num} — {title}</p>
          <div className="w-10 h-0.5 rounded-full bg-accent mt-3" aria-hidden />
          <h2 className="text-sm text-muted mt-3">{subtitle}</h2>
        </div>
        {aside}
      </header>
      {children}
    </div>
  </section>
}
