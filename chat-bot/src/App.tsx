
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/(home)/Page'
import SettingPage from './pages/(settings)/Page'
import SignupPage from './pages/(auth)/signup/Page'
import SigninPage from './pages/(auth)/signin/Page'
import ForgotPasswordPage from './pages/(auth)/forgot/Page'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
 

  return (
   <>
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='setting' element={<SettingPage />} />
      <Route path='signup' element={<SignupPage />} />
      <Route path='signin' element={<SigninPage />} />
      <Route path='forgot-password' element={<ForgotPasswordPage />} />
      <Route path='chat/:chatId' element={<HomePage />} />
    </Routes>
    <ToastContainer />
   </>

  )
}

export default App
