import { useRef, useEffect } from 'react'

const words = ['JavaScript','React','Node.js','MongoDB','TypeScript','Docker','Python','Express','Git','Kubernetes','REST API','JWT','MySQL','Tailwind','CSS','HTML','Linux','Nginx','AWS','CI/CD','GraphQL','Redis','Next.js','PostgreSQL','API']
const colors = ['#FF6B35','#00d4ff','#ff3e8a','#39ff14','#ffdd00','#a855f7','#06b6d4','#f97316','#ec4899','#10b981']

export default function StarsCanvas() {
  const canvasRef = useRef(null)
  const dropsRef = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      dropsRef.current = []
      const columns = Math.ceil(canvas.width / 250)
      for (let i = 0; i < columns; i++) {
        dropsRef.current.push({
          x: i * 250 + Math.random() * 80,
          y: Math.random() * canvas.height * -1,
          speed: Math.random() * 0.15 + 0.05,
          word: words[Math.floor(Math.random() * words.length)],
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: Math.random() * 0.08 + 0.03,
        })
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const d of dropsRef.current) {
        ctx.save()
        ctx.font = "500 11px 'Inter', sans-serif"
        ctx.globalAlpha = d.opacity
        ctx.shadowColor = d.color
        ctx.shadowBlur = 6
        ctx.fillStyle = d.color
        ctx.fillText(d.word, d.x, d.y)
        ctx.restore()
        d.y += d.speed
        if (d.y > canvas.height + 30) {
          d.y = -30 - Math.random() * 100
          d.word = words[Math.floor(Math.random() * words.length)]
          d.color = colors[Math.floor(Math.random() * colors.length)]
        }
      }
      animId = requestAnimationFrame(animate)
    }

    resize()
    animate()
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas ref={canvasRef} id="starsCanvas" />
}
