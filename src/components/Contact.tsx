
import { useState, useCallback, type FormEvent } from 'react'

import { Mail, Phone } from 'lucide-react'

import { FaWhatsapp, FaLinkedinIn, FaGithub } from 'react-icons/fa6'

import { content, more, type Lang } from '../content'

import Section from './Section'

import Toast, { type ToastState } from './Toast'

const empty = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

type Key = keyof typeof empty

const field =
  'w-full bg-card rounded-xl border border-strong px-4 py-3 text-sm placeholder:text-muted focus:border-accent transition-colors aria-[invalid=true]:border-accent'

export default function Contact({ lang }: { lang: Lang }) {
  const c = more[lang].contact
  const h = more[lang].head.contact
  const hero = content[lang].hero

  const [f, setF] = useState(empty)
  const [bad, setBad] = useState<Key[]>([])
  const [busy, setBusy] = useState(false)
  const [toast, setToast] = useState<ToastState | null>(null)

  const close = useCallback(() => setToast(null), [])

  const submit = async (e: FormEvent) => {
    e.preventDefault()

    const name = f.name.trim()
    const email = f.email.trim()
    const subject = f.subject.trim()
    const message = f.message.trim()

    /*
     * نفس طريقة الموقع القديم:
     * فقط التأكد من أن جميع الحقول ممتلئة.
     */
    if (!name || !email || !subject || !message) {
      const invalid: Key[] = []

      if (!name) invalid.push('name')
      if (!email) invalid.push('email')
      if (!subject) invalid.push('subject')
      if (!message) invalid.push('message')

      setBad(invalid)

      setToast({
        msg: c.error,
        kind: 'err',
      })

      return
    }

    setBad([])
    setBusy(true)

    try {
      /*
       * نفس FormSubmit المستخدم في الموقع القديم بالضبط.
       */
      const response = await fetch(
        'https://formsubmit.co/ajax/mohammed.mosa.eg@gmail.com',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            subject,
            message,
          }),
        }
      )

      /*
       * الموقع القديم كان يعتبر وصول الاستجابة نجاحًا.
       * لا نضيف validation إضافي على response.
       */
      await response.json()

      setF(empty)

      setToast({
        msg: c.success,
        kind: 'ok',
      })
    } catch {
      setToast({
        msg:
          lang === 'ar'
            ? 'حدث خطأ أثناء الإرسال.'
            : 'Error sending message.',
        kind: 'err',
      })
    } finally {
      setBusy(false)
    }
  }

  const rows = [
    [Mail, c.details.email, hero.email, `mailto:${hero.email}`],
    [
      Phone,
      c.details.phone,
      hero.phone,
      `tel:${hero.phone.replace(/\s/g, '')}`,
    ],
    [FaWhatsapp, c.details.whatsapp, c.whatsappText, hero.whatsapp],
    [FaLinkedinIn, c.details.linkedin, c.handles.linkedin, hero.linkedin],
    [FaGithub, c.details.github, c.handles.github, hero.github],
  ] as const

  const keys: Key[] = ['name', 'email', 'subject', 'message']

  return (
    <Section
      id="contact"
      num="09"
      title={h.title}
      subtitle={h.subtitle}
    >
      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <p className="text-sm text-muted mb-6 reveal">
            {c.intro}
          </p>

          <ul className="border-t border-line">
            {rows.map(([I, label, value, href]) => (
              <li
                key={label}
                className="border-b border-line reveal"
              >
                <a
                  href={href}
                  target={
                    href.startsWith('http') ? '_blank' : undefined
                  }
                  rel="noreferrer"
                  className="group flex items-center gap-4 py-5"
                >
                  <I
                    size={18}
                    className="text-accent shrink-0"
                    aria-hidden
                  />

                  <span className="min-w-0">
                    <span className="micro block text-muted">
                      {label}
                    </span>

                    <span
                      className="block font-bold tracking-tight text-lg md:text-xl group-hover:text-accent transition-colors break-words"
                      dir="auto"
                    >
                      {value}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <form
          onSubmit={submit}
          noValidate
          className="grid gap-5 content-start reveal"
        >
          {keys.map((k) => (
            <div key={k}>
              <label
                htmlFor={`f-${k}`}
                className="micro block text-fg2 mb-2"
              >
                {c.labels[k]}
              </label>

              {k === 'message' ? (
                <textarea
                  id="f-message"
                  rows={6}
                  value={f.message}
                  placeholder={c.placeholders.message}
                  aria-invalid={bad.includes(k)}
                  onChange={(e) =>
                    setF({
                      ...f,
                      message: e.target.value,
                    })
                  }
                  className={field}
                />
              ) : (
                <input
                  id={`f-${k}`}
                  type="text"
                  dir={k === 'email' ? 'ltr' : undefined}
                  value={f[k]}
                  placeholder={c.placeholders[k]}
                  aria-invalid={bad.includes(k)}
                  onChange={(e) =>
                    setF({
                      ...f,
                      [k]: e.target.value,
                    })
                  }
                  className={field}
                />
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={busy}
            className="micro h-12 px-8 rounded-xl bg-accent text-white hover:opacity-90 disabled:opacity-60 transition-opacity justify-self-start"
          >
            {busy ? c.sending : c.send}
          </button>
        </form>
      </div>

      <Toast toast={toast} onClose={close} />
    </Section>
  )
}
