import { marqueeText } from '../data/content'

export default function Marquee() {
  return (
    <div className="strip" aria-hidden="true">
      <div>{marqueeText.repeat(4)}</div>
    </div>
  )
}
