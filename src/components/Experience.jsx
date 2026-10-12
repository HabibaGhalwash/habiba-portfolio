import { jobs } from '../data/content'
import Reveal from './Reveal'

export default function Experience() {
  return (
    <section className="exp" id="exp">
      <Reveal as="h2" className="t">
        Experience
      </Reveal>
      <div className="tl">
        {jobs.map((j) => (
          <Reveal className="job" key={j.title}>
            <div className="d">{j.date}</div>
            <div>
              <h3>{j.title}</h3>
              <ul>
                {j.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
