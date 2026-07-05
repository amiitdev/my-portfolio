import gsap from 'gsap';
import { useEffect } from 'react';

export default function Hero() {
  useEffect(() => {
    gsap.fromTo(
      '.ipad-wrapper',
      { opacity: 0, scale: 0.6, rotateY: -20 },
      { opacity: 1, scale: 1, rotateY: 0, duration: 1.4, ease: 'power3.out', delay: 0.3 },
    );
    gsap.fromTo(
      '.ipad-glow',
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, duration: 1, ease: 'power3.out', delay: 0.5 },
    );
    gsap.fromTo(
      '.ipad-badge',
      { opacity: 0, scale: 0, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out(2)', stagger: 0.15, delay: 0.8 },
    );
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-4 pt-20 relative scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto w-full flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
        <div className="flex-1 text-center lg:text-left animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-primary/10 border border-primary/20 rounded-full mb-4 sm:mb-6">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            <span className="text-primary text-xs sm:text-sm font-medium">
              Available for opportunities
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-3 sm:mb-4 leading-tight">
            Hi, I'm <span className="text-primary">Amit Kumar</span>
          </h1>
          <p className="text-gray-400 text-base sm:text-lg md:text-xl max-w-xl mx-auto lg:mx-0 mb-1 sm:mb-2">
            Full Stack Developer with strong backend focus
          </p>
          <p className="text-gray-500 text-xs sm:text-sm md:text-base max-w-xl mx-auto lg:mx-0 mb-6 sm:mb-8">
            Building scalable apps | Learning DevOps & System Design
          </p>
          <div className="flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-3">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-2.5 bg-primary rounded-lg text-white font-semibold hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/25 transition-all text-sm sm:text-base"
            >
              <i className="fa-solid fa-folder-open mr-2"></i>View Projects
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-2.5 border border-gray-500 rounded-lg text-gray-300 font-semibold hover:border-primary hover:text-primary hover:bg-primary/5 transition-all text-sm sm:text-base"
            >
              <i className="fa-solid fa-paper-plane mr-2"></i>Contact Me
            </a>
          </div>
          <div className="flex items-center justify-center lg:justify-start gap-3 sm:gap-4 mt-6 sm:mt-8">
            <a
              href="https://github.com/amiitdev"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 sm:w-10 sm:h-10 bg-dark-card border border-white/10 rounded-lg flex items-center justify-center hover:border-primary/50 hover:bg-primary/10 transition-all"
            >
              <i className="fa-brands fa-github text-sm sm:text-base text-gray-400 hover:text-primary"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/amit1924"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 sm:w-10 sm:h-10 bg-dark-card border border-white/10 rounded-lg flex items-center justify-center hover:border-primary/50 hover:bg-primary/10 transition-all"
            >
              <i className="fa-brands fa-linkedin-in text-sm sm:text-base text-gray-400 hover:text-primary"></i>
            </a>
          </div>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <div className="ipad-wrapper">
            <div className="ipad-glow"></div>
            <div className="ipad">
              <div className="ipad-bezel">
                <div className="ipad-camera"></div>
                <div className="ipad-screen">
                  <video autoPlay muted loop playsInline>
                    <source src="/github.mp4" type="video/mp4" />
                  </video>
                  <div className="ipad-screen-overlay"></div>
                </div>
                <div className="ipad-home-btn"></div>
              </div>
              <div className="ipad-shadow"></div>
            </div>
            <div className="ipad-badge ipad-badge-1">
              <i className="fa-brands fa-react"></i>
            </div>
            <div className="ipad-badge ipad-badge-2">
              <i className="fa-brands fa-node-js"></i>
            </div>
            <div className="ipad-badge ipad-badge-3">
              <i className="fa-solid fa-fire"></i>
            </div>
            <div className="ipad-badge ipad-badge-4">
              <i className="fa-brands fa-docker"></i>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        {/* <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div> */}
      </div>
    </section>
  );
}
