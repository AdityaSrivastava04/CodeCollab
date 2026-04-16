import React from 'react'
import {
  Code2,
  Github,
  Twitter,
  MessageCircle,
  Zap,
} from 'lucide-react'

const LINKS = {
  Product:    ['Features', 'Pricing', 'Changelog', 'Roadmap', 'Open Source'],
  Developers: ['Documentation', 'API Reference', 'SDK', 'GitHub', 'Status'],
  Company:    ['About', 'Blog', 'Careers', 'Privacy', 'Terms'],
}

const SOCIALS = [
  { icon: Github,        label: 'GitHub'  },
  { icon: Twitter,       label: 'Twitter' },
  { icon: MessageCircle, label: 'Discord' },
]

const Footer=()=> {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@400;500;600&display=swap');

        @keyframes heartbeat { 0%,100%{transform:scale(1)} 50%{transform:scale(1.3)} }

        .footer-link:hover { color: #3dffa0 !important; }
        .footer-social:hover {
          background: rgba(255,255,255,0.08) !important;
          border-color: rgba(61,255,160,0.35) !important;
          transform: translateY(-2px);
        }
        .footer-social:hover svg { stroke: #3dffa0 !important; }
        .footer-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(61,255,160,0.35);
        }
        .footer-dev-badge:hover {
          border-color: rgba(61,255,160,0.3) !important;
          color: rgba(255,255,255,0.65) !important;
        }
      `}</style>

      <footer style={{
        background: '#050a10',
        fontFamily: "'DM Sans', sans-serif",
        position: 'relative',
        overflow: 'hidden',
      }}>

        {/* Grid bg */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.012) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.012) 1px,transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

        {/* Bottom glow */}
        <div style={{
          position: 'absolute', bottom: -120, left: '50%', transform: 'translateX(-50%)',
          width: 700, height: 300, pointerEvents: 'none',
          background: 'radial-gradient(ellipse,rgba(61,255,160,0.07) 0%,transparent 70%)',
        }} />

        {/* Top divider */}
        <div style={{
          width: '100%', height: 1,
          background: 'linear-gradient(90deg,transparent,rgba(61,255,160,0.3),rgba(0,212,255,0.2),transparent)',
        }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto', padding: '72px 32px 48px' }}>

          {/* ── Big tagline ── */}
          <div style={{ textAlign: 'center', marginBottom: 64, paddingTop: 0 }}>
            <h2 style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(2rem, 5vw, 3.8rem)',
              color: '#ffffff',
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              marginBottom: 20,
            }}>
              Built for Developers,{' '}
              <span style={{
                display: 'block',
                background: 'linear-gradient(120deg,#3dffa0 0%,#00d4ff 50%,#b57aff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                by Developers.
              </span>
            </h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.35)', marginBottom: 32 }}>
              Start collaborating in seconds. No setup, no friction.
            </p>
            <button
              className="footer-cta-btn"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '13px 28px', borderRadius: 14,
                fontSize: 15, fontWeight: 600,
                color: '#050a10',
                background: 'linear-gradient(135deg,#3dffa0,#00d4ff)',
                border: 'none', cursor: 'pointer',
                transition: 'transform .25s, box-shadow .25s',
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              <Zap size={16} strokeWidth={2.5} color="#050a10" />
              Get Started Free
            </button>
          </div>

          {/* ── Link grid ── */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.8fr 1fr 1fr 1fr',
            gap: 48,
            marginBottom: 64,
          }}>

            {/* Brand col */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                  background: 'linear-gradient(135deg,#3dffa0,#00d4ff)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Code2 size={18} strokeWidth={2.5} color="#050a10" />
                </div>
                <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 20, color: '#fff', letterSpacing: '-0.02em' }}>
                  Code
                  <span style={{
                    background: 'linear-gradient(120deg,#3dffa0,#00d4ff)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                    Collab
                  </span>
                </span>
              </div>

              <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.38)', lineHeight: 1.75, marginBottom: 24, maxWidth: 280 }}>
                The collaborative coding platform built for open source teams and indie developers.
              </p>

              <div style={{ display: 'flex', gap: 10 }}>
                {SOCIALS.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="footer-social"
                    title={label}
                    style={{
                      width: 34, height: 34, borderRadius: 9,
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'background .25s, border-color .25s, transform .25s',
                    }}
                  >
                    <Icon size={15} strokeWidth={1.8} color="rgba(255,255,255,0.5)" />
                  </div>
                ))}
              </div>
            </div>

            {/* Link cols */}
            {Object.entries(LINKS).map(([title, links]) => (
              <div key={title}>
                <p style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 18, fontWeight: 600 }}>
                  {title}
                </p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 11 }}>
                  {links.map(link => (
                    <li key={link}>
                      <a
                        href="#"
                        className="footer-link"
                        style={{ fontSize: 14, color: 'rgba(255,255,255,0.38)', textDecoration: 'none', transition: 'color .22s' }}
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* ── Bottom bar ── */}
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
            paddingTop: 28,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: 16,
          }}>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.25)', lineHeight: 1.6 }}>
              &copy; 2026 <span style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>CodeCollab</span>. All rights reserved.
            </p>

            <div
              className="footer-dev-badge"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 99, padding: '6px 14px',
                fontSize: 12, color: 'rgba(255,255,255,0.4)',
                transition: 'border-color .3s, color .3s', cursor: 'default',
              }}
            >
              <Code2 size={13} strokeWidth={2} color="#3dffa0" />
              Built for developers, by developers
              <span style={{ animation: 'heartbeat .9s ease-in-out infinite', display: 'inline-block' }}>♥</span>
            </div>
          </div>

        </div>
      </footer>
    </>
  )
}

export default Footer;