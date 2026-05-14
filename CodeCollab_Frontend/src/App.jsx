import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from './pages/landing.jsx'
import Login from './pages/login.jsx'
import { ToastContainer } from "react-toastify"
import Verify from './components/login/verify.jsx'
import { AppData } from './context/AppContext.jsx'
import Loading from './Loading.jsx'
import RegisterPage from './pages/register.jsx'

function App() {
  const { isAuth, loading } = AppData()
  console.log(isAuth, loading)
  return (
    <>
      {loading ?
        (<Loading />) :
        (
          <>
            <ToastContainer />
            <Routes>
              <Route path='/' element={<Landing />} />
              <Route path='/login' element={isAuth?<Landing/>:<Login />} />
              <Route path='/verifyotp' element={isAuth?<Landing/>:<Verify />} />
              <Route path='/register' element={<RegisterPage />} />
            </Routes>
          </>
        )}
    </>
  )
}

export default App
