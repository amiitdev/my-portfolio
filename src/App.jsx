import { useState, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import ThemeSwitcher from './components/ThemeSwitcher'
import Loader from './components/Loader'
import StarsCanvas from './components/StarsCanvas'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Roadmap from './components/Roadmap'
import Contact from './components/Contact'
import Footer from './components/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(min-width: 768px)', () => {
      const vh = window.innerHeight

      gsap.to('#starsCanvas', {
        y: vh * 0.12,
        ease: 'none',
        scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: 2 },
      })

      gsap.to('.ipad-wrapper', {
        y: vh * 0.06,
        ease: 'none',
        scrollTrigger: { trigger: '#home', start: 'top top', end: 'bottom top', scrub: 1.2 },
      })

      gsap.to('#home .flex-1:first-child', {
        y: -vh * 0.04,
        ease: 'none',
        scrollTrigger: { trigger: '#home', start: 'top top', end: 'bottom top', scrub: 1.2 },
      })

      gsap.to('.about-hologram-wrapper', {
        y: vh * 0.08,
        ease: 'none',
        scrollTrigger: { trigger: '#about', start: 'top bottom', end: 'bottom top', scrub: 1.2 },
      })

      gsap.to('.skill-laptop-3d', {
        y: -vh * 0.06,
        ease: 'none',
        scrollTrigger: { trigger: '#skills', start: 'top bottom', end: 'bottom top', scrub: 1.2 },
      })

      gsap.to('.carousel', {
        y: vh * 0.05,
        ease: 'none',
        scrollTrigger: { trigger: '#projects', start: 'top bottom', end: 'bottom top', scrub: 1.2 },
      })

      gsap.to('.train-track', {
        y: -vh * 0.08,
        ease: 'none',
        scrollTrigger: { trigger: '#roadmap', start: 'top bottom', end: 'bottom top', scrub: 1.2 },
      })

      gsap.to('.hub-ring', {
        y: -vh * 0.05,
        ease: 'none',
        scrollTrigger: { trigger: '#contact', start: 'top bottom', end: 'bottom top', scrub: 1.2 },
      })
    })

    return () => mm.revert()
  }, [])

  return (
    <>
      {loading && <Loader />}
      <ThemeSwitcher />
      <StarsCanvas />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Roadmap />
        <Contact />
        <Footer />
      </main>
    </>
  )
}
