import { skills } from '../data/content'
import Reveal from './Reveal'
import StickyNote from './StickyNote'

export default function Skills() {
  return (
    <section className="skills" id="skills">
      <Reveal as="h2" className="t">
        My Skills
      </Reveal>
      <Reveal as="p" className="hint">
        Psst… Drag the sticky notes around ✋
      </Reveal>
      <div className="notes">
        {skills.map((s) => (
          <StickyNote key={s.title} title={s.title} text={s.text} />
        ))}
      </div>
    </section>
  )
}
