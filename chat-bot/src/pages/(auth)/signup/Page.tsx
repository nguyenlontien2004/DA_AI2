import { Link } from "react-router-dom"


const SignupPage = () => {
  return (
    <div className="h-screen bg-gray-900 flex justify-center items-center">
        <div className="bg-gradient-to-r from-blue-900 to-pink-800  shadow-lg rounded-lg overflow-hidden  w-2/6 max-w-4xl">
        <div className="w-full p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-white text-center mb-6">Sign Up</h2>
          {/* Form  */}
          <form className="space-y-4">
            {/* Username Field */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-100"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your username"
                required
              />
            </div>

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

            {/* Sign Up Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-indigo-500 text-white p-2 rounded-lg font-medium hover:bg-indigo-600 transition"
              >
                Sign Up
              </button>
            </div>
          </form>

          {/* Back to Login Link */}
          <p className="text-sm text-gray-200 mt-4 text-center">
            Already have an account?{' '}
            <Link to="/signin" className="text-indigo-500 hover:text-indigo-700">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignupPage