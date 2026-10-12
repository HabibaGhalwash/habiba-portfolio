import { navLinks } from '../data/content'

export default function Nav() {
  return (
    <nav aria-label="Main">
      {navLinks.map((l) => (
        <a key={l.href} href={l.href}>
          {l.label}
        </a>
      ))}
    </nav>
  )
}
