import { useState } from 'react'
import type { FormEvent } from 'react'

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')

    const form = e.currentTarget
    const data = new FormData(form)
    data.append('form-name', 'contact')

    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data as any).toString(),
      })
      if (res.ok) {
        setStatus('sent')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      {/* Hidden form for Netlify build detection */}
      <form name="contact" data-netlify="true" style={{ display: 'none' }}>
        <input type="text" name="name" />
        <input type="email" name="email" />
        <textarea name="message"></textarea>
      </form>

      <form name="contact" method="POST" data-netlify="true" className="contact-form" onSubmit={handleSubmit}>
        <input type="hidden" name="form-name" value="contact" />
        <div className="contact-field">
          <input type="text" name="name" placeholder="Your Name" required />
        </div>
        <div className="contact-field">
          <input type="email" name="email" placeholder="Your Email" required />
        </div>
        <div className="contact-field">
          <textarea name="message" placeholder="Your Message" required rows={5}></textarea>
        </div>
        <button type="submit" className="contact-submit" disabled={status === 'sending'}>
          {status === 'sending' ? '\u23F3 Sending...' : '\u25B6 Send Message'}
        </button>
        {status === 'sent' && (
          <p style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
            Message sent successfully!
          </p>
        )}
        {status === 'error' && (
          <p style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
            Something went wrong. Please try again.
          </p>
        )}
      </form>
    </>
  )
}
