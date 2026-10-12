import { about } from '../data/content'
import Reveal from './Reveal'
import Counter from './Counter'
import Avatar from './Avatar'

export default function About() {
  return (
    <section className="about" id="about">
      <Reveal>
        <h2>
          Hi,
          <br />
          I'm Habiba!
        </h2>
        <p>{about.text}</p>
        {about.pills.map((p) => (
          <span className="pill" key={p}>
            {p}
          </span>
        ))}
        <div className="stats">
          {about.stats.map((s) => (
            <div key={s.label}>
              <Counter to={s.to} decimals={s.decimals} />
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </Reveal>
      <Avatar />
    </section>
  )
}
