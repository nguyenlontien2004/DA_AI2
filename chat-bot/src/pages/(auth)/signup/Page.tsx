import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { signup } from '../../../services/authService'; // Đảm bảo bạn đã xuất hàm signup
import {  toast } from 'react-toastify';


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
        toast.success('Đăng ký thành công!')
        navigate('/signin');
      }
    } catch (error: any) {
      toast.error(error.message || "Đăng ký thất bại!");
    }
  };

  return (
    <div className="h-screen  bg-gradient-to-r from-[#090E27] to-[#21338D] flex justify-center items-center">
      <div className=" bg-gray-900 shadow-lg rounded-lg overflow-hidden  w-4/12 max-w-4xl">
        <div className="w-full p-20 flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-white text-center mb-10 flex items-center">
            REGISTER <span className="text-blue-500 ml-2">CHATBOT</span>
          </h2>
          {/* Form  */}
          <form className="space-y-4" onSubmit={handleSignup}>
            {/* Username Field */}
            <div>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 p-1 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Username"
                required
              />
            </div>
            {/* Email Field */}
            <div>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            {/* Confirm Password Field */}
            {/* <div>
              <input
                type="password"
                id="confirmpassword"
                name="confirmpassword"
                className="mt-1 p-1 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Nhập lại Mật khẩu"
                required
              />
            </div> */}

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
    // <div className="h-screen bg-gray-900 flex justify-center items-center">
    //   <div className="bg-gradient-to-r from-blue-900 to-pink-800 shadow-lg rounded-lg overflow-hidden w-2/6 max-w-4xl">
    //     <div className="w-full p-8 flex flex-col justify-center">
    //       <h2 className="text-3xl font-bold text-white text-center mb-6">Sign Up</h2>
    //       {/* Form  */}
    //       <form className="space-y-4" onSubmit={handleSignup}>
    //         {/* Username Field */}
    //         <div>
    //           <label htmlFor="username" className="block text-sm font-medium text-gray-100">
    //             Username
    //           </label>
    //           <input
    //             type="text"
    //             id="username"
    //             name="username"
    //             value={username}
    //             onChange={(e) => setUsername(e.target.value)}
    //             className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
    //             placeholder="Enter your username"
    //             required
    //           />
    //         </div>

    //         {/* Email Field - Đã sửa thành Username */}
    //         <div>
    //           <label htmlFor="email" className="block text-sm font-medium text-gray-100">
    //             Email
    //           </label>
    //           <input
    //             type="email"
    //             id="email"
    //             name="email"
    //             value={email}
    //             onChange={(e) => setEmail(e.target.value)}
    //             className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
    //             placeholder="Enter your email"
    //             required
    //           />
    //         </div>

    //         {/* Password Field */}
    //         <div>
    //           <label htmlFor="password" className="block text-sm font-medium text-gray-100">
    //             Password
    //           </label>
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

    //         {/* Sign In Button */}
    //         <div>
    //           <button
    //             type="submit"
    //             className="w-full mt-3 bg-[#4834D4] text-white p-2 rounded-lg font-medium hover:bg-indigo-600 transition"
    //           >
    //             Đăng ký
    //           </button>
    //         </div>
    //       </form>

    //       {/* Forgot Password and Sign Up Links */}
    //       <div className="flex items-center justify-center mt-4 text-base">
    //         <i className="text-white"> Đã có tài khoản? <Link to={'/signin'} className=" text-[#4834D4] hover:text-blue-500">Đăng nhập</Link></i>
    //       </div>
    //       <ToastContainer />
    //     </div>
    //   </div>
    // </div>
  );
}

export default SignupPage;
