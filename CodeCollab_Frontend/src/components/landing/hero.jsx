import React, { useEffect, useRef } from 'react'

const Hero = () => {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    let particles = []
    let W, H

    const resize = () => {
      W = canvas.width  = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
    }

    class Particle {
      constructor() { this.init() }
      init() {
        this.x  = Math.random() * W
        this.y  = Math.random() * H
        this.ox = this.x
        this.oy = this.y
        this.vx = (Math.random() - 0.5) * 0.3
        this.vy = (Math.random() - 0.5) * 0.3
        this.r  = Math.random() * 1.6 + 0.4
        this.alpha = Math.random() * 0.55 + 0.15
        this.hue = Math.random() < 0.6 ? 155 + Math.random() * 30 : 265 + Math.random() * 30
      }
      update() {
        const { x: mx, y: my } = mouseRef.current
        const dx = this.x - mx, dy = this.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        const repelR = 90
        if (dist < repelR) {
          const force = (repelR - dist) / repelR
          this.x += (dx / dist) * force * 3.5
          this.y += (dy / dist) * force * 3.5
        } else {
          this.x += (this.ox - this.x) * 0.04
          this.y += (this.oy - this.y) * 0.04
        }
        this.ox += this.vx
        this.oy += this.vy
        if (this.ox < 0) this.ox = W
        if (this.ox > W) this.ox = 0
        if (this.oy < 0) this.oy = H
        if (this.oy > H) this.oy = 0
      }
      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${this.hue},100%,72%,${this.alpha})`
        ctx.fill()
      }
    }

    const connect = () => {
      const maxDist = 85
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j]
          const dx = a.x - b.x, dy = a.y - b.y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < maxDist) {
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(61,255,160,${(1 - d / maxDist) * 0.18})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
    }

    const loop = () => {
      ctx.clearRect(0, 0, W, H)
      particles.forEach(p => { p.update(); p.draw() })
      connect()
      animId = requestAnimationFrame(loop)
    }

    const init = () => {
      resize()
      particles = []
      const count = Math.min(Math.floor(W * H / 7000), 130)
      for (let i = 0; i < count; i++) particles.push(new Particle())
      loop()
    }

    const onMove = e => {
      const r = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top }
    }
    const onLeave = () => { mouseRef.current = { x: -1000, y: -1000 } }
    const onResize = () => { resize(); particles.forEach(p => p.init()) }

    canvas.addEventListener('mousemove', onMove)
    canvas.addEventListener('mouseleave', onLeave)
    window.addEventListener('resize', onResize)
    init()

    return () => {
      cancelAnimationFrame(animId)
      canvas.removeEventListener('mousemove', onMove)
      canvas.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050a10]">

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-crosshair"
      />

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