// Data layer for the site and the /admin page.
//
// When VITE_SUPABASE_URL and VITE_SUPABASE_KEY are set, content, photos and
// the admin login live in Supabase (see docs/ADMIN_SETUP.md). Without them the
// site runs in demo mode: it shows the defaults from src/data/site.js and the
// admin page edits an in-memory copy that resets on reload.

import { createClient } from '@supabase/supabase-js'
import { defaultContent, defaultProjects } from '../data/site'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_KEY

const supabase = url && key ? createClient(url, key) : null

export const isDemo = !supabase

const BUCKET = 'portfolio'
const CONTENT_KEYS = Object.keys(defaultContent)

const withDefaults = (rows) => {
  const content = structuredClone(defaultContent)
  for (const { key, value } of rows) {
    if (CONTENT_KEYS.includes(key)) content[key] = { ...content[key], ...value }
  }
  return content
}

const fromRow = (r) => ({
  id: r.id,
  slug: r.slug,
  name: r.name,
  location: r.location,
  scope: r.scope,
  description: r.description,
  cover: r.cover_url,
  images: r.images ?? [],
  published: r.published,
  sortOrder: r.sort_order,
})

const toRow = (p) => ({
  slug: p.slug,
  name: p.name,
  location: p.location,
  scope: p.scope,
  description: p.description,
  cover_url: p.cover || null,
  images: p.images,
  published: p.published,
})

const friendlyError = (error) => {
  if (error?.code === '23505') return 'Another project already uses this web address. Change the name or the address.'
  return error?.message || 'Something went wrong. Please try again.'
}

const check = ({ data, error }) => {
  if (error) throw new Error(friendlyError(error))
  return data
}

// ---------- Supabase ----------

const storagePath = (publicUrl) => {
  const marker = `/storage/v1/object/public/${BUCKET}/`
  const i = publicUrl?.indexOf(marker) ?? -1
  return i === -1 ? null : decodeURIComponent(publicUrl.slice(i + marker.length))
}

const supabaseApi = {
  async loadSite() {
    const [projects, content] = await Promise.all([
      supabase.from('projects').select('*').eq('published', true).order('sort_order'),
      supabase.from('site_content').select('key, value'),
    ])
    return { projects: check(projects).map(fromRow), content: withDefaults(check(content)) }
  },

  async loadAllProjects() {
    return check(await supabase.from('projects').select('*').order('sort_order')).map(fromRow)
  },

  async saveProject(project, sortOrder) {
    const row = toRow(project)
    if (project.id) {
      return fromRow(check(await supabase.from('projects').update(row).eq('id', project.id).select().single()))
    }
    return fromRow(
      check(await supabase.from('projects').insert({ ...row, sort_order: sortOrder }).select().single()),
    )
  },

  async deleteProject(id) {
    check(await supabase.from('projects').delete().eq('id', id))
  },

  async reorderProjects(ids) {
    const results = await Promise.all(
      ids.map((id, i) => supabase.from('projects').update({ sort_order: i }).eq('id', id)),
    )
    results.forEach(check)
  },

  async saveContent(key, value) {
    check(await supabase.from('site_content').upsert({ key, value }))
  },

  async uploadImage(blob, folder) {
    const path = `${folder}/${crypto.randomUUID()}.jpg`
    check(await supabase.storage.from(BUCKET).upload(path, blob, { contentType: blob.type || 'image/jpeg' }))
    return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl
  },

  // Best effort: a leftover file costs a little storage, never a broken page.
  async removeImages(urls) {
    const paths = urls.map(storagePath).filter(Boolean)
    if (paths.length) await supabase.storage.from(BUCKET).remove(paths)
  },

  async getSession() {
    return (await supabase.auth.getSession()).data.session
  },

  onAuthChange(callback) {
    const { data } = supabase.auth.onAuthStateChange((event, session) => callback(event, session))
    return () => data.subscription.unsubscribe()
  },

  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw new Error('That email and password do not match. Please try again.')
    return data.session
  },

  async signOut() {
    await supabase.auth.signOut()
  },

  async sendPasswordReset(email) {
    check(await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/admin` }))
  },

  async updatePassword(password) {
    check(await supabase.auth.updateUser({ password }))
  },
}

// ---------- Demo (in memory) ----------

const demo = {
  projects: structuredClone(defaultProjects),
  content: structuredClone(defaultContent),
  session: null,
  listeners: new Set(),
}

const setDemoSession = (session) => {
  demo.session = session
  demo.listeners.forEach((cb) => cb(session ? 'SIGNED_IN' : 'SIGNED_OUT', session))
}

const demoApi = {
  async loadSite() {
    return {
      projects: structuredClone(demo.projects.filter((p) => p.published)),
      content: structuredClone(demo.content),
    }
  },

  async loadAllProjects() {
    return structuredClone(demo.projects)
  },

  async saveProject(project) {
    const taken = demo.projects.some((p) => p.slug === project.slug && p.id !== project.id)
    if (taken) throw new Error(friendlyError({ code: '23505' }))
    const saved = { ...structuredClone(project), id: project.id || crypto.randomUUID() }
    const i = demo.projects.findIndex((p) => p.id === saved.id)
    if (i === -1) demo.projects.push(saved)
    else demo.projects[i] = saved
    return structuredClone(saved)
  },

  async deleteProject(id) {
    demo.projects = demo.projects.filter((p) => p.id !== id)
  },

  async reorderProjects(ids) {
    demo.projects = ids.map((id) => demo.projects.find((p) => p.id === id)).filter(Boolean)
  },

  async saveContent(key, value) {
    demo.content[key] = structuredClone(value)
  },

  async uploadImage(blob) {
    return URL.createObjectURL(blob)
  },

  async removeImages() {},

  async getSession() {
    return demo.session
  },

  onAuthChange(callback) {
    demo.listeners.add(callback)
    return () => demo.listeners.delete(callback)
  },

  async signIn(email) {
    const session = { user: { email: email || 'demo@designbylabillois.com' } }
    setDemoSession(session)
    return session
  },

  async signOut() {
    setDemoSession(null)
  },

  async sendPasswordReset() {},

  async updatePassword() {},
}

export const api = supabase ? supabaseApi : demoApi
