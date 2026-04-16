import React, { useState, useEffect } from 'react'
import { Code2, Menu, X } from 'lucide-react'

const NAV_LINKS = ['Home', 'Features', 'Docs']

const Navbar=() =>{
  const [scrolled,     setScrolled]     = useState(false)
  const [mobileOpen,   setMobileOpen]   = useState(false)
  const [activeLink,   setActiveLink]   = useState('Home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

        .nav-link-item { transition: color .2s, background .2s; }
        .nav-link-item:hover {
          color: rgba(255,255,255,0.9) !important;
          background: rgba(255,255,255,0.05) !important;
        }
        .btn-login-nav:hover {
          color: #fff !important;
          border-color: rgba(255,255,255,0.28) !important;
          background: rgba(255,255,255,0.05) !important;
        }
        .btn-signup-nav:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(61,255,160,0.35) !important;
        }
        .btn-signup-nav:active { transform: translateY(0) !important; box-shadow: none !important; }
        .logo-wrap:hover .logo-box { transform: rotate(-8deg) scale(1.08); }

        /* Mobile menu */
        .mobile-menu {
          position: fixed;
          top: 64px; left: 0; right: 0;
          background: rgba(5,10,16,0.97);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.07);
          padding: 16px 24px 24px;
          z-index: 99;
          display: flex;
          flex-direction: column;
          gap: 4px;
          transform: translateY(-8px);
          opacity: 0;
          pointer-events: none;
          transition: transform .25s ease, opacity .25s ease;
        }
        .mobile-menu.open {
          transform: translateY(0);
          opacity: 1;
          pointer-events: all;
        }
        .mobile-link {
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 500;
          color: rgba(255,255,255,0.55);
          padding: 10px 14px;
          border-radius: 10px;
          text-decoration: none;
          transition: color .2s, background .2s;
        }
        .mobile-link:hover { color: #fff; background: rgba(255,255,255,0.05); }
        .mobile-divider {
          height: 1px;
          background: rgba(255,255,255,0.06);
          margin: 10px 0;
        }
      `}</style>
      <nav style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        height: 64,
        padding: '0 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: scrolled ? 'rgba(5,10,16,0.85)' : 'transparent',
        borderBottom: `1px solid ${scrolled ? 'rgba(255,255,255,0.07)' : 'transparent'}`,
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        transition: 'background .3s, border-color .3s, backdrop-filter .3s',
      }}>

        <a
          href="#"
          className="logo-wrap"
          style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', userSelect: 'none' }}
        >
          <div
            className="logo-box"
            style={{
              width: 34, height: 34, borderRadius: 9, flexShrink: 0,
              background: 'linear-gradient(135deg,#3dffa0,#00d4ff)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'transform .3s',
            }}
          >
            <Code2 size={17} strokeWidth={2.5} color="#050a10" />
          </div>
          <span style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800, fontSize: 19,
            letterSpacing: '-0.02em', color: '#ffffff',
          }}>
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
        </a>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 4,
          position: 'absolute', left: '50%', transform: 'translateX(-50%)',
        }}
          className="hide-mobile"
        >
          {NAV_LINKS.map(link => (
            <a
              key={link}
              href="#"
              onClick={e => { e.preventDefault(); setActiveLink(link) }}
              className="nav-link-item"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14, fontWeight: 500,
                color: activeLink === link ? '#ffffff' : 'rgba(255,255,255,0.5)',
                textDecoration: 'none',
                padding: '6px 14px', borderRadius: 8,
                background: activeLink === link ? 'rgba(255,255,255,0.05)' : 'transparent',
              }}
            >
              {link}
            </a>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            className="btn-login-nav"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14, fontWeight: 500,
              color: 'rgba(255,255,255,0.65)',
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.12)',
              padding: '8px 20px', borderRadius: 10,
              cursor: 'pointer',
              transition: 'color .22s, border-color .22s, background .22s',
            }}
          >
            Log in
          </button>

          <button
            className="btn-signup-nav"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14, fontWeight: 600,
              color: '#050a10',
              background: 'linear-gradient(135deg,#3dffa0,#00d4ff)',
              border: 'none',
              padding: '8px 20px', borderRadius: 10,
              cursor: 'pointer',
              transition: 'transform .22s, box-shadow .22s',
            }}
          >
            Sign up free
          </button>

          <button
            onClick={() => setMobileOpen(p => !p)}
            style={{
              display: 'none',   
              background: 'none', border: 'none',
              cursor: 'pointer', padding: 4,
              color: 'rgba(255,255,255,0.7)',
            }}
            className="show-mobile"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        {NAV_LINKS.map(link => (
          <a
            key={link}
            href="#"
            className="mobile-link"
            onClick={e => { e.preventDefault(); setActiveLink(link); setMobileOpen(false) }}
          >
            {link}
          </a>
        ))}
        <div className="mobile-divider" />
        <a href="#" className="mobile-link" style={{ color: 'rgba(255,255,255,0.55)' }}>Log in</a>
        <a
          href="#"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 15, fontWeight: 600,
            color: '#050a10',
            background: 'linear-gradient(135deg,#3dffa0,#00d4ff)',
            padding: '11px 14px', borderRadius: 10,
            textAlign: 'center', textDecoration: 'none',
            marginTop: 4,
          }}
        >
          Sign up free
        </a>
      </div>
      <div style={{ height: 64 }} />
    </>
  )
}

export default Navbar;