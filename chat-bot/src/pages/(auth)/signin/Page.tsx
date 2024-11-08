import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { login } from '../../../services/authService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SigninPage = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const registerMessage = localStorage.getItem('register_message');
    if (registerMessage) {
      toast.success(registerMessage, { autoClose: 2000 });
      setTimeout(() => {
        localStorage.removeItem('register_message');
      }, 2000);
    }

    const logoutMessage = localStorage.getItem('logout_message');
    if (logoutMessage) {
      toast.success(logoutMessage, { autoClose: 2000 });
      setTimeout(() => {
        localStorage.removeItem('logout_message');
      }, 2000);
    }
  }, []);


  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const result = await login(usernameOrEmail, password);
      if (result) {
        localStorage.setItem('access_token', result.access_token);
        localStorage.setItem('login_message', "Đăng nhập thành công!");
        navigate('/');
      }
    } catch (error: any) {
      toast.error(error.message || "Đăng nhập thất bại!");
    }
  };

  return (
    <div className="h-screen bg-gray-900 flex justify-center items-center">
      <div className="bg-gradient-to-r from-blue-900 to-pink-800 shadow-lg rounded-lg overflow-hidden w-2/6 max-w-4xl">
        <div className="w-full p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-white text-center mb-6">Sign In</h2>
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label htmlFor="usernameOrEmail" className="block text-sm font-medium text-gray-100">Username or Email</label>
              <input
                type="text"
                id="usernameOrEmail"
                name="usernameOrEmail"
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your username or email"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-100">Password</label>
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
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 bg-transparent bg-gray-900 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-100">Remember Me</label>
              </div>
              <Link to={'/forgot-password'} className=" block"><i className=" text-[#4834D4] hover:text-blue-500">Forgot Password?</i></Link>
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-[#4834D4] text-white p-2 rounded-lg font-medium hover:bg-indigo-600 transition"
              >
                Sign In
              </button>
            </div>
          </form>
          <div className="flex items-center justify-between mt-4 text-sm">
            <Link to="/forgot-password" className="font-medium text-white hover:text-indigo-700">Forgot Password?</Link>
            <Link to="/signup" className="font-medium text-white hover:text-indigo-700">Sign up here</Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default SigninPage;
