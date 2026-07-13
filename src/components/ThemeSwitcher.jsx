import { useState, useEffect } from 'react'

const THEMES = [
  { name: 'orange', color: '#FF6B35' },
  { name: 'green', color: '#22C55E' },
  { name: 'purple', color: '#A855F7' },
  { name: 'pink', color: '#EC4899' },
  { name: 'red', color: '#EF4444' },
  { name: 'yellow', color: '#EAB308' },
]

export default function ThemeSwitcher() {
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'orange'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <div className="fixed bottom-6 right-6 md:top-20 md:right-6 md:bottom-auto z-50 flex flex-col md:flex-row items-center gap-2">
      {open && (
        <div className="flex flex-col md:flex-row items-center gap-2 bg-dark-card/90 backdrop-blur-md border border-white/10 rounded-2xl md:rounded-full px-3 py-3 md:px-4 md:py-2 shadow-xl">
          {THEMES.map(t => (
            <button
              key={t.name}
              onClick={() => { setTheme(t.name); setOpen(false) }}
              className={`w-7 h-7 rounded-full border-2 transition-all hover:scale-125 ${theme === t.name ? 'border-white scale-110' : 'border-transparent'}`}
              style={{ background: t.color }}
              aria-label={t.name}
            />
          ))}
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-dark-card/90 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-transform"
        aria-label="Switch theme"
      >
        <i className="fa-solid fa-paintbrush text-primary text-base md:text-lg"></i>
      </button>
    </div>
  )
}