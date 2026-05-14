import React, { useEffect, useRef } from 'react'
import RegisterLeft from '../components/register/registerLeft'
import RegisterForm from '../components/register/registerForm'
import Logo from '../components/logo/logo'

function ParticleBackground() {
  const canvasRef = useRef(null)
  const mouseRef  = useRef({ x: -1000, y: -1000 })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId, particles = [], W, H

    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight }

    class Particle {
      constructor() { this.init() }
      init() {
        this.x = Math.random()*W; this.ox = this.x
        this.y = Math.random()*H; this.oy = this.y
        this.vx = (Math.random()-0.5)*0.3; this.vy = (Math.random()-0.5)*0.3
        this.r = Math.random()*2+0.8; this.alpha = Math.random()*0.6+0.3
        this.hue = Math.random()<0.6 ? 155+Math.random()*30 : 265+Math.random()*30
      }
      update() {
        const dx = this.x-mouseRef.current.x, dy = this.y-(mouseRef.current.y+window.scrollY)
        const dist = Math.sqrt(dx*dx+dy*dy), repelR = 100
        if (dist < repelR && dist > 0) {
          const force = (repelR-dist)/repelR
          this.x += (dx/dist)*force*3.5; this.y += (dy/dist)*force*3.5
        } else {
          this.x += (this.ox-this.x)*0.04; this.y += (this.oy-this.y)*0.04
        }
        this.ox += this.vx; this.oy += this.vy
        if(this.ox<0) this.ox=W; if(this.ox>W) this.ox=0
        if(this.oy<0) this.oy=H; if(this.oy>H) this.oy=0
      }
      draw() {
        ctx.beginPath(); ctx.arc(this.x,this.y,this.r,0,Math.PI*2)
        ctx.fillStyle=`hsla(${this.hue},100%,72%,${this.alpha})`; ctx.fill()
      }
    }

    const connect = () => {
      const mx=90
      for(let i=0;i<particles.length;i++) for(let j=i+1;j<particles.length;j++) {
        const a=particles[i],b=particles[j],dx=a.x-b.x,dy=a.y-b.y,d=Math.sqrt(dx*dx+dy*dy)
        if(d<mx){ ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.strokeStyle=`rgba(61,255,160,${(1-d/mx)*0.15})`;ctx.lineWidth=0.5;ctx.stroke() }
      }
    }

    const loop = () => { ctx.clearRect(0,0,W,H); particles.forEach(p=>{p.update();p.draw()}); connect(); animId=requestAnimationFrame(loop) }
    const init = () => { resize(); particles=[]; const n=Math.min(Math.floor((W*H)/9000),300); for(let i=0;i<n;i++) particles.push(new Particle()); loop() }
    const ro = new ResizeObserver(()=>{cancelAnimationFrame(animId);init()})
    ro.observe(document.documentElement)
    window.addEventListener('mousemove', e=>{ mouseRef.current={x:e.clientX,y:e.clientY} })
    window.addEventListener('mouseleave', ()=>{ mouseRef.current={x:-1000,y:-1000} })
    init()
    return () => { cancelAnimationFrame(animId); ro.disconnect() }
  }, [])

  return <canvas ref={canvasRef} style={{ position:'fixed', inset:0, width:'100%', height:'100%', pointerEvents:'none', zIndex:0 }} />
}

const RegisterPage = () => (
  <div className="relative bg-[#050a10] min-h-screen flex flex-col">
    <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@800&family=DM+Sans:wght@400;500&display=swap');`}</style>

    <ParticleBackground />

    <div className="relative z-10 flex flex-col min-h-screen">
      <div className="p-8"><Logo /></div>
      <div className="flex-1 flex items-center justify-center px-6 py-8">
        <div className="w-full max-w-5xl flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1"><RegisterLeft /></div>
          <RegisterForm />
        </div>
      </div>
      <div className="p-6 text-center text-white/25 text-xs" style={{ fontFamily:"'DM Sans',sans-serif" }}>
        © 2024 CodeCollab. All rights reserved.
      </div>
    </div>
  </div>
)

export default RegisterPage