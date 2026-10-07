import { Link } from 'react-router-dom'
import Photo from '../components/Photo'
import { site } from '../data/site'

export default function About() {
  return (
    <section className="section page about">
      <div className="about__media">
        <Photo src="/images/alyssa.jpg" alt={site.designer} toneIndex={2} />
      </div>
      <div className="about__body">
        <p className="eyebrow">{site.title}</p>
        <h1 className="page__title page__title--left">{site.designer}</h1>
        <p>
          Design by Labillois is a Boston-based interior design studio led by Alyssa Labillois.
          The studio creates modern, livable spaces grounded in a warm, neutral palette —
          taupes, creams, and rich browns layered with natural materials and texture.
        </p>
        <p>
          Every project begins with listening. Alyssa believes a home should feel calm,
          personal, and effortless to live in, and she balances clean modern lines with
          softness and warmth so each room feels both elevated and welcoming.
        </p>
        <p>
          From full renovations to furnishing and styling, the studio guides clients through
          every detail with care — from the first concept to the final pillow.
        </p>
        <Link to="/contact" className="button">Work With Me</Link>
      </div>
    </section>
  )
}
