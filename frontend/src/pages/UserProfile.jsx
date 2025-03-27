import React, { useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../../store/user.store";
import { useNavigate } from "react-router-dom";
import UploadProfile from "../components/UploadProfile";
import { saveAs } from "file-saver";
import { IoMdDownload } from "react-icons/io";

const UserProfile = () => {
  const user = useSelector((state) => state.user);
  const [isImageUpload , setShowImageUpload] = useState(false)
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const handleLogOut = () => {
    dispatch(logOutUser());
    localStorage.removeItem("authToken");
    Navigate("/");
  };
  return (
    <section className="mt-20 w-full h-full">
      <section className="w-[90%] md:w-[50%]  justify-evenly items-center mx-auto shadow-md bg-neutral-100 rounded-md mt-30 h-full  pt-10 flex flex-col md:flex-row ">
     
        <div  className="w-full md:w-[30%] mx-auto flex justify-center items-center">
          {user?.profilePic ? (<> 
            <img onClick={() => setShowImageUpload(true)} className="w-30 h-30 rounded-full" src={user.profilePic} alt="" />
             <button onClick={() => saveAs("profile" , user.profilePic)}> <IoMdDownload size={40} /></button></>
          ) : (
            <FaRegCircleUser size={80} className="text-center  inline" onClick={() => setShowImageUpload(true)} />
          )}
        </div>

          {isImageUpload ? <UploadProfile close={() => setShowImageUpload(false)} /> : ""}
        <div className="w-full md:w-[30%] mt-10 flex flex-col gap-5 items-center justify-center">
          <p className="text-3xl text-center font-semibold font-serif capitalize">
            {user.name}
          </p>
          <button
            onClick={handleLogOut}
            className="px-4 py-2 bg-red-500 hover:bg-red-800 text-white rounded-md mb-10"
          >
            Log out
          </button>
        </div>
      </section>
    </section>
  );
};

export default UserProfile;
