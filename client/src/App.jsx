import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home"
import EmailVerify from './pages/EmailVerify';
import ResetPassword from './pages/ResetPassword';
import Login from './pages/Login';

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import Register from './pages/Register';

const App = () => {
  return (
    <>
    <ToastContainer />
    <Routes>
      <Route path='/' element={<Home />}  />
      <Route path='/login' element={<Login />}  />
      <Route path='/register' element={<Register />}  />
      <Route path='/email-verify' element={<EmailVerify />}  />
      <Route path='/reset-password' element={<ResetPassword />}  />

    </Routes>

    </>
  )
}

export default App