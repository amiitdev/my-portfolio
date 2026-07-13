import { useState, useEffect } from 'react'

const links = [
  ['#home', 'house', 'Home'],
  ['#about', 'user', 'About'],
  ['#skills', 'laptop-code', 'Skills'],
  ['#projects', 'folder-open', 'Projects'],
  ['#roadmap', 'road', 'Roadmap'],
  ['#contact', 'envelope', 'Contact'],
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      let current = 'home'
      document.querySelectorAll('section[id]').forEach(s => {
        if (window.scrollY >= s.offsetTop - 100) current = s.id
      })
      setActive(current)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (href) => {
    const el = document.querySelector(href)
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <nav id="navbar" className="fixed top-0 w-full z-50 bg-dark/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <a href="#home" onClick={e => { e.preventDefault(); scrollTo('#home') }}
          className="text-xl font-bold text-primary flex items-center gap-2"
        ><i className="fa-solid fa-code text-lg" /> Amit</a>

        <ul className="hidden md:flex gap-6">
          {links.map(([href, icon, label]) => (
            <li key={href}>
              <a href={href} onClick={e => { e.preventDefault(); scrollTo(href) }}
                className={`nav-link text-sm transition-colors ${active === href.slice(1) ? 'text-white active' : 'text-gray-400 hover:text-primary'}`}
              ><i className={`fa-solid fa-${icon} mr-1`} />{label}</a>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setMenuOpen(p => !p)}
          className="md:hidden relative w-10 h-10 flex items-center justify-center group hover:bg-primary/10 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          <div className={`w-5 h-4 flex flex-col justify-between transition-transform duration-300 ${menuOpen ? 'rotate-180' : ''}`}>
            <span className={`block h-[3px] w-full bg-primary rounded-full transition-all duration-300 origin-center ${menuOpen ? 'translate-y-[6.5px] rotate-45' : ''}`}></span>
            <span className={`block h-[3px] w-full bg-primary rounded-full transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`}></span>
            <span className={`block h-[3px] w-full bg-primary rounded-full transition-all duration-300 origin-center ${menuOpen ? '-translate-y-[6.5px] -rotate-45' : ''}`}></span>
          </div>
        </button>
      </div>

      <div
        className={`md:hidden transition-all duration-400 ease-out overflow-hidden ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
        style={{ pointerEvents: menuOpen ? 'auto' : 'none' }}
      >
        <ul className="nav-mobile-menu flex flex-col py-3 px-4 mx-3 mb-3 rounded-2xl bg-[#0f0f0f] border border-primary/30">
          {links.map(([href, icon, label], i) => (
            <li key={href}
              style={{ transitionDelay: menuOpen ? `${i * 50}ms` : '0ms' }}
              className={`transition-all duration-300 ${menuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}
            >
              <a href={href} onClick={e => { e.preventDefault(); scrollTo(href) }}
                className={`flex items-center gap-3 px-4 py-3 my-0.5 rounded-xl text-sm font-medium transition-all ${
                  active === href.slice(1)
                    ? 'text-white bg-primary/20 nav-link-active-shadow border border-primary/30'
                    : 'text-gray-300 hover:text-white hover:bg-primary/10 border border-transparent hover:border-primary/20'
                }`}
              ><i className={`fa-solid fa-${icon} w-5 text-center ${active === href.slice(1) ? 'text-primary' : 'text-primary/70'}`} />{label}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
