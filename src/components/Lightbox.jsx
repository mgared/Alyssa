import { useEffect, useRef } from 'react'

// Full-screen photo viewer. Arrow keys or a swipe move between photos;
// Escape, the close button or a click beside the photo closes it.
// A modal <dialog> keeps keyboard focus inside while it is open.
export default function Lightbox({ photos, index, onIndex, onClose, title }) {
  const dialog = useRef(null)
  const touchX = useRef(null)
  const count = photos.length
  const go = (step) => onIndex((index + step + count) % count)
  const close = () => dialog.current.close()

  useEffect(() => {
    // Guarded because development mode runs effects twice.
    if (!dialog.current.open) dialog.current.showModal()
  }, [])

  const onKeyDown = (e) => {
    if (count < 2) return
    if (e.key === 'ArrowLeft') go(-1)
    if (e.key === 'ArrowRight') go(1)
  }

  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchX.current
    if (count > 1 && Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
  }

  return (
    <dialog
      ref={dialog}
      className="lightbox"
      aria-label={`${title} photos`}
      onClose={onClose}
      onKeyDown={onKeyDown}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={onTouchEnd}
    >
      <div className="lightbox__stage" onClick={(e) => e.target === e.currentTarget && close()}>
        <img key={photos[index]} className="lightbox__img" src={photos[index]} alt={`${title} — image ${index + 1}`} />
      </div>
      {count > 1 && (
        <>
          <p className="lightbox__count">{index + 1} / {count}</p>
          <button type="button" className="hero__arrow hero__arrow--prev" onClick={() => go(-1)} aria-label="Previous photo">‹</button>
          <button type="button" className="hero__arrow hero__arrow--next" onClick={() => go(1)} aria-label="Next photo">›</button>
        </>
      )}
      <button type="button" className="lightbox__close" onClick={close} aria-label="Close">×</button>
    </dialog>
  )
}
