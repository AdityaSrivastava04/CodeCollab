import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, User, Mail, Lock } from 'lucide-react'
import axios from 'axios'
import { toast } from 'react-toastify'
import SocialButtons from './socialButton.jsx'
import { server } from '../../main'

const InputField = ({ label, id, type = 'text', placeholder, icon: Icon, value, onChange }) => (
  <div className="space-y-1.5">
    <label htmlFor={id} className="block text-xs font-medium text-white/55"
      style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {label}
    </label>
    <div className="relative flex items-center">
      <Icon size={16} className="absolute left-3 text-white/25 pointer-events-none" />
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
        className="
          w-full pl-9 pr-4 py-2.5
          bg-white/5 border border-white/10 rounded-[10px]
          text-sm text-white/80 placeholder:text-white/20
          focus:outline-none focus:border-[#3dffa0]/50
          transition-all duration-200
        "
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      />
    </div>
  </div>
)

const RegisterForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [btnLoading, setBtnLoading] = useState(false)
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()
    setBtnLoading(true)
    try {
      const { data } = await axios.post(`${server}/api/v1/register`, { name, email, password })
      toast.success(data.message)
      localStorage.setItem('email', email)
      navigate('/verifyotp')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong')
    } finally {
      setBtnLoading(false)
    }
  }

  return (
    <div className="
      w-full max-w-sm
      bg-white/[0.03] border border-white/[0.08]
      rounded-[18px] p-7
      flex flex-col gap-5
    ">
      <div>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 20, color: '#fff', margin: 0 }}>
          Create account
        </h2>
        <p className="text-xs text-white/40 mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Fill in your details below
        </p>
      </div>

      <form onSubmit={submitHandler} className="flex flex-col gap-4">
        <InputField label="Full name"       id="name"     icon={User} placeholder="John Doe"          value={name}     onChange={e => setName(e.target.value)} />
        <InputField label="Email address"   id="email"    icon={Mail} placeholder="you@example.com"   value={email}    onChange={e => setEmail(e.target.value)}    type="email" />
        <InputField label="Password"        id="password" icon={Lock} placeholder="Min. 8 characters" value={password} onChange={e => setPassword(e.target.value)} type="password" />

        <button
          type="submit"
          disabled={btnLoading}
          className="
            w-full py-3 rounded-[10px]
            bg-gradient-to-r from-[#3dffa0] to-[#00d4ff]
            text-[#050a10] text-sm font-semibold
            flex items-center justify-center gap-2
            transition-all duration-200
            hover:-translate-y-0.5 hover:shadow-[0_6px_25px_rgba(61,255,160,0.35)]
            active:translate-y-0 active:shadow-none
            disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
            mt-1
          "
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {btnLoading ? (
            <><div className="w-4 h-4 border-2 border-[#050a10]/30 border-t-[#050a10] rounded-full animate-spin" /> Creating...</>
          ) : (
            <>Create account <ArrowRight size={16} /></>
          )}
        </button>
      </form>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-white/[0.07]" />
        <span className="text-xs text-white/30" style={{ fontFamily: "'DM Sans', sans-serif" }}>or continue with</span>
        <div className="flex-1 h-px bg-white/[0.07]" />
      </div>

      <SocialButtons />

      <p className="text-center text-xs text-white/35" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        Already have an account?{' '}
        <Link to="/login" className="text-[#3dffa0] no-underline hover:text-[#00d4ff] transition-colors">
          Log in
        </Link>
      </p>
    </div>
  )
}

export default RegisterForm