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
const App = () => {
  const { user, isLoading } = useAuth()
  const [data, setData] = useState(null)

  useEffect(() => {
    api.getUser(user?.id).then(setData)
  }, [user])

  return <Dashboard data={data} user={user} />
}

export default App`,
]

const CURSORS = [
  { name: 'Aryan', color: '#3dffa0' },
  { name: 'Sara',  color: '#00d4ff' },
  { name: 'Mihir', color: '#b57aff' },
]

const CURSOR_POS = [
  [{ top: 126, left: 220 }, { top: 214, left: 310 }],
  [{ top: 104, left: 240 }, { top: 258, left: 300 }, { top: 302, left: 180 }],
  [{ top: 148, left: 260 }, { top: 236, left: 350 }, { top: 280, left: 200 }],
]

export default function CollabCodeEditor() {
  const taRef      = useRef(null)
  const editorRef  = useRef(null)
  const snapRef    = useRef(0)
  const busyRef    = useRef(false)
  const animRef    = useRef(null)

  const [snapIdx, setSnapIdx]         = useState(0)
  const [cursorsVisible, setCursorsVisible] = useState(true)

  useEffect(() => {
    if (!taRef.current || editorRef.current) return

    import('codemirror').then(({ default: CodeMirror }) => {
      import('codemirror/mode/javascript/javascript').then(() => {
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
        editorRef.current = cm

        const interval = setInterval(() => {
          const next = (snapRef.current + 1) % SNAPSHOTS.length
          animateTo(cm, next)
        }, 5500)

        return () => clearInterval(interval)
      })
    })
  }, [])

  function animateTo(cm, nextIdx) {
    if (busyRef.current) return
    busyRef.current = true
    setCursorsVisible(false)

    const from = SNAPSHOTS[snapRef.current]
    const to   = SNAPSHOTS[nextIdx]
    let pos    = from.length

    const del = () => {
      if (pos <= 0) { animRef.current = setTimeout(type, 150); return }
      pos = Math.max(0, pos - Math.floor(Math.random() * 5 + 3))
      cm.setValue(from.slice(0, pos))
      cm.setCursor(cm.lineCount() - 1, 9999)
      animRef.current = setTimeout(del, Math.random() * 5 + 2)
    }

    let tpos = 0
    const type = () => {
      if (tpos > to.length) {
        cm.setValue(to)
        snapRef.current = nextIdx
        setSnapIdx(nextIdx)
        busyRef.current = false
        animRef.current = setTimeout(() => setCursorsVisible(true), 400)
        return
      }
      cm.setValue(to.slice(0, tpos))
      cm.setCursor(cm.lineCount() - 1, 9999)
      tpos++
      animRef.current = setTimeout(type, Math.random() * 16 + 4)
    }

    animRef.current = setTimeout(del, 200)
  }

  const cursorPositions = CURSOR_POS[snapIdx] || []

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400&family=DM+Sans:wght@400;500;700&display=swap');

        /* Override CodeMirror to match dark theme */
        .collab-editor .CodeMirror {
          background: #0d1117 !important;
          color: #e6edf3 !important;
          font-family: 'JetBrains Mono', monospace !important;
          font-size: 13px !important;
          line-height: 22px !important;
          height: 340px !important;
        }
        .collab-editor .CodeMirror-scroll    { overflow: hidden !important; }
        .collab-editor .CodeMirror-gutters   { background: #0d1117 !important; border-right: 1px solid rgba(255,255,255,.05) !important; }
        .collab-editor .CodeMirror-linenumber{ color: rgba(255,255,255,.2) !important; }
        .collab-editor .CodeMirror-cursor    { border-left: 2px solid #3dffa0 !important; }
        .collab-editor .CodeMirror-lines     { padding: 14px 0 !important; }
        .collab-editor .CodeMirror pre.CodeMirror-line { padding: 0 14px !important; }

        @keyframes fcBlink  { 0%,44%{opacity:1} 55%,100%{opacity:0} }
        @keyframes sdPulse  { 0%,100%{opacity:1} 50%{opacity:.3} }
      `}</style>

      <section style={{ background: '#050a10', padding: '80px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: "'DM Sans', sans-serif" }}>

        <p style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#3dffa0', opacity: .85, marginBottom: 12 }}>
          Live collaboration
        </p>
        <h2 style={{ fontWeight: 700, fontSize: 'clamp(1.7rem,4vw,2.7rem)', color: '#fff', textAlign: 'center', marginBottom: 10, lineHeight: 1.15 }}>
          Code together, in real-time
        </h2>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,.4)', textAlign: 'center', marginBottom: 48, maxWidth: 460, lineHeight: 1.7 }}>
          Multiple developers editing the same file simultaneously — changes appear instantly, zero lag.
        </p>

        <div style={{ width: '100%', maxWidth: 820, borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,.07)', background: '#0d1117', boxShadow: '0 0 0 1px rgba(61,255,160,.05), 0 40px 80px rgba(0,0,0,.7)' }}>

          <div style={{ background: '#161b22', padding: '10px 18px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid rgba(255,255,255,.06)' }}>
            <div style={{ display: 'flex', gap: 7 }}>
              {['#ff5f57', '#ffbd2e', '#28c840'].map(c => (
                <div key={c} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />
              ))}
            </div>
            <div style={{ display: 'flex', gap: 4, marginLeft: 8 }}>
              {['App.jsx', 'useAuth.js', 'api.ts'].map((tab, i) => (
                <span key={tab} style={{ fontSize: 12, padding: '3px 12px', borderRadius: 6, background: i === 0 ? 'rgba(255,255,255,.07)' : 'transparent', color: i === 0 ? 'rgba(255,255,255,.85)' : 'rgba(255,255,255,.28)' }}>
                  {tab}
                </span>
              ))}
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex' }}>
              {CURSORS.map((c, i) => (
                <div key={i} style={{ width: 26, height: 26, borderRadius: '50%', background: c.color, color: '#050a10', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #161b22', marginLeft: i === 0 ? 0 : -6, position: 'relative', zIndex: 3 - i }}>
                  {c.name.slice(0, 2).toUpperCase()}
                </div>
              ))}
            </div>
          </div>

          <div className="collab-editor" style={{ position: 'relative', height: 340, overflow: 'hidden' }}>
            <textarea ref={taRef} style={{ display: 'none' }} />

            {cursorPositions.map((pos, i) => (
              CURSORS[i] ? (
                <div key={i} style={{
                  position: 'absolute',
                  top: pos.top,
                  left: pos.left,
                  pointerEvents: 'none',
                  zIndex: 30,
                  opacity: cursorsVisible ? 1 : 0,
                  transition: 'opacity 0.5s ease',
                }}>
                  <div style={{
                    position: 'absolute', bottom: '100%', left: 0,
                    background: CURSORS[i].color, color: '#050a10',
                    fontSize: 9, fontWeight: 700, padding: '2px 7px',
                    borderRadius: '4px 4px 4px 0', whiteSpace: 'nowrap',
                    lineHeight: 1.5, marginBottom: 2,
                  }}>
                    {CURSORS[i].name}
                  </div>
                  <div style={{
                    width: 2, height: 16, background: CURSORS[i].color,
                    borderRadius: 1,
                    animation: `fcBlink ${0.9 + i * 0.2}s ease-in-out infinite ${i * 0.2}s`,
                  }} />
                </div>
              ) : null
            ))}
          </div>

          <div style={{ background: '#161b22', borderTop: '1px solid rgba(255,255,255,.06)', padding: '5px 18px', display: 'flex', alignItems: 'center', gap: 18, fontSize: 11, color: 'rgba(255,255,255,.3)' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#3dffa0', animation: 'sdPulse 2s ease-in-out infinite', flexShrink: 0, display: 'inline-block' }} />
            <span style={{ color: '#3dffa0', fontWeight: 600 }}>3 collaborators live</span>
            <span>React JSX</span>
            <span>UTF-8</span>
            <span style={{ marginLeft: 'auto' }}>
              Ln {(cursorPositions[0]?.top ? Math.round(cursorPositions[0].top / 22) : 6)}, Col 24
            </span>
          </div>
        </div>
      </section>
    </>
  )
}