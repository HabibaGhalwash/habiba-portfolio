import { useEffect, useRef, useState } from 'react'

// One shared IntersectionObserver for every reveal-on-scroll element.
let observer
const callbacks = new WeakMap()

function getObserver() {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          callbacks.get(e.target)?.()
          callbacks.delete(e.target)
          observer.unobserve(e.target)
        }),
      { threshold: 0.12 },
    )
  }
  return observer
}

/** Returns [ref, on]. `on` flips to true the first time the element scrolls into view. */
export function useReveal(externalRef) {
  const ownRef = useRef(null)
  const ref = externalRef || ownRef
  const [on, setOn] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      setOn(true)
      return
    }
    const io = getObserver()
    callbacks.set(el, () => setOn(true))
    io.observe(el)
    return () => {
      io.unobserve(el)
      callbacks.delete(el)
    }
  }, [ref])

  return [ref, on]
}
