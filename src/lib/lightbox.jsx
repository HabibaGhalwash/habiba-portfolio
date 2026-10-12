import { createContext, useCallback, useContext, useEffect, useState } from 'react'

const LightboxContext = createContext(() => {})

export const useZoom = () => useContext(LightboxContext)

// Wrap the app with <LightboxProvider>; any component can call
// const zoom = useZoom(); zoom(src, alt) to open an image full-screen.
export function LightboxProvider({ children }) {
  const [img, setImg] = useState(null)
  const zoom = useCallback((src, alt = '') => setImg({ src, alt }), [])

  useEffect(() => {
    if (!img) return
    const onKey = (e) => e.key === 'Escape' && setImg(null)
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [img])

  return (
    <LightboxContext.Provider value={zoom}>
      {children}
      <div
        className={`lb${img ? ' on' : ''}`}
        onClick={() => setImg(null)}
        role="dialog"
        aria-modal="true"
        aria-label="Enlarged image"
        aria-hidden={!img}
      >
        {img && <img src={img.src} alt={img.alt} />}
      </div>
    </LightboxContext.Provider>
  )
}
