import { useEffect, useRef } from 'react'
import { onPointer } from '../lib/pointer'

const HOVERABLE = 'a,button,.pill,.note,.bub,.st,[role="button"]'

/** Orange dot + trailing ring that grows over interactive things. Mouse devices only. */
export default function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)

  useEffect(() => {
    if (!matchMedia('(hover:hover) and (pointer:fine)').matches) return
    const d = dot.current
    const r = ring.current
    let px = innerWidth / 2
    let py = innerHeight / 2
    let rx = px
    let ry = py
    let current = null
    let raf
    let last = performance.now()

    const off = onPointer((x, y, e) => {
      px = x
      py = y
      d.classList.add('ready')
      r.classList.add('ready')
      const el = e.target?.closest?.(HOVERABLE) || null
      if (el !== current) {
        current = el
        r.classList.toggle('h', !!el)
        r.textContent = !el ? '' : el.matches('a,button,[role="button"]') ? 'Go' : el.matches('.note') ? 'Drag' : '✦'
      }
    })

    const loop = (n) => {
      raf = requestAnimationFrame(loop)
      const dt = Math.min((n - last) / 1000, 0.05)
      last = n
      const k = 1 - Math.exp(-dt * 16)
      rx += (px - rx) * k
      ry += (py - ry) * k
      d.style.translate = `${px}px ${py}px`
      r.style.translate = `${rx}px ${ry}px`
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      off()
    }
  }, [])

  return (
    <>
      <div ref={dot} className="cur-dot" aria-hidden="true" />
      <div ref={ring} className="cur-ring" aria-hidden="true" />
    </>
  )
}
