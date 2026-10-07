// Refreshed "Design by Labillois" logo.
// A hairline arched monogram (a nod to doorways and architecture) above a
// single-line, widely tracked wordmark.

export function Monogram({ height = 72, color = 'currentColor' }) {
  return (
    <svg
      width={height * 0.75}
      height={height}
      viewBox="0 0 60 80"
      fill="none"
      stroke={color}
      strokeWidth="1.4"
      aria-hidden="true"
      className="monogram"
    >
      <path d="M4 80V30C4 15.6 15.6 4 30 4s26 11.6 26 26v50" />
      <path d="M24 30v38h18" />
    </svg>
  )
}

export default function Logo({ stacked = true, className = '' }) {
  return (
    <span className={`logo ${stacked ? 'logo--stacked' : ''} ${className}`}>
      {stacked && <Monogram />}
      <span className="logo__word">
        <span className="logo__light">Design by</span> <span className="logo__bold">Labillois</span>
      </span>
    </span>
  )
}
