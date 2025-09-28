import React, { useEffect, useMemo, useState, useCallback } from 'react'

// Project portfolio data
const projects = [
  {
    title: 'Match-Three',
    subtitle: 'Open Source Project (~72 hours)',
    date: 'Feb 2023 – May 2023',
  tag: 'C++ & SFML Match-3 Puzzle Game',
    description:
      'A feature-rich Match-3 puzzle game built with modern C++ and SFML, showcasing advanced game mechanics, polished UI/UX, and robust code structure.',
    achievements: [
      'Built a dynamic tile grid with smooth swap, match, and cascade effects',
      'Designed multiple game modes and a rewarding level progression system',
      'Crafted interactive menus and mouse-driven controls for seamless play',
      'Integrated rich sound, animation, and visual feedback for polish',
      'Managed assets and memory for a robust, replayable experience',
    ],
    techStack: [
      'C++',
      'SFML',
      'Game Design',
    ],
  link: 'https://github.com/muneeb-anjum0/Match-Three',
  },
  {
    title: 'Sorting Visualizer',
    subtitle: 'Open Source Project (~40 hours)',
    date: 'feb 2025 – Apr 2025',
    tag: 'Visualizing algorithms in action',
    description:
      'Made a C++ and OpenGL based desktop Application allowing users to See how the alogrithms they use in their daily life actually sort a given list of xyz things.',
    achievements: [
      'Leveraged OpenGLs Imgui to make responsive UI so that it is easier for the user to navigate and use the application',
      'Smooth and Clean Visuals to help users understand how different sorting algorithms work',
      'Implemented real-time sorting visualization to show the process of each algorithm',
      'Used C++ as main brain to this application to implement various algorithms like Bubble Sort, Selection Sort, Merge Sort, Quick Sort, Heap Sort and many more',
    ],
    techStack: ['C++', 'OpenGL', 'ImGui', 'GLFW'],
  link: 'https://github.com/muneeb-anjum0/SortingVisualizer',
  },
  {
    title: 'Mazer Runner',
    subtitle: 'Open Source Project (~30 hours)',
    date: 'Feb 2025 – Apr 2025',
    tag: 'Maze generation and solving',
    description:
      'Built Mazer Runner, a maze generation and solving application using C++ and OpenGL.',
    achievements: [
      "Implemented various maze generation algorithms like Recursive Backtracking, Prim's and Kruskal's Algorithm",
      'Developed a user-friendly interface with OpenGL and ImGui for interactive maze exploration',
      'Optimized maze rendering for smooth performance with large mazes',
      'Implemented pathfinding algorithms like A* and Dijkstra for efficient maze solving',
      'Created a Maze using A* algorithm and find the shortest path through the maze using BFS and DFS algorithms',
    ],
    techStack: ['C++', 'OpenGL', 'ImGui', 'GLFW'],
  link: 'https://github.com/muneeb-anjum0/Path-Finder',
  },
  
]

// Reusable project card component
const cardMarkup = (p: typeof projects[number]) => (
  <div
    key={p.title}
    className="relative group bg-black border border-gray-900 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:scale-[1.025] hover:shadow-blue-400/20 card-fade-glow"
    style={{ minHeight: '220px' }}
  >
    <div className="pointer-events-none absolute inset-0 rounded-2xl z-10 transition-all duration-500 group-hover:shadow-[0_0_32px_0_rgba(34,211,238,0.10)] group-hover:border-blue-400 border-2 border-transparent"></div>
    <div className="pointer-events-none absolute inset-0 rounded-2xl z-0 bg-gradient-to-br from-gray-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    <style>{`.card-fade-glow{background:#000}`}</style>

    {/* Top status bar */}
    <div className="flex items-center gap-2 px-6 py-2 border-b border-gray-800 bg-black/80">
      <span className="flex gap-1">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
        <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" style={{ animationDelay: '0.3s' }}></span>
        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" style={{ animationDelay: '0.6s' }}></span>
      </span>
  <span className="ml-3 font-mono text-[10px] text-gray-400 tracking-widest uppercase">ACTIVE PROJECT</span>
  <span className="ml-auto font-mono text-xs text-blue-400 font-bold">{p.date}</span>
    </div>

    {/* Content */}
    <div className="relative z-20 flex flex-col gap-2 px-6 pt-4 pb-6 transition-all duration-500">
  <div className="font-mono text-base md:text-2xl md:text-2xl text-green-400">
      <span className="select-none">$&nbsp;</span>
        <span className="text-white font-bold">{p.title}</span>
        <span className="text-gray-400 font-bold"> | </span>
        <span className="text-blue-400 font-bold">{p.tag}</span>
      </div>
        <div className="font-mono text-xs md:text-sm text-gray-400">{p.subtitle}</div>
        <div className="text-gray-300 text-xs md:text-sm font-mono mt-1 line-clamp-2">{p.description}</div>
        <ul className="font-mono text-xs md:text-sm text-blue-300 mt-1 space-y-1">
        {p.achievements.map((detail, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="text-green-400 select-none">
              {i === 0 ? '┌─' : i === p.achievements.length - 1 ? '└─' : '├─'}
            </span>
            <span>{detail}</span>
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-2 mt-2">
        {p.techStack.map((tech, idx) => (
          <span
            key={idx}
            className="inline-flex items-center gap-2 font-mono text-base text-gray-300 hover:text-blue-400 transition-colors duration-200"
            style={{ fontWeight: 600, letterSpacing: '0.01em' }}
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 16 16" className="tech-bullet">
              <circle cx="8" cy="8" r="6" stroke="#a3a3a3" strokeWidth="1.5" className="tech-bullet-circle" />
              <circle cx="8" cy="8" r="3.5" className="tech-bullet-inner" />
            </svg>
            {tech}
          </span>
        ))}
      </div>
      <style>{`.tech-bullet-inner{transition:fill .2s;fill:none}.group:hover .tech-bullet-inner{fill:#3b82f6}`}</style>
      <div className="pt-2">
        <a
          href={p.link}
          className="group/view-link inline-flex items-center gap-2 font-mono text-base text-green-400 hover:text-black hover:bg-green-400 border border-green-400 px-3 py-1 rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
          style={{ fontWeight: 700, letterSpacing: '0.03em' }}
        >
          <span className="transition-transform duration-200 group-hover/view-link:-translate-x-1">{'>'}</span>
          <span className="underline underline-offset-4 decoration-green-400 group-hover/view-link:no-underline">View Project</span>
          <span className="transition-transform duration-200 group-hover/view-link:translate-x-1 text-green-300">→</span>
        </a>
      </div>
    </div>
  </div>
)

const FeaturedProjects: React.FC = () => {
  // parse hash like #projects-2 (1-based)
  const parseHash = useCallback(() => {
    const m = (window.location.hash || '').match(/#projects-(\d+)/i)
    const idx = m ? parseInt(m[1], 10) - 1 : 0
    return Number.isFinite(idx) && idx >= 0 && idx < projects.length ? idx : 0
  }, [])

  const [current, setCurrent] = useState<number>(() => (typeof window !== 'undefined' ? parseHash() : 0))

  const setAndSync = useCallback(
    (i: number) => {
      const clamped = Math.max(0, Math.min(projects.length - 1, i))
      setCurrent(clamped)
      const newHash = `#projects-${clamped + 1}`
      if (window.location.hash !== newHash) window.location.hash = newHash
    },
    []
  )

  // Sync on back/forward or manual hash edit
  useEffect(() => {
    const onHash = () => setCurrent(parseHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [parseHash])

  // Arrow-key navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setAndSync(current + 1)
      if (e.key === 'ArrowLeft') setAndSync(current - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [current, setAndSync])

  const currentCard = useMemo(() => cardMarkup(projects[current]), [current])

  // Pagination UI (1,2,3,4…)
  const Pagination = (
    <nav aria-label="Projects pagination" className="w-full flex items-center justify-center gap-2 mt-4">
      {/* Prev */}
      <button
        onClick={() => setAndSync(current - 1)}
        disabled={current === 0}
        className="px-3 py-1 rounded-lg border border-gray-800 text-gray-300 hover:bg-gray-900 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        ←
      </button>

      {/* Numbers */}
      <ul className="flex items-center gap-1">
        {projects.map((_, i) => {
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
                title={`Project ${i + 1}`}
              >
                {i + 1}
              </button>
            </li>
          )
        })}
      </ul>

      {/* Next */}
      <button
        onClick={() => setAndSync(current + 1)}
        disabled={current === projects.length - 1}
        className="px-3 py-1 rounded-lg border border-gray-800 text-gray-300 hover:bg-gray-900 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        →
      </button>
    </nav>
  )

  return (
    <section
      id="projects"
      className="relative py-6 md:py-12 lg:py-16 xl:py-20 bg-black text-white overflow-hidden select-none"
    >
      {/* Grid bg + decorative terminal hints */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(34, 211, 238, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 211, 238, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
        <div className="hidden lg:block absolute top-20 left-10 font-mono text-green-400 opacity-10 animate-pulse">
          <div>$ git clone projects</div>
          <div className="text-gray-500">Cloning repositories...</div>
        </div>
        <div className="hidden lg:block absolute bottom-20 right-10 font-mono text-blue-400 opacity-10 animate-pulse">
          <div>$ npm run build</div>
          <div className="text-gray-500">Build successful</div>
        </div>
      </div>

      {/* MOBILE: single card */}
      <div className="md:hidden px-2 sm:px-4 relative z-10">
        {/* Terminal header (compact) */}
        <div className="text-center mb-3 sm:mb-4">
          <div className="w-full max-w-md mx-auto mb-3">
            <div className="group terminal-header-container w-full">
              <div className="backdrop-blur-md bg-black/70 border border-gray-800 rounded-t-2xl px-2 py-1 flex items-center gap-1 shadow-lg relative overflow-hidden transition-all duration-300 group-hover:bg-black/90 group-hover:border-green-400 group-hover:shadow-green-400/30">
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
                  <span className="text-blue-400 font-bold text-xs">/projects</span>
                </div>
                <div className="flex gap-1">
                  <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-green-400"></span>
                  <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-yellow-400"></span>
                  <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-red-400"></span>
                </div>
              </div>
              <div className="backdrop-blur-md bg-black/80 border-x border-b border-gray-800 rounded-b-2xl px-2 py-2 font-mono text-xs text-green-400 shadow-lg relative overflow-hidden">
                <div className="flex items-center gap-1">
                  <span className="text-green-400 font-bold">$</span>
                  <span className="text-white font-semibold">npx projects --list</span>
                  <span className="blinking-cursor ml-1">|</span>
                </div>
                <div className="absolute bottom-1 right-2 text-[10px] text-green-400 opacity-90 select-none">
                  {new Date().toLocaleTimeString()}
                </div>
              </div>
              <style>{`.blinking-cursor{display:inline-block;width:1ch;animation:blink 1s steps(2,start) infinite}@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
            </div>
          </div>
        </div>

        {/* Single card */}
        <div className="w-full max-w-md mx-auto">{currentCard}</div>

        {/* Pagination */}
        <div className="mt-3">{Pagination}</div>
      </div>

      {/* DESKTOP: single card */}
      <div className="hidden md:block max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-6 md:mb-8 xl:mb-12">
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
                  <span className="text-blue-400 font-bold text-lg">/projects</span>
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
                  <span className="text-white font-semibold">npx projects --list</span>
                  <span className="blinking-cursor ml-1">|</span>
                </div>
                <div className="absolute bottom-2 right-4 text-xs text-green-400 opacity-90 select-none">
                  {new Date().toLocaleTimeString()}
                </div>
              </div>
              <style>{`.blinking-cursor{display:inline-block;width:1ch;animation:blink 1s steps(2,start) infinite}@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
            </div>
          </div>
        </div>

  {/* Single card centered */}
  <div className="max-w-3xl mx-auto">{currentCard}</div>

        {/* Pagination */}
        <div className="mt-6">{Pagination}</div>
      </div>

      {/* Section nav divider */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-2 sm:pb-4 md:pb-6 lg:pb-8 pt-3 sm:pt-6 md:pt-8 lg:pt-12">
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-800"></div>
          <div className="font-mono text-xs text-gray-500 flex items-center gap-2">
            <span className="text-green-400">$</span>
            <a href="#education" className="hover:text-green-300 transition-colors">cd ../education</a>
          </div>
          <div className="flex-1 h-px bg-gray-800"></div>
        </div>
      </div>
    </section>
  )
}

export default FeaturedProjects
