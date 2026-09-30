import { useEffect } from 'react'
import { Check, AlertCircle } from 'lucide-react'
export interface ToastState { msg: string; kind: 'ok' | 'err' }
export default function Toast({ toast, onClose }: { toast: ToastState | null; onClose: () => void }) {
  useEffect(() => { if (!toast) return; const t = setTimeout(onClose, 4500); return () => clearTimeout(t) }, [toast, onClose])
  if (!toast) return null
  const Icon = toast.kind === 'ok' ? Check : AlertCircle
  return <div role="status" aria-live="polite" className={`fixed bottom-6 start-6 z-[70] max-w-sm flex items-center gap-3 px-5 py-4 rounded-xl border bg-card text-sm font-bold ${toast.kind === 'ok' ? 'border-accent' : 'border-strong'}`}>
    <Icon size={16} className="text-accent shrink-0" aria-hidden />{toast.msg}</div>
}
