
import React, { useState, useEffect } from 'react'

// Education data (Experience style)
const educationData = [
  {
    degree: 'Bachelor in Software Engineering',
    university: 'SZABIST University',
    location: 'Islamabad, Pakistan',
    duration: '2023 - 2027',
    cgpa: '3.1',
    status: 'IN PROGRESS',
    // ...removed unused eid, memory, progress fields...
    details: [
      'Core: OOP, Data Structures, DB Systems, Web Dev',
      'Advanced: OS, SRE, CS Fundamentals, Math, Physics',
      'CGPA: 3.1 (current)',
      'SZABIST University, Islamabad',
      '2023–2027 (expected graduation)',
      'Status: In Progress',
    ],
  },
]

const Education: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section id="education" className="relative py-6 md:py-12 lg:py-16 xl:py-20 bg-black text-white overflow-hidden select-none">
      {/* Terminal-style background elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(34, 211, 238, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 211, 238, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />

        {/* Decorative system monitoring commands */}
        <div className="hidden lg:block absolute top-20 left-10 font-mono text-green-400 opacity-10 animate-pulse">
          <div>$ cat /etc/education.conf</div>
          <div className="text-gray-500">Bachelor in Software Engineering</div>
        </div>

        <div className="hidden lg:block absolute bottom-20 right-10 font-mono text-green-400 opacity-10 animate-pulse">
          <div>$ grep -i "degree" academic.log</div>
          <div className="text-gray-500">progress: 65% completed</div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Terminal window header - styled like About/Skills/Experience/Projects */}
        <div className="hidden md:block text-center mb-3 sm:mb-4 md:mb-6 lg:mb-8 xl:mb-12">
          <div className="w-full max-w-2xl mx-auto mb-4">
            {/* Redesigned Terminal Header (copied from About/Skills/Experience/Projects) */}
            <div className="group terminal-header-container w-full">
              <div className="backdrop-blur-md bg-black/70 border border-gray-800 rounded-t-2xl px-4 py-2 flex items-center gap-3 shadow-lg relative overflow-hidden transition-all duration-300 group-hover:bg-black/90 group-hover:border-green-400 group-hover:shadow-green-400/30">
                {/* Left dots */}
                <div className="flex gap-1.5 mr-2">
                  <span className="w-1.5 h-1.5 bg-gray-600 rounded-full transition-colors duration-200 group-hover:bg-green-400"></span>
                  <span className="w-1.5 h-1.5 bg-gray-600 rounded-full transition-colors duration-200 group-hover:bg-yellow-400"></span>
                  <span className="w-1.5 h-1.5 bg-gray-600 rounded-full transition-colors duration-200 group-hover:bg-red-400"></span>
                </div>
                {/* Path and user info */}
                <div className="flex-1 text-center font-mono text-sm text-gray-200 select-text transition-colors duration-300 group-hover:text-green-200">
                  {/* Replicate Hero/About/Skills/Experience/Projects terminal user@host:path style */}
                  <span className="text-gray-400 font-mono text-sm">muneeb</span>
                  <span className="text-blue-400 font-mono font-bold text-lg align-middle" style={{ fontFamily: 'monospace' }}>＠</span>
                  <span className="text-green-400 font-mono font-bold text-lg align-middle" style={{ fontFamily: 'monospace' }}>devmachine</span>
                  <span className="text-gray-400 font-mono text-sm">:</span>
                    <span className="text-blue-400 font-mono text-sm">~</span>
                    <span className="text-gray-400 font-mono text-sm">/portfolio</span>
                    <span className="text-blue-400 font-mono font-bold text-lg align-middle">/education</span>
                </div>
                {/* Right dots */}
                <div className="flex gap-1.5">
                  <span className="w-1.5 h-1.5 bg-gray-600 rounded-full transition-colors duration-200 group-hover:bg-green-400"></span>
                  <span className="w-1.5 h-1.5 bg-gray-600 rounded-full transition-colors duration-200 group-hover:bg-yellow-400"></span>
                  <span className="w-1.5 h-1.5 bg-gray-600 rounded-full transition-colors duration-200 group-hover:bg-red-400"></span>
                </div>
              </div>
              {/* Terminal body with prompt */}
              <div className="backdrop-blur-md bg-black/80 border-x border-b border-gray-800 rounded-b-2xl px-6 py-4 font-mono text-base text-green-400 shadow-lg relative overflow-hidden transition-all duration-300 group-hover:bg-black/90 group-hover:border-green-400 group-hover:shadow-green-400/30">
                <div className="flex items-center gap-2">
                  <span className="text-green-400 font-bold group-hover:text-green-300">$</span>
                  <span className="text-white font-semibold group-hover:text-green-200">npx education --log</span>
                  <span className="blinking-cursor ml-1">|</span>
                </div>
                <div className="absolute bottom-2 right-4 text-xs text-green-400 opacity-90 select-none group-hover:text-green-400">
                  {currentTime.toLocaleTimeString()}
                </div>
              </div>
              {/* Blinking cursor animation */}
              <style>{`
                .blinking-cursor {
                  display: inline-block;
                  width: 1ch;
                  animation: blink 1s steps(2, start) infinite;
                }
                @keyframes blink {
                  0%, 100% { opacity: 1; }
                  50% { opacity: 0; }
                }
              `}</style>
            </div>
          </div>
        </div>

        {/* Mobile-optimized education layout - now matches laptop/desktop look */}
        <div className="md:hidden">
          <div className="text-center mb-3 sm:mb-4">
            <div className="w-full max-w-md mx-auto mb-3">
              <div className="group terminal-header-container w-full">
                <div className="backdrop-blur-md bg-black/70 border border-gray-800 rounded-t-2xl px-2 py-1 flex items-center gap-1 shadow-lg relative overflow-hidden transition-all duration-300 group-hover:bg-black/90 group-hover:border-green-400 group-hover:shadow-green-400/30" style={{ minHeight: '32px' }}>
                  {/* Left dots */}
                  <div className="flex gap-1 mr-1">
                    <span className="w-1 h-1 bg-gray-600 rounded-full transition-colors duration-200 group-hover:bg-green-400"></span>
                    <span className="w-1 h-1 bg-gray-600 rounded-full transition-colors duration-200 group-hover:bg-yellow-400"></span>
                    <span className="w-1 h-1 bg-gray-600 rounded-full transition-colors duration-200 group-hover:bg-red-400"></span>
                  </div>
                  {/* Path and user info */}
                  <div className="flex-1 text-center font-mono text-[10px] text-gray-200 select-text transition-colors duration-300 group-hover:text-green-200">
                    <span className="text-gray-400 font-mono">muneeb</span>
                    <span className="text-blue-400 font-mono font-bold text-xs align-middle">＠</span>
                    <span className="text-green-400 font-mono font-bold text-xs align-middle">devmachine</span>
                    <span className="text-gray-400 font-mono">:</span>
                    <span className="text-blue-400 font-mono">~</span>
                    <span className="text-gray-400 font-mono">/portfolio</span>
                    <span className="text-blue-400 font-mono font-bold text-xs align-middle">/education</span>
                  </div>
                  {/* Right dots */}
                  <div className="flex gap-1">
                    <span className="w-1 h-1 bg-gray-600 rounded-full transition-colors duration-200 group-hover:bg-green-400"></span>
                    <span className="w-1 h-1 bg-gray-600 rounded-full transition-colors duration-200 group-hover:bg-yellow-400"></span>
                    <span className="w-1 h-1 bg-gray-600 rounded-full transition-colors duration-200 group-hover:bg-red-400"></span>
                  </div>
                </div>
                <div className="backdrop-blur-md bg-black/80 border-x border-b border-gray-800 rounded-b-2xl px-2 py-2 font-mono text-xs text-green-400 shadow-lg relative overflow-hidden transition-all duration-300 group-hover:bg-black/90 group-hover:border-green-400 group-hover:shadow-green-400/30">
                  <div className="flex items-center gap-1">
                    <span className="text-green-400 font-bold group-hover:text-green-300">$</span>
                    <span className="text-white font-semibold group-hover:text-green-200">npx education --log</span>
                    <span className="blinking-cursor ml-1">|</span>
                  </div>
                  <div className="absolute bottom-1 right-2 text-[10px] text-green-400 opacity-90 select-none group-hover:text-green-400">
                    {currentTime.toLocaleTimeString()}
                  </div>
                </div>
                <style>{`
                  .blinking-cursor {
                    display: inline-block;
                    width: 1ch;
                    animation: blink 1s steps(2, start) infinite;
                  }
                  @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                  }
                `}</style>
              </div>
            </div>
          </div>
          {/* Education details card - mobile, matches desktop style */}
          <div className="grid grid-cols-1 gap-4">
            {educationData.map((edu) => (
              <div
                key={edu.degree}
                className="relative group bg-black border border-gray-900 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:scale-[1.025] hover:border-blue-500 hover:shadow-blue-400/30 w-full max-w-md mx-auto mb-3"
                style={{ minHeight: '220px' }}
              >
                <div className="pointer-events-none absolute inset-0 rounded-2xl z-10 transition-all duration-500 group-hover:shadow-[0_0_40px_8px_rgba(59,130,246,0.25)] group-hover:border-blue-400 border border-transparent group-hover:border-[1px]"></div>
                <div className="flex items-center gap-1 px-2 py-1 border-b border-gray-800 bg-black/80">
                  <span className="flex gap-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" style={{ animationDelay: '0.3s' }}></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" style={{ animationDelay: '0.6s' }}></span>
                  </span>
                  <span className="ml-2 font-mono text-[10px] text-gray-400 tracking-widest uppercase letter-spacing-2">{edu.status} EDUCATION</span>
                  <span className="ml-auto font-mono text-[10px] text-blue-400 font-bold">{edu.duration}</span>
                </div>
                <div className="relative z-20 px-2 pt-1 pb-3 flex flex-col gap-2 transition-all duration-500">
                  <div className="font-mono text-base md:text-lg flex flex-col md:flex-row md:items-center gap-0 md:gap-1 text-blue-400 mb-0 pb-0 md:pt-2">
                    <div className="flex items-center gap-1">
                      <span className="select-none">$</span>
                      <span className="text-white font-bold">{edu.degree}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-gray-400 font-bold hidden md:inline"> | </span>
                      <span className="text-blue-300 font-bold">{edu.university}</span>
                    </div>
                  </div>
                  <div className="font-mono text-xs md:text-sm flex items-center gap-1 mb-1">
                    <span className="italic text-blue-400">cat </span>
                    <span className="italic text-green-400">education.json</span>
                    <span className="font-bold text-blue-300">'Learning in progress!'</span>
                  </div>
                  <div className="bg-black/80 border border-gray-800 rounded-lg p-2 shadow-inner">
                    <div className="font-mono text-[10px] md:text-xs text-gray-400 mb-1">// Key Details</div>
                    <ul className="space-y-1">
                      {edu.details.map((detail, i) => {
                        let symbol = '├─';
                        if (i === 0) symbol = '┌─';
                        else if (i === edu.details.length - 1) symbol = '└─';
                        return (
                          <li
                            key={i}
                            className="font-mono text-xs md:text-sm text-gray-200 flex items-start gap-1 group-hover:text-blue-300 transition-colors duration-200"
                          >
                            <span className="text-blue-400 select-none group-hover:text-green-400 transition-colors duration-200">{symbol}</span>
                            <span>{detail}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
                <div className="flex items-center justify-between px-2 py-1 border-t border-gray-800 bg-black/80">
                  <div className="flex items-center gap-1 font-mono text-[10px] text-gray-500">
                    <span className="animate-pulse text-blue-400">●</span>
                    <span className="tracking-widest uppercase">Education synced</span>
                  </div>
                  <div className="flex items-center gap-1 font-mono text-[10px] text-blue-400">
                    <span className="animate-pulse">{`Last update: ${currentTime.toLocaleDateString()} ${currentTime.toLocaleTimeString()}`}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop full-featured layout */}
        <div className="hidden md:block">
          {/* Redesigned black-themed education card, stacked vertically */}
          <div className="max-w-3xl mx-auto">
            {educationData.map((edu) => (
              <div
                key={edu.degree}
                className="relative group bg-black border border-gray-900 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:scale-[1.025] hover:shadow-blue-400/30"
                style={{ minHeight: '320px' }}
              >
                {/* Animated glowing border on hover */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl z-10 transition-all duration-500 group-hover:shadow-[0_0_40px_8px_rgba(59,130,246,0.25)] group-hover:border-blue-400 border border-transparent group-hover:border-[1px]"></div>

                {/* Top status bar with animated dots */}
                <div className="flex items-center gap-2 px-6 py-2 border-b border-gray-800 bg-black/80">
                  <span className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" style={{ animationDelay: '0.3s' }}></span>
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" style={{ animationDelay: '0.6s' }}></span>
                  </span>
                  <span className="ml-3 font-mono text-xs text-gray-400 tracking-widest uppercase letter-spacing-2">{edu.status} EDUCATION</span>
                  <span className="ml-auto font-mono text-xs text-blue-400 font-bold">{edu.duration}</span>
                </div>

                {/* Redesigned content area */}
                <div className="relative z-20 px-8 pt-1 pb-8 flex flex-col gap-3 transition-all duration-500">
                  {/* Degree and University as a terminal command */}
                  <div className="font-mono text-lg md:text-xl flex items-center gap-2 text-blue-400 mb-0 pb-0 pt-2">
                    <span className="select-none">$</span>
                    <span className="text-white font-bold">{edu.degree}</span>
                    <span className="text-gray-400 font-bold"> | </span>
                    <span className="text-blue-300 font-bold">{edu.university}</span>
                  </div>
                  {/* Fun terminal easter egg: "cat education.json" */}
                  <div className="font-mono text-sm flex items-center gap-2 mb-1">
                    <span className="italic text-blue-400">cat </span>
                    <span className="italic text-green-400">education.json</span>
                    <span className="font-bold text-blue-300">'Learning in progress!'</span>
                  </div>
                  {/* Achievements as terminal output */}
                  <div className="bg-black/80 border border-gray-800 rounded-lg p-4 shadow-inner">
                    <div className="font-mono text-xs text-gray-400 mb-2">// Key Details</div>
                    <ul className="space-y-2">
                      {edu.details.map((detail, i) => {
                        let symbol = '├─';
                        if (i === 0) symbol = '┌─';
                        else if (i === edu.details.length - 1) symbol = '└─';
                        return (
                          <li
                            key={i}
                            className="font-mono text-sm text-gray-200 flex items-start gap-2 group-hover:text-blue-300 transition-colors duration-200"
                          >
                            <span className="text-blue-400 select-none group-hover:text-green-400 transition-colors duration-200">{symbol}</span>
                            <span>{detail}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>

                {/* Animated bottom status bar */}
                <div className="flex items-center justify-between px-6 py-2 border-t border-gray-800 bg-black/80">
                  <div className="flex items-center gap-2 font-mono text-xs text-gray-500">
                    <span className="animate-pulse text-blue-400">●</span>
                    <span className="tracking-widest uppercase">Education synced</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-xs text-blue-400">
                    <span className="animate-pulse">{`Last update: ${currentTime.toLocaleDateString()} ${currentTime.toLocaleTimeString()}`}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Section navigation divider */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-2 sm:pb-4 md:pb-6 lg:pb-8 pt-3 sm:pt-6 md:pt-8 lg:pt-12">
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-800"></div>
          <div className="font-mono text-xs text-gray-500 flex items-center gap-2">
            <span className="text-blue-400">$</span>
            <a href="#experience" className="hover:text-blue-300 transition-colors">cd ../contact</a>
          </div>
          <div className="flex-1 h-px bg-gray-800"></div>
        </div>
        {/* Status bar info */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-gray-500 gap-2 sm:gap-4 mt-2">
          <div className="flex items-center gap-2 sm:gap-4">
            <span>Last update: {currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()}</span>
            <span className="hidden sm:inline">|</span>
            <span>Education log synced</span>
          </div>
          <span className="text-blue-400">✓ System operational</span>
        </div>
      </div>
    </section>
  )
}

export default Education
