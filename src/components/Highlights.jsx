import { highlights } from '../data/content'
import Reveal from './Reveal'

export default function Highlights() {
  return (
    <section className="ach">
      <Reveal as="h2" className="t" style={{ color: 'var(--butter)' }}>
        Highlights
      </Reveal>
      <div className="bubbles">
        {highlights.map((h) => (
          <Reveal className="bub" key={h.title}>
            <b>{h.title}</b>
            {h.text}
          </Reveal>
        ))}
      </div>
    </section>
  )
}
