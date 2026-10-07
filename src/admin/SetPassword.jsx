import { useState } from 'react'
import { api } from '../lib/api'

export default function SetPassword({ onDone }) {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    if (password.length < 8) return setError('Use at least 8 characters.')
    if (password !== confirm) return setError('The two passwords do not match.')
    setBusy(true)
    setError('')
    try {
      await api.updatePassword(password)
      onDone()
    } catch (err) {
      setError(err.message)
      setBusy(false)
    }
  }

  return (
    <form className="adm-card adm-auth" onSubmit={submit}>
      <h1 className="adm-title">Choose a new password</h1>
      <label className="adm-field">
        <span>New password</span>
        <input id="admin-new-password" type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </label>
      <label className="adm-field">
        <span>Confirm password</span>
        <input id="admin-confirm-password" type="password" autoComplete="new-password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
      </label>
      {error && <p className="adm-error" role="alert">{error}</p>}
      <button type="submit" className="adm-btn" disabled={busy}>{busy ? 'Saving…' : 'Save password'}</button>
    </form>
  )
}
