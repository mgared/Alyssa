import { useState } from 'react'
import { useContent } from '../lib/content'
import ProjectsAdmin from './ProjectsAdmin'
import { AboutEditor, ContactEditor, SlideshowEditor } from './ContentEditors'

const tabs = [
  { id: 'portfolio', label: 'Portfolio', Panel: ProjectsAdmin },
  { id: 'slideshow', label: 'Home slideshow', Panel: SlideshowEditor },
  { id: 'about', label: 'About', Panel: AboutEditor },
  { id: 'contact', label: 'Contact', Panel: ContactEditor },
]

export default function Dashboard() {
  const { loading } = useContent()
  const [tab, setTab] = useState('portfolio')

  if (loading) return <p className="adm-muted">Loading…</p>

  return (
    <>
      <nav className="adm-tabs" role="tablist">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            className={tab === t.id ? 'is-active' : ''}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </nav>
      {/* Panels stay mounted so unsaved edits survive switching tabs. */}
      {tabs.map(({ id, Panel }) => (
        <div key={id} role="tabpanel" hidden={tab !== id}>
          <Panel />
        </div>
      ))}
    </>
  )
}
