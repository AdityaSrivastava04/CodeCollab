import axios from 'axios'
import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { server } from '../../main'
import { toast } from 'react-toastify'
import { Code2, ShieldCheck, ArrowRight, RotateCcw } from 'lucide-react'

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
        this.hue = Math.random() < 0.6 ? 155 + Math.random() * 30 : 265 + Math.random() * 30
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

    const onMove = e => { mouseRef.current = { x: e.clientX, y: e.clientY } }
    const onLeave = () => { mouseRef.current = { x: -1000, y: -1000 } }
    const ro = new ResizeObserver(() => { cancelAnimationFrame(animId); init() })
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
      style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}
    />
  )
}

const Verify = () => {
  const [otp, setOtp] = useState("")
  const [btnLoading, setBtnLoading] = useState(false)
  const [resendTimer, setResendTimer] = useState(30)
  const [canResend, setCanResend] = useState(false)
  const navigate = useNavigate()
  const email = localStorage.getItem("email")
  useEffect(() => {
    if (resendTimer > 0) {
      const t = setTimeout(() => setResendTimer(prev => prev - 1), 1000)
      return () => clearTimeout(t)
    } else {
      setCanResend(true)
    }
  }, [resendTimer])

  const submitHandler = async (e) => {
    setBtnLoading(true)
    e.preventDefault()
    try {
      const { data } = await axios.post(`${server}/api/v1/verify`,
        { email, otp },
        { withCredentials: true }
      )
      toast.success(data.message)
      localStorage.clear("email")
      navigate("/")
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      setBtnLoading(false)
    }
  }

  const handleResend = () => {
    if (!canResend) return
    setCanResend(false)
    setResendTimer(30)
    toast.info("OTP resent to your email!")
  }

  return (
    <div className="relative bg-[#050a10] min-h-screen">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
        * { font-family: 'DM Sans', sans-serif; }
        .logo-text { font-family: 'Syne', sans-serif; }

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
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }
        .delay-1 { animation-delay: 0.1s; opacity: 0; }
        .delay-2 { animation-delay: 0.25s; opacity: 0; }

        @keyframes pulse-ring {
          0%   { transform: scale(1);   opacity: 0.6; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        .pulse-ring::before {
          content: '';
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          border: 2px solid rgba(61,255,160,0.4);
          animation: pulse-ring 2s ease-out infinite;
        }

        /* OTP input — no spinners */
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
        input[type=number] { -moz-appearance: textfield; }
      `}</style>

      <ParticleBackground />

      <div className="relative z-10 min-h-screen flex flex-col">

        <div className="p-8">
          <Link to="/" className="flex items-center gap-2.5 no-underline select-none group w-fit">
            <div className="w-[34px] h-[34px] rounded-[9px] flex-shrink-0 bg-gradient-to-br from-[#3dffa0] to-[#00d4ff] flex items-center justify-center transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:scale-110">
              <Code2 size={17} strokeWidth={2.5} className="text-[#050a10]" />
            </div>
            <span className="logo-text font-extrabold text-[19px] tracking-tight text-white">
              Code<span className="bg-gradient-to-r from-[#3dffa0] to-[#00d4ff] bg-clip-text text-transparent">Collab</span>
            </span>
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-6xl grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div className="space-y-6 fade-in-up">
              <div className="inline-block">
                <div className="px-4 py-2 rounded-full bg-gradient-to-r from-[#3dffa0]/10 to-[#00d4ff]/10 border border-[#3dffa0]/20">
                  <span className="text-sm font-medium bg-gradient-to-r from-[#3dffa0] to-[#00d4ff] bg-clip-text text-transparent">
                    One last step
                  </span>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Verify your
                <span className="block bg-gradient-to-r from-[#3dffa0] to-[#00d4ff] bg-clip-text text-transparent">
                  identity
                </span>
              </h1>

              <p className="text-lg text-white/60 leading-relaxed max-w-md">
                We've sent a one-time password to{' '}
                <span className="text-white/90 font-medium">
                  {email || "your email"}
                </span>
                . Enter it below to access your workspace.
              </p>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.07]">
                <div className="relative flex-shrink-0 mt-0.5">
                  <div className="pulse-ring relative w-9 h-9 rounded-full bg-gradient-to-br from-[#3dffa0]/20 to-[#00d4ff]/20 flex items-center justify-center">
                    <ShieldCheck size={18} className="text-[#3dffa0]" />
                  </div>
                </div>
                <div>
                  <p className="text-white/80 text-sm font-medium">Secure Verification</p>
                  <p className="text-white/45 text-sm mt-0.5">
                    This OTP expires in 5 minutes. Never share it with anyone.
                  </p>
                </div>
              </div>
            </div>

            <div className="fade-in-up delay-2">
              <div className="glass-card rounded-2xl p-8 md:p-10">
                <h2 className="text-2xl font-bold text-white mb-2">Enter OTP</h2>
                <p className="text-white/50 text-sm mb-8">
                  Check your inbox and paste the code below
                </p>

                <form onSubmit={submitHandler} className="space-y-6">

                  <div className="space-y-2">
                    <label htmlFor="otp" className="block text-sm font-medium text-white/70">
                      One-Time Password
                    </label>
                    <input
                      type="number"
                      id="otp"
                      name="otp"
                      value={otp}
                      onChange={e => setOtp(e.target.value)}
                      required
                      placeholder="Enter your OTP"
                      className="
                        w-full px-5 py-4
                        bg-white/5
                        border border-white/10
                        rounded-xl
                        text-white text-xl font-semibold tracking-[0.3em] text-center
                        placeholder:text-white/20 placeholder:text-base placeholder:tracking-normal
                        focus:outline-none focus:border-[#3dffa0]/50
                        input-glow
                        transition-all duration-200
                      "
                    />
                    <p className="text-white/35 text-xs text-center pt-1">
                      Sent to {email || "your registered email"}
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={btnLoading || otp.length < 4}
                    className="
                      w-full py-3.5 px-6
                      bg-gradient-to-r from-[#3dffa0] to-[#00d4ff]
                      text-[#050a10] font-semibold text-base
                      rounded-xl
                      flex items-center justify-center gap-2
                      transition-all duration-200
                      hover:-translate-y-0.5 hover:shadow-[0_6px_25px_rgba(61,255,160,0.4)]
                      active:translate-y-0 active:shadow-none
                      disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none
                    "
                  >
                    {btnLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-[#050a10]/30 border-t-[#050a10] rounded-full animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        Verify & Continue
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 pt-2">
                    <span className="text-white/40 text-sm">Didn't receive it?</span>
                    <button
                      type="button"
                      onClick={handleResend}
                      disabled={!canResend}
                      className={`
                        flex items-center gap-1.5 text-sm font-medium
                        transition-all duration-200
                        bg-transparent border-none cursor-pointer p-0
                        ${canResend
                          ? 'text-[#3dffa0] hover:text-[#00d4ff]'
                          : 'text-white/30 cursor-not-allowed'
                        }
                      `}
                    >
                      <RotateCcw size={13} />
                      {canResend ? "Resend OTP" : `Resend in ${resendTimer}s`}
                    </button>
                  </div>

                  <div className="relative my-2">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/10" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-[#050a10] text-white/40">or</span>
                    </div>
                  </div>

                  <div className="text-center">
                    <Link
                      to="/login"
                      className="inline-flex items-center gap-2 text-white/50 hover:text-white font-medium text-sm transition-colors no-underline"
                    >
                      ← Back to Login
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

export default Verify