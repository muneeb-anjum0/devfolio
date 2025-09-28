import { useState, useEffect, useRef } from 'react';

const NAV_LINKS = ['About', 'Skills', 'Experience', 'Projects', 'Education'] as const;

interface NavbarProps {
  currentSection?: string;
}


export default function Navbar({ currentSection }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [showNavbar, setShowNavbar] = useState(true);
  const navRef = useRef<HTMLElement>(null)
  const lastScrollY = useRef(0);
  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    const handleScroll = () => {
      // Only apply scroll hide/show on mobile (width < 1024px)
      if (window.innerWidth >= 1024) {
        setShowNavbar(true);
        return;
      }
      const currentScrollY = window.scrollY;
      if (currentScrollY <= 0) {
        setShowNavbar(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        // Scrolling down
        setShowNavbar(false);
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling up
        setShowNavbar(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll); // update on resize
    // Set initial state
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setMobileOpen(false)
      }
    }

    if (mobileOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [mobileOpen])

  // Use hash-based navigation for GitHub Pages compatibility
  const scrollTo = (id: string) => {
    window.location.hash = `#${id}`;
    setMobileOpen(false);
  };

  // --- Animation state for mobile menu ---
  const [flyoutVisible, setFlyoutVisible] = useState(false);
  // Synchronize menu fade and hamburger cross for seamlessness
  useEffect(() => {
    if (mobileOpen) {
      setFlyoutVisible(true);
    } else if (flyoutVisible) {
      // Wait for fade-out animation before hiding
      const timeout = setTimeout(() => setFlyoutVisible(false), 320); // match fade duration
      return () => clearTimeout(timeout);
    }
  }, [mobileOpen, flyoutVisible]);

  const [logoHover, setLogoHover] = useState(false);

  return (
    <nav
      ref={navRef}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 select-none border-b border-transparent
        ${showNavbar ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
        bg-transparent
  lg:bg-black/0 lg:backdrop-blur-md lg:border-b lg:border-black/30
      `}
      style={{ pointerEvents: showNavbar ? 'auto' : 'none' }}
    >
      {/* Terminal-style navbar container */}
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 relative">
        {/* Brand logo using SVG with hover effect */}
        <button
          onClick={() => scrollTo('home')}
          className="flex items-center group hover:scale-105 transform transition-all duration-200"
          style={{ padding: 0, background: 'none', border: 'none' }}
          onMouseEnter={() => setLogoHover(true)}
          onMouseLeave={() => setLogoHover(false)}
        >
          <img
            src={logoHover ? "/greater-underscore-light.svg" : "/greater-underscore.svg"}
            alt=">_ icon"
            className="h-12 w-12 object-contain"
            style={{ maxHeight: '48px', maxWidth: '48px' }}
          />
        </button>

        {/* Center nav links - terminal style (desktop only) */}
        <ul className="hidden lg:flex items-center space-x-1">
          {NAV_LINKS.map((label) => {
            const sectionId = label.toLowerCase();
            const isActive = currentSection === sectionId;
            return (
              <li key={label}>
                <button
                  onClick={() => scrollTo(sectionId)}
                  className={`px-4 py-1 font-mono text-base flex items-center gap-2 rounded-md transition-colors duration-200
                    ${isActive
                      ? 'bg-black text-gray-100 font-bold border border-gray-700/60 ring-1 ring-gray-500/40 ring-offset-1 ring-offset-black shadow-sm'
                      : 'text-gray-300 hover:text-gray-00 hover:bg-black'}
                  `}
                  style={isActive ? { boxShadow: '0 1px 6px 0 #0003, 0 0 0 1.5px #4448', transition: 'box-shadow 0.2s, border-color 0.2s, background 0.2s, color 0.2s' } : { transition: 'box-shadow 0.2s, border-color 0.2s, background 0.2s, color 0.2s' }}
                >
                  <span>
                    <span className="text-blue-400">.</span>
                    <span className="text-gray-600">/</span>
                  </span>
                  <span>
                    {sectionId}
                    <span className="text-green-400">.</span>sh
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Right-side: Terminal-style CTA + mobile toggle */}
  <div className="flex items-center space-x-4 relative">
          {/* Desktop Contact CTA - terminal button style */}
          <a
            href="#contact"
            onClick={() => scrollTo('contact')}
            className="hidden lg:flex group relative items-center px-4 py-2 font-mono text-sm border-2 border-gray-400 text-white bg-black hover:bg-gray-200 hover:text-black hover:border-gray-600 transition-all duration-300 gap-2 overflow-hidden hover:scale-105 hover:shadow-lg hover:shadow-gray-400/30 hover:-translate-y-1"
            style={{ minWidth: '120px', justifyContent: 'center' }}
          >
            <span className="absolute -inset-1 bg-gray-400 opacity-10 group-hover:bg-gray-200 group-hover:opacity-20 group-hover:animate-pulse transition-all duration-300 border-2 border-gray-400 rounded-lg"></span>
            <span className="relative flex items-center gap-2">
              <span className="animate-bounce group-hover:animate-pulse text-white group-hover:text-black">$</span>
              <span className="group-hover:tracking-wider transition-all duration-300 text-white group-hover:text-black">./contact</span>
              <span className="text-white group-hover:text-black opacity-100 group-hover:animate-bounce transition-colors duration-300">↗</span>
            </span>
          </a>

          {/* Mobile hamburger - terminal style, also acts as close button for flyout */}
          <button
            onClick={() => {
              if (!mobileOpen) setFlyoutVisible(true);
              setMobileOpen((o) => !o);
            }}
            className={`lg:hidden p-2 text-green-400 hover:text-white transition-colors duration-200 font-mono relative z-50`}
            aria-label="Toggle menu"
            style={{ zIndex: 1001 }}
          >
            <span className="relative w-7 h-7 flex flex-col items-center justify-center">
              {/* Top bar - blue */}
              <span
                className={`block absolute h-0.5 w-7 rounded transition-all duration-300 ease-in-out origin-center ${mobileOpen ? 'rotate-45 top-3.5 left-0' : 'top-2 left-0'}`}
                style={{ backgroundColor: '#3b82f6' }} // Tailwind blue-500
              ></span>
              {/* Middle bar - white, seamless subtle shrink and vanish to left when open */}
              <span
                className={`block absolute h-0.5 w-7 rounded origin-left ${mobileOpen ? 'top-3.5 left-0' : 'top-3.5 left-0'}`}
                style={{
                  backgroundColor: '#fff',
                  transform: mobileOpen ? 'scaleX(0)' : 'scaleX(1)',
                  opacity: mobileOpen ? 0 : 1,
                  transition: 'transform 400ms cubic-bezier(0.4,0,0.2,1), opacity 400ms cubic-bezier(0.4,0,0.2,1)',
                }}
              ></span>
              {/* Bottom bar - green */}
              <span
                className={`block absolute h-0.5 w-7 rounded transition-all duration-300 ease-in-out origin-center ${mobileOpen ? '-rotate-45 top-3.5 left-0' : 'top-5 left-0'}`}
                style={{ backgroundColor: '#22c55e' }} // Tailwind green-500
              ></span>
            </span>
          </button>

          {/* Flyout menu, positioned below hamburger */}
          {(flyoutVisible || mobileOpen) && (
            <div
              className={`lg:hidden fixed top-0 right-0 z-[999] bg-black/90 backdrop-blur-md flex flex-col items-center justify-start pt-0 pr-12 pl-2 select-none border-l border-black/40 max-w-lg rounded-l-xl shadow-2xl transition-all duration-300 ${mobileOpen ? 'simple-fade-in' : 'simple-fade-out pointer-events-none opacity-0'}`}
              style={{boxShadow:'-8px 0 32px 0 rgba(0,0,0,0.85)', height:'100vh', width: '100vw', maxWidth: '480px', marginTop: '0'}}
            >
              {/* Navigation Commands - start right from the top */}
              <div className="w-full max-w-md mx-auto flex-1 flex flex-col justify-start gap-2 py-2">
                {/* Init Section - now above About */}
                {/* Init Section - moved above About */}
                <a
                  href="#home"
                  onClick={() => { scrollTo('home'); setMobileOpen(false); }}
                  className="mx-auto w-3/4 group relative px-3 py-2 mt-2 font-mono text-base border border-blue-400 text-blue-400 bg-black hover:bg-blue-900 hover:text-white hover:border-transparent transition-all duration-300 flex items-center justify-center gap-2 rounded-lg hover:scale-105 hover:shadow-lg hover:shadow-blue-400/20 hover:-translate-y-1 overflow-hidden"
                  style={{ minWidth: '120px' }}
                  onTouchStart={e => e.currentTarget.classList.add('active-nav-btn-init')}
                  onTouchEnd={e => e.currentTarget.classList.remove('active-nav-btn-init')}
                  onMouseDown={e => e.currentTarget.classList.add('active-nav-btn-init')}
                  onMouseUp={e => e.currentTarget.classList.remove('active-nav-btn-init')}
                >
                  <span className="relative flex items-center gap-2">
                    <span className="animate-bounce group-hover:animate-pulse">&gt;</span>
                    <span className="group-hover:tracking-wider transition-all duration-300">Initialize</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:animate-bounce">↗</span>
                  </span>
                </a>
                {/* Nav Links - About first, then rest */}
                {NAV_LINKS.map((label) => {
                  const sectionId = label.toLowerCase();
                  const isActive = currentSection === sectionId;
                  if (label === 'About') {
                    return (
                      <button
                        key={label}
                        onClick={() => { scrollTo(sectionId); setMobileOpen(false); }}
                        className={`mx-auto w-3/4 text-left py-2 px-3 rounded-lg font-mono text-base flex items-center gap-2 border group transition-all duration-300
                          ${isActive ? 'bg-black text-blue-400 font-bold border-[1.5px] border-gradient-to-r from-blue-400 to-green-400 shadow-md scale-105' : 'text-gray-300 border-gray-500 hover:text-white hover:bg-black/80 hover:border-transparent hover:scale-105'}`}
                        style={{ letterSpacing: '0.02em', transition: 'box-shadow 0.2s, border-color 0.2s, background 0.2s, color 0.2s', borderImage: isActive ? 'linear-gradient(to right, #60a5fa, #22d3ee, #22c55e) 1' : undefined }}
                        onTouchStart={e => e.currentTarget.classList.add('active-nav-btn')}
                        onTouchEnd={e => e.currentTarget.classList.remove('active-nav-btn')}
                        onMouseDown={e => e.currentTarget.classList.add('active-nav-btn')}
                        onMouseUp={e => e.currentTarget.classList.remove('active-nav-btn')}
                      >
                        <span className="text-blue-400">.</span>
                        <span className="text-green-400">/</span>
                        <span className="text-gray-400">{sectionId}</span>
                        <span className="ml-auto text-xs text-gray-500">01</span>
                      </button>
                    );
                  }
                  return null;
                })}
                {NAV_LINKS.filter(label => label !== 'About').map((label, index) => {
                  const sectionId = label.toLowerCase();
                  const isActive = currentSection === sectionId;
                  return (
                    <button
                      key={label}
                      onClick={() => { scrollTo(sectionId); setMobileOpen(false); }}
                      className={`mx-auto w-3/4 text-left py-2 px-3 rounded-lg font-mono text-base flex items-center gap-2 border group transition-all duration-300
                        ${isActive ? 'bg-black text-blue-400 font-bold border-[1.5px] border-gradient-to-r from-blue-400 to-green-400 shadow-md scale-105' : 'text-gray-300 border-gray-500 hover:text-white hover:bg-black/80 hover:border-transparent hover:scale-105'}`}
                      style={{ letterSpacing: '0.02em', transition: 'box-shadow 0.2s, border-color 0.2s, background 0.2s, color 0.2s', borderImage: isActive ? 'linear-gradient(to right, #60a5fa, #22d3ee, #22c55e) 1' : undefined }}
                      onTouchStart={e => e.currentTarget.classList.add('active-nav-btn')}
                      onTouchEnd={e => e.currentTarget.classList.remove('active-nav-btn')}
                      onMouseDown={e => e.currentTarget.classList.add('active-nav-btn')}
                      onMouseUp={e => e.currentTarget.classList.remove('active-nav-btn')}
                    >
                      <span className="text-blue-400">.</span>
                      <span className="text-green-400">/</span>
                      <span className="text-gray-400">{sectionId}</span>
                      <span className="ml-auto text-xs text-gray-500">0{index + 2}</span>
                    </button>
                  );
                })}
                {/* Contact Section */}
                <a
                  href="#contact"
                  onClick={() => { scrollTo('contact'); setMobileOpen(false); }}
                  className="mx-auto w-3/4 group relative px-3 py-2 mt-2 font-mono text-base border border-gray-500 text-green-400 bg-black hover:bg-green-900 hover:text-white hover:border-transparent transition-all duration-300 flex items-center justify-center gap-2 rounded-lg hover:scale-105 hover:shadow-lg hover:shadow-green-400/20 hover:-translate-y-1 overflow-hidden"
                  style={{ minWidth: '120px' }}
                  onTouchStart={e => e.currentTarget.classList.add('active-nav-btn')}
                  onTouchEnd={e => e.currentTarget.classList.remove('active-nav-btn')}
                  onMouseDown={e => e.currentTarget.classList.add('active-nav-btn')}
                  onMouseUp={e => e.currentTarget.classList.remove('active-nav-btn')}
                >
                  <span className="relative flex items-center gap-2">
                    <span className="animate-bounce group-hover:animate-pulse">$</span>
                    <span className="group-hover:tracking-wider transition-all duration-300">contact</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:animate-bounce">↗</span>
                  </span>
                </a>
              </div>
              {/* Terminal Footer */}
              <div className="w-full max-w-md mx-auto pb-2 bg-black rounded-b-xl">
                <div className="font-mono text-xs text-gray-500 text-center">
                  <span className="text-green-400">●</span> mobile
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* KEYFRAMES & UTILITIES for button animations */}
      <style>{`
        .active-nav-btn {
          border-image: linear-gradient(to right, #60a5fa, #22c55e) 1 !important;
          border-width: 2px !important;
          color: #22c55e !important;
          background: #0f172a !important;
        }
        .active-nav-btn-init {
          border-image: linear-gradient(to right, #60a5fa, #2563eb) 1 !important;
          border-width: 2px !important;
          color: #2563eb !important;
          background: #0f172a !important;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .animate-bounce { animation: bounce 1s infinite; }
        .animate-pulse { animation: pulse 2s infinite; }
        @keyframes simple-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes simple-fade-out {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        .simple-fade-in { animation: simple-fade-in 0.3s ease; }
        .simple-fade-out { animation: simple-fade-out 0.3s cubic-bezier(0.4,0,0.2,1) both; }
        /* Prevent scroll glitch on mobile menu open/close */
        body[style*='overflow: hidden'] {
          touch-action: none;
        }
      `}</style>
    </nav>
  );
}
