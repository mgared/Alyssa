import { Link, useParams } from 'react-router-dom'
import Photo from '../components/Photo'
import NotFound from './NotFound'
import { projects } from '../data/site'

export default function Project() {
  const { slug } = useParams()
  const index = projects.findIndex((p) => p.slug === slug)
  if (index === -1) return <NotFound />

  const project = projects[index]
  const next = projects[(index + 1) % projects.length]

  return (
    <article className="section page project">
      <header className="project__header">
        <p className="eyebrow">{project.location} · {project.scope}</p>
        <h1 className="page__title">{project.name}</h1>
        <p className="project__description">{project.description}</p>
      </header>

      <div className="project__gallery">
        {project.images.map((src, i) => (
          <Photo
            key={src}
            src={src}
            alt={`${project.name} — image ${i + 1}`}
            toneIndex={index + i}
            className={i % 3 === 0 ? 'is-wide' : ''}
          />
        ))}
      </div>

      <nav className="project__nav">
        <Link to="/portfolio" className="text-link">All Projects</Link>
        <Link to={`/portfolio/${next.slug}`} className="text-link">Next: {next.name}</Link>
      </nav>
    </article>
  )
}
