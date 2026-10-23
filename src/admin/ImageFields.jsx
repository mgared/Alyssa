import { useRef, useState } from 'react'
import { api } from '../lib/api'
import { prepareImage } from '../lib/images'
import Photo from '../components/Photo'
import { useDragSort, useFileDrop } from './dragDrop'
import { moveItem } from './utils'

// Resizes and uploads the chosen files, returning their public URLs.
function useUploader(folder) {
  const [uploading, setUploading] = useState(0)
  const [error, setError] = useState('')

  const upload = async (fileList) => {
    const files = [...fileList]
    setError('')
    setUploading(files.length)
    const urls = []
    for (const file of files) {
      try {
        urls.push(await api.uploadImage(await prepareImage(file), folder))
      } catch (err) {
        setError(err.message)
      }
      setUploading((n) => n - 1)
    }
    return urls
  }

  return { upload, uploading, error }
}

function UploadButton({ label, multiple, onFiles, disabled }) {
  const input = useRef(null)
  return (
    <>
      <button type="button" className="adm-btn adm-btn--ghost" onClick={() => input.current.click()} disabled={disabled}>
        {label}
      </button>
      <input
        ref={input}
        type="file"
        accept="image/*"
        multiple={multiple}
        hidden
        onChange={(e) => {
          if (e.target.files.length) onFiles(e.target.files)
          e.target.value = ''
        }}
      />
    </>
  )
}

export function SingleImageField({ label, hint, value, onChange, folder }) {
  const { upload, uploading, error } = useUploader(folder)
  const onFiles = async (files) => {
    const [url] = await upload([files[0]])
    if (url) onChange(url)
  }
  const { dropping, dropProps } = useFileDrop(onFiles, uploading > 0)

  return (
    <div className={`adm-field adm-drop ${dropping ? 'is-dropping' : ''}`} {...dropProps}>
      <span>{label}</span>
      {hint && <small className="adm-muted">{hint}</small>}
      <div className="adm-single">
        <div className="adm-thumb adm-thumb--large">
          {value ? <Photo src={value} alt="" thumb /> : <span className="adm-thumb__empty">Drop a photo here</span>}
        </div>
        <div className="adm-row">
          <UploadButton
            label={uploading ? 'Uploading…' : value ? 'Replace photo' : 'Upload photo'}
            disabled={uploading > 0}
            onFiles={onFiles}
          />
          {value && (
            <button type="button" className="adm-link" onClick={() => onChange('')}>Remove</button>
          )}
        </div>
      </div>
      {error && <p className="adm-error" role="alert">{error}</p>}
    </div>
  )
}

export function ImageListField({ label, hint, value, onChange, folder, extraAction }) {
  const { upload, uploading, error } = useUploader(folder)
  const move = (from, to) => onChange((current) => moveItem(current, from, to))
  const { dragProps, dragClass } = useDragSort(move)

  const onFiles = async (files) => {
    const urls = await upload(files)
    if (urls.length) onChange((current) => [...current, ...urls])
  }
  const { dropping, dropProps } = useFileDrop(onFiles, uploading > 0)

  return (
    <div className={`adm-field adm-drop ${dropping ? 'is-dropping' : ''}`} {...dropProps}>
      <span>{label}</span>
      {hint && <small className="adm-muted">{hint}</small>}
      <ul className="adm-gallery">
        {value.map((url, i) => (
          <li key={`${i}-${url}`} className={`adm-gallery__item ${dragClass(i)}`} {...dragProps(i)}>
            <div className="adm-thumb">
              <Photo src={url} alt={`Photo ${i + 1}`} toneIndex={i} thumb />
            </div>
            <div className="adm-gallery__tools">
              <button type="button" onClick={() => move(i, i - 1)} disabled={i === 0} aria-label={`Move photo ${i + 1} earlier`}>←</button>
              <button type="button" onClick={() => move(i, i + 1)} disabled={i === value.length - 1} aria-label={`Move photo ${i + 1} later`}>→</button>
              {extraAction && (
                <button type="button" onClick={() => extraAction.onClick(url)} title={extraAction.label}>{extraAction.short}</button>
              )}
              <button type="button" onClick={() => onChange((current) => current.filter((_, j) => j !== i))} aria-label={`Remove photo ${i + 1}`}>✕</button>
            </div>
          </li>
        ))}
        {Array.from({ length: uploading }, (_, i) => (
          <li key={`uploading-${i}`} className="adm-gallery__item">
            <div className="adm-thumb adm-thumb--loading">Uploading…</div>
          </li>
        ))}
      </ul>
      <div className="adm-row">
        <UploadButton label="Add photos" multiple disabled={uploading > 0} onFiles={onFiles} />
        <small className="adm-muted">or drag photos here. Drag a photo to move it.</small>
      </div>
      {error && <p className="adm-error" role="alert">{error}</p>}
    </div>
  )
}
