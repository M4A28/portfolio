import type { ReactNode, CSSProperties } from 'react'
export const TimelineList = ({ children }: { children: ReactNode }) =>
  <ol className="relative ps-8 md:ps-10 before:content-[''] before:absolute before:top-2 before:bottom-2 before:start-[5px] before:w-px before:bg-line">{children}</ol>
export function TimelineItem({ current, i, children }: { current?: boolean; i: number; children: ReactNode }) {
  return <li className="relative pb-12 last:pb-0 reveal" style={{ '--d': `${i * 100}ms` } as CSSProperties}>
    <span aria-hidden className={`absolute top-2 -start-8 md:-start-10 w-[11px] h-[11px] rounded-full border ${current ? 'bg-accent border-accent' : 'bg-bg border-strong'}`} />
    {children}
  </li>
}
