import { ImageListField, SingleImageField } from './ImageFields'
import SaveBar from './SaveBar'
import { useContentEditor } from './utils'

export function SlideshowEditor() {
  const { draft, update, ...bar } = useContentEditor('hero')
  return (
    <section className="adm-card">
      <h2 className="adm-title">Home slideshow</h2>
      <ImageListField
        label="Slides"
        hint="Wide, landscape photos look best. Slides play in this order."
        value={draft.images}
        folder="hero"
        onChange={(images) => update((d) => ({ images: typeof images === 'function' ? images(d.images) : images }))}
      />
      <SaveBar {...bar} onSave={bar.save} />
    </section>
  )
}

export function AboutEditor() {
  const { draft, update, ...bar } = useContentEditor('about', (d) =>
    d.paragraphs.length ? '' : 'Add a few sentences about yourself before saving.',
  )
  return (
    <section className="adm-card">
      <h2 className="adm-title">About page</h2>
      <SingleImageField
        label="Portrait"
        hint="A vertical photo works best."
        value={draft.photo}
        folder="about"
        onChange={(photo) => update({ photo })}
      />
      <label className="adm-field">
        <span>Bio</span>
        <small className="adm-muted">Leave a blank line between paragraphs.</small>
        <textarea
          id="about-bio"
          rows="12"
          value={draft.paragraphs.join('\n\n')}
          onChange={(e) => update({ paragraphs: e.target.value.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean) })}
        />
      </label>
      <SaveBar {...bar} onSave={bar.save} />
    </section>
  )
}

const cleanHandle = (value) =>
  value.trim().replace(/^https?:\/\/(www\.)?instagram\.com\//i, '').replace(/^@/, '').replace(/\/.*$/, '')

export function ContactEditor() {
  const { draft, update, ...bar } = useContentEditor('contact', (d) =>
    /^\S+@\S+\.\S+$/.test(d.email) ? '' : 'Enter a valid email address.',
  )
  const field = (name, label, props = {}) => (
    <label className="adm-field">
      <span>{label}</span>
      <input id={`contact-${name}`} value={draft[name]} onChange={(e) => update({ [name]: e.target.value })} {...props} />
    </label>
  )
  return (
    <section className="adm-card">
      <h2 className="adm-title">Contact details</h2>
      <p className="adm-muted">Shown on the Contact page and used by the footer icons.</p>
      {field('email', 'Email', { type: 'email' })}
      {field('phone', 'Phone', { type: 'tel' })}
      {field('location', 'Location')}
      <label className="adm-field">
        <span>Instagram handle</span>
        <input
          id="contact-instagram"
          value={draft.instagramHandle}
          onChange={(e) => update({ instagramHandle: e.target.value })}
          onBlur={(e) => update({ instagramHandle: cleanHandle(e.target.value) })}
          placeholder="designbylabillois"
        />
      </label>
      <SaveBar {...bar} onSave={bar.save} />
    </section>
  )
}
