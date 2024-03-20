import React from 'react'
import { ReactComponent as BrowserLock } from '../../../app/assets/Browser-lock.svg'
import { ReactComponent as LeftArrow } from '../../../app/assets/←.svg'
import { Link } from 'react-router-dom'
function ForgotPassword() {
  return (
    <div className=' h-screen w-full flex justify-center items-center text-center flex-col space-x-4 gap-4'>
      <BrowserLock/>
      <h1 className="text-center mt-5 text-3xl">Forgot Password ?</h1>
      <p className="lead text-muted text-center font-weight-normal">No worries we'll send you reset instructions</p>
        <div className=' flex justify-start flex-col text-left w-1/2'>
            <label className='block text-left mb-1' htmlFor="email">Email</label>
            <input className="w-full p-2 border outline-none border-gray-300 rounded focus:border-green-500 focus:ring focus:ring-green-300 focus:ring-opacity-50"
  type="email" name="email" placeholder='Enter Email' />
        </div>
        <button className='p-2 rounded px-3 bg-[#02AB6C] text-white font-bold'>Reset Password</button>
        <Link to={"/login"} className=' flex items-center justify-center gap-3'>
        <LeftArrow/> Back to Login
        </Link>
    </div>
  )
}

export default ForgotPassword
