import { Code2 } from 'lucide-react'
import { Link } from 'react-router-dom'

const Logo = () => (
  <Link to="/" className="flex items-center gap-2.5 no-underline select-none group w-fit">
    <div className="w-[34px] h-[34px] rounded-[9px] bg-gradient-to-br from-[#3dffa0] to-[#00d4ff] flex items-center justify-center transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:scale-110">
      <Code2 size={17} strokeWidth={2.5} color="#050a10" />
    </div>
    <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 19, letterSpacing: '-0.02em', color: '#fff' }}>
      Code<span style={{ background: 'linear-gradient(120deg,#3dffa0,#00d4ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Collab</span>
    </span>
  </Link>
)

export default Logo