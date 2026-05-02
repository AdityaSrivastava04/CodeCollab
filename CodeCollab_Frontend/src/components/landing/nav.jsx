import React, { useState, useEffect } from 'react'
import { Code2, Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom'


const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('Home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
        
        * {
          font-family: 'DM Sans', sans-serif;
        }
        
        .logo-text {
          font-family: 'Syne', sans-serif;
        }
        
        .mobile-menu-enter {
          transform: translateY(-8px);
          opacity: 0;
        }
        
        .mobile-menu-active {
          transform: translateY(0);
          opacity: 1;
        }
        
        @media (max-width: 768px) {
          .hide-mobile {
            display: none !important;
          }
          .show-mobile {
            display: block !important;
          }
        }
        
        @media (min-width: 769px) {
          .show-mobile {
            display: none !important;
          }
        }
      `}</style>

      <nav 
        className={`
          fixed top-0 left-0 right-0 z-[100] h-16 px-8
          flex items-center justify-between
          transition-all duration-300
          ${scrolled 
            ? 'bg-[rgba(5,10,16,0.85)] border-b border-white/[0.07] backdrop-blur-[20px]' 
            : 'bg-transparent border-b border-transparent'
          }
        `}
      >
        <Link
          to="/"
          className="flex items-center gap-2.5 no-underline select-none group"
          onClick={() => setActiveLink('Home')}
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

       

        <div className="flex items-center gap-2.5">
          <Link
            to="/login"
            className="
              hide-mobile
              text-sm font-medium text-white/65
              bg-transparent border border-white/12
              px-5 py-2 rounded-[10px]
              no-underline inline-block
              transition-all duration-200
              hover:text-white hover:border-white/[0.28] hover:bg-white/5
            "
          >
            Log in
          </Link>

          <Link
            to="/register"
            className="
              hide-mobile
              text-sm font-semibold text-[#050a10]
              bg-gradient-to-br from-[#3dffa0] to-[#00d4ff]
              border-none px-5 py-2 rounded-[10px]
              no-underline inline-block
              transition-all duration-200
              hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(61,255,160,0.35)]
              active:translate-y-0 active:shadow-none
            "
          >
            Sign up free
          </Link>

          <button
            onClick={() => setMobileOpen(prev => !prev)}
            className="
              show-mobile hidden
              bg-transparent border-none
              cursor-pointer p-1
              text-white/70
            "
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <div 
        className={`
          fixed top-16 left-0 right-0
          bg-[rgba(5,10,16,0.97)] backdrop-blur-[20px]
          border-b border-white/[0.07]
          px-6 pt-4 pb-6 z-[99]
          flex flex-col gap-1
          transition-all duration-250 ease-out
          ${mobileOpen 
            ? 'mobile-menu-active pointer-events-auto' 
            : 'mobile-menu-enter pointer-events-none'
          }
        `}
      >
        
        
        <div className="h-px bg-white/[0.06] my-2.5" />
        
        <Link 
          to="/login" 
          className="
            text-[15px] font-medium text-white/55
            px-3.5 py-2.5 rounded-[10px]
            no-underline
            transition-all duration-200
            hover:text-white hover:bg-white/5
          "
          onClick={() => setMobileOpen(false)}
        >
          Log in
        </Link>
        
        <Link
          to="/register"
          className="
            text-[15px] font-semibold text-[#050a10]
            bg-gradient-to-br from-[#3dffa0] to-[#00d4ff]
            px-3.5 py-[11px] rounded-[10px]
            text-center no-underline
            mt-1 block
          "
          onClick={() => setMobileOpen(false)}
        >
          Sign up free
        </Link>
      </div>
      <div className="h-16" />
    </>
  )
}

export default Navbar