import { useEffect, useState } from 'react'
import Photo from '../components/Photo'
import { heroImages } from '../data/site'

export default function Home() {
  const [active, setActive] = useState(0)
  const count = heroImages.length
  const go = (step) => setActive((i) => (i + step + count) % count)

  useEffect(() => {
    if (count < 2) return
    const id = setInterval(() => setActive((i) => (i + 1) % count), 6000)
    return () => clearInterval(id)
  }, [active, count])

  return (
    <section className="hero" aria-label="Featured work" aria-roledescription="carousel">
      {heroImages.map((src, i) => (
        <div key={src} className={`hero__slide ${i === active ? 'is-active' : ''}`} aria-hidden={i !== active}>
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
