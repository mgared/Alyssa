import { useState } from 'react'
import { thumbnailOf } from '../lib/api'

// Shows an image, or a soft tonal placeholder if the file is missing.
// This lets the site look finished before real photography is added.
// With `thumb`, loads the photo's small copy first and falls back to the full one.
const tones = ['#c8bdb1', '#a8998b', '#968473', '#d9cfc4', '#7d6d60', '#b9ab9d']

export default function Photo({ src, alt = '', className = '', toneIndex = 0, label, thumb = false }) {
  const [failed, setFailed] = useState([])
  const url = [thumb && thumbnailOf(src), src].find((u) => u && !failed.includes(u))

  if (!url) {
    const a = tones[toneIndex % tones.length]
    const b = tones[(toneIndex + 3) % tones.length]
    return (
      <div
        className={`photo photo--placeholder ${className}`}
        style={{ background: `linear-gradient(160deg, ${a} 0%, ${b} 100%)` }}
        role="img"
        aria-label={alt}
      >
        {label && <span className="photo__label">{label}</span>}
      </div>
    )
  }

  return (
    <img
      src={url}
      alt={alt}
      className={`photo ${className}`}
      loading="lazy"
      onError={() => setFailed((f) => [...f, url])}
    />
  )
}
