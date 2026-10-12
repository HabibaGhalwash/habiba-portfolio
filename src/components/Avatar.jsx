import { useCallback, useEffect, useRef, useState } from 'react'
import { onPointer } from '../lib/pointer'
import rig from '../assets/avatar/rig.json'
import baseUrl from '../assets/avatar/base.webp'
import depthUrl from '../assets/avatar/depth.webp'
import irisLeftUrl from '../assets/avatar/iris-left.png'
import irisRightUrl from '../assets/avatar/iris-right.png'
import skinLeftUrl from '../assets/avatar/skin-left.webp'
import skinRightUrl from '../assets/avatar/skin-right.webp'
import Reveal from './Reveal'

/*
  Animated 3D portrait.
  • base.webp      – the cartoon portrait (transparent background)
  • depth.webp     – a depth map; a WebGL shader shifts pixels by depth so the
                     head really turns toward the cursor (parallax = fake 3D)
  • iris-*.png     – the irises, drawn live so the eyes follow the cursor
  • skin-*.webp    – skin patch + the real upper eyelid squashed down to blink
  • rig.json       – eye shapes / positions for the layers above
  Falls back to a plain 2D canvas when WebGL isn't available.
*/

const SZ = 820
const VERT = 'attribute vec2 p;varying vec2 uv;void main(){uv=p*.5+.5;gl_Position=vec4(p,0.,1.);}'
const FRAG =
  'precision mediump float;varying vec2 uv;uniform sampler2D c,d;uniform vec2 sh;uniform float br;' +
  'void main(){vec2 u=(uv-vec2(.5,0.))/br+vec2(.5,0.);float k=.028;' +
  'float d0=texture2D(d,u).r;vec2 u1=u-sh*k*(d0-.45);' +
  'float d1=texture2D(d,u1).r;vec2 u2=u-sh*k*(d1-.45);' +
  'float d2=texture2D(d,u2).r;vec2 u3=u-sh*k*(d2-.45);' +
  'gl_FragColor=texture2D(c,u3);}'

function buildProgram(gl) {
  const compile = (type, src) => {
    const s = gl.createShader(type)
    gl.shaderSource(s, src)
    gl.compileShader(s)
    return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null
  }
  const vs = compile(gl.VERTEX_SHADER, VERT)
  const fs = compile(gl.FRAGMENT_SHADER, FRAG)
  if (!vs || !fs) return null
  const p = gl.createProgram()
  gl.attachShader(p, vs)
  gl.attachShader(p, fs)
  gl.linkProgram(p)
  return gl.getProgramParameter(p, gl.LINK_STATUS) ? p : null
}

// A canvas can only ever have one kind of context, so test WebGL on a throw-away canvas first.
function webglWorks() {
  try {
    const gl = document.createElement('canvas').getContext('webgl')
    if (!gl) return false
    const ok = !!buildProgram(gl)
    gl.getExtension('WEBGL_lose_context')?.loseContext()
    return ok
  } catch {
    return false
  }
}

const loadImage = (src) =>
  new Promise((resolve, reject) => {
    const i = new Image()
    i.onload = () => resolve(i)
    i.onerror = reject
    i.src = src
  })

const tracePath = (ctx, pts) => {
  ctx.beginPath()
  pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)))
  ctx.closePath()
}

// critically-damped spring: smooth, no overshoot
function spring(cur, target, vel, smoothTime, dt) {
  const o = 2 / smoothTime
  const x = o * dt
  const e = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x)
  const change = cur - target
  const tmp = (vel.v + o * change) * dt
  vel.v = (vel.v - o * tmp) * e
  return target + (change + tmp) * e
}

export default function AvatarFrame() {
  const canvasRef = useRef(null)
  const blinkRef = useRef(null)
  const [hearts, setHearts] = useState([])

  const burst = useCallback(() => {
    const stamp = Date.now()
    const batch = Array.from({ length: 7 }, (_, i) => ({
      id: `${stamp}-${i}`,
      glyph: ['💗', '✨', '💖'][i % 3],
      left: 25 + Math.random() * 50,
      delay: i * 0.08,
    }))
    setHearts((h) => [...h, ...batch])
    setTimeout(() => setHearts((h) => h.filter((x) => !batch.includes(x))), 1900)
  }, [])

  useEffect(() => {
    const cv = canvasRef.current
    let disposed = false
    let raf = 0
    const timers = new Set()
    const cleanups = []
    const later = (fn, ms) => {
      const id = setTimeout(() => {
        timers.delete(id)
        fn()
      }, ms)
      timers.add(id)
    }

    Promise.all([baseUrl, depthUrl, irisLeftUrl, irisRightUrl, skinLeftUrl, skinRightUrl].map(loadImage))
      .then(([base, dep, spL, spR, skL, skR]) => {
        if (disposed) return
        const M = rig
        const useGL = webglWorks()
        const gl = useGL ? cv.getContext('webgl', { premultipliedAlpha: true, alpha: true, antialias: false }) : null
        const g2 = useGL ? null : cv.getContext('2d')
        if (!gl && !g2) return
        const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches

        // ---- WebGL setup (texture 0 = portrait, texture 1 = depth)
        let baseTex = null
        const U = {}
        if (gl) {
          const prog = buildProgram(gl)
          gl.useProgram(prog)
          const buf = gl.createBuffer()
          gl.bindBuffer(gl.ARRAY_BUFFER, buf)
          gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
          const loc = gl.getAttribLocation(prog, 'p')
          gl.enableVertexAttribArray(loc)
          gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
          gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
          gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true)
          const makeTexture = (unit, src) => {
            const t = gl.createTexture()
            gl.activeTexture(gl.TEXTURE0 + unit)
            gl.bindTexture(gl.TEXTURE_2D, t)
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, src)
            return t
          }
          baseTex = makeTexture(0, base)
          makeTexture(1, dep)
          gl.uniform1i(gl.getUniformLocation(prog, 'c'), 0)
          gl.uniform1i(gl.getUniformLocation(prog, 'd'), 1)
          U.sh = gl.getUniformLocation(prog, 'sh')
          U.br = gl.getUniformLocation(prog, 'br')
          gl.clearColor(0, 0, 0, 0)
        }

        // ---- eyes + blink (drawn on a small canvas, then patched into the texture)
        const skins = { L: skL, R: skR }
        const tmp = { L: document.createElement('canvas'), R: document.createElement('canvas') }

        const drawIris = (ctx, img, [x, y, w, h], pts, ox, oy) => {
          ctx.save()
          tracePath(ctx, pts)
          ctx.clip()
          ctx.drawImage(img, x + ox, y + oy, w, h)
          ctx.restore()
        }
        const closeLid = (ctx, ox0, oy0, k, q) => {
          const m = M.sq[k]
          const [bx, by, bw, bh] = m.box
          const t = tmp[k]
          if (t.width !== bw || t.height !== bh) {
            t.width = bw
            t.height = bh
          }
          const t2 = t.getContext('2d')
          t2.globalCompositeOperation = 'source-over'
          t2.clearRect(0, 0, bw, bh)
          t2.drawImage(ctx.canvas, bx - ox0, by - oy0, bw, bh, 0, 0, bw, bh)
          t2.globalCompositeOperation = 'destination-in'
          t2.save()
          t2.translate(-bx, -by)
          tracePath(t2, m.poly)
          t2.fill()
          t2.restore()
          t2.globalCompositeOperation = 'source-over'
          ctx.save()
          ctx.translate(-ox0, -oy0)
          ctx.drawImage(skins[k], bx, by, bw, bh)
          ctx.translate(m.anchor[0], m.anchor[1])
          ctx.rotate(m.ang)
          ctx.scale(1, 1 - 0.9 * q)
          ctx.rotate(-m.ang)
          ctx.translate(-m.anchor[0], -m.anchor[1])
          ctx.drawImage(t, bx, by)
          ctx.restore()
        }
        const renderEyes = (ctx, ox0, oy0, ow, oh, ox, oy, tl, tr) => {
          ctx.clearRect(0, 0, ow, oh)
          ctx.drawImage(base, ox0, oy0, ow, oh, 0, 0, ow, oh)
          ctx.save()
          ctx.translate(-ox0, -oy0)
          drawIris(ctx, spL, M.spL, M.openL, ox, oy)
          drawIris(ctx, spR, M.spR, M.openR, ox, oy)
          ctx.restore()
          if (tl > 0.01) closeLid(ctx, ox0, oy0, 'L', tl)
          if (tr > 0.01) closeLid(ctx, ox0, oy0, 'R', tr)
        }

        const boxes = [M.sq.L.box, M.sq.R.box]
        const rx = Math.max(0, Math.floor(Math.min(...boxes.map((b) => b[0])) - 4))
        const ry = Math.max(0, Math.floor(Math.min(...boxes.map((b) => b[1])) - 4))
        const rw = Math.min(SZ, Math.ceil(Math.max(...boxes.map((b) => b[0] + b[2])) + 4)) - rx
        const rh = Math.min(SZ, Math.ceil(Math.max(...boxes.map((b) => b[1] + b[3])) + 4)) - ry
        const eyeCanvas = document.createElement('canvas')
        eyeCanvas.width = rw
        eyeCanvas.height = rh
        const eyeCtx = eyeCanvas.getContext('2d')
        let fullCanvas = null
        let fullCtx = null
        if (!gl) {
          fullCanvas = document.createElement('canvas')
          fullCanvas.width = fullCanvas.height = SZ
          fullCtx = fullCanvas.getContext('2d')
        }
        const updateFace = (ox, oy, tl, tr) => {
          if (gl) {
            renderEyes(eyeCtx, rx, ry, rw, rh, ox, oy, tl, tr)
            gl.activeTexture(gl.TEXTURE0)
            gl.bindTexture(gl.TEXTURE_2D, baseTex)
            gl.texSubImage2D(gl.TEXTURE_2D, 0, rx, SZ - ry - rh, gl.RGBA, gl.UNSIGNED_BYTE, eyeCanvas)
          } else {
            renderEyes(fullCtx, 0, 0, SZ, SZ, ox, oy, tl, tr)
          }
        }
        const present = (sx, sy, br) => {
          if (gl) {
            gl.viewport(0, 0, SZ, SZ)
            gl.clear(gl.COLOR_BUFFER_BIT)
            gl.uniform2f(U.sh, sx, sy)
            gl.uniform1f(U.br, br)
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
          } else {
            g2.clearRect(0, 0, SZ, SZ)
            g2.save()
            g2.translate(sx * 8, -sy * 5)
            g2.drawImage(fullCanvas, 0, 0)
            g2.restore()
          }
        }

        if (!gl) updateFace(0, 0, 0, 0)
        present(0, 0, 1)
        if (reduceMotion) return // static portrait for people who prefer less motion

        // ---- animation state
        const look = { x: 0, y: 0 } // where the eyes want to look
        const head = { x: 0, y: 0 } // where the head wants to turn
        const eyes = { x: 0, y: 0 }
        const headPos = { x: 0, y: 0 }
        const vel = { hx: { v: 0 }, hy: { v: 0 }, ex: { v: 0 }, ey: { v: 0 } }
        const blinkStart = { L: -1e9, R: -1e9 }
        const BLINK_MS = 190
        let lastMove = 0

        const lidAmount = (k, now) => {
          const p = (now - blinkStart[k]) / BLINK_MS
          if (p < 0 || p > 1) return 0
          const q = p < 0.38 ? p / 0.38 : 1 - (p - 0.38) / 0.62
          return q * q * (3 - 2 * q)
        }
        const blink = () => {
          blinkStart.L = blinkStart.R = performance.now()
        }
        blinkRef.current = () => {
          blink()
          later(blink, 260)
        }
        const scheduleBlink = () =>
          later(() => {
            blink()
            if (Math.random() < 0.2) later(blink, 300)
            scheduleBlink()
          }, 2300 + Math.random() * 3300)
        scheduleBlink()

        cleanups.push(
          onPointer((x, y) => {
            const r = cv.getBoundingClientRect()
            const dx = Math.max(-1, Math.min(1, (x - (r.left + r.width / 2)) / (innerWidth * 0.4)))
            const dy = Math.max(-1, Math.min(1, (y - (r.top + r.height * 0.3)) / (innerHeight * 0.4)))
            head.x = dx
            head.y = -dy
            look.x = dx
            look.y = dy
            lastMove = performance.now()
          }),
        )

        let visible = true
        const io = new IntersectionObserver((es) => (visible = es[0].isIntersecting))
        io.observe(cv)
        cleanups.push(() => io.disconnect())

        let last = performance.now()
        let lox = 1e9, loy = 1e9, ltl = -1, ltr = -1
        const frame = (t) => {
          raf = requestAnimationFrame(frame)
          if (!visible) {
            last = t
            return
          }
          const dt = Math.min((t - last) / 1000, 0.05)
          last = t
          if (t - lastMove > 3500) {
            // nobody is moving the mouse: glance around by herself
            head.x = Math.sin(t / 2600) * 0.55
            head.y = Math.cos(t / 3300) * 0.25
            look.x = head.x
            look.y = -head.y
          }
          headPos.x = spring(headPos.x, head.x, vel.hx, 0.3, dt)
          headPos.y = spring(headPos.y, head.y, vel.hy, 0.3, dt)
          eyes.x = spring(eyes.x, look.x, vel.ex, 0.1, dt)
          eyes.y = spring(eyes.y, look.y, vel.ey, 0.1, dt)

          const ox = eyes.x * 5.5
          const oy = eyes.y * 3.2
          const tl = lidAmount('L', t)
          const tr = lidAmount('R', t)
          if (Math.abs(ox - lox) > 0.02 || Math.abs(oy - loy) > 0.02 || tl !== ltl || tr !== ltr) {
            lox = ox; loy = oy; ltl = tl; ltr = tr
            updateFace(ox, oy, tl, tr)
          }
          // up/down turn is weaker than left/right so the face never stretches
          const sx = headPos.x * 0.85 + Math.sin(t / 1900) * 0.08
          const sy = headPos.y * 0.3 + Math.sin(t / 2500 + 1) * 0.05
          present(sx, sy, 1 + 0.007 * (Math.sin(t / 950) * 0.5 + 0.5))
        }
        raf = requestAnimationFrame(frame)
      })
      .catch(() => {})

    return () => {
      disposed = true
      cancelAnimationFrame(raf)
      timers.forEach(clearTimeout)
      cleanups.forEach((fn) => fn())
      blinkRef.current = null
    }
  }, [])

  return (
    <Reveal className="frame">
      <div className="hi">Hi! 👋</div>
      <div className="avw">
        <div className="fl">
          <canvas
            ref={canvasRef}
            className="av3d"
            width={SZ}
            height={SZ}
            role="img"
            aria-label="Animated 3D cartoon portrait of Habiba. Click her to say hi."
            onClick={() => {
              blinkRef.current?.()
              burst()
            }}
          />
        </div>
      </div>
      {hearts.map((h) => (
        <span key={h.id} className="heart" style={{ left: `${h.left}%`, animationDelay: `${h.delay}s` }}>
          {h.glyph}
        </span>
      ))}
    </Reveal>
  )
}
