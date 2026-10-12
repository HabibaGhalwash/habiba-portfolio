import { useRef } from 'react'
import { useReveal } from '../hooks/useReveal'
import { useTilt } from '../hooks/useTilt'

/** One project card: text on the left, `media` on the right. */
export default function Project({ title, tone = 'butter', style, media, children }) {
  const ref = useRef(null)
  const [, on] = useReveal(ref)
  useTilt(ref)
  return (
    <div ref={ref} className={`proj rv${tone === 'sage' ? ' proj--sage' : ''}${on ? ' on' : ''}`} style={style}>
      <div>
        <h3>{title}</h3>
        {children}
      </div>
      {media}
    </div>
  )
}
