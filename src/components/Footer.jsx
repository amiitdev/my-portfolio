export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-dark/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12 flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center sm:items-start gap-1">
          <p className="text-gray-400 text-sm">&copy; 2026 Amit Kumar. All rights reserved.</p>
          <p className="text-gray-600 text-xs">Built with React, Tailwind CSS & GSAP</p>
        </div>
        <div className="flex items-center gap-3">
          <a href="https://github.com/amiitdev" target="_blank" rel="noreferrer"
            className="w-9 h-9 bg-dark-card border border-white/10 rounded-lg flex items-center justify-center hover:border-primary/50 hover:bg-primary/10 hover:text-primary transition-all text-gray-500"
          ><i className="fa-brands fa-github text-sm"></i></a>
          <a href="https://www.linkedin.com/in/amit1924" target="_blank" rel="noreferrer"
            className="w-9 h-9 bg-dark-card border border-white/10 rounded-lg flex items-center justify-center hover:border-primary/50 hover:bg-primary/10 hover:text-primary transition-all text-gray-500"
          ><i className="fa-brands fa-linkedin-in text-sm"></i></a>
          <a href="mailto:amit@example.com" rel="noreferrer"
            className="w-9 h-9 bg-dark-card border border-white/10 rounded-lg flex items-center justify-center hover:border-primary/50 hover:bg-primary/10 hover:text-primary transition-all text-gray-500"
          ><i className="fa-solid fa-envelope text-sm"></i></a>
        </div>
      </div>
    </footer>
  )
}
