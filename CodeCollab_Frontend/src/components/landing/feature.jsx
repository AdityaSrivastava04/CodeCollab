import React from 'react'
import {
  GitBranch,
  Users,
  ShieldCheck,
  MessageSquare,
  Terminal,
  Code2,
} from 'lucide-react'

const features = [
  {
    icon: GitBranch,
    title: 'Git Integration',
    desc: 'Seamlessly connect to your repositories and keep everything in sync automatically.',
    accent: '#3dffa0',
    glow: 'rgba(61,255,160,0.09)',
  },
  {
    icon: Users,
    title: 'Live Collaboration',
    desc: 'See live cursors, edits, and collaborate with your team in real-time like Google Docs.',
    accent: '#00d4ff',
    glow: 'rgba(0,212,255,0.09)',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Invite Codes',
    desc: 'Share secure 6-digit codes to invite collaborators without exposing your repository.',
    accent: '#b57aff',
    glow: 'rgba(181,122,255,0.09)',
  },
  {
    icon: MessageSquare,
    title: 'Inline Chat',
    desc: 'Communicate with your team without leaving the editor, keeping context always available.',
    accent: '#ff6b6b',
    glow: 'rgba(255,107,107,0.09)',
  },
  {
    icon: Terminal,
    title: 'Integrated Terminal',
    desc: 'Run commands, execute tests, and manage your environment right from the interface.',
    accent: '#ffd166',
    glow: 'rgba(255,209,102,0.09)',
  },
  {
    icon: Code2,
    title: 'Multi-Language',
    desc: 'Support for all major languages with beautiful, high-contrast syntax highlighting.',
    accent: '#06ffa5',
    glow: 'rgba(6,255,165,0.09)',
  },
]

function FeatureCard({ icon: Icon, title, desc, accent, glow, index }) {
  const [hovered, setHovered] = React.useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        background: hovered ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.03)',
        border: `1px solid ${hovered ? accent : 'rgba(255,255,255,0.07)'}`,
        borderRadius: 20,
        padding: '32px 28px',
        overflow: 'hidden',
        cursor: 'default',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'all 0.35s ease',
        animationDelay: `${index * 0.07}s`,
      }}
    >
      <div style={{
        position: 'absolute',
        inset: 0,
        borderRadius: 20,
        background: `radial-gradient(circle at 10% 10%, ${glow}, transparent 60%)`,
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.4s',
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'absolute',
        top: 0,
        left: hovered ? '150%' : '-100%',
        width: '60%',
        height: 1,
        background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
        transition: 'left 0.5s ease',
        pointerEvents: 'none',
      }} />

      <div style={{
        width: 52,
        height: 52,
        borderRadius: 14,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 28,
        background: hovered ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.05)',
        border: `1px solid ${hovered ? accent : 'rgba(255,255,255,0.08)'}`,
        transform: hovered ? 'scale(1.08)' : 'scale(1)',
        transition: 'all 0.3s ease',
        position: 'relative',
        zIndex: 1,
      }}>
        <Icon size={22} strokeWidth={1.5} color={accent} />
      </div>

      <p style={{
        fontFamily: "'Syne', sans-serif",
        fontWeight: 700,
        fontSize: 17,
        color: hovered ? accent : '#ffffff',
        marginBottom: 10,
        letterSpacing: '-0.01em',
        transition: 'color 0.3s',
        position: 'relative',
        zIndex: 1,
      }}>
        {title}
      </p>

      <p style={{
        fontSize: 14,
        color: 'rgba(255,255,255,0.38)',
        lineHeight: 1.75,
        position: 'relative',
        zIndex: 1,
      }}>
        {desc}
      </p>
    </div>
  )
}

const FeaturesSection=()=> {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

        @keyframes featCardIn {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .feat-card-anim {
          opacity: 0;
          animation: featCardIn 0.5s ease forwards;
        }
      `}</style>

      <section style={{
        background: '#050a10',
        padding: '96px 24px',
        fontFamily: "'DM Sans', sans-serif",
        position: 'relative',
        overflow: 'hidden',
      }}>

        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

        <div style={{
          position: 'absolute', top: -200, left: '50%', transform: 'translateX(-50%)',
          width: 800, height: 400, pointerEvents: 'none',
          background: 'radial-gradient(ellipse,rgba(61,255,160,0.06) 0%,transparent 70%)',
        }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto' }}>

          <div style={{ textAlign: 'center', marginBottom: 72 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase',
              color: '#3dffa0', opacity: 0.85, marginBottom: 18,
            }}>
              <span style={{ display: 'inline-block', width: 24, height: 1, background: '#3dffa0', opacity: 0.6 }} />
              Features
              <span style={{ display: 'inline-block', width: 24, height: 1, background: '#3dffa0', opacity: 0.6 }} />
            </div>

            <h2 style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
              color: '#ffffff',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              marginBottom: 16,
            }}>
              Everything You Need to{' '}
              <span style={{
                background: 'linear-gradient(120deg, #3dffa0, #00d4ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Collaborate
              </span>
            </h2>

            <p style={{
              fontSize: 16,
              color: 'rgba(255,255,255,0.38)',
              maxWidth: 520,
              margin: '0 auto',
              lineHeight: 1.75,
            }}>
              Built for developers who value speed, simplicity, and seamless teamwork
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 16,
          }}>
            {features.map((f, i) => (
              <div
                key={i}
                className="feat-card-anim"
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                <FeatureCard {...f} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
export default FeaturesSection;