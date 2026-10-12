import { useRef } from 'react'
import { profile } from '../data/content'
import { useMagnetic } from '../hooks/useMagnetic'
import Reveal from './Reveal'

export default function Contact() {
  const mail = useRef(null)
  useMagnetic(mail)
  return (
    <section className="contact" id="contact">
      <Reveal as="h2">
        Let's Work
        <br />
        Together?
      </Reveal>
      <a className="mail" ref={mail} href={`mailto:${profile.email}`}>
        {profile.email}
      </a>
      <div className="links">
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        <a href={profile.github} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a href={`tel:${profile.phone}`}>{profile.phoneLabel}</a>
      </div>
    </section>
  )
}
