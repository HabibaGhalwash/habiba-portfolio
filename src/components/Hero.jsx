import { useEffect, useRef } from 'react'
import { heroPhoto, heroRoles, stickers } from '../data/content'
import { onPointer } from '../lib/pointer'
import { useMagnetic } from '../hooks/useMagnetic'
import Typed from './Typed'

export default function Hero() {
  const root = useRef(null)
  const cta = useRef(null)
  useMagnetic(cta)

  // Every layer with data-d moves a different amount as the mouse moves = depth.
  useEffect(() => {
    const hero = root.current
    const layers = [...hero.querySelectorAll('.L[data-d]')]
    let tx = 0, ty = 0, cx = 0, cy = 0
    let px = innerWidth / 2, py = innerHeight / 2
    let lmx = -1, lmy = -1
    let visible = true
    let raf
    let last = performance.now()

    const io = new IntersectionObserver((es) => (visible = es[0].isIntersecting))
    io.observe(hero)

    const off = onPointer((x, y) => {
      px = x
      py = y
      tx = (x / innerWidth - 0.5) * 2
      ty = (y / innerHeight - 0.5) * 2
    })

    const loop = (n) => {
      raf = requestAnimationFrame(loop)
      const dt = Math.min((n - last) / 1000, 0.05)
      last = n
      if (!visible) return
      const a = 1 - Math.exp(-dt * 6)
      cx += (tx - cx) * a
      cy += (ty - cy) * a
      layers.forEach((l) => {
        const d = +l.dataset.d
        l.style.translate = `${(cx * d).toFixed(2)}px ${(cy * d).toFixed(2)}px`
      })
      if (Math.abs(px - lmx) > 1.5 || Math.abs(py - lmy) > 1.5) {
        lmx = px
        lmy = py
        const top = hero.getBoundingClientRect().top
        hero.style.setProperty('--mx', px + 'px')
        hero.style.setProperty('--my', py - top + 'px')
      }
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      off()
    }
  }, [])

  return (
    <header className="hero" id="hero" ref={root}>
      <h1 className="L big" data-d="-14" aria-label="Habiba">
        {'HABIBA'.split('').map((c, i) => (
          <span key={i} aria-hidden="true">{c}</span>
        ))}
      </h1>
      <div className="L sig" data-d="-30" aria-hidden="true">
        <i>Ghalwash</i>
      </div>
      <div className="L me" data-d="12">
        <img src={heroPhoto} alt="Habiba Ghalwash" fetchPriority="high" />
      </div>

      {stickers.map((s, i) => (
        <div key={s.text} className={`L st st-${i}${s.hideOnMobile ? ' x' : ''}`} data-d={s.depth} style={s.style} aria-hidden="true">
          <b style={{ animationDelay: s.bob }}>{s.text}</b>
        </div>
      ))}

      <div className="tag">
        <b>
          Hi! I turn business problems into{' '}
          <em>
            <Typed words={heroRoles} />
          </em>
        </b>
        Business Information Systems graduate: analysis, data &amp; code.
        <br />
        <a className="cta" ref={cta} href="#work">
          View My Work ↓
        </a>
      </div>
      <div className="scroll" aria-hidden="true">SCROLL</div>
    </header>
  )
}
