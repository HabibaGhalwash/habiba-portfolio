import { useZoom } from '../lib/lightbox'

/** Image that opens full-screen in the lightbox when clicked (or Enter/Space). */
export default function ZoomImg({ src, alt, className = '', ...rest }) {
  const zoom = useZoom()
  const open = () => zoom(src, alt)
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      role="button"
      tabIndex={0}
      onClick={open}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), open())}
      {...rest}
    />
  )
}
