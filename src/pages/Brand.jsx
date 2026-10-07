import Logo, { Monogram } from '../components/Logo'

// Unlisted page (/brand) showing the refreshed logo and palette for approval.
const palette = [
  { name: 'Cream', hex: '#F4EFE8' },
  { name: 'Linen', hex: '#C8BDB1' },
  { name: 'Taupe', hex: '#A08F82' },
  { name: 'Chai', hex: '#968473' },
  { name: 'Walnut', hex: '#63564B' },
  { name: 'Coffee', hex: '#4A3B31' },
]

export default function Brand() {
  return (
    <section className="section page brand">
      <h1 className="page__title">Brand</h1>

      <div className="brand__tiles">
        <div className="brand__tile" style={{ background: '#F4EFE8', color: '#4A3B31', border: '1px solid var(--line)' }}><Logo /></div>
        <div className="brand__tile" style={{ background: '#A08F82', color: '#F4EFE8' }}><Logo /></div>
        <div className="brand__tile" style={{ background: '#4A3B31', color: '#E8DFD4' }}><Logo /></div>
        <div className="brand__tile" style={{ background: '#C8BDB1', color: '#4A3B31' }}><Monogram height={110} /></div>
      </div>

      <div className="brand__swatches">
        {palette.map((c) => (
          <div key={c.hex} className="swatch">
            <div className="swatch__chip" style={{ background: c.hex }} />
            <p className="swatch__name">{c.name}</p>
            <p className="swatch__hex">{c.hex}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
