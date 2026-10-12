import { useEffect, useRef } from 'react'
import { useReveal } from '../hooks/useReveal'

let zTop = 10 // the note you touched last comes to the front

/** A sticky note you can drag and throw; it keeps sliding after you let go. */
export default function StickyNote({ title, text }) {
  const ref = useRef(null)
  const [, revealed] = useReveal(ref)
  const s = useRef({ x: 0, y: 0, vx: 0, vy: 0, ox: 0, oy: 0, lx: 0, ly: 0, dragging: false, raf: 0 })

  useEffect(() => () => cancelAnimationFrame(s.current.raf), [])

  // write position, and keep the note inside its section (bounce off the edges)
  const place = () => {
    const n = ref.current
    const st = s.current
    n.style.setProperty('--x', st.x + 'px')
    n.style.setProperty('--y', st.y + 'px')
    const box = n.closest('section').getBoundingClientRect()
    const r = n.getBoundingClientRect()
    let dx = 0
    let dy = 0
    if (r.left < box.left) dx = box.left - r.left
    else if (r.right > box.right) dx = box.right - r.right
    if (r.top < box.top) dy = box.top - r.top
    else if (r.bottom > box.bottom) dy = box.bottom - r.bottom
    if (dx) {
      st.x += dx
      st.vx *= -0.5
    }
    if (dy) {
      st.y += dy
      st.vy *= -0.5
    }
    if (dx || dy) {
      n.style.setProperty('--x', st.x + 'px')
      n.style.setProperty('--y', st.y + 'px')
    }
  }

  const onDown = (e) => {
    const n = ref.current
    const st = s.current
    st.dragging = true
    cancelAnimationFrame(st.raf)
    st.ox = e.clientX - st.x
    st.oy = e.clientY - st.y
    st.lx = e.clientX
    st.ly = e.clientY
    st.vx = st.vy = 0
    n.setPointerCapture(e.pointerId)
    n.dataset.drag = '1'
    n.style.zIndex = ++zTop
  }

  const onMove = (e) => {
    const st = s.current
    if (!st.dragging) return
    st.vx = e.clientX - st.lx
    st.vy = e.clientY - st.ly
    st.lx = e.clientX
    st.ly = e.clientY
    st.x = e.clientX - st.ox
    st.y = e.clientY - st.oy
    place()
    // tilt the note with the speed you drag it
    ref.current.style.rotate = `calc(var(--r) + ${Math.max(-14, Math.min(14, st.vx * 0.7))}deg)`
  }

  const onUp = () => {
    const st = s.current
    if (!st.dragging) return
    st.dragging = false
    delete ref.current.dataset.drag
    ref.current.style.rotate = ''
    const glide = () => {
      st.vx *= 0.93
      st.vy *= 0.93
      st.x += st.vx
      st.y += st.vy
      place()
      if (Math.abs(st.vx) + Math.abs(st.vy) > 0.25) st.raf = requestAnimationFrame(glide)
    }
    glide()
  }

  return (
    <div
      ref={ref}
      className={`note rv${revealed ? ' on' : ''}`}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
    >
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  )
}
