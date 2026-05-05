import React, { useEffect, useRef } from 'react'
import { Code2 } from 'lucide-react'

const Loading = () => {
  const canvasRef = useRef(null)
  const rootRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const root = rootRef.current
    const ctx = canvas.getContext('2d')
    let animId, particles = [], W, H

    const resize = () => {
      const r = root.getBoundingClientRect()
      W = canvas.width = r.width
      H = canvas.height = r.height
    }

    class Particle {
      constructor() { this.init() }
      init() {
        this.x = Math.random() * W; this.ox = this.x
        this.y = Math.random() * H; this.oy = this.y
        this.vx = (Math.random() - 0.5) * 0.3
        this.vy = (Math.random() - 0.5) * 0.3
        this.r = Math.random() * 1.8 + 0.6
        this.alpha = Math.random() * 0.5 + 0.25
        this.hue = Math.random() < 0.6 ? 155 + Math.random() * 30 : 265 + Math.random() * 30
      }
      update() {
        this.x += (this.ox - this.x) * 0.04
        this.y += (this.oy - this.y) * 0.04
        this.ox += this.vx; this.oy += this.vy
        if (this.ox < 0) this.ox = W; if (this.ox > W) this.ox = 0
        if (this.oy < 0) this.oy = H; if (this.oy > H) this.oy = 0
      }
      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${this.hue},100%,70%,${this.alpha})`
        ctx.fill()
      }
    }

    const connect = () => {
      const mx = 80
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j]
          const dx = a.x - b.x, dy = a.y - b.y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < mx) {
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(61,255,160,${(1 - d / mx) * 0.12})`
            ctx.lineWidth = 0.5; ctx.stroke()
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
      resize(); particles = []
      const n = Math.min(Math.floor((W * H) / 5000), 80)
      for (let i = 0; i < n; i++) particles.push(new Particle())
      loop()
    }

    const ro = new ResizeObserver(() => { cancelAnimationFrame(animId); init() })
    ro.observe(root)
    init()

    const msgs = ["Setting up your workspace...", "Loading editor...", "Almost ready...", "Connecting peers..."]
    let mi = 0
    const interval = setInterval(() => {
      mi = (mi + 1) % msgs.length
      const el = document.getElementById('cc-status-text')
      if (el) el.textContent = msgs[mi]
    }, 2400)

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
      clearInterval(interval)
    }
  }, [])

  return (
    <div
      ref={rootRef}
      className="relative bg-[#050a10] min-h-screen w-full flex flex-col items-center justify-center gap-8 overflow-hidden"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@800&family=DM+Sans:wght@400;500&display=swap');
        @keyframes cc-spin-bounce {
          0%,100% { transform: rotate(-6deg) scale(1); }
          50%      { transform: rotate(6deg) scale(1.08); }
        }
        @keyframes cc-progress {
          0%   { width: 0%;   opacity: 1; }
          70%  { width: 100%; opacity: 1; }
          85%  { width: 100%; opacity: 0; }
          86%  { width: 0%;   opacity: 0; }
          100% { width: 0%;   opacity: 1; }
        }
        @keyframes cc-blink {
          0%,100% { opacity: 0.4; }
          50%      { opacity: 0.75; }
        }
        @keyframes cc-dot-pulse {
          0%,100% { opacity: 0.25; transform: scale(1); }
          50%      { opacity: 1;    transform: scale(1.5); }
        }
        @keyframes cc-fadein {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .cc-icon-box { animation: cc-spin-bounce 2s ease-in-out infinite; }
        .cc-bar-fill { height: 100%; border-radius: 99px; background: linear-gradient(90deg, #3dffa0, #00d4ff); animation: cc-progress 2.4s cubic-bezier(0.4,0,0.2,1) infinite; }
        .cc-status   { animation: cc-blink 1.6s ease-in-out infinite; }
        .cc-dot-1    { animation: cc-dot-pulse 1.2s 0.0s ease-in-out infinite; }
        .cc-dot-2    { animation: cc-dot-pulse 1.2s 0.2s ease-in-out infinite; }
        .cc-dot-3    { animation: cc-dot-pulse 1.2s 0.4s ease-in-out infinite; }
        .cc-logo     { animation: cc-fadein 0.6s ease both; }
        .cc-bar-wrap { animation: cc-fadein 0.6s 0.2s ease both; }
        .cc-dots-row { animation: cc-fadein 0.6s 0.35s ease both; }
      `}</style>

      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Logo */}
      <div className="cc-logo relative z-10 flex items-center gap-2.5">
        <div className="cc-icon-box w-10 h-10 rounded-[11px] bg-gradient-to-br from-[#3dffa0] to-[#00d4ff] flex items-center justify-center">
          <Code2 size={20} strokeWidth={2.5} color="#050a10" />
        </div>
        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 26, letterSpacing: '-0.03em', color: '#fff' }}>
          Code
          <span style={{ background: 'linear-gradient(120deg,#3dffa0,#00d4ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Collab
          </span>
        </span>
      </div>

      {/* Progress Bar */}
      <div className="cc-bar-wrap relative z-10 flex flex-col items-center gap-3 w-56">
        <div className="w-full h-[3px] bg-white/[0.08] rounded-full overflow-hidden">
          <div className="cc-bar-fill" />
        </div>
        <span
          id="cc-status-text"
          className="cc-status text-[13px] text-white/40 tracking-wide"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Setting up your workspace...
        </span>
      </div>

      {/* Dots */}
      <div className="cc-dots-row relative z-10 flex gap-[7px]">
        <div className="cc-dot-1 w-[6px] h-[6px] rounded-full bg-gradient-to-br from-[#3dffa0] to-[#00d4ff] opacity-30" />
        <div className="cc-dot-2 w-[6px] h-[6px] rounded-full bg-gradient-to-br from-[#3dffa0] to-[#00d4ff] opacity-30" />
        <div className="cc-dot-3 w-[6px] h-[6px] rounded-full bg-gradient-to-br from-[#3dffa0] to-[#00d4ff] opacity-30" />
      </div>
    </div>
  )
}

export default Loading