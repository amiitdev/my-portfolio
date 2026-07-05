import { useEffect, useRef } from 'react'

const stops = [
  { icon: 'fa-solid fa-dharmachakra', title: 'Kubernetes', desc: 'Deployments, scaling' },
  { icon: 'fa-solid fa-cloud', title: 'Cloud', desc: 'AWS / GCP basics' },
  { icon: 'fa-solid fa-arrows-spin', title: 'CI/CD', desc: 'Pipelines & automation' },
  { icon: 'fa-solid fa-chart-simple', title: 'Monitoring', desc: 'Logging & observability' },
]
const positions = [15, 38, 62, 85]

export default function Roadmap() {
  const sectionRef = useRef(null)
  const trainRef = useRef(null)
  const stopEls = useRef([])
  const cardEls = useRef([])
  const done = useRef(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true
        e.target.classList.add('visible')
        runTrain()
      }
    }, { threshold: 0.3 })
    obs.observe(section)
    return () => obs.disconnect()
  }, [])

  function runTrain() {
    const section = sectionRef.current
    const train = trainRef.current
    if (!section || !train) return
    const w = section.offsetWidth
    train.style.transition = 'none'
    train.style.left = '-150px'
    train.style.opacity = '1'
    positions.forEach((pos, i) => {
      const target = (pos / 100) * w - 50
      setTimeout(() => {
        train.style.transition = 'left 0.8s cubic-bezier(0.22, 1, 0.36, 1)'
        train.style.left = target + 'px'
        setTimeout(() => {
          stopEls.current[i]?.classList.add('active')
          cardEls.current[i]?.classList.add('revealed')
        }, 400)
      }, i === 0 ? 200 : (i * 900) + 200)
    })
    setTimeout(() => {
      train.style.transition = 'left 0.8s cubic-bezier(0.22, 1, 0.36, 1)'
      train.style.left = (w + 200) + 'px'
    }, (positions.length * 900) + 800)
  }

  return (
    <section id="roadmap" ref={sectionRef} className="py-12 sm:py-16 lg:py-20 px-4 relative overflow-hidden flex justify-center scroll-mt-20">
      <div className="train-track">
        {positions.map((pos, i) => (
          <div key={i} ref={el => stopEls.current[i] = el} className="track-stop" style={{ left: `${pos}%` }}>
            <span>{stops[i].title}</span>
          </div>
        ))}
      </div>
      <div className="train" ref={trainRef}>
        <div className="train-engine">
          <div className="train-smoke"></div>
          <i className="fa-solid fa-train text-white text-sm"></i>
        </div>
        <div className="train-car"></div>
        <div className="train-car"></div>
      </div>
      <div className="max-w-6xl w-full relative z-10">
        <div className="text-center mb-16">
          <p className="text-primary text-sm tracking-widest uppercase mb-2"><i className="fa-solid fa-road mr-2"></i>What's Next</p>
          <h2 className="text-3xl sm:text-4xl font-bold">Learning Roadmap</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stops.map((s, i) => (
            <div key={i} ref={el => cardEls.current[i] = el} className="roadmap-card" data-stop={i}>
              <div className="roadmap-card-inner">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <i className={`${s.icon} text-2xl text-primary`}></i>
                </div>
                <h3 className="font-semibold mb-1">{s.title}</h3>
                <p className="text-gray-400 text-sm">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
