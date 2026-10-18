import { useEffect, useRef } from 'react'
import { heroPhoto, heroRoles, stickers } from '../data/content'
import { onPointer } from '../lib/pointer'
import { useMagnetic } from '../hooks/useMagnetic'
import Typed from './Typed'

function BadgeIcon({ name }) {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': 'true',
  }

  switch (name) {
    case 'react':
      return (
        <svg {...common}>
          <ellipse cx="12" cy="12" rx="7" ry="3.3" transform="rotate(0 12 12)" />
          <ellipse cx="12" cy="12" rx="7" ry="3.3" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="7" ry="3.3" transform="rotate(120 12 12)" />
          <circle cx="12" cy="12" r="1.7" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'powerbi':
      return (
        <svg {...common}>
          <path d="M5 19V6.5A1.5 1.5 0 0 1 6.5 5H12v14H5Z" />
          <path d="M12 10h5.5A1.5 1.5 0 0 1 19 11.5V19h-7v-9Z" />
          <path d="M8 9.5h1.5M8 13h1.5M8 16.5h1.5" />
          <path d="M14 13h1.5M14 16.5h1.5" />
        </svg>
      )
    case 'cap':
      return (
        <svg {...common}>
          <path d="M3.5 9.5 12 5l8.5 4.5L12 14 3.5 9.5Z" />
          <path d="M7 11.3v3.7c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5v-3.7" />
          <path d="M12 14v4" />
        </svg>
      )
    case 'database':
      return (
        <svg {...common}>
          <ellipse cx="12" cy="6" rx="6.5" ry="2.5" />
          <path d="M5.5 6v6c0 1.4 2.9 2.5 6.5 2.5s6.5-1.1 6.5-2.5V6" />
          <path d="M5.5 12v6c0 1.4 2.9 2.5 6.5 2.5s6.5-1.1 6.5-2.5v-6" />
        </svg>
      )
    case 'mobile':
      return (
        <svg {...common}>
          <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
          <path d="M10 18.5h4" />
          <circle cx="12" cy="8" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'system':
      return (
        <svg {...common}>
          <rect x="4" y="5" width="6" height="5" rx="1.4" />
          <rect x="14" y="5" width="6" height="5" rx="1.4" />
          <rect x="9" y="14" width="6" height="5" rx="1.4" />
          <path d="M10 7.5h4M12 10v4M8.5 10.2l2.7 3.2M15.5 10.2l-2.7 3.2" />
        </svg>
      )
    default:
      return null
  }
}

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
        <div key={s.label} className={`L st st-${i}${s.hideOnMobile ? ' x' : ''}`} data-d={s.depth} style={s.style} aria-hidden="true">
          <b style={{ animationDelay: s.bob }}>
            <span className="sticker-inner">
              <span className="sticker-icon"><BadgeIcon name={s.icon} /></span>
              <span>{s.label}</span>
            </span>
          </b>
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
