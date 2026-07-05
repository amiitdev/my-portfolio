import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState, useCallback } from 'react';

gsap.registerPlugin(ScrollTrigger);

const items = [
  {
    icon: 'rocket',
    title: 'Full Stack Developer',
    desc: 'Strong backend focus with Node.js, Express, MongoDB',
  },
  {
    icon: 'gear',
    title: 'Scalable Applications',
    desc: 'Building real-world production-ready systems',
  },
  { icon: 'docker', title: 'DevOps Learning', desc: 'Docker, Kubernetes, CI/CD pipelines' },
  { icon: 'brain', title: 'System Design', desc: 'Architecture, caching, background jobs' },
];

const stats = [
  { value: '19+', label: 'Repos', icon: 'code-branch' },
  { value: '8+', label: 'Tech Stack', icon: 'wrench' },
  { value: '5+', label: 'Projects', icon: 'folder' },
  { value: '∞', label: 'Passion', icon: 'heart' },
];

const particles = Array.from({ length: 20 }, (_, i) => i);

export default function About() {
  const itemsRef = useRef([]);
  const statsRef = useRef([]);
  const [roar, setRoar] = useState(false);
  const hologramRef = useRef(null);
  const videoRef = useRef(null);
  const [inView, setInView] = useState(false);

  const handleRoar = useCallback(() => {
    if (roar) return;
    setRoar(true);
    const el = hologramRef.current;
    if (!el) return;
    gsap.timeline()
      .to(el, { scale: 2.2, y: -40, duration: 0.4, ease: 'back.out(3)' })
      .to(el, { scale: 1, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.3)' }, '+=0.6')
      .call(() => setRoar(false));
    gsap.timeline()
      .to('.roar-overlay', { opacity: 1, scale: 1.5, duration: 0.3, ease: 'power2.out' })
      .to('.roar-overlay', { opacity: 0, scale: 0, duration: 0.5, ease: 'power3.out' }, '+=0.5');
    gsap.fromTo('.about-hologram-wrapper', { x: 0 }, {
      x: 8, duration: 0.05, repeat: 8, yoyo: true, ease: 'none',
    });
  }, [roar]);

  useEffect(() => {
    const video = videoRef.current;
    const section = document.getElementById('about');
    if (!video || !section) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        video.play().catch(() => {});
      } else {
        setInView(false);
        video.pause();
      }
    }, { threshold: 0.2 });
    obs.observe(section);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#about',
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
    });
    tl.set('.about-hologram', { opacity: 0, scale: 0.05, y: 100, filter: 'blur(8px)' })
      .set('.hologram-beam', { scaleY: 0, opacity: 0 })
      .to('.hologram-beam', { scaleY: 1, opacity: 1, duration: 0.4, ease: 'power2.out' })
      .to('.about-hologram', { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power4.out' }, '-=0.2')
      .to('.hologram-glow-burst', { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' }, '-=0.8')
      .fromTo('.hologram-particle', { opacity: 0, scale: 0, y: 10 }, {
        opacity: 1, scale: 1, y: gsap.utils.random(-100, -40), duration: 1, ease: 'power1.out', stagger: 0.03,
      }, '-=0.6');

    itemsRef.current.forEach((el, i) => {
      gsap.fromTo(el, { opacity: 0, x: -80 }, {
        opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' },
        delay: i * 0.12,
      });
    });

    statsRef.current.forEach((el, i) => {
      gsap.fromTo(el, { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.5)',
        scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none reverse' },
        delay: i * 0.1,
      });
      const num = el.querySelector('.stat-value');
      if (num) {
        const target = parseInt(num.textContent);
        if (!isNaN(target)) {
          ScrollTrigger.create({
            trigger: el, start: 'top 80%',
            onEnter: () => {
              gsap.fromTo(num, { textContent: 0 }, {
                textContent: target, duration: 1.5, ease: 'power2.out', snap: { textContent: 1 },
                onUpdate() { num.textContent = Math.round(gsap.getProperty(num, 'textContent')); },
              });
            },
            once: true,
          });
        }
      }
    });
  }, [inView]);

  return (
    <section id="about" className="py-12 mt-4 sm:py-16 lg:py-20 px-4 flex justify-center scroll-mt-20 relative">
      <div className="max-w-6xl w-full relative z-10">
        <div className="text-center mb-12">
          <p className="text-primary text-sm tracking-widest uppercase mb-2">
            <i className="fa-solid fa-user mr-2"></i>About Me
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold">Who I Am</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-4">
            {items.map((item, i) => (
              <div
                key={i}
                ref={(el) => (itemsRef.current[i] = el)}
                className="about-item flex items-start gap-4 p-4 bg-dark-card rounded-xl border border-white/5 hover:border-primary/30 transition-all"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className={`fa-solid fa-${item.icon} text-primary`}></i>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">{item.title}</h4>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
              <div className="about-hologram-wrapper">
              <div className="hologrum-reflection"></div>
              <div className="hologram-beam"></div>
              <div className="hologram-glow-burst"></div>
              {particles.map((i) => (
                <div key={i} className="hologram-particle" style={{
                  left: `${10 + Math.random() * 80}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  width: `${2 + Math.random() * 3}px`,
                  height: `${2 + Math.random() * 3}px`,
                }}></div>
              ))}
              <div className="about-hologram" ref={hologramRef} onClick={handleRoar} style={{ cursor: 'pointer' }}>
                <div className="about-hologram-border"></div>
                <div className="roar-overlay"></div>
                <video ref={videoRef} muted loop playsInline>
                  <source src="/about.mp4" type="video/mp4" />
                </video>
                <div className="about-hologram-scanlines"></div>
              </div>
            </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 lg:mt-14">
          {stats.map((stat, i) => (
            <div
              key={i}
              ref={(el) => (statsRef.current[i] = el)}
              className="about-card bg-dark-card p-4 sm:p-5 rounded-2xl border border-white/5 text-center hover:border-primary/30 transition-all"
            >
              <div className="stat-value text-2xl sm:text-3xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-gray-400 text-xs sm:text-sm">
                <i className={`fa-solid fa-${stat.icon} mr-1`}></i>{stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
