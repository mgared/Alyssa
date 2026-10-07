import { InstagramIcon, MailIcon } from './Icons'
import { instagramUrl, site } from '../data/site'
import { useContent } from '../lib/content'

const year = new Date().getFullYear()

export default function Footer() {
  const { contact } = useContent().content
  return (
    <footer className="footer">
      <div className="footer__icons">
        <a href={instagramUrl(contact.instagramHandle)} target="_blank" rel="noreferrer" aria-label="Instagram">
          <InstagramIcon size={15} />
        </a>
        <a href={`mailto:${contact.email}`} aria-label="Email">
          <MailIcon size={15} />
        </a>
      </div>
      <p className="footer__legal">
        © {year} {site.name}. All rights reserved.
      </p>
    </footer>
  )
}
