import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { server } from '../../main'
import axios from "axios"
import { toast } from 'react-toastify'
import { Code2, Mail, Lock, ArrowRight } from 'lucide-react'

function ParticleBackground() {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    let particles = []
    let W, H

    const resize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }

    class Particle {
      constructor() { this.init() }
      init() {
        this.x = Math.random() * W
        this.y = Math.random() * H
        this.ox = this.x
        this.oy = this.y
        this.vx = (Math.random() - 0.5) * 0.3
        this.vy = (Math.random() - 0.5) * 0.3
        this.r = Math.random() * 2 + 0.8
        this.alpha = Math.random() * 0.6 + 0.3
        this.hue = Math.random() < 0.6
          ? 155 + Math.random() * 30
          : 265 + Math.random() * 30
      }
      update() {
        const scrollY = window.scrollY
        const dx = this.x - mouseRef.current.x
        const dy = this.y - (mouseRef.current.y + scrollY)
        const dist = Math.sqrt(dx * dx + dy * dy)
        const repelR = 100
        if (dist < repelR && dist > 0) {
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
      const maxDist = 90
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j]
          const dx = a.x - b.x, dy = a.y - b.y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < maxDist) {
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(61,255,160,${(1 - d / maxDist) * 0.15})`
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
      const count = Math.min(Math.floor((W * H) / 9000), 300)
      for (let i = 0; i < count; i++) particles.push(new Particle())
      loop()
    }

    const onMove = e => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    const onLeave = () => { mouseRef.current = { x: -1000, y: -1000 } }

    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(animId)
      init()
    })
    ro.observe(document.documentElement)

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)
    init()

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}

const LoginComponent = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [btnLoading, setBtnLoading] = useState(false)
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    setBtnLoading(true)
    e.preventDefault()
    try {
      const { data } = await axios.post(`${server}/api/v1/login`, { email, password })
      toast.success(data.message)
      localStorage.setItem("email", email)
      navigate("/verifyotp")
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      setBtnLoading(false)
    }
  }

  return (
    <div className="relative bg-[#050a10] min-h-screen">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
        
        * {
          font-family: 'DM Sans', sans-serif;
        }
        
        .logo-text {
          font-family: 'Syne', sans-serif;
        }
        
        .input-glow:focus {
          box-shadow: 0 0 0 3px rgba(61, 255, 160, 0.1);
        }
        
        .glass-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .delay-100 {
          animation-delay: 0.1s;
          opacity: 0;
        }
        
        .delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }
        
        .delay-300 {
          animation-delay: 0.3s;
          opacity: 0;
        }
      `}</style>

      <ParticleBackground />

      <div className="relative z-10 min-h-screen flex flex-col">
        <div className="p-8">
          <Link
            to="/"
            className="flex items-center gap-2.5 no-underline select-none group w-fit"
          >
            <div 
              className="
                w-[34px] h-[34px] rounded-[9px] flex-shrink-0
                bg-gradient-to-br from-[#3dffa0] to-[#00d4ff]
                flex items-center justify-center
                transition-transform duration-300
                group-hover:rotate-[-8deg] group-hover:scale-110
              "
            >
              <Code2 size={17} strokeWidth={2.5} className="text-[#050a10]" />
            </div>
            <span className="logo-text font-extrabold text-[19px] tracking-tight text-white">
              Code
              <span className="bg-gradient-to-r from-[#3dffa0] to-[#00d4ff] bg-clip-text text-transparent">
                Collab
              </span>
            </span>
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-6xl grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            
            <div className="space-y-6 animate-fade-in-up">
              <div className="inline-block">
                <div className="px-4 py-2 rounded-full bg-gradient-to-r from-[#3dffa0]/10 to-[#00d4ff]/10 border border-[#3dffa0]/20">
                  <span className="text-sm font-medium bg-gradient-to-r from-[#3dffa0] to-[#00d4ff] bg-clip-text text-transparent">
                    Welcome back
                  </span>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Sign in to
                <span className="block bg-gradient-to-r from-[#3dffa0] to-[#00d4ff] bg-clip-text text-transparent">
                  CodeCollab
                </span>
              </h1>
              
              <p className="text-lg text-white/60 leading-relaxed max-w-md">
                Continue your coding journey. Collaborate in real-time with developers around the world.
              </p>

              <div className="flex items-center gap-8 pt-4">
                <div>
                  <div className="text-3xl font-bold text-white">10K+</div>
                  <div className="text-sm text-white/50">Active Users</div>
                </div>
                <div className="h-12 w-px bg-white/10"></div>
                <div>
                  <div className="text-3xl font-bold text-white">50K+</div>
                  <div className="text-sm text-white/50">Projects</div>
                </div>
              </div>
            </div>

            <div className="animate-fade-in-up delay-200">
              <div className="glass-card rounded-2xl p-8 md:p-10">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Login to your account
                </h2>
                <p className="text-white/50 text-sm mb-8">
                  Enter your credentials to access your workspace
                </p>

                <form onSubmit={submitHandler} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-white/70">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        placeholder="you@example.com"
                        className="
                          w-full pl-12 pr-4 py-3.5 
                          bg-white/5 
                          border border-white/10 
                          rounded-xl 
                          text-white placeholder:text-white/30
                          focus:outline-none focus:border-[#3dffa0]/50
                          input-glow
                          transition-all duration-200
                        "
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label htmlFor="password" className="block text-sm font-medium text-white/70">
                        Password
                      </label>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        placeholder="Enter your password"
                        className="
                          w-full pl-12 pr-4 py-3.5 
                          bg-white/5 
                          border border-white/10 
                          rounded-xl 
                          text-white placeholder:text-white/30
                          focus:outline-none focus:border-[#3dffa0]/50
                          input-glow
                          transition-all duration-200
                        "
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={btnLoading}
                    className="
                      w-full py-3.5 px-6
                      bg-gradient-to-r from-[#3dffa0] to-[#00d4ff]
                      text-[#050a10] font-semibold text-base
                      rounded-xl
                      flex items-center justify-center gap-2
                      transition-all duration-200
                      hover:-translate-y-0.5 hover:shadow-[0_6px_25px_rgba(61,255,160,0.4)]
                      active:translate-y-0 active:shadow-none
                      disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                    "
                  >
                    {btnLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-[#050a10]/30 border-t-[#050a10] rounded-full animate-spin"></div>
                        Signing in...
                      </>
                    ) : (
                      <>
                        Sign in
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>

                  <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/10"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-[#050a10] text-white/40">
                        New to CodeCollab?
                      </span>
                    </div>
                  </div>

                  <div className="text-center">
                    <Link
                      to="/register"
                      className="
                        inline-flex items-center gap-2
                        text-white/70 hover:text-white
                        font-medium text-sm
                        transition-colors
                        no-underline
                      "
                    >
                      Create a new account
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>

        <div className="p-6 text-center text-white/30 text-sm">
          <p>© 2024 CodeCollab. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}

export default LoginComponent