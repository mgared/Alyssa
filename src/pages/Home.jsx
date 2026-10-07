import { useEffect, useState } from 'react'
import Photo from '../components/Photo'
import { useContent } from '../lib/content'

export default function Home() {
  const images = useContent().content.hero.images
  // With no photos yet, show one placeholder slide.
  const heroImages = images.length ? images : ['']
  const [active, setActive] = useState(0)
  const count = heroImages.length
  const current = active % count
  const go = (step) => setActive((i) => (i + step + count) % count)

  useEffect(() => {
    if (count < 2) return
    const id = setInterval(() => setActive((i) => (i + 1) % count), 6000)
    return () => clearInterval(id)
  }, [active, count])

  return (
    <section className="hero" aria-label="Featured work" aria-roledescription="carousel">
      {heroImages.map((src, i) => (
        <div key={`${i}-${src}`} className={`hero__slide ${i === current ? 'is-active' : ''}`} aria-hidden={i !== current}>
          <Photo src={src} alt="" toneIndex={i + 1} />
        </div>
      ))}
      {count > 1 && (
        <>
          <button className="hero__arrow hero__arrow--prev" onClick={() => go(-1)} aria-label="Previous image">‹</button>
          <button className="hero__arrow hero__arrow--next" onClick={() => go(1)} aria-label="Next image">›</button>
        </>
      )}
    </section>
  )
}
