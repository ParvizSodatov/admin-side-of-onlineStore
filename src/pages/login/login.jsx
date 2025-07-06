import logo from '@/assets/logo.png'
import { LoginAdmin } from '@/store/reducers/login/reducer'
import { TabRounded } from '@mui/icons-material'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast, Toaster } from 'sonner'

export default function Login() {
const dispatch=useDispatch()
const navigate=useNavigate()
const [putName,setPutName]=useState('')
const[putPassword,setPutPassWord]=useState('')

async function handleLogin() {
	let newLogin={
		userName:putName,
		password:putPassword
	}
	const result=await dispatch(LoginAdmin(newLogin))
	if(LoginAdmin.fulfilled.match(result)){
		navigate('/')
  

	}
}
  return (
    <section className="flex min-h-screen">
      <div className="w-1/2 flex flex-col justify-center items-center bg-gradient-to-b from-[#0f2027] via-[#203a43] to-[#2c5364] text-white">
		 <h1 className="text-2xl mb-2">Welcome to admin panel</h1>
        <img src={logo} alt="Fastcart logo" className="w-54 mb-4" />
      </div>    
      <div className="w-1/2 flex flex-col justify-center items-center bg-white">
        <div className="w-full max-w-md px-8">
          <h2 className="text-2xl font-semibold mb-6">Log in</h2>
          <div className="flex flex-col gap-4">
            <input
              type="text"
            value={putName}
				onChange={(e)=>setPutName(e.target.value)}
				
              placeholder="Name"
              className="border border-gray-300 rounded px-4 py-3"
            />
            <div className="relative">
              <input
                type="password"
					 value={putPassword}
					 onChange={(e)=>setPutPassWord(e.target.value)}
                placeholder="Password"
                className="border border-gray-300 rounded px-4 py-3 w-full"
              />
            </div>
            <a href="#" className="text-sm text-blue-500 hover:underline text-right">
              Forgot password?
            </a>
            <button
              className="bg-blue-600 text-white rounded py-3 mt-2 hover:bg-blue-700 transition"
				  onClick={handleLogin}
            >
              Log in
            </button>
          </div>
        </div>
      </div>
      <Toaster position="bottom-right" richColors />
    </section>
    
  )
  
}
