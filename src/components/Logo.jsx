// Refreshed "Design by Labillois" wordmark.
// An arched monogram (a nod to architecture/doorways) paired with a refined,
// widely-tracked serif wordmark and a small modern sans subline.

export function Monogram({ size = 44, color = 'currentColor' }) {
  return (
    <svg
      width={size}
      height={size * 1.25}
      viewBox="0 0 40 50"
      fill="none"
      aria-hidden="true"
      className="monogram"
    >
      <path
        d="M4 49V20C4 11.2 11.2 4 20 4s16 7.2 16 16v29"
        stroke={color}
        strokeWidth="1"
      />
      <text
        x="20"
        y="40"
        textAnchor="middle"
        fontFamily="'Italiana', serif"
        fontSize="27"
        fill={color}
      >
        L
      </text>
      <line x1="1" y1="49" x2="39" y2="49" stroke={color} strokeWidth="1" />
    </svg>
  )
}

export default function Logo({ variant = 'full', className = '' }) {
  return (
    <span className={`logo logo--${variant} ${className}`}>
      {variant === 'full' && <Monogram />}
      <span className="logo__text">
        <span className="logo__kicker">Design by</span>
        <span className="logo__name">Labillois</span>
      </span>
    </span>
  )
}
