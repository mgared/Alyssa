import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Logo from './Logo'
import { instagramUrl, site } from '../data/site'
import { useContent } from '../lib/content'

const links = [
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/contact', label: 'Contact' },
  { to: '/about', label: 'About' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  const { content } = useContent()

  return (
    <header className="header">
      <Link to="/" className="header__logo" onClick={close} aria-label={`${site.name} — home`}>
        <Logo />
      </Link>

      <button
        className={`header__toggle ${open ? 'is-open' : ''}`}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="main-nav"
        aria-label="Menu"
      >
        <span />
        <span />
      </button>

      <nav id="main-nav" className={`nav ${open ? 'is-open' : ''}`}>
        {links.map((l) => (
          <NavLink key={l.to} to={l.to} className="nav__link" onClick={close}>
            {l.label}
          </NavLink>
        ))}
        <a className="nav__link" href={instagramUrl(content.contact.instagramHandle)} target="_blank" rel="noreferrer" onClick={close}>
          Instagram
        </a>
      </nav>
    </header>
  )
}
