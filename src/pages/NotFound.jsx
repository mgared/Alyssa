import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="section page center">
      <h1 className="page__title">Page Not Found</h1>
      <Link to="/" className="text-link">Return Home</Link>
    </section>
  )
}
