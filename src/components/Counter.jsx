import { useEffect, useState } from 'react'
import { useReveal } from '../hooks/useReveal'

/** Number that counts up from 0 when it scrolls into view. */
export default function Counter({ to, decimals = 0 }) {
  const [ref, on] = useReveal()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!on) return
    let raf
    const t0 = performance.now()
    const step = (t) => {
      const k = Math.min((t - t0) / 1200, 1)
      setValue(to * (1 - Math.pow(1 - k, 3)))
      if (k < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [on, to])

  return <b ref={ref}>{value.toFixed(decimals)}</b>
}
