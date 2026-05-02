import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { server } from '../../main'
import axios from "axios"
import { toast } from 'react-toastify'

const LoginComponent = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] =useState("")
    const [btnLoading,setBtnLoading]=useState(false)
    const navigate=useNavigate()
    const submitHandler = async (e)=>{
        setBtnLoading(true)
        e.preventDefault()
        try {
            const{data}=await axios.post(`${server}/api/v1/login`,{email,password})
            toast.success(data.message)
            localStorage.setItem("email",email)
            navigate("/verifyotp")
        } catch (error) {
            toast.error(error.response.data.message)
        } finally{
            setBtnLoading(false)
        }
    }
    return (
        <div>
            <section className="text-gray-400 bg-gray-900 body-font">
                <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
                    <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
                        <h1 className="title-font font-medium text-3xl text-white">Slow-carb next level shoindxgoitch ethical authentic, poko scenester</h1>
                        <p className="leading-relaxed mt-4">Poke slow-carb mixtape knausgaard, typewriter street art gentrify hammock starladder roathse. Craies vegan tousled etsy austin.</p>
                    </div>
                    <form onSubmit={submitHandler} className="lg:w-2/6 md:w-1/2 bg-gray-800 bg-opacity-50 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
                        <h2 className="text-white text-lg font-medium title-font mb-5">Sign Up</h2>
                        
                        <div className="relative mb-4">
                            <label htmlFor="email" className="leading-7 text-sm text-gray-400">Email</label>
                            <input type="email" id="email" name="email" className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            onChange={e=>setEmail(e.target.value )} required></input>
                            <label htmlFor="Password" className="leading-7 text-sm text-gray-400">Password</label>
                            <input type="password" id="password" name="password" className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1  px-3 leading-8 transition-colors duration-200 ease-in-out"
                            onChange={e=>setPassword(e.target.value )} required></input>
                        </div>
                        <button disabled={btnLoading} className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">{btnLoading?"Submitting....":"Submit"}</button>
                        <Link to={"/register"} className="text-xs mt-3">Don't have an account?</Link>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default LoginComponent
