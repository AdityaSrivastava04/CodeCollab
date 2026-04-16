import React, { useEffect, useRef } from 'react'
import FeaturesSection from '../components/landing/feature'
import Hero from '../components/landing/hero'
import Footer from '../components/landing/footer.jsx'
import CollabCodeEditor from '../components/landing/codeAnimation.jsx'
import Navbar from '../components/landing/nav.jsx'

function ParticleBackground() {
  const canvasRef = useRef(null)
  const mouseRef  = useRef({ x: -1000, y: -1000 })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    let animId
    let particles = []
    let W, H

     const resize = () => {
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight
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
        this.r  = Math.random() * 2 + 0.8
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
          const d  = Math.sqrt(dx * dx + dy * dy)
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

const  Landing=()=> {
  return (
    <div style={{ position: 'relative', background: '#050a10', minHeight: '100vh' }}>

      <ParticleBackground />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar/>
        <Hero />
        <CollabCodeEditor />
        <FeaturesSection />
        <Footer />
      </div>

    </div>
  )
}
export default Landing