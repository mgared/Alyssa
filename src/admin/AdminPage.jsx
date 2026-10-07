import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api, isDemo } from '../lib/api'
import { Monogram } from '../components/Logo'
import Login from './Login'
import SetPassword from './SetPassword'
import Dashboard from './Dashboard'
import './admin.css'

export default function AdminPage() {
  const [session, setSession] = useState(undefined) // undefined while checking
  const [recovering, setRecovering] = useState(false)

  useEffect(() => {
    let alive = true
    api.getSession().then((s) => alive && setSession(s ?? null))
    const unsubscribe = api.onAuthChange((event, s) => {
      // Arriving from a "reset password" email signs her in for this purpose.
      if (event === 'PASSWORD_RECOVERY') setRecovering(true)
      setSession(s ?? null)
    })
    return () => {
      alive = false
      unsubscribe()
    }
  }, [])

  let body
  if (session === undefined) body = <p className="adm-muted">Loading…</p>
  else if (recovering && session) body = <SetPassword onDone={() => setRecovering(false)} />
  else if (!session) body = <Login />
  else body = <Dashboard />

  return (
    <div className="adm">
      <header className="adm-bar">
        <Link to="/" className="adm-brand">
          <Monogram height={30} />
          <span>Studio Admin</span>
        </Link>
        <div className="adm-bar__actions">
          <Link to="/" className="adm-link">View site</Link>
          {session && (
            <button type="button" className="adm-link" onClick={() => api.signOut()}>
              Sign out
            </button>
          )}
        </div>
      </header>

      {isDemo && (
        <p className="adm-demo" role="status">
          Demo mode: any email and password will sign in, and changes reset when the page reloads.
          Connect Supabase to save for real.
        </p>
      )}

      <div className="adm-body">{body}</div>
    </div>
  )
}
