import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Landing from './pages/landing.jsx'

function App() {
  

  return (
    <div>
      <Routes>
        <Route path='/' element={<Landing/>}/>
      </Routes>
    </div>
  )
}

export default App
