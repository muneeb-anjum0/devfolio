import { useState, useEffect, useRef } from 'react';

// WindParticles component for animated drifting dots (wind effect)
function WindParticles(props: { particleCount?: number }) {
  const particleCount = props && props.particleCount !== undefined ? props.particleCount : 36;
  const [particles, setParticles] = useState(() =>
    Array.from({ length: particleCount }, () => ({
      x: Math.random(),
      y: Math.random(),
      speed: 0.18 + Math.random() * 0.18, // faster wind
      size: 1.1 + Math.random() * 1.3, // smaller, more subtle
      color: (() => {
        const r = Math.random();
        if (r > 0.997) return '#22d3ee'; // rare blue
        if (r > 0.992) return '#22c55e'; // rare green
        return '#a3a3a3'; // Tailwind gray-400, brighter than gray-500
      })(),
      opacity: 0.32 + Math.random() * 0.22, // a bit brighter
    }))
  );
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    let running = true;
    function animate() {
      setParticles(ps =>
        ps.map(p => {
          let nx = p.x + p.speed * 0.0045; // faster
          if (nx > 1.05) nx = -0.05; // wrap around
          return { ...p, x: nx };
        })
      );
      if (running) {
        animationRef.current = requestAnimationFrame(animate);
      }
    }
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      running = false;
      if (animationRef.current !== null) cancelAnimationFrame(animationRef.current);
    };
  }, [particleCount]);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, display: 'block' }}>
        {particles.map((p, i) => (
          <circle
            key={i}
            cx={(p.x * 100) + '%'}
            cy={(p.y * 100) + '%'}
            r={p.size}
            fill={p.color}
            opacity={p.opacity}
            style={{ filter: 'blur(0.5px)' }}
          />
        ))}
      </svg>
    </div>
  );
}


// Terminal window lines
const terminalLines = [
  {
    text: (
      <>
        <span className="text-green-400">Last login:</span> <span className="text-white">Thu Jul 3 09:42:31 2025</span>
      </>
    ),
    color: ''
  },
  {
    text: (
      <>
        <span className="text-green-400">muneeb@devmachine:~/portfolio $</span> <span className="text-white">whoami</span>
      </>
    ),
    color: ''
  },
  {
    text: (
      <>
        <span className="text-white">Full-Stack Developer & Digital Architect</span>
      </>
    ),
    color: ''
  },
  {
    text: (
      <>
        <span className="text-green-400">muneeb@devmachine:~/portfolio$</span> <span className="text-white">ls -la skills/</span>
      </>
    ),
    color: ''
  },
  {
    text: (
      <>
        <span className="text-white">React, TypeScript, Node.js, Python, AWS</span>
      </>
    ),
    color: ''
  },
  {
    text: (
      <>
        <span className="text-green-400">muneeb@devmachine:~/portfolio $</span> <span className="text-white">cat mission.txt</span>
      </>
    ),
    color: ''
  },
  {
    text: (
      <>
        <span className="text-white">Building innovative solutions through code</span>
      </>
    ),
    color: ''
  },
]

const roles = [
  'MERN Stack Developer',
  '.NET Enthusiast',
  'UI/UX Implementation Specialist',
  'Turning Designs into Reality',
  'Full-Stack Problem Solver',
]

export default function Hero() {
  // Matrix effect removed as requested
  const [currentRole, setCurrentRole] = useState(0)
  // Only show the first line (Last login) in the terminal window, update in real time
  const [lastLogin, setLastLogin] = useState(() => {
    const now = new Date();
    return now.toLocaleString('en-US', {
      weekday: 'short', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit', year: 'numeric',
      hour12: false
    });
  });
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setLastLogin(now.toLocaleString('en-US', {
        weekday: 'short', month: 'short', day: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit', year: 'numeric',
        hour12: false
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const roleInterval = setInterval(() => {
      setCurrentRole((r) => (r + 1) % roles.length)
    }, 3000)
    return () => clearInterval(roleInterval)
  }, [])

  // Removed auto-advance for terminal lines; only show Last login

  // Particle animation effect
  // Removed unused particleCount effect

  return (
  <section id="home" className="relative min-h-[90vh] h-auto md:h-[75vh] md:min-h-screen overflow-hidden bg-black text-white select-none pt-24 sm:pt-0">
      {/* Atmospheric background elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Wind effect: drifting subtle dots */}
        <WindParticles />
        {/* Enhanced terminal grid pattern with glow effect */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(34, 211, 238, 0.6) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 211, 238, 0.6) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            filter: 'drop-shadow(0 0 10px rgba(34, 211, 238, 0.3))'
          }}
        />

        {/* Matrix-style rain effect removed as requested */}

        {/* Floating matrix-style characters removed as requested */}
        {/* Add custom CSS for matrix rain animation */}
        <style>{`
        @keyframes matrixRain {
          0% { transform: translateY(-100vh); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
      `}</style>

        {/* Floating terminal symbols removed as requested */}

        {/* Glowing scan lines for retro terminal effect */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-400/20 to-transparent h-2 animate-scan-line" />
        </div>

      {/* Terminal history and System info removed as requested */}
      </div>

  {/* MAIN TERMINAL WINDOW */}
  <div className="relative z-10 flex flex-col items-center justify-center h-full px-1 sm:px-3 lg:px-4 py-2 md:py-0 md:min-h-[60vh] pt-24 sm:pt-0">
    {/* Terminal Window Header */}
  <div className="hidden sm:block w-full max-w-xs sm:max-w-md md:max-w-xl mb-3 sm:mb-6 md:mb-8 lg:mb-10 transform hover:scale-105 transition-transform duration-300 group">
          <div className="bg-black rounded-t-lg px-2 sm:px-3 py-1 flex items-center gap-1 border border-black group-hover:border-gray-800 transition-colors duration-300 relative overflow-hidden">
            {/* Subtle animated background on hover */}
            <div className="absolute inset-0 bg-black opacity-80"></div>
            <div className="flex gap-1 sm:gap-2 relative z-10">
              <div className="w-2 h-2 sm:w-1.5 sm:h-1.5 bg-red-500 rounded-full animate-pulse hover:animate-bounce cursor-pointer transition-transform duration-200" style={{ animationDelay: '0s' }}></div>
              <div className="w-2 h-2 sm:w-1.5 sm:h-1.5 bg-yellow-500 rounded-full animate-pulse hover:animate-bounce cursor-pointer transition-transform duration-200" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 sm:w-1.5 sm:h-1.5 bg-green-400 rounded-full animate-pulse hover:animate-bounce cursor-pointer transition-transform duration-200" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <div className="flex-1 text-center text-xs sm:text-sm font-mono relative z-10">
              {/* On small screens, show a compact version in one line */}
              <span className="sm:hidden text-gray-400">
                muneeb<span className="text-blue-400">＠</span><span className="text-green-400">devmachine</span><span className="text-blue-400">~/</span><span className="text-gray-400">portfolio</span>
              </span>
              {/* On sm and up, show the spaced out version */}
              <span className="hidden sm:inline text-gray-400 hover:text-gray-300 transition-colors duration-300 cursor-default">muneeb</span>
              <span className="hidden sm:inline text-green-400 hover:text-green-300 transition-colors duration-300 cursor-default">
                <span className="font-bold text-lg align-middle text-blue-400" style={{ fontFamily: 'monospace' }}>＠</span>
                <span className="text-green-400 font-mono font-bold text-lg align-middle" style={{ fontFamily: 'monospace' }}>devmachine</span>
              </span>
              <span className="hidden sm:inline text-blue-400 hover:text-blue-300 transition-colors duration-300 cursor-default">~/</span>
              <span className="hidden sm:inline text-gray-400 hover:text-blue-300 transition-colors duration-300 cursor-default">portfolio</span>
            </div>
            {/* CPU usage indicator */}
            <div className="hidden sm:flex items-center gap-1 text-xs relative z-10 hover:scale-110 transition-transform duration-200">
              <span className='text-green-400'>CPU:</span>
              <span className="animate-pulse font-bold inline-block text-right" style={{ minWidth: '2.5ch', fontVariantNumeric: 'tabular-nums' }}>{85 + Math.floor(Math.random() * 10)}%</span>
            </div>
          </div>

          {/* Terminal Content with enhanced effects */}
          <div className="bg-black border border-gray-900 rounded-b-lg p-0.5 sm:p-1 md:p-2 lg:p-2 font-mono text-[10px] sm:text-sm space-y-1 sm:space-y-1.5 md:space-y-2 group-hover:border-gray-800 transition-colors duration-300 shadow-lg group relative overflow-hidden min-h-[40px] sm:min-h-[75px] md:min-h-[90px]" style={{ padding: '0.15rem 0.3rem' }}>
            {/* Subtle code-like pattern overlay */}


            {/* Current active line with typewriter effect */}
            <div className="space-y-2 relative z-10">
              <span className="text-white transition-all duration-500 break-words animate-typewriter cursor-default">
                Last login:
              </span>
              <span className="text-gray-400 transition-all duration-500 break-words animate-typewriter cursor-default"> </span>
              <span className="text-gray-400 transition-all duration-500 break-words animate-typewriter cursor-default">
                {lastLogin}
              </span>

            </div>

            {/* Active prompt with enhanced cursor */}
            <div className="flex items-center gap-1 sm:gap-2 mt-1 sm:mt-2 md:mt-3 flex-wrap">
              {/* Show shorter welcome message on mobile, full on sm+ */}
              <span className="block sm:hidden">
                <span className="text-gray-400">$</span>
                <span className="text-gray-200">echo</span>
                <span className="typing-cursor text-gray-400 break-words animate-typewriter"> "Welcome!"</span>
              </span>
              <span className="hidden sm:block">
                <span className="text-gray-400">muneeb</span>
                <span className="text-blue-400">＠</span>
                <span className="text-green-400">devmachine</span>
                <span className="text-gray-400">:</span>
                <span className="text-blue-400"> ~</span>
                <span className="text-blue-400">/</span>
                <span className="text-gray-400">portfolio</span>
                <span className="text-green-500"> $</span>
                <span className="text-gray-200">echo</span>
                <span className="typing-cursor text-gray-400 break-words animate-typewriter">  "Welcome to my portfolio"</span>
              </span>
            </div>

            {/* Terminal status indicators */}
            <div className="flex items-center justify-between mt-1 text-xs opacity-80 gap-2">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-gray-200">Online</span>
              </div>
              {/* Hide status indicators on mobile */}
              <div className="hidden sm:flex items-center gap-1 text-gray-300">
                <span>
                  Lines: <span className="text-blue-400">{terminalLines.length}</span>
                </span>
                <span className="text-white font-bold">|</span>
                <span>
                  Processes: <span className="text-blue-400">{Math.floor(Math.random() * 5) + 3}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* HERO CONTENT - Unified for all breakpoints */}
        <div className="text-center space-y-3 md:space-y-4 lg:space-y-6 max-w-2xl px-2 sm:px-0">
          {/* Name and Role with enhanced animations */}
          <div className="space-y-1 md:space-y-2 lg:space-y-3">
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-mono font-bold text-white leading-tight animate-glow-text transform hover:scale-105 transition-transform duration-300 group cursor-default text-center mx-auto max-w-2xl">
              <span className="text-grey-900  animate-pulse group-hover:animate-bounce inline-block">{'>'}</span>
              <span className="hover:text-gray-400 transition-colors duration-300">Muneeb Anjum</span>
              <span className="text-grey-900  animate-pulse group-hover:animate-bounce inline-block">{'<'}</span>
            </h1>
            <p className="text-base sm:text-lg md:text-lg text-gray-300 font-mono animate-role-switch hover:text-gray-300 transition-colors duration-300 cursor-default">
              {roles[currentRole]}
            </p>
            {/* Role indicator dots */}
            <div className="flex justify-center gap-2 mt-2">
              {roles.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer hover:scale-150 ${index === currentRole
                    ? 'bg-gray-400 animate-pulse scale-105 shadow-lg shadow-gray-400/50'
                    : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                />
              ))}
            </div>
          </div>

          {/* Mission statement - unified for all breakpoints */}
          <div
            className="bg-black border border-gray-700 rounded-lg p-2 sm:p-2 md:p-3 lg:p-4 font-mono text-left max-w-md mx-auto text-xs sm:text-sm hover:border-blue-400 transition-all duration-300 hover:shadow-lg hover:shadow-blue-400/20 transform hover:scale-105 cursor-pointer group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="text-white">
              <span className="text-gray-400 group-hover:animate-pulse">const</span>{' '}
              <span className="text-blue-400 group-hover:text-cyan-400 transition-colors duration-300">mission</span> = {'{'}
            </div>
            <div className="text-white ml-2 sm:ml-4 break-words">
              <span className="text-red-400 group-hover:text-pink-400 transition-colors duration-300">passion</span>: <span className="text-white-300 group-hover:text-blue-400 transition-all duration-300">"Building innovative solutions"</span>,
            </div>
            <div className="text-white ml-2 sm:ml-4 break-words">
              <span className="text-red-400 group-hover:text-pink-400 transition-colors duration-300">approach</span>: <span className="text-white-300 group-hover:text-blue-400 transition-all duration-300">"Clean code & thoughtful design"</span>,
            </div>
            <div className="text-white ml-2 sm:ml-4 break-words">
              <span className="text-red-400 group-hover:text-pink-400 transition-colors duration-300">mindset</span>: <span className="text-white-300 group-hover:text-blue-400 transition-all duration-300">"Endless curiosity"</span>
            </div>
            <div className="text-white">{'}'}</div>

            {/* Progress bar animation on hover */}
            <div className="mt-2 h-1 bg-gray-800 rounded overflow-hidden">
              <div className="h-full bg-gray-200 rounded transition-all duration-1000 group-hover:w-full w-0 animate-pulse"></div>
            </div>
          </div>

          {/* Enhanced terminal-style action buttons - black & grey theme, blue/green hover with black text */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-3 justify-center items-center pt-1 sm:pt-2">
            <a
              href="#projects"
              className="group relative px-6 sm:px-2 py-2 sm:py-2.5 font-mono text-sm sm:text-sm text-gray-200 bg-black border-2 border-gray-700 hover:bg-blue-400 hover:text-black hover:border-blue-400 transition-all duration-300 w-full min-w-[180px] max-w-[240px] sm:w-auto sm:max-w-none text-center transform hover:scale-105 hover:shadow-lg hover:shadow-blue-400/40 hover:-translate-y-1"
              onClick={e => {
                e.preventDefault();
                const href = '#projects';
                setTimeout(() => {
                  const el = document.querySelector(href);
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.location.hash = href;
                  }
                }, 350); // 350ms delay for animation
              }}
            >
              <span className="absolute -inset-1 bg-gray-700 opacity-10 group-hover:bg-blue-400 group-hover:opacity-20 group-hover:animate-pulse transition-all duration-300 border-2 border-gray-700 rounded-lg"></span>
              <span className="relative flex items-center justify-center gap-2">
                <span
                  className="text-blue-400 group-hover:text-black transition-colors duration-300 group-hover:animate-bounce"
                  style={{
                    display: 'inline-block',
                    transition: 'transform 0.3s',
                    animation: isHovered ? 'bounce 1s' : undefined,
                    animationIterationCount: isHovered ? 'infinite' : undefined,
                  }}
                >
                  $
                </span>
                <span className="group-hover:tracking-wider transition-all duration-300">./view_projects.sh</span>
                <span
                  className={`
                    transition-colors duration-300
                    text-blue-400
                    opacity-100
                    group-hover:text-black
                    group-hover:animate-bounce
                  `}
                  style={{
                    display: 'inline-block',
                    transition: 'transform 0.3s',
                    animation: isHovered ? 'bounce 1s' : undefined,
                    animationIterationCount: isHovered ? 'infinite' : undefined,
                  }}
                >▶</span>
              </span>
            </a>
            <a
              href="#contact"
              className="group px-6 sm:px-5 py-2 sm:py-2.5 font-mono text-sm sm:text-sm text-gray-200 border-2 border-gray-700 bg-black hover:bg-green-400 hover:text-black hover:border-green-400 transition-all duration-300 w-full min-w-[180px] max-w-[240px] sm:w-auto sm:max-w-none text-center transform hover:scale-105 hover:shadow-lg hover:shadow-green-400/30 relative overflow-hidden hover:-translate-y-1"
              onClick={e => {
                e.preventDefault();
                const href = '#contact';
                setTimeout(() => {
                  const el = document.querySelector(href);
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.location.hash = href;
                  }
                }, 350); // 350ms delay for animation
              }}
            >
              <span className="absolute inset-0 bg-gray-700 transform scale-x-0 group-hover:scale-x-100 group-hover:bg-green-400 transition-transform duration-300 origin-left"></span>
              <span className="relative flex items-center justify-center gap-2">
                <span
                  className="
                    animate-pulse
                    group-hover:animate-bounce
                    transition-colors duration-300
                    text-green-400
                    group-hover:text-black
                  "
                >
                  {'>'}
                </span>
                <span className="group-hover:tracking-wider transition-all duration-300">./contact_me.sh</span>
                <span
                  className="
                    transition-colors duration-300
                    group-hover:animate-bounce
                    text-green-400
                    group-hover:text-black
                  "
                >
                  ✉
                </span>
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Enhanced terminal cursor with glow effect */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-10 font-mono text-green-400 animate-bounce">
        <span className="text-2xl filter drop-shadow-lg animate-glow">▼</span>
      </div>

      {/* KEYFRAMES & UTILITIES */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(-5px, -5px) rotate(1deg); }
          50% { transform: translate(5px, -10px) rotate(-1deg); }
          75% { transform: translate(-3px, 5px) rotate(0.5deg); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-float { 
          animation: float 8s ease-in-out infinite; 
        }
        
        .animate-fade-in { 
          animation: fade-in 1s ease-out forwards; 
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }

        @keyframes typing-cursor {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        .typing-cursor {
          position: relative;
        }
        
        .typing-cursor::after {
          content: '|';
          animation: typing-cursor 1s infinite;
          margin-left: 2px;
        }

        @keyframes enhanced-float {
          0%, 100% { 
            transform: translate(0, 0) rotate(0deg) scale(1); 
            filter: drop-shadow(0 0 8px currentColor);
          }
          25% { 
            transform: translate(-8px, -8px) rotate(2deg) scale(1.05); 
            filter: drop-shadow(0 0 12px currentColor);
          }
          50% { 
            transform: translate(8px, -12px) rotate(-2deg) scale(0.95); 
            filter: drop-shadow(0 0 10px currentColor);
          }
          75% { 
            transform: translate(-5px, 8px) rotate(1deg) scale(1.02); 
            filter: drop-shadow(0 0 14px currentColor);
          }
        }

        .animate-enhanced-float {
          animation: enhanced-float 10s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
