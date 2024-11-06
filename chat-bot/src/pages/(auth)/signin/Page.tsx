
import { Link } from "react-router-dom"


const SigninPage = () => {
  return (
    <div className="h-screen  bg-gradient-to-r from-[#090E27] to-[#21338D] flex justify-center items-center">
        <div className=" bg-gray-900 shadow-lg rounded-lg overflow-hidden  w-4/12 max-w-4xl">
        <div className="w-full p-20 flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-white text-center mb-10 flex items-center">
            LOGIN <span className="text-blue-500 ml-2">CHATBOT</span>
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
            
             {/* Remember Me */}
             <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 bg-transparent bg-gray-900 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-100"
                >
                  Lưu tài khoản
                </label>
              </div>
              <Link to={'/forgot-password'} className=" block"><i className=" text-[#4834D4] hover:text-blue-500">Quên mật khẩu ?</i></Link>
            </div>
            {/* Sign In Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-[#4834D4] text-white p-2 rounded-lg font-medium hover:bg-indigo-600 transition"
              >
                Đăng nhập
              </button>
            </div>
          </form>

        {/* Forgot Password and Sign Up Links */}
        <div className="flex items-center justify-center mt-4 text-base">
            <i className="text-white"> Chưa có tài khoản? <Link to={'/signup'} className=" text-[#4834D4] hover:text-blue-500">Đăng ký</Link></i>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SigninPage