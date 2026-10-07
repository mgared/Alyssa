import ProjectGrid from '../components/ProjectGrid'
import { useContent } from '../lib/content'

export default function Portfolio() {
  const { projects } = useContent()
  return (
    <section className="section section--wide page">
      <h1 className="visually-hidden">Portfolio</h1>
      <ProjectGrid projects={projects} />
    </section>
  )
}
