import { Link } from 'react-router-dom'
import Photo from '../components/Photo'
import { site } from '../data/site'
import { useContent } from '../lib/content'

export default function About() {
  const { about } = useContent().content
  return (
    <section className="section page about">
      <div className="about__media">
        <Photo src={about.photo} alt={site.designer} toneIndex={2} />
      </div>
      <div className="about__body">
        <p className="eyebrow">{site.title}</p>
        <h1 className="page__title page__title--left">{site.designer}</h1>
        {about.paragraphs.map((text, i) => (
          <p key={i}>{text}</p>
        ))}
        <Link to="/contact" className="button">Work With Me</Link>
      </div>
    </section>
  )
}
