import { Link } from "react-router-dom"


const SignupPage = () => {
  return (
    <div className="h-screen  bg-gradient-to-r from-[#090E27] to-[#21338D] flex justify-center items-center">
    <div className=" bg-gray-900 shadow-lg rounded-lg overflow-hidden  w-4/12 max-w-4xl">
    <div className="w-full p-20 flex flex-col justify-center">
      <h2 className="text-4xl font-bold text-white text-center mb-10 flex items-center">
        REGISTER <span className="text-blue-500 ml-2">CHATBOT</span>
      </h2>
      {/* Form  */}
      <form className="space-y-4">
        {/* Email Field */}
        <div>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 p-1 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Email"
            required
          />
        </div>

        {/* Password Field */}
        <div>
          <input
            type="password"
            id="password"
            name="password"
            className="mt-1 p-1 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Mật khẩu"
            required
          />
        </div>
          {/* Confirm Password Field */}
          <div>
              <input
                type="password"
                id="confirmpassword"
                name="confirmpassword"
                className="mt-1 p-1 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Nhập lại Mật khẩu"
                required
              />
            </div>
        
        {/* Sign In Button */}
        <div>
          <button
            type="submit"
            className="w-full mt-3 bg-[#4834D4] text-white p-2 rounded-lg font-medium hover:bg-indigo-600 transition"
          >
            Đăng ký
          </button>
        </div>
      </form>

    {/* Forgot Password and Sign Up Links */}
    <div className="flex items-center justify-center mt-4 text-base">
        <i className="text-white"> Đã có tài khoản? <Link to={'/signin'} className=" text-[#4834D4] hover:text-blue-500">Đăng nhập</Link></i>
      </div>
    </div>
  </div>
</div>
  )
}

export default SignupPage