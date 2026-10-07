import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import { useContent } from '../lib/content'
import ProjectEditor from './ProjectEditor'
import Photo from '../components/Photo'
import { collectUrls, emptyProject, removedUrls } from './utils'

export default function ProjectsAdmin() {
  const { reload } = useContent()
  const [projects, setProjects] = useState(null)
  const [editing, setEditing] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const refresh = async () => {
    try {
      setProjects(await api.loadAllProjects())
    } catch (err) {
      setError(err.message)
    }
    reload()
  }

  useEffect(() => {
    let alive = true
    api.loadAllProjects().then(
      (list) => alive && setProjects(list),
      (err) => alive && setError(err.message),
    )
    return () => {
      alive = false
    }
  }, [])

  const run = async (action, done) => {
    setError('')
    setMessage('')
    try {
      await action()
      setMessage(done)
      await refresh()
    } catch (err) {
      setError(err.message)
    }
  }

  const save = async (draft) => {
    const before = projects.find((p) => p.id === draft.id)
    await api.saveProject(draft, projects.length)
    if (before) await api.removeImages(removedUrls(before, draft))
    setEditing(null)
    setMessage(`Saved ${draft.name}. The live site is updated.`)
    await refresh()
  }

  const move = (i, step) => {
    const ids = projects.map((p) => p.id)
    ;[ids[i], ids[i + step]] = [ids[i + step], ids[i]]
    setProjects(ids.map((id) => projects.find((p) => p.id === id)))
    run(() => api.reorderProjects(ids), 'Order saved.')
  }

  const remove = (project) =>
    run(async () => {
      await api.deleteProject(project.id)
      await api.removeImages(collectUrls(project))
      setConfirmDelete(null)
    }, `Deleted ${project.name}.`)

  if (editing) {
    return <ProjectEditor key={editing.id ?? 'new'} project={editing} onSave={save} onCancel={() => setEditing(null)} />
  }

  return (
    <section className="adm-card">
      <div className="adm-head">
        <h2 className="adm-title">Portfolio</h2>
        <button type="button" className="adm-btn" onClick={() => setEditing({ ...emptyProject })}>New project</button>
      </div>
      <p className="adm-muted">Projects appear on the site in this order. Use the arrows to rearrange them.</p>

      {error && <p className="adm-error" role="alert">{error}</p>}
      {message && <p className="adm-ok" role="status">{message}</p>}

      {!projects ? (
        <p className="adm-muted">Loading projects…</p>
      ) : projects.length === 0 ? (
        <p className="adm-empty">No projects yet. Choose “New project” to add your first one.</p>
      ) : (
        <ul className="adm-list">
          {projects.map((p, i) => (
            <li key={p.id} className="adm-list__item">
              <div className="adm-thumb adm-thumb--small">
                <Photo src={p.cover} alt="" toneIndex={i} />
              </div>
              <div className="adm-list__info">
                <strong>{p.name}</strong>
                <span className="adm-muted">
                  {p.images.length} photo{p.images.length === 1 ? '' : 's'}
                  {' · '}
                  <span className={p.published ? 'adm-pill' : 'adm-pill adm-pill--off'}>{p.published ? 'Live' : 'Hidden'}</span>
                </span>
              </div>
              {confirmDelete === p.id ? (
                <div className="adm-row">
                  <span>Delete for good?</span>
                  <button type="button" className="adm-btn adm-btn--danger" onClick={() => remove(p)}>Delete</button>
                  <button type="button" className="adm-link" onClick={() => setConfirmDelete(null)}>Keep</button>
                </div>
              ) : (
                <div className="adm-row adm-list__tools">
                  <button type="button" className="adm-icon" onClick={() => move(i, -1)} disabled={i === 0} aria-label={`Move ${p.name} up`}>↑</button>
                  <button type="button" className="adm-icon" onClick={() => move(i, 1)} disabled={i === projects.length - 1} aria-label={`Move ${p.name} down`}>↓</button>
                  <button type="button" className="adm-btn adm-btn--ghost" onClick={() => setEditing(p)}>Edit</button>
                  <button type="button" className="adm-link" onClick={() => setConfirmDelete(p.id)}>Delete</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
