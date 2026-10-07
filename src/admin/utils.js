import { useState } from 'react'
import { api } from '../lib/api'
import { useContent } from '../lib/content'

// Every URL string inside a value, so photos dropped from it can be cleaned up.
export const collectUrls = (value) =>
  JSON.stringify(value ?? null).match(/https?:\/\/[^"]+/g) ?? []

export const removedUrls = (before, after) => {
  const kept = new Set(collectUrls(after))
  return collectUrls(before).filter((u) => !kept.has(u))
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

  const update = (patch) => setDraft((d) => ({ ...d, ...resolve(patch, d) }))
  const dirty = JSON.stringify(draft) !== JSON.stringify(saved)

  const save = async () => {
    const problem = validate?.(draft)
    if (problem) return setState({ busy: false, message: '', error: problem })
    setState({ busy: true, message: '', error: '' })
    try {
      await api.saveContent(key, draft)
      await api.removeImages(removedUrls(saved, draft))
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
