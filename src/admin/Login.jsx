import { useState } from 'react'
import { api } from '../lib/api'

export default function Login() {
  const [mode, setMode] = useState('signin') // 'signin' | 'reset' | 'sent'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      if (mode === 'signin') await api.signIn(email.trim(), password)
      else {
        await api.sendPasswordReset(email.trim())
        setMode('sent')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  if (mode === 'sent') {
    return (
      <div className="adm-card adm-auth">
        <h1 className="adm-title">Check your email</h1>
        <p>If {email} has an account, a link to choose a new password is on its way.</p>
        <button type="button" className="adm-link" onClick={() => setMode('signin')}>Back to sign in</button>
      </div>
    )
  }

  return (
    <form className="adm-card adm-auth" onSubmit={submit}>
      <h1 className="adm-title">{mode === 'signin' ? 'Sign in' : 'Reset password'}</h1>

      <label className="adm-field">
        <span>Email</span>
        <input id="admin-email" type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>

      {mode === 'signin' && (
        <label className="adm-field">
          <span>Password</span>
          <input id="admin-password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
      )}

      {error && <p className="adm-error" role="alert">{error}</p>}

      <button type="submit" className="adm-btn" disabled={busy}>
        {busy ? 'One moment…' : mode === 'signin' ? 'Sign in' : 'Email me a reset link'}
      </button>

      <button type="button" className="adm-link" onClick={() => { setMode(mode === 'signin' ? 'reset' : 'signin'); setError('') }}>
        {mode === 'signin' ? 'Forgot your password?' : 'Back to sign in'}
      </button>
    </form>
  )
}
