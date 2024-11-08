import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { signup } from '../../../services/authService'; // Đảm bảo bạn đã xuất hàm signup
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const result = await signup(username, email, password);
      if (result) {
        localStorage.setItem('register_message', result);
        navigate('/signin');
      }
    } catch (error: any) {
      toast.error(error.message || "Đăng ký thất bại!");
    }
  };

  return (
    <div className="h-screen bg-gray-900 flex justify-center items-center">
      <div className="bg-gradient-to-r from-blue-900 to-pink-800 shadow-lg rounded-lg overflow-hidden w-2/6 max-w-4xl">
        <div className="w-full p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-white text-center mb-6">Sign Up</h2>
          {/* Form  */}
          <form className="space-y-4" onSubmit={handleSignup}>
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-100">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your username"
                required
              />
            </div>

            {/* Email Field - Đã sửa thành Username */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-100">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-100">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your password"
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
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
