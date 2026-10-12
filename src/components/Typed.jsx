import { useEffect, useState } from 'react'

/** Typewriter that cycles through `words`. */
export default function Typed({ words }) {
  const [text, setText] = useState('')

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setText(words[0])
      return
    }
    let wi = 0
    let ci = 0
    let deleting = false
    let timer
    const tick = () => {
      const w = words[wi]
      ci += deleting ? -1 : 1
      setText(w.slice(0, ci))
      let delay = deleting ? 35 : 75
      if (!deleting && ci === w.length) {
        deleting = true
        delay = 1400
      } else if (deleting && ci === 0) {
        deleting = false
        wi = (wi + 1) % words.length
        delay = 300
      }
      timer = setTimeout(tick, delay)
    }
    timer = setTimeout(tick, 75)
    return () => clearTimeout(timer)
  }, [words])

  return text
}
