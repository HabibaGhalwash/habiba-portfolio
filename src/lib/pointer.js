// One shared mouse / touch listener for the whole site.
// Components subscribe with onPointer((x, y, event) => ...).
const subs = new Set()
let installed = false

function emit(x, y, e) {
  subs.forEach((fn) => fn(x, y, e))
}
const onMouse = (e) => emit(e.clientX, e.clientY, e)
const onTouch = (e) => e.touches[0] && emit(e.touches[0].clientX, e.touches[0].clientY, e)

export function onPointer(fn) {
  if (!installed) {
    addEventListener('mousemove', onMouse, { passive: true })
    addEventListener('touchmove', onTouch, { passive: true })
    installed = true
  }
  subs.add(fn)
  return () => {
    subs.delete(fn)
    if (!subs.size && installed) {
      removeEventListener('mousemove', onMouse)
      removeEventListener('touchmove', onTouch)
      installed = false
    }
  }
}
