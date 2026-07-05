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
  const catRefs = useRef([])

  useEffect(() => {
    gsap.fromTo('.skill-laptop-3d', { opacity: 0, scale: 0.7, rotateY: -30 }, {
      opacity: 1, scale: 1, rotateY: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: '.skill-laptop-3d', start: 'top 80%', toggleActions: 'play none none reverse' }
    })
  }, [])

  useEffect(() => {
    catRefs.current.forEach((el, i) => {
      if (!el) return
      gsap.fromTo(el, { opacity: 0, y: 40, scale: 0.9 }, {
        opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.7)',
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' },
        delay: i * 0.1,
      })
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

  const skillCategories = [
    { icon: 'fa-solid fa-server text-primary', label: 'Backend', skills: ['REST API', 'JWT Auth', 'MongoDB', 'MySQL', 'Express'] },
    { icon: 'fa-solid fa-palette text-primary', label: 'Frontend', skills: ['React', 'Zustand', 'Tailwind'] },
    { icon: 'fa-solid fa-cloud text-primary', label: 'DevOps', skills: ['Docker', 'Kubernetes', 'Actions', 'Nginx'] },
    { icon: 'fa-solid fa-brain text-primary', label: 'System Design', skills: ['Client→Server→DB', 'Cache', 'Background Jobs'] },
  ]

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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-4xl">
          {skillCategories.map((cat, i) => (
            <div key={i} ref={el => catRefs.current[i] = el} className="bg-dark-card p-4 rounded-xl border border-white/5 hover:border-primary/30 transition-all text-center">
              <i className={`${cat.icon} text-2xl mb-2 block`}></i>
              <h4 className="font-semibold text-sm mb-2">{cat.label}</h4>
              <div className="flex flex-wrap gap-1.5 justify-center">
                {cat.skills.map(s => <span key={s} className="text-[11px] px-2 py-0.5 bg-primary/10 text-primary/80 rounded-full">{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
