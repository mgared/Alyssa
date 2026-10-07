import { useState } from 'react'
import { instagramUrl } from '../data/site'
import { useContent } from '../lib/content'

// The form opens the visitor's email app with the message pre-filled.
// To receive submissions directly instead, swap the handler for a service
// like Formspree or Netlify Forms.
export default function Contact() {
  const { contact } = useContent().content
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    const subject = `New inquiry from ${form.name}`
    const body = `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\n${form.message}`
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <section className="section page contact">
      <h1 className="page__title">Contact</h1>
      <p className="contact__lede">
        I would love to hear about your space. Share a few details and I will be in touch.
      </p>

      <div className="contact__layout">
        <form className="form" onSubmit={submit}>
          <label>
            <span>Name</span>
            <input name="name" value={form.name} onChange={update} required />
          </label>
          <label>
            <span>Email</span>
            <input name="email" type="email" value={form.email} onChange={update} required />
          </label>
          <label>
            <span>Phone</span>
            <input name="phone" type="tel" value={form.phone} onChange={update} />
          </label>
          <label>
            <span>Tell me about your project</span>
            <textarea name="message" rows="5" value={form.message} onChange={update} required />
          </label>
          <button type="submit" className="button">Send</button>
        </form>

        <aside className="contact__details">
          <p className="eyebrow">Get in touch</p>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          {contact.phone && <a href={`tel:${contact.phone.replace(/\D/g, '')}`}>{contact.phone}</a>}
          <a href={instagramUrl(contact.instagramHandle)} target="_blank" rel="noreferrer">@{contact.instagramHandle}</a>
          <span>{contact.location}</span>
        </aside>
      </div>
    </section>
  )
}
