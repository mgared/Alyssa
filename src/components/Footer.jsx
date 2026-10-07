import { InstagramIcon, MailIcon } from './Icons'
import { site } from '../data/site'

const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__icons">
        <a href={site.instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram">
          <InstagramIcon size={15} />
        </a>
        <a href={`mailto:${site.email}`} aria-label="Email">
          <MailIcon size={15} />
        </a>
      </div>
      <p className="footer__legal">
        © {year} {site.name}. All rights reserved.
      </p>
    </footer>
  )
}
