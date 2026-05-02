import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from './pages/landing.jsx'
import Login from './pages/login.jsx'
import {ToastContainer} from "react-toastify"
import Verify from './components/login/verify.jsx'

function App() {
  

  return (
    <div>
        <Routes>
          <Route path='/' element={<Landing/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/verifyotp' element={<Verify/>}/>
        </Routes>
        <ToastContainer/>
    </div>
  )
}

export default App
