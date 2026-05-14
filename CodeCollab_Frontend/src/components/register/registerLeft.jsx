const RegisterLeft = () => (
  <div className="space-y-6">
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(61,255,160,0.08)] border border-[rgba(61,255,160,0.25)]">
      <span className="text-sm font-medium bg-gradient-to-r from-[#3dffa0] to-[#00d4ff] bg-clip-text text-transparent"
        style={{ fontFamily: "'DM Sans', sans-serif" }}>
        Join for free
      </span>
    </div>

    <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 42, letterSpacing: '-0.03em', lineHeight: 1.15, color: '#fff', margin: 0 }}>
      Start building with{' '}
      <span style={{ background: 'linear-gradient(120deg,#3dffa0,#00d4ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        CodeCollab
      </span>
    </h1>

    <p className="text-lg text-white/60 leading-relaxed max-w-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      Real-time collaboration for developers. Code together, ship faster.
    </p>

    <div className="flex items-center gap-8 pt-2">
      {[['10K+', 'Developers'], ['50K+', 'Projects'], ['99%', 'Uptime']].map(([val, lbl], i, arr) => (
        <div key={lbl} className="flex items-center gap-8">
          <div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 26, color: '#fff' }}>{val}</div>
            <div className="text-sm text-white/40" style={{ fontFamily: "'DM Sans', sans-serif" }}>{lbl}</div>
          </div>
          {i < arr.length - 1 && <div className="w-px h-10 bg-white/10" />}
        </div>
      ))}
    </div>
  </div>
)

export default RegisterLeft