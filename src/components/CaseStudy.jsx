import { useState } from 'react'
import { careconnect } from '../data/content'
import { useZoom } from '../lib/lightbox'
import Reveal from './Reveal'

/** Tabbed viewer for the CareConnect analysis & design diagrams. */
export default function CaseStudy() {
  const [i, setI] = useState(0)
  const zoom = useZoom()
  const { diagrams } = careconnect

  return (
    <Reveal className="cs" id="case">
      <h3>CareConnect: Behind the Build</h3>
      <p>
        Before writing code, I researched families' needs and modelled the whole system. Tap a diagram to explore it,
        click it to zoom.
      </p>
      <div className="tabs" role="tablist" aria-label="CareConnect diagrams">
        {diagrams.map((d, j) => (
          <button key={d.tab} role="tab" aria-selected={i === j} className={i === j ? 'on' : ''} onClick={() => setI(j)}>
            {d.tab}
          </button>
        ))}
      </div>
      <div className="viewer">
        {diagrams.map((d, j) => (
          <img
            key={d.tab}
            src={d.src}
            alt={d.alt}
            loading="lazy"
            className={i === j ? 'on' : ''}
            onClick={() => zoom(d.src, d.alt)}
          />
        ))}
        <small>click to zoom 🔍</small>
      </div>
      <p className="cap">{diagrams[i].caption}</p>
    </Reveal>
  )
}
