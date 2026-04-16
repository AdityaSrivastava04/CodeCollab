import React, { useEffect, useRef, useState } from 'react'
const SNAPSHOTS = [
`import React from 'react'

const App = () => {
  return (
    <div className="app">
      <h1>Hello World</h1>
    </div>
  )
}

export default App`,

`import React, { useState } from 'react'
import { useAuth } from './hooks/useAuth'

const App = () => {
  const { user, isLoading } = useAuth()
  const [count, setCount] = useState(0)

  if (isLoading) return <Spinner />

  return (
    <main className="dashboard">
      <Header user={user} />
    </main>
  )
}

export default App`,

`import React, { useState, useEffect } from 'react'
import { useAuth } from './hooks/useAuth'
import { api } from './lib/api'

// Main application component
const App = () => {
  const { user, isLoading } = useAuth()
  const [data, setData] = useState(null)

  useEffect(() => {
    api.getUser(user?.id).then(setData)
  }, [user])

  if (isLoading) return <Spinner />

  return <Dashboard data={data} user={user} />
}

export default App`,
]

const CURSOR_META = [
  { name: 'Aryan', color: '#3dffa0' },
  { name: 'Sara',  color: '#00d4ff' },
  { name: 'Mihir', color: '#b57aff' },
]

const CURSOR_DEFS = [
  [{ line: 5, ch: 20 }, { line: 9,  ch: 14 }],
  [{ line: 4, ch: 30 }, { line: 11, ch: 22 }, { line: 14, ch: 10 }],
  [{ line: 6, ch: 28 }, { line: 11, ch: 36 }, { line: 14, ch: 22 }],
]

const  CollabCodeEditor=()=> {
  const taRef     = useRef(null)
  const cmRef     = useRef(null)   
  const snapRef   = useRef(0)
  const busyRef   = useRef(false)
  const tidRef    = useRef(null)
  const [snapIdx, setSnapIdx] = useState(0)

  const clearCursors = () => {
    document.querySelectorAll('.fcursor-wrap').forEach(el => el.remove())
  }

  const injectCursors = (sIdx, cm) => {
    clearCursors()
    const defs = CURSOR_DEFS[sIdx] || []
    defs.forEach((pos, i) => {
      const meta = CURSOR_META[i]
      if (!meta) return
      const lineText = cm.getLine(pos.line) || ''
      const ch = Math.min(pos.ch, lineText.length)

      const wrap = document.createElement('span')
      wrap.className = 'fcursor-wrap'
      wrap.style.cssText = 'display:inline-block;position:relative;vertical-align:text-bottom;margin-left:1px;pointer-events:none;'

      const label = document.createElement('span')
      label.style.cssText = `position:absolute;bottom:100%;left:0;background:${meta.color};color:#050a10;font-size:9px;font-weight:700;padding:2px 7px;border-radius:4px 4px 4px 0;white-space:nowrap;font-family:'DM Sans',sans-serif;line-height:1.5;margin-bottom:2px;`
      label.textContent = meta.name
      wrap.appendChild(label)

      const beam = document.createElement('span')
      beam.style.cssText = `display:inline-block;width:2px;height:16px;background:${meta.color};border-radius:1px;animation:fcBlink ${0.9 + i * 0.2}s ease-in-out infinite ${i * 0.15}s;`
      wrap.appendChild(beam)

      cm.setBookmark({ line: pos.line, ch }, { widget: wrap, insertLeft: true })
    })
  }

  useEffect(() => {
    let interval
    import('codemirror').then(({ default: CodeMirror }) => {
      import('codemirror/mode/javascript/javascript').then(() => {
        if (cmRef.current) return
        const cm = CodeMirror.fromTextArea(taRef.current, {
          mode: { name: 'javascript', jsx: true },
          theme: 'dracula',
          lineNumbers: true,
          readOnly: true,
          cursorBlinkRate: -1,
          lineWrapping: false,
        })
        cm.setValue(SNAPSHOTS[0])
        cm.setSize('100%', '340px')
        cmRef.current = cm

        setTimeout(() => injectCursors(0, cm), 100)

        interval = setInterval(() => {
          const next = (snapRef.current + 1) % SNAPSHOTS.length
          animateTo(next, cm)
        }, 5500)
      })
    })
    return () => { clearInterval(interval); clearTimeout(tidRef.current) }
  }, [])

  function animateTo(nextIdx, cm) {
    if (busyRef.current) return
    busyRef.current = true
    clearCursors()

    const from = SNAPSHOTS[snapRef.current]
    const to   = SNAPSHOTS[nextIdx]
    let pos    = from.length

    const del = () => {
      if (pos <= 0) { tidRef.current = setTimeout(type, 160); return }
      pos = Math.max(0, pos - Math.floor(Math.random() * 5 + 3))
      cm.setValue(from.slice(0, pos))
      cm.scrollTo(null, 0)
      tidRef.current = setTimeout(del, Math.random() * 5 + 2)
    }

    let tpos = 0
    const type = () => {
      if (tpos > to.length) {
        cm.setValue(to)
        snapRef.current = nextIdx
        setSnapIdx(nextIdx)
        tidRef.current = setTimeout(() => {
          injectCursors(nextIdx, cm)
          busyRef.current = false
        }, 350)
        return
      }
      cm.setValue(to.slice(0, tpos))
      cm.scrollTo(null, 0)
      tpos++
      tidRef.current = setTimeout(type, Math.random() * 16 + 4)
    }

    tidRef.current = setTimeout(del, 200)
  }

  const statusLine = (CURSOR_DEFS[snapIdx]?.[0]?.line ?? 5) + 1
  const statusCol  =  CURSOR_DEFS[snapIdx]?.[0]?.ch  ?? 24

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400&family=DM+Sans:wght@400;500;700&display=swap');

        @keyframes fcBlink   { 0%,44%{opacity:1} 55%,100%{opacity:0} }
        @keyframes sdPulse   { 0%,100%{opacity:1} 50%{opacity:.3} }

        /* Force CM dark bg */
        .collab-cm .CodeMirror           { background:#0d1117 !important; color:#e6edf3 !important; font-family:'JetBrains Mono',monospace !important; font-size:13px !important; line-height:22px !important; height:340px !important; }
        .collab-cm .CodeMirror-scroll    { overflow:hidden !important; }
        .collab-cm .CodeMirror-gutters   { background:#0d1117 !important; border-right:1px solid rgba(255,255,255,.05) !important; }
        .collab-cm .CodeMirror-linenumber{ color:rgba(255,255,255,.2) !important; }
        .collab-cm .CodeMirror-cursor    { display:none !important; }
        .collab-cm .CodeMirror-lines     { padding:14px 0 !important; }
        .collab-cm .CodeMirror pre.CodeMirror-line { padding:0 14px !important; }
      `}</style>

      <section style={{ background: '#050a10', padding: '80px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: "'DM Sans',sans-serif" }}>

        <p style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#3dffa0', opacity: .85, marginBottom: 12 }}>Live collaboration</p>
        <h2 style={{ fontWeight: 700, fontSize: 'clamp(1.7rem,4vw,2.7rem)', color: '#fff', textAlign: 'center', marginBottom: 10, lineHeight: 1.15 }}>
          Code together, in real-time
        </h2>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,.4)', textAlign: 'center', marginBottom: 48, maxWidth: 460, lineHeight: 1.7 }}>
          Multiple developers editing the same file simultaneously — changes appear instantly, zero lag.
        </p>

        <div style={{ width: '100%', maxWidth: 820, borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,.07)', background: '#0d1117', boxShadow: '0 0 0 1px rgba(61,255,160,.05),0 40px 80px rgba(0,0,0,.7)' }}>

          {/* Titlebar */}
          <div style={{ background: '#161b22', padding: '10px 18px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid rgba(255,255,255,.06)' }}>
            <div style={{ display: 'flex', gap: 7 }}>
              {['#ff5f57','#ffbd2e','#28c840'].map(c => <div key={c} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />)}
            </div>
            <div style={{ display: 'flex', gap: 4, marginLeft: 8 }}>
              {['App.jsx','useAuth.js','api.ts'].map((t, i) => (
                <span key={t} style={{ fontSize: 12, padding: '3px 12px', borderRadius: 6, background: i===0 ? 'rgba(255,255,255,.07)' : 'transparent', color: i===0 ? 'rgba(255,255,255,.85)' : 'rgba(255,255,255,.28)' }}>{t}</span>
              ))}
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex' }}>
              {CURSOR_META.map((c, i) => (
                <div key={i} style={{ width: 26, height: 26, borderRadius: '50%', background: c.color, color: '#050a10', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #161b22', marginLeft: i===0?0:-6, position:'relative', zIndex: 3-i }}>
                  {c.name.slice(0,2).toUpperCase()}
                </div>
              ))}
            </div>
          </div>

          {/* CodeMirror */}
          <div className="collab-cm" style={{ height: 340, overflow: 'hidden' }}>
            <textarea ref={taRef} style={{ display: 'none' }} />
          </div>

          {/* Status bar */}
          <div style={{ background: '#161b22', borderTop: '1px solid rgba(255,255,255,.06)', padding: '5px 18px', display: 'flex', alignItems: 'center', gap: 18, fontSize: 11, color: 'rgba(255,255,255,.3)', fontFamily: "'DM Sans',sans-serif" }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#3dffa0', animation: 'sdPulse 2s ease-in-out infinite', flexShrink: 0, display: 'inline-block' }} />
            <span style={{ color: '#3dffa0', fontWeight: 600 }}>3 collaborators live</span>
            <span>React JSX</span>
            <span>UTF-8</span>
            <span style={{ marginLeft: 'auto' }}>Ln {statusLine}, Col {statusCol}</span>
          </div>
        </div>
      </section>
    </>
  )
}

export default CollabCodeEditor