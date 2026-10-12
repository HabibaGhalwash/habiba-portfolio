import { useEffect } from 'react'

/** Button that gently pulls toward the cursor (mouse devices only). */
export function useMagnetic(ref) {
  useEffect(() => {
    const el = ref.current
    if (!el || !matchMedia('(hover:hover) and (pointer:fine)').matches) return
    const move = (e) => {
      const r = el.getBoundingClientRect()
      el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.3}px,${(e.clientY - r.top - r.height / 2) * 0.4}px)`
    }
    const leave = () => (el.style.transform = '')
    el.addEventListener('mousemove', move)
    el.addEventListener('mouseleave', leave)
    return () => {
      el.removeEventListener('mousemove', move)
      el.removeEventListener('mouseleave', leave)
    }
  }, [ref])
}
