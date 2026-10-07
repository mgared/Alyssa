import { useState } from 'react'
import { ImageListField, SingleImageField } from './ImageFields'
import SaveBar from './SaveBar'
import { resolve, slugify } from './utils'

export default function ProjectEditor({ project, onSave, onCancel }) {
  const [draft, setDraft] = useState(project)
  // New projects take their web address from the name until it's edited by hand.
  const [slugTouched, setSlugTouched] = useState(Boolean(project.id))
  const [state, setState] = useState({ busy: false, error: '' })

  const set = (name) => (next) =>
    setDraft((d) => {
      const value = resolve(next, d[name])
      const updated = { ...d, [name]: value }
      if (name === 'name' && !slugTouched) updated.slug = slugify(value)
      return updated
    })

  const save = async () => {
    if (!draft.name.trim()) return setState({ busy: false, error: 'Give the project a name.' })
    if (!draft.slug) return setState({ busy: false, error: 'Give the project a web address.' })
    setState({ busy: true, error: '' })
    try {
      await onSave({ ...draft, name: draft.name.trim() })
    } catch (err) {
      setState({ busy: false, error: err.message })
    }
  }

  const text = (name, label, props = {}) => (
    <label className="adm-field">
      <span>{label}</span>
      <input id={`project-${name}`} value={draft[name]} onChange={(e) => set(name)(e.target.value)} {...props} />
    </label>
  )

  return (
    <section className="adm-card">
      <h2 className="adm-title">{project.id ? `Edit ${project.name}` : 'New project'}</h2>

      {text('name', 'Project name', { placeholder: 'Back Bay Brownstone' })}

      <label className="adm-field">
        <span>Web address</span>
        <div className="adm-prefixed">
          <span>/portfolio/</span>
          <input
            id="project-slug"
            value={draft.slug}
            onChange={(e) => {
              setSlugTouched(true)
              set('slug')(slugify(e.target.value))
            }}
          />
        </div>
      </label>

      <div className="adm-cols">
        {text('location', 'Location', { placeholder: 'Boston, MA' })}
        {text('scope', 'Scope', { placeholder: 'Full Renovation' })}
      </div>

      <label className="adm-field">
        <span>Description</span>
        <textarea id="project-description" rows="4" value={draft.description} onChange={(e) => set('description')(e.target.value)} />
      </label>

      <SingleImageField
        label="Cover photo"
        hint="Shown in the portfolio grid, cropped to a square."
        value={draft.cover}
        folder="projects"
        onChange={set('cover')}
      />

      <ImageListField
        label="Gallery"
        hint="Shown on the project page in this order. Every third photo runs full width."
        value={draft.images}
        folder="projects"
        onChange={set('images')}
        extraAction={{ short: '★', label: 'Use as cover photo', onClick: (url) => set('cover')(url) }}
      />

      <label className="adm-check">
        <input id="project-published" type="checkbox" checked={draft.published} onChange={(e) => set('published')(e.target.checked)} />
        <span>Show this project on the website</span>
      </label>

      <SaveBar
        dirty={JSON.stringify(draft) !== JSON.stringify(project) || !project.id}
        busy={state.busy}
        error={state.error}
        onSave={save}
        onCancel={onCancel}
        saveLabel={project.id ? 'Save project' : 'Add project'}
      />
    </section>
  )
}
