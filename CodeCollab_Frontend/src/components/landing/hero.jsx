import React from 'react'

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-[120px] bg-emerald-400/10 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-[100px] bg-violet-500/10 pointer-events-none" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto py-24">

        <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-10 bg-white/[0.04] border border-white/[0.10] text-white/60 text-xs tracking-widest uppercase">
          <span className="relative flex w-[7px] h-[7px]">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-40" />
            <span className="relative inline-flex rounded-full h-[7px] w-[7px] bg-emerald-400" />
          </span>
          Now in Public Beta &nbsp;·&nbsp; v2.0
        </div>

        <h1 className="font-black leading-[0.95] tracking-tight text-white mb-8"
            style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(3.2rem, 8vw, 6rem)' }}>
          Code Together,
          <span
            className="block bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent"
            style={{ fontSize: 'clamp(3.8rem, 9.5vw, 7rem)' }}
          >
            Anywhere.
          </span>
        </h1>

        <p className="text-lg md:text-xl leading-relaxed mb-10 mx-auto max-w-[580px] text-white/45">
          The{' '}
          <span className="text-white/85 font-medium">ultimate collaborative coding platform</span>{' '}
          for open source contributors and dev teams.
          Edit code in real-time, chat with your team, and ship faster.
        </p>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {['⚡ Real-time sync', '🔒 E2E encrypted', '🌍 Multi-language', '🤖 AI pair programmer'].map((chip) => (
            <span
              key={chip}
              className="font-mono text-xs px-3 py-1.5 rounded-lg bg-emerald-400/[0.06] border border-emerald-400/[0.18] text-emerald-400/85"
            >
              {chip}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <button className="flex items-center gap-2 px-8 py-3.5 rounded-[14px] font-semibold text-[#050a10] bg-gradient-to-r from-emerald-400 to-cyan-400 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(61,255,160,0.35)] transition-all duration-300 text-[15px]">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Start Coding Free
          </button>

          <button className="flex items-center gap-2 px-8 py-3.5 rounded-[14px] font-medium text-white/70 bg-white/[0.04] border border-white/[0.10] hover:bg-white/[0.08] hover:-translate-y-1 transition-all duration-300 text-[15px]">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <circle cx="12" cy="12" r="10" />
              <polygon points="10,8 16,12 10,16" fill="currentColor" stroke="none" />
            </svg>
            Watch Demo
          </button>
        </div>

      </div>
    </section>
  )
}

export default Hero