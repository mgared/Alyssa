import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Lightbox from '../components/Lightbox'
import Photo from '../components/Photo'
import NotFound from './NotFound'
import { useContent } from '../lib/content'

export default function Project() {
  const { slug } = useParams()
  const { projects, loading } = useContent()
  const [viewing, setViewing] = useState(null) // index of the photo open full screen
  if (loading) return null

  const index = projects.findIndex((p) => p.slug === slug)
  if (index === -1) return <NotFound />

  const project = projects[index]
  const next = projects[(index + 1) % projects.length]
  // The cover leads the gallery unless it is already one of the gallery photos.
  const photos =
    project.cover && !project.images.includes(project.cover) ? [project.cover, ...project.images] : project.images

  return (
    <article className="section page project">
      <header className="project__header">
        <p className="eyebrow">{project.location} · {project.scope}</p>
        <h1 className="page__title">{project.name}</h1>
        <p className="project__description">{project.description}</p>
      </header>

      <div className="project__gallery">
        {photos.map((src, i) => (
          <button
            key={`${i}-${src}`}
            type="button"
            className={`project__photo ${i % 3 === 0 ? 'is-wide' : ''}`}
            onClick={() => setViewing(i)}
            aria-label={`View image ${i + 1} full screen`}
          >
            <Photo src={src} alt={`${project.name} — image ${i + 1}`} toneIndex={index + i} />
          </button>
        ))}
      </div>

      {viewing !== null && (
        <Lightbox photos={photos} index={viewing} onIndex={setViewing} onClose={() => setViewing(null)} title={project.name} />
      )}

      <nav className="project__nav">
        <Link to="/portfolio" className="text-link">All Projects</Link>
        {next !== project && (
          <Link to={`/portfolio/${next.slug}`} className="text-link">Next: {next.name}</Link>
        )}
      </nav>
    </article>
  )
}
