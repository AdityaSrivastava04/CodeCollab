import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from './pages/landing.jsx'
import Login from './pages/login.jsx'
import { ToastContainer } from "react-toastify"
import Verify from './components/login/verify.jsx'
import { AppData } from './context/AppContext.jsx'
import Loading from './Loading.jsx'

function App() {
  const { isAuth, loading } = AppData()
  console.log(isAuth, loading)
  if (loading) return <Loading />
  return (
    <>

      <Routes>
        <Route path='/' element={isAuth ? <Loading /> : <Landing />} />
        <Route path='/login' element={<Login />} />
        <Route path='/verifyotp' element={<Verify />} />
        <ToastContainer />
      </Routes>
      
    </>
  )
}

export default App
