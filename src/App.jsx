import { LightboxProvider } from './lib/lightbox'
import { profile } from './data/content'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Marquee from './components/Marquee'
import Skills from './components/Skills'
import Work from './components/Work'
import Experience from './components/Experience'
import Highlights from './components/Highlights'
import Contact from './components/Contact'

export default function App() {
  return (
    <LightboxProvider>
      <Cursor />
      <Nav />
      <Hero />
      <main>
        <About />
        <Marquee />
        <Skills />
        <Work />
        <Experience />
        <Highlights />
        <Contact />
      </main>
      <footer>
        © {new Date().getFullYear()} {profile.name} · {profile.city}
      </footer>
    </LightboxProvider>
  )
}
