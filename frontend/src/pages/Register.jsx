import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { base_url, summaryApi } from "../summary";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../store/user.store";
import { toast } from "react-toastify";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlenavigate = () => {
    navigate("/login");
  };

  const handleInputChange = (e) => {
    const { value, name } = e.target;

    setData((prev) => ({ ...prev, [name]: value }));
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(data, " this is data");

    const res = await axios.post(base_url + summaryApi.register, data);

    if (res.data.success) {
      console.log(res.data.data);
      dispatch(setUserDetails(res.data.data));
      toast.success(res.data.message);
    }

    if (res.data.error) {
      toast.error(res.data.message);
      setData({
        name: "",
        email: "",
        password: "",
      });
      navigate("/login");
    }
  };

  return (
    <section className="w-full h-auto mt-20">
      <form
        onSubmit={(e) => handleFormSubmit(e)}
        className="w-[90%] md:w-[40%] bg-neutral-200 rounded-md shadow-md mx-auto mt-30 p-10"
      >
        <p className="text-center font-serif text-3xl">Register</p>

        <div className="w-full h-auto mt-8 flex flex-col gap-3 justify-center ">
          <label htmlFor="name" className="pl-2 ">
            Enter your name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full h-10 pl-2 bg-neutral-300 rounded-md  focus:outline-0"
            placeholder="Enter your Name"
            onChange={(e) => handleInputChange(e)}
          />
          <label htmlFor="email" className="pl-2 mt-1">
            Enter your name
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full h-10 pl-2 bg-neutral-300 rounded-md focus:outline-0"
            placeholder="Enter your email"
            onChange={(e) => handleInputChange(e)}
          />
          <label htmlFor="password" className="pl-2 mt-1">
            Create a password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={(e) => handleInputChange(e)}
            className="w-full h-10 pl-2 bg-neutral-300 rounded-md focus:outline-0"
            placeholder="Enter your password"
          />
          <input
            type="submit"
            className="w-full bg-green-500 hover:bg-green-700 text-white rounded-md h-10 text-xl"
          />
        </div>
        <p className="text-center">
          already have a account |{" "}
          <span onClick={handlenavigate} className="text-blue-500">
            Login
          </span>
        </p>
      </form>
    </section>
  );
};

export default Register;
