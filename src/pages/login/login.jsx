import logo from '@/assets/logo.png'

export default function Login() {
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
              type="email"
              placeholder="Email"
              className="border border-gray-300 rounded px-4 py-3"
            />
            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                className="border border-gray-300 rounded px-4 py-3 w-full"
              />
            </div>
            <a href="#" className="text-sm text-blue-500 hover:underline text-right">
              Forgot password?
            </a>
            <button
              className="bg-blue-600 text-white rounded py-3 mt-2 hover:bg-blue-700 transition"
            >
              Log in
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
