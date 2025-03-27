import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { base_url, summaryApi } from '../summary';
import { toast } from 'react-toastify';
import { setUserDetails } from '../../store/user.store';
import { useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
    const user = useSelector(state => state.user)
    const [count , setCount] = useState(0)
    const [otp , setOtp] = useState("")
    const dispatch = useDispatch()
    const Navigate = useNavigate()
    const getOtp = async () => {
            const res = await axios.get(base_url+summaryApi.getEmailVerificationOtp)
            if(res.data.success){
                toast.success(res.data.message)
            }
            if(res.data.error){
                toast.error(res.data.message)
            }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post(base_url+summaryApi.verifyEmail , {otp});

        if(res.data.success){
            toast.success(res.data.message),
            dispatch(setUserDetails(res.data.user))
            Navigate("/")
        }
    }
    useEffect(() =>  {
        getOtp()
    },[count])
  return (
    <section className='w-full h-full'>
        <h1 className='text-5xl text-center mt-30 font-serif'>Welcome {user.name.toUpperCase()}</h1>

        <p className='mt-10 w-[90%] md:w-[60%] text-center mx-auto'>Your email is <strong>{user.email}</strong> we are send a OTP (one time password) on your email please enter the otp to verify your email </p>


        <form onSubmit={(e) => handleFormSubmit(e)} className='w-[80%] md:w-[30%] mx-auto shadow-md bg-neutral-200 rounded-md p-6 mt-10'>
            <h1 className='text-center  text-3xl'>Verify Email</h1>

            <input type="text" className='w-[80%] ml-[10%] text-center h-10 font-bold bg-white rounded-sm mt-10' value={otp} onChange={(e) => setOtp(e.target.value)} placeholder='Enter your otp' />

            <input type="submit" className='w-[80%] ml-[10%] text-center mt-8 bg-green-500 rounded-sm text-white h-10 text-lg hover:bg-green-700' />
            <p className="text-center mt-2">if you don't get OTP | <span onClick={() => setCount(count + 1)} className="text-blue-700 cursor-pointer">click here </span></p>
        </form>
    </section>
  )
}

export default VerifyEmail
