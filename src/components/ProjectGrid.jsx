import { Link } from 'react-router-dom'
import Photo from './Photo'

export default function ProjectGrid({ projects }) {
  return (
    <div className="grid">
      {projects.map((p, i) => (
        <Link key={p.slug} to={`/portfolio/${p.slug}`} className="card">
          <div className="card__media">
            <Photo src={p.cover} alt={p.name} toneIndex={i} />
          </div>
          <h3 className="card__title">{p.name}</h3>
          <p className="card__meta">{p.location}</p>
        </Link>
      ))}
    </div>
  )
}
