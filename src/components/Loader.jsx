import { useState, useEffect } from 'react'

export default function Loader() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) { clearInterval(interval); return 100 }
        return prev + Math.random() * 25
      })
    }, 60)
    return () => clearInterval(interval)
  }, [])

  return (
    <div id="loader" className="fixed inset-0 z-[100] bg-dark flex items-center justify-center">
      <div className="text-center">
        <div className="w-32 h-20 bg-gray-800 rounded-t-lg border-2 border-gray-600 relative mb-4 mx-auto loader-bar">
          <div className="absolute inset-1 bg-dark rounded overflow-hidden">
            <div className="loader-code h-full flex flex-col justify-center px-2">
              <div className="h-1 bg-primary/50 rounded w-3/4 mb-1 animate-pulse" />
              <div className="h-1 bg-primary/30 rounded w-1/2 mb-1 animate-pulse" style={{ animationDelay: '0.2s' }} />
              <div className="h-1 bg-primary/40 rounded w-2/3 animate-pulse" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        </div>
        <div className="w-40 h-1.5 bg-gray-800 rounded-full overflow-hidden mx-auto">
          <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
        <p className="mt-3 text-gray-500 text-xs">Loading...</p>
      </div>
    </div>
  )
}
