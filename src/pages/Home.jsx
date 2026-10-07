import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Photo from '../components/Photo'
import ProjectGrid from '../components/ProjectGrid'
import { heroImages, projects, site } from '../data/site'

export default function Home() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (heroImages.length < 2) return
    const id = setInterval(() => setActive((i) => (i + 1) % heroImages.length), 5500)
    return () => clearInterval(id)
  }, [])

  return (
    <>
      <section className="hero" aria-label="Featured work">
        {heroImages.map((src, i) => (
          <div key={src} className={`hero__slide ${i === active ? 'is-active' : ''}`}>
            <Photo src={src} alt="" toneIndex={i + 1} />
          </div>
        ))}
      </section>

      <section className="intro">
        <p className="eyebrow">{site.title} · {site.location}</p>
        <h1 className="intro__statement">{site.tagline}</h1>
        <Link to="/about" className="text-link">About the studio</Link>
      </section>

      <section className="section">
        <h2 className="section__title">Selected Work</h2>
        <ProjectGrid projects={projects.slice(0, 3)} />
        <div className="center">
          <Link to="/portfolio" className="button">View Portfolio</Link>
        </div>
      </section>
    </>
  )
}
