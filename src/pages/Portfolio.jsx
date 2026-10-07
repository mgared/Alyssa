import ProjectGrid from '../components/ProjectGrid'
import { projects } from '../data/site'

export default function Portfolio() {
  return (
    <section className="section page">
      <h1 className="page__title">Portfolio</h1>
      <ProjectGrid projects={projects} />
    </section>
  )
}
