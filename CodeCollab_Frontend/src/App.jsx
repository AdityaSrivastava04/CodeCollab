import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Landing from './pages/landing.jsx'
import Login from './pages/login.jsx'

function App() {
  

  return (
    <div>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </div>
  )
}

export default App
