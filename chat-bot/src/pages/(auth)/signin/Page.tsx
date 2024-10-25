
import { Link } from "react-router-dom"


const SigninPage = () => {
  return (
    <div className="h-screen bg-gray-900 flex justify-center items-center">
        <div className="bg-gradient-to-r from-blue-900 to-pink-800  shadow-lg rounded-lg overflow-hidden  w-2/6 max-w-4xl">
        <div className="w-full p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-white text-center mb-6">Sign In</h2>
          {/* Form  */}
          <form className="space-y-4">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-100"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-100"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your password"
                required
              />
            </div>
             {/* Remember Me */}
             <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-100"
                >
                  Remember Me
                </label>
              </div>
            </div>
            {/* Sign In Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-indigo-500 text-white p-2 rounded-lg font-medium hover:bg-indigo-600 transition"
              >
                Sign In
              </button>
            </div>
          </form>

        {/* Forgot Password and Sign Up Links */}
        <div className="flex items-center justify-between mt-4 text-sm">
            <Link
              to="/forgot-password"
              className="font-medium text-white hover:text-indigo-700"
            >
              Forgot Password?
            </Link>
            <Link
              to="/signup"
              className="font-medium text-white hover:text-indigo-700"
            >
              Sign up here 
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SigninPage