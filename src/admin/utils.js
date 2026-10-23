import { useRef, useState } from 'react'
import { api } from '../lib/api'
import { useContent } from '../lib/content'

// Every URL string inside a value, so photos dropped from it can be cleaned up.
export const collectUrls = (value) =>
  JSON.stringify(value ?? null).match(/https?:\/\/[^"]+/g) ?? []

// Remembers every photo that appears in a draft while it is edited, so the
// ones that end up unused (removed, replaced, or uploaded and then cancelled)
// can be deleted from storage. Call track() with each new draft.
export function useDraftPhotos(initial) {
  const seen = useRef(null)
  seen.current ??= new Set(collectUrls(initial))

  return {
    track: (value) => collectUrls(value).forEach((u) => seen.current.add(u)),
    // Photos seen in this edit that `kept` no longer uses.
    unused: (kept) => {
      const keep = new Set(collectUrls(kept))
      return [...seen.current].filter((u) => !keep.has(u))
    },
    reset: (value) => (seen.current = new Set(collectUrls(value))),
  }
}

// Moves the item at `from` to position `to`.
export const moveItem = (list, from, to) => {
  const next = [...list]
  next.splice(to, 0, next.splice(from, 1)[0])
  return next
}

// Lets a field's onChange take either a value or an updater function,
// which async uploads need so they never overwrite newer edits.
export const resolve = (next, current) => (typeof next === 'function' ? next(current) : next)

// Draft/save state for one block of site content (hero, about, contact).
export function useContentEditor(key, validate) {
  const { content, reload } = useContent()
  const [saved, setSaved] = useState(content[key])
  const [draft, setDraft] = useState(content[key])
  const [state, setState] = useState({ busy: false, message: '', error: '' })
  const photos = useDraftPhotos(content[key])

  const update = (patch) =>
    setDraft((d) => {
      const next = { ...d, ...resolve(patch, d) }
      photos.track(next)
      return next
    })
  const dirty = JSON.stringify(draft) !== JSON.stringify(saved)

  const save = async () => {
    const problem = validate?.(draft)
    if (problem) return setState({ busy: false, message: '', error: problem })
    setState({ busy: true, message: '', error: '' })
    try {
      await api.saveContent(key, draft)
      await api.removeImages(photos.unused(draft))
      photos.reset(draft)
      setSaved(draft)
      setState({ busy: false, message: 'Saved. The live site is updated.', error: '' })
      reload()
    } catch (err) {
      setState({ busy: false, message: '', error: err.message })
    }
  }

  return { draft, update, dirty, save, ...state }
}

export const slugify = (text) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const emptyProject = {
  id: null,
  slug: '',
  name: '',
  location: '',
  scope: '',
  description: '',
  cover: '',
  images: [],
  published: true,
}
