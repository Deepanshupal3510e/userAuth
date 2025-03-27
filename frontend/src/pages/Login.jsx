import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import axios from 'axios';
import { useDispatch } from 'react-redux';

import { setUserDetails } from '../../store/user.store';
import { base_url, summaryApi } from '../summary';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [isShowPassword , setIsShowPassword] = useState(false);
  const [userData , SetUserData] = useState({
    email: '',
    password: ''
  })
  const dispatch = useDispatch();
  const Navigate = useNavigate()
  const handleInputChange = (e) => {
      const {name , value} = e.target;
      SetUserData(prev => ({...prev , [name]: value}))
  }

  const handleuserLogin = async (e) => {
 
      e.preventDefault();
      console.log(userData) , "this is user Data";
      const res = await axios.post(`${base_url}${summaryApi.login}` , userData);
      console.log(res.data)

      if(res.data.error){
        console.log(res.data.error)
        toast.error(res.data.message)
      }
      if(res.data.success) {
        console.log("res.data.accessToken" , res.data.data.accessToken);
        localStorage.setItem("authToken", res.data.data.accessToken );
        console.log(res.data.data.user , " this is user data")
        dispatch(setUserDetails(res.data.data.user))
        toast.success(res.data.message)
        Navigate("/")
      } 
   

  
  };


  const handleForgotPassword = () => {
    Navigate("/forgot-password")
  }


  const handleSignUpClick = () => {
    Navigate("/register")
  }


  return (
    <section className='w-full h-full flex justify-center '>
        <form onSubmit={(e) => handleuserLogin(e)} className='w-[90%] md:w-[40%] h-auto bg-white shadow-md mx-auto mt-20 p-5 md:p-10 rounded-md'>
                <p className='text-3xl text-center mt-10 font-serif'>Login</p>

                <div className='w-full md:w-[90%] mx-auto h-auto py-10 flex flex-col gap-2'>
                  <label htmlFor="email" className='pl-3 '>Enter your Email</label>
                  <input type="email" id='email' name='email' placeholder='Enter your email' className='w-full h-10 text-md pl-2 bg-neutral-200 rounded-sm ' onChange={(e) => handleInputChange(e)} />
                  <label htmlFor="password" className='pl-3 mt-3'>Enter your password</label>
                  <input type={isShowPassword ? "text" : "password"} id='password' name='password' placeholder='Enter your email' className='w-full h-10 text-md pl-2 bg-neutral-200 rounded-sm' onChange={(e) => handleInputChange(e)} />
                  <span className='relative top-[-35px] left-[92%] w-5'  onClick={() => setIsShowPassword(!isShowPassword)}>{isShowPassword ? <FaRegEyeSlash /> : <FaRegEye />}</span>
                  <p onClick={handleForgotPassword}  className='text-red-600 text-right w-[90%] mx-auto relative top-[-20px] cursor-pointer'>forgot password</p>
                </div>
                <input type="submit"  className=' py-2 text-md w-[20%] ml-[40%] bg-blue-600 text-white rounded-sm text-center relative top-[-30px]' />
                <p  className='text-center'>i don't have a account | <span onClick={handleSignUpClick} className='text-blue-500 cursor-pointer '>Sign up</span></p>
        </form>
    </section>
  )
}

export default Login
