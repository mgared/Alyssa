import { useState } from 'react'

// Shows an image, or a soft tonal placeholder if the file is missing.
// This lets the site look finished before real photography is added.
const tones = ['#c8bdb1', '#a8998b', '#968473', '#d9cfc4', '#7d6d60', '#b9ab9d']

export default function Photo({ src, alt = '', className = '', toneIndex = 0, label }) {
  const [failed, setFailed] = useState(!src)

  if (failed) {
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
      src={src}
      alt={alt}
      className={`photo ${className}`}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}
