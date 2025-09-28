import React, { useEffect, useState, useCallback, useMemo } from 'react'

// Professional experience data
const experiences = [
  {
    title: 'MERN Stack Developer',
    company: 'Aangan',
    date: 'July 2025 – Present',
    status: 'ACTIVE',
    pid: '2025',
    cpu: '57.5%',
    memory: '182MB',
    details: [
      'Developed and deployed scalable web apps using the MERN stack',
      'Integrated Supabase and Firebase/Firestore for real-time data and authentication',
      'Containerized full-stack applications with Docker for seamless deployment',
      'Implemented secure JWT token authentication for user sessions',
      'Designed RESTful APIs and managed both backend and frontend development',
      'Collaborated with team to optimize performance and ensure code quality',
    ],
  },
  {
    title: 'Backend Dev Intern',
    company: 'App In Snap',
    date: 'June 2025 – September 2025',
    status: 'ACTIVE',
    pid: '2025',
    cpu: '100%',
    memory: '245MB',
    details: [
      'Secured ASP.NET Core with Identity & JWT (−30% unauthorized access)',
      'Optimized EF Core & LINQ queries (−25% retrieval time)',
      'Documented APIs with Swagger (20% faster front-end onboarding)',
      'Centralized logging (Serilog & App Insights) (−40% MTTR)',
      'Automated Azure DevOps & Docker deployments (zero downtime, −50% deploy time)',
      'Boosted xUnit/Moq test coverage to 85% (−20% critical bugs)',
    ],
  },
]

// Card renderer (mobile + desktop share)
const ExperienceCard = (exp: typeof experiences[number], now: Date) => (
  <div
    key={exp.title}
    className="relative group bg-black border border-gray-800 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-blue-400/30 w-full"
    style={{ minHeight: '280px' }}
  >
    {/* Glow */}
    <div className="pointer-events-none absolute inset-0 rounded-2xl z-10 transition-all duration-500 group-hover:shadow-[0_0_40px_8px_rgba(59,130,246,0.25)] group-hover:border-blue-400 border border-transparent"></div>

    {/* Top status bar */}
    <div className="flex items-center gap-2 px-4 md:px-6 py-2 border-b border-gray-800 bg-black/80">
      <span className="flex gap-1">
        <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-500 animate-pulse"></span>
        <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-yellow-400 animate-pulse" style={{ animationDelay: '0.3s' }}></span>
        <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-red-500 animate-pulse" style={{ animationDelay: '0.6s' }}></span>
      </span>
      <span className="ml-2 md:ml-3 font-mono text-[10px] md:text-xs text-gray-400 tracking-widest uppercase">{exp.status} EXPERIENCE</span>
  <span className="ml-auto font-mono text-[10px] md:text-xs text-blue-400 font-bold">{exp.date}</span>
    </div>

    {/* Content */}
    <div className="relative z-20 px-4 md:px-8 pt-2 pb-6 flex flex-col gap-3 transition-all duration-500">
      <div className="font-mono text-base md:text-xl flex items-center gap-2 text-green-400">
        <span className="select-none">$</span>
        <span className="text-white font-bold">{exp.title}</span>
        <span className="text-gray-400 font-bold">|</span>
        <span
          className={
            exp.company === 'Aangan'
              ? 'font-bold text-pink-400'
              : 'font-bold text-blue-400'
          }
        >
          {exp.company}
        </span>
      </div>

      <div className="font-mono text-xs md:text-sm text-green-400 flex items-center gap-2 -mt-1">
        <span className="italic">git commit -m</span>
        <span className="font-bold text-blue-300">'Shipped it!'</span>
      </div>

      <div className="bg-black/80 border border-gray-800 rounded-lg p-3 md:p-4 shadow-inner">
        <div className="font-mono text-[11px] md:text-xs text-gray-400 mb-2">// Key Achievements</div>
        <ul className="space-y-2">
          {exp.details.map((detail, i) => {
            const first = i === 0, last = i === exp.details.length - 1
            const symbol = first ? '┌─' : last ? '└─' : '├─'
            return (
              <li key={i} className="font-mono text-xs md:text-sm text-gray-200 flex items-start gap-2 group-hover:text-green-300 transition-colors duration-200">
                <span className="text-green-400 select-none group-hover:text-blue-400 transition-colors duration-200">{symbol}</span>
                <span>{detail}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </div>

    {/* Bottom status */}
    <div className="flex items-center justify-between px-4 md:px-6 py-2 border-t border-gray-800 bg-black/80">
      <div className="flex items-center gap-2 font-mono text-[10px] md:text-xs text-gray-500">
        <span className="animate-pulse text-green-400">●</span>
        <span className="tracking-widest uppercase">Achievements synced</span>
      </div>
      <div className="flex items-center gap-2 font-mono text-[10px] md:text-xs text-green-400">
        <span className="animate-pulse">{`Last update: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`}</span>
      </div>
    </div>
  </div>
)

const Experience: React.FC = () => {
  const [now, setNow] = useState(new Date())

  // one-at-a-time navigation
  const parseHash = useCallback(() => {
    const m = (typeof window !== 'undefined' ? window.location.hash : '').match(/#experience-(\d+)/i)
    const idx = m ? parseInt(m[1], 10) - 1 : 0
    return Number.isFinite(idx) && idx >= 0 && idx < experiences.length ? idx : 0
  }, [])

  const [current, setCurrent] = useState<number>(() => (typeof window !== 'undefined' ? parseHash() : 0))

  const setAndSync = useCallback((i: number) => {
    const clamped = Math.max(0, Math.min(experiences.length - 1, i))
    setCurrent(clamped)
    const newHash = `#experience-${clamped + 1}`
    if (typeof window !== 'undefined' && window.location.hash !== newHash) window.location.hash = newHash
  }, [])

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const onHash = () => setCurrent(parseHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [parseHash])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setAndSync(current + 1)
      if (e.key === 'ArrowLeft') setAndSync(current - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [current, setAndSync])

  const card = useMemo(() => ExperienceCard(experiences[current], now), [current, now])

  const Pagination = (
    <nav aria-label="Experience pagination" className="w-full flex items-center justify-center gap-2 mt-4">
      <button
        onClick={() => setAndSync(current - 1)}
        disabled={current === 0}
        className="px-3 py-1 rounded-lg border border-gray-800 text-gray-300 hover:bg-gray-900 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        ←
      </button>
      <ul className="flex items-center gap-1">
        {experiences.map((_, i) => {
          const active = i === current
          return (
            <li key={i}>
              <button
                onClick={() => setAndSync(i)}
                aria-current={active ? 'page' : undefined}
                className={[
                  'w-9 h-9 rounded-lg border transition-all font-mono text-sm',
                  active
                    ? 'border-green-500 text-black bg-green-400 shadow-[0_0_16px_rgba(34,197,94,0.25)]'
                    : 'border-gray-800 text-gray-300 hover:border-green-500 hover:text-green-300 hover:bg-black/40',
                ].join(' ')}
                title={`Experience ${i + 1}`}
              >
                {i + 1}
              </button>
            </li>
          )
        })}
      </ul>
      <button
        onClick={() => setAndSync(current + 1)}
        disabled={current === experiences.length - 1}
        className="px-3 py-1 rounded-lg border border-gray-800 text-gray-300 hover:bg-gray-900 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        →
      </button>
    </nav>
  )

  return (
    <section id="experience" className="relative py-6 md:py-12 lg:py-16 xl:py-20 bg-black text-white overflow-hidden select-none">
      {/* Background grid + hints */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(34,211,238,.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34,211,238,.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
        <div className="hidden lg:block absolute top-20 left-10 font-mono text-green-400 opacity-10 animate-pulse">
          <div>$ ps aux | grep experience</div>
          <div className="text-gray-500">muneeb  2025  0.0  0.1  experience</div>
        </div>
        <div className="hidden lg:block absolute bottom-20 right-10 font-mono text-blue-400 opacity-10 animate-pulse">
          <div>$ uptime</div>
          <div className="text-gray-500">load average: 0.15, 0.10, 0.05</div>
        </div>
      </div>

      {/* Desktop terminal header */}
      <div className="hidden md:block text-center mb-6 md:mb-8 xl:mb-12 relative z-10">
        <div className="w-full max-w-2xl mx-auto mb-4">
          <div className="group terminal-header-container w-full">
            <div className="backdrop-blur-md bg-black/70 border border-gray-800 rounded-t-2xl px-4 py-2 flex items-center gap-3 shadow-lg relative overflow-hidden transition-all duration-300 group-hover:bg-black/90 group-hover:border-green-400 group-hover:shadow-green-400/30">
              <div className="flex gap-1.5 mr-2">
                <span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-green-400"></span>
                <span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-yellow-400"></span>
                <span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-red-400"></span>
              </div>
              <div className="flex-1 text-center font-mono text-sm text-gray-200">
                <span className="text-gray-400">muneeb</span>
                <span className="text-blue-400 font-bold text-lg" style={{ fontFamily: 'monospace' }}>＠</span>
                <span className="text-green-400 font-bold text-lg" style={{ fontFamily: 'monospace' }}>devmachine</span>
                <span className="text-gray-400">:</span>
                <span className="text-blue-400 text-sm">~</span>
                <span className="text-gray-400 text-sm">/portfolio</span>
                <span className="text-blue-400 font-bold text-lg">/experience</span>
              </div>
              <div className="flex gap-1.5">
                <span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-green-400"></span>
                <span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-yellow-400"></span>
                <span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-red-400"></span>
              </div>
            </div>
            <div className="backdrop-blur-md bg-black/80 border-x border-b border-gray-800 rounded-b-2xl px-6 py-4 font-mono text-base text-green-400 shadow-lg relative overflow-hidden transition-all duration-300 group-hover:bg-black/90 group-hover:border-green-400 group-hover:shadow-green-400/30">
              <div className="flex items-center gap-2">
                <span className="text-green-400 font-bold">$</span>
                <span className="text-white font-semibold">npx experience --log</span>
                <span className="blinking-cursor ml-1">|</span>
              </div>
              <div className="absolute bottom-2 right-4 text-xs text-green-400 opacity-90 select-none">
                {now.toLocaleTimeString()}
              </div>
            </div>
            <style>{`.blinking-cursor{display:inline-block;width:1ch;animation:blink 1s steps(2,start) infinite}@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
          </div>
        </div>
      </div>

      {/* MOBILE: single card + pagination */}
      <div className="md:hidden px-2 sm:px-4 relative z-10">
        {/* compact terminal header */}
        <div className="text-center mb-3 sm:mb-4">
          <div className="w-full max-w-md mx-auto mb-3">
            <div className="group terminal-header-container w-full">
              <div className="backdrop-blur-md bg-black/70 border border-gray-800 rounded-t-2xl px-2 py-1 flex items-center gap-1 shadow-lg relative overflow-hidden transition-all duration-300 group-hover:bg-black/90 group-hover:border-green-400 group-hover:shadow-green-400/30" style={{ minHeight: '32px' }}>
                <div className="flex gap-1 mr-1">
                  <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-green-400"></span>
                  <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-yellow-400"></span>
                  <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-red-400"></span>
                </div>
                <div className="flex-1 text-center font-mono text-[10px] text-gray-200">
                  <span className="text-gray-400">muneeb</span>
                  <span className="text-blue-400 font-bold text-xs">＠</span>
                  <span className="text-green-400 font-bold text-xs">devmachine</span>
                  <span className="text-gray-400">:</span>
                  <span className="text-blue-400">~</span>
                  <span className="text-gray-400">/portfolio</span>
                  <span className="text-blue-400 font-bold text-xs">/experience</span>
                </div>
                <div className="flex gap-1">
                  <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-green-400"></span>
                  <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-yellow-400"></span>
                  <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-red-400"></span>
                </div>
              </div>
              <div className="backdrop-blur-md bg-black/80 border-x border-b border-gray-800 rounded-b-2xl px-2 py-2 font-mono text-xs text-green-400 shadow-lg relative overflow-hidden transition-all duration-300 group-hover:bg-black/90 group-hover:border-green-400 group-hover:shadow-green-400/30">
                <div className="flex items-center gap-1">
                  <span className="text-green-400 font-bold">$</span>
                  <span className="text-white font-semibold">npx experience --log</span>
                  <span className="blinking-cursor ml-1">|</span>
                </div>
                <div className="absolute bottom-1 right-2 text-[10px] text-green-400 opacity-90 select-none">
                  {now.toLocaleTimeString()}
                </div>
              </div>
              <style>{`.blinking-cursor{display:inline-block;width:1ch;animation:blink 1s steps(2,start) infinite}@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
            </div>
          </div>
        </div>

        <div className="w-full max-w-md mx-auto">{card}</div>
        <div className="mt-3">{Pagination}</div>
      </div>

      {/* DESKTOP: single card centered + pagination */}
      <div className="hidden md:block max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-3xl mx-auto">{card}</div>
        <div className="mt-6">{Pagination}</div>
      </div>

      {/* Section divider */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-2 sm:pb-4 md:pb-6 lg:pb-8 pt-3 sm:pt-6 md:pt-8 lg:pt-12">
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-800"></div>
          <div className="font-mono text-xs text-gray-500 flex items-center gap-2">
            <span className="text-green-400">$</span>
            <a href="#projects" className="hover:text-green-300 transition-colors">cd ../projects</a>
          </div>
          <div className="flex-1 h-px bg-gray-800"></div>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-gray-500 gap-2 sm:gap-4 mt-2">
          <div className="flex items-center gap-2 sm:gap-4">
            <span>Last update: {now.toLocaleDateString()} {now.toLocaleTimeString()}</span>
            <span className="hidden sm:inline">|</span>
            <span>Experience log synced</span>
          </div>
          <span className="text-green-400">✓ System operational</span>
        </div>
      </div>
    </section>
  )
}

export default Experience
