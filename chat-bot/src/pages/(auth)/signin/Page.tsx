import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { login } from '../../../services/authService';
import { toast } from 'react-toastify';

const SigninPage = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const result = await login(usernameOrEmail, password);
      if (result) {
        localStorage.setItem('access_token', result.access_token);
        toast.success("Đăng nhập thành công!", { autoClose: 2000 });
        navigate('/');
      }
    } catch (error: any) {
      toast.error(error.message || "Đăng nhập thất bại!");
    }
  };

  return (
    <div className="h-screen  bg-gradient-to-r from-[#090E27] to-[#21338D] flex justify-center items-center">
      <div className=" bg-gray-900 shadow-lg rounded-lg overflow-hidden  w-4/12 max-w-4xl">
        <div className="w-full p-20 flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-white text-center mb-10 flex items-center">
            LOGIN <span className="text-blue-500 ml-2">CHATBOT</span>
          </h2>
          {/* Form  */}
          <form className="space-y-4"  onSubmit={handleLogin}>
            {/* Email Field */}
            <div>
              <input
                type="text"
                id="usernameOrEmail"
                name="usernameOrEmail"
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
    // <div className="h-screen bg-gray-900 flex justify-center items-center">
    //   <div className="bg-gradient-to-r from-blue-900 to-pink-800 shadow-lg rounded-lg overflow-hidden w-2/6 max-w-4xl">
    //     <div className="w-full p-8 flex flex-col justify-center">
    //       <h2 className="text-3xl font-bold text-white text-center mb-6">Sign In</h2>
    //       <form className="space-y-4" onSubmit={handleLogin}>
    //         <div>
    //           <label htmlFor="usernameOrEmail" className="block text-sm font-medium text-gray-100">Username or Email</label>
    //           <input
    //             type="text"
    //             id="usernameOrEmail"
    //             name="usernameOrEmail"
    //             value={usernameOrEmail}
    //             onChange={(e) => setUsernameOrEmail(e.target.value)}
    //             className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
    //             placeholder="Enter your username or email"
    //             required
    //           />
    //         </div>
    //         <div>
    //           <label htmlFor="password" className="block text-sm font-medium text-gray-100">Password</label>
    //           <input
    //             type="password"
    //             id="password"
    //             name="password"
    //             value={password}
    //             onChange={(e) => setPassword(e.target.value)}
    //             className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
    //             placeholder="Enter your password"
    //             required
    //           />
    //         </div>
    //         <div className="flex items-center justify-between">
    //           <div className="flex items-center">
    //             <input
    //               id="remember-me"
    //               type="checkbox"
    //               className="h-4 w-4 bg-transparent bg-gray-900 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
    //             />
    //             <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-100">Remember Me</label>
    //           </div>
    //           <Link to={'/forgot-password'} className=" block"><i className=" text-[#4834D4] hover:text-blue-500">Forgot Password?</i></Link>
    //         </div>
    //         <div>
    //           <button
    //             type="submit"
    //             className="w-full bg-[#4834D4] text-white p-2 rounded-lg font-medium hover:bg-indigo-600 transition"
    //           >
    //             Sign In
    //           </button>
    //         </div>
    //       </form>
    //       <div className="flex items-center justify-between mt-4 text-sm">
    //         <Link to="/forgot-password" className="font-medium text-white hover:text-indigo-700">Forgot Password?</Link>
    //         <Link to="/signup" className="font-medium text-white hover:text-indigo-700">Sign up here</Link>
    //       </div>
    //     </div>
    //   </div>
    //   <ToastContainer />
    // </div>
  )
}

export default SigninPage;
