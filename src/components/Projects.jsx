import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  { title: 'Shopify Docker', desc: 'Production-ready e-commerce with Docker, Kubernetes, Nginx & rolling updates.', icon: 'fa-brands fa-docker', color: '#2496ED', tags: ['Docker', 'K8s'], link: 'https://github.com/amiitdev/shopify-docker' },
  { title: 'Cloud Native Auth', desc: 'Full stack auth on Minikube with Docker, K8s, Nginx, React & MongoDB.', icon: 'fa-solid fa-cloud', color: '#4ade80', tags: ['React', 'Node'], link: 'https://github.com/amiitdev/cloud-native-auth-system' },
  { title: 'Fitness Tracker', desc: 'Track workouts, calories & progress. Full-stack TypeScript app.', icon: 'fa-solid fa-dumbbell', color: '#a855f7', tags: ['TypeScript', 'MongoDB'], link: 'https://github.com/amiitdev/fitness-tracker' },
  { title: 'Job Agent AI', desc: 'AI-powered job agent that automates job search & applications.', icon: 'fa-solid fa-robot', color: '#f97316', tags: ['Python', 'AI'], link: 'https://github.com/amiitdev/job-agent-ai' },
  { title: 'Price Scrapper', desc: 'Web scraper tracking price changes across e-commerce platforms.', icon: 'fa-solid fa-tags', color: '#eab308', tags: ['TypeScript', 'Node'], link: 'https://github.com/amiitdev/price-scrapper' },
  { title: 'Expo Chat App', desc: 'Real-time cross-platform chat built with Expo & TypeScript.', icon: 'fa-solid fa-comments', color: '#ef4444', tags: ['Expo', 'TS'], link: 'https://github.com/amiitdev/expo-chat-app' },
]

export default function Projects() {
  const carouselRef = useRef(null)
  const rotation = useRef(0)
  const lastTime = useRef(0)
  const hovered = useRef(false)
  const cardsRef = useRef([])

  useEffect(() => {
    gsap.fromTo('.carousel-wrapper', {
      opacity: 0, y: 60, rotateX: 8,
    }, {
      opacity: 1, y: 0, rotateX: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: '#projects', start: 'top 75%', toggleActions: 'play none none reverse' },
    })

    const count = projects.length
    const angleStep = 360 / count
    const radius = 340

    const el = carouselRef.current
    if (!el) return

    el.querySelectorAll('.carousel-card').forEach((card, i) => {
      card.style.transform = `rotateY(${angleStep * i}deg) translateZ(${radius}px)`
    })

    lastTime.current = performance.now()
    let id
    function animate() {
      const now = performance.now()
      if (!hovered.current) rotation.current -= 360 * ((now - lastTime.current) / 20000)
      lastTime.current = now
      el.style.transform = `translateZ(-340px) rotateY(${rotation.current}deg)`
      id = requestAnimationFrame(animate)
    }
    id = requestAnimationFrame(animate)

    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) e.target.classList.add('visible') }, { threshold: 0.1 })
    const section = document.getElementById('projects')
    if (section) obs.observe(section)
    return () => { cancelAnimationFrame(id); obs.disconnect() }
  }, [])

  const rotate = (dir) => {
    rotation.current += dir * 60
    if (carouselRef.current) carouselRef.current.style.transform = `translateZ(-340px) rotateY(${rotation.current}deg)`
  }

  return (
    <section id="projects" className="py-12 sm:py-16 lg:py-20 px-4 flex justify-center scroll-mt-20">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-12">
          <p className="text-primary text-sm tracking-widest uppercase mb-2"><i className="fa-solid fa-folder-open mr-2"></i>My Work</p>
          <h2 className="text-3xl sm:text-4xl font-bold">Projects</h2>
        </div>
        <div className="carousel-wrapper">
          <div className="carousel" id="carousel" ref={carouselRef}
            onMouseEnter={() => hovered.current = true}
            onMouseLeave={() => { hovered.current = false; lastTime.current = performance.now() }}
          >
            {projects.map((p, i) => (
              <div key={i} className="carousel-card" ref={el => cardsRef.current[i] = el}>
                <div className="carousel-card-inner">
                  <div className="carousel-card-header" style={{ background: `linear-gradient(135deg, ${p.color}22, ${p.color}08)` }}>
                    <i className={p.icon} style={{ color: p.color }}></i>
                  </div>
                  <div className="carousel-card-body">
                    <h3>{p.title}</h3>
                    <p>{p.desc}</p>
                    <div className="carousel-card-tags">
                      {p.tags.map(t => <span key={t}>{t}</span>)}
                    </div>
                    <a href={p.link} target="_blank" rel="noreferrer" className="carousel-card-link">
                      <i className="fa-brands fa-github"></i> View on GitHub <i className="fa-solid fa-arrow-right text-[10px]"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="carousel-nav carousel-nav-prev" onClick={() => rotate(1)}>
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <button className="carousel-nav carousel-nav-next" onClick={() => rotate(-1)}>
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
        <div className="text-center mt-10">
          <a href="https://github.com/amiitdev?tab=repositories" target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-primary/50 rounded-lg text-primary hover:bg-primary hover:text-white transition-all"
          ><i className="fa-brands fa-github"></i> View All Repos <i className="fa-solid fa-arrow-right"></i></a>
        </div>
      </div>
    </section>
  )
}
