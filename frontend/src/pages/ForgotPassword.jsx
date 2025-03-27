import axios from "axios";
import React, { useState } from "react";
import { base_url, summaryApi } from "../summary";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [isEnterEmail, setIsEnterEmail] = useState(true);
  const [isShowPassword , setIsShowPassword] = useState(false)
  const [email, setEmail] = useState("");
  const [data, setData] = useState({
    password: "",
    otp: "",
  });

  const handleInputChange  = (e) => {
    const {value , name} = e.target
    setData(prev => ({...prev , [name]:value}))
  }
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (isEnterEmail) {
      const res = await axios.post(
        base_url + summaryApi.sendForgotPasswordEmail,
        { email }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setIsEnterEmail(false);
      } 
    
        if(res.data.error){
            toast.error(res.data.message)
        }
      
    }
    else{
        const dataforSubmit = {
            email,
            password :data.password,
            otp : data.otp
        }
        console.log(dataforSubmit, " this is data");
        const res = await axios.post(base_url + summaryApi.resetpassword, dataforSubmit);

        if (res.data.success) {
          toast.success(res.data.message);
          navigate("/login");
          setData({
            email : "",
            password: "",
            otp: "",
          });
        }

        if(res.data.error){
            toast.error(res.data.message)
        }
    }
  };
  return (
    <section className="w-full h-full mt-20">
      <form
        onSubmit={(e) => handleFormSubmit(e)}
        className="w-[90%] md:w-[40%] lg:w=[30%] mx-auto shadow-md bg-neutral-200 rounded-md p-10 mt-30"
      >
        <p className="w-full text-center text-3xl font-serif">Reset Password</p>
        {isEnterEmail ? (
          <div className="w-full mt-10">
            <label htmlFor="email pl-3">Enter your Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-10 bg-neutral-300 rounded-md pl-2 mt-1 focus:outline-0"
              placeholder="Enter your email"
            />
            <input
              type="submit"
              className="w-full mt-4 bg-green-500 text-white rounded-md text-xl hover:bg-green-700 h-10"
            />
          </div>
        ) : (
          <div className="w-ful flex flex-col gap-2 mt-10">
            <label htmlFor="email">This is your email</label>
            <div
              id="email"
              className="w-full h-10  bg-neutral-300 rounded-md cursor-not-allowed flex items-center pl-2"
            >
              {email}
            </div>
            <label htmlFor="password">Create a strong password</label>
            <input
              type={isShowPassword ? "text" : "password"}
              name="password"
              id="password"
              onChange={(e) => handleInputChange(e)}
              className="w-full h-10 pl-2 bg-neutral-300 rounded-md focus:outline-0"
              placeholder="Enter your password"
            />
                 <span className='relative top-[-35px] left-[92%] w-5'  onClick={() => setIsShowPassword(!isShowPassword)}>{isShowPassword ? <FaRegEyeSlash /> : <FaRegEye />}</span>
            <label htmlFor="otp">Enter OTP here</label>
            <input
              type="text"
              id="otp"
              name="otp"
              onChange={(e) => handleInputChange(e)}
              placeholder="Enter your otp here"
              className="w-full h-10 pl-2 bg-neutral-300 rounded-md focus:outline-0"
            />
            <input
              type="submit"
              className="w-full mt-4 bg-green-500 text-white rounded-md text-xl hover:bg-green-700 h-10"
            />
            <p className="w-full text-center">i don't get otp | <span className="text-blue-600" onClick={() => setIsEnterEmail(true)}>click here</span></p>
          </div>
        )}
      </form>
    </section>
  );
};

export default ForgotPassword;
