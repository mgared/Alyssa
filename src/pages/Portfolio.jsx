import ProjectGrid from '../components/ProjectGrid'
import { projects } from '../data/site'

export default function Portfolio() {
  return (
    <section className="section section--wide page">
      <h1 className="visually-hidden">Portfolio</h1>
      <ProjectGrid projects={projects} />
    </section>
  )
}
