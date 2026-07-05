import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const skillItems = [
  { icon: 'fa-brands fa-js text-yellow-400', label: 'JavaScript' },
  { icon: 'fa-brands fa-react text-cyan-400', label: 'React.js' },
  { icon: 'fa-brands fa-node-js text-green-500', label: 'Node.js' },
  { icon: 'fa-solid fa-database text-blue-400', label: 'MongoDB' },
  { icon: 'fa-brands fa-python text-blue-500', label: 'Python' },
  { icon: 'fa-brands fa-docker text-blue-600', label: 'Docker' },
  { icon: 'fa-brands fa-git-alt text-orange-500', label: 'Git' },
  { icon: 'fa-solid fa-code text-purple-400', label: 'TypeScript' },
]

export default function Skills() {
  const scrollRef = useRef(null)

  useEffect(() => {
    gsap.fromTo('.skill-laptop-3d', { opacity: 0, scale: 0.7, rotateY: -30 }, {
      opacity: 1, scale: 1, rotateY: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: '.skill-laptop-3d', start: 'top 80%', toggleActions: 'play none none reverse' }
    })
  }, [])

  useEffect(() => {
    const section = document.getElementById('skills')
    const inner = scrollRef.current
    if (!section || !inner) return
    const obs = new IntersectionObserver(([entry]) => {
      inner.classList.toggle('scrolling', entry.isIntersecting)
    }, { threshold: 0.2 })
    obs.observe(section)
    return () => obs.disconnect()
  }, [])

  function getKeyboardRows() {
    return [
      [...Array(11).fill(''), 'wide'],
      ['wide', ...Array(12).fill('')],
      ['wide', ...Array(10).fill(''), 'wide'],
      ['wide', '', '', 'space', '', '', 'wide'],
    ]
  }

  return (
    <section id="skills" className="py-12 sm:py-16 lg:py-20 px-4 bg-dark-light/50 flex justify-center scroll-mt-20">
      <div className="max-w-6xl w-full flex flex-col items-center gap-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center">Skills</h2>
        <div className="flex justify-center w-full py-4">
          <div className="skill-laptop-3d">
            <div className="skill-laptop">
              <div className="skill-laptop-screen">
                <div className="skill-laptop-screen-inner">
                  <div className="skills-scroll-container" id="skillsScroll">
                    <div className="skills-scroll-inner" ref={scrollRef}>
                      {[...skillItems, ...skillItems].map((s, i) => (
                        <div key={i} className="skill-item">
                          <i className={`${s.icon} text-2xl`}></i>
                          <span>{s.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="skill-laptop-keyboard">
                <div className="keyboard-rows">
                  {getKeyboardRows().map((row, ri) => (
                    <div key={ri} className="keyboard-row">
                      {row.map((cls, ki) => <div key={ki} className={`key ${cls}`}></div>)}
                    </div>
                  ))}
                </div>
              </div>
              <div className="skill-laptop-base"></div>
              <div className="skill-screen-glow"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
