import { useEffect } from 'react'

/** 3D tilt that follows the mouse over an element (mouse devices only). */
export function useTilt(ref) {
  useEffect(() => {
    const el = ref.current
    if (!el || !matchMedia('(hover:hover) and (pointer:fine)').matches) return
    const move = (e) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width - 0.5
      const y = (e.clientY - r.top) / r.height - 0.5
      el.style.transform = `perspective(900px) rotateX(${-y * 6}deg) rotateY(${x * 8}deg) scale(1.01)`
      el.style.transition = 'transform .1s'
    }
    const leave = () => {
      el.style.transform = ''
      el.style.transition = 'transform .5s'
    }
    el.addEventListener('mousemove', move)
    el.addEventListener('mouseleave', leave)
    return () => {
      el.removeEventListener('mousemove', move)
      el.removeEventListener('mouseleave', leave)
    }
  }, [ref])
}
