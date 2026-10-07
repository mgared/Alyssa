export default function SaveBar({ dirty, busy, message, error, onSave, onCancel, saveLabel = 'Save changes' }) {
  return (
    <div className="adm-savebar">
      <div className="adm-savebar__status" role="status">
        {error ? <span className="adm-error">{error}</span> : busy ? 'Saving…' : dirty ? 'You have unsaved changes.' : message}
      </div>
      <div className="adm-row">
        {onCancel && <button type="button" className="adm-link" onClick={onCancel}>Cancel</button>}
        <button type="button" className="adm-btn" onClick={onSave} disabled={busy || !dirty}>{saveLabel}</button>
      </div>
    </div>
  )
}
