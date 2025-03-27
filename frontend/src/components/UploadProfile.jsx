import React, { useState } from 'react'
import axios from "axios"
import { base_url, summaryApi } from '../summary';
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import { setUserDetails } from '../../store/user.store';
import { useDispatch, useSelector } from 'react-redux';
const UploadProfile = ({close}) => {
    const user = useSelector(state => state.user)
    const [imgUrl , setImgUrl] = useState( user.profilePic || "vite.svg");  
    const [image , setImage] = useState("")
    const dispatch = useDispatch()
    const hadleInputChange = (e) => {
        const file = e.target.files[0]
        console.log(file , " this is file")
        if (file) {
            setImage(file)
            const imageUrl = URL.createObjectURL(file); // ✅ Convert file to a preview URL
            console.log(imageUrl , " this is previadkljfalsdjfalsjdfal")
            setImgUrl(imageUrl);
        }
    }

    const handleImageUplaod = async () => {
        const formData = new FormData()
        formData.append("image" , image);
        console.log("image is uploading")
        const res = await axios.post(base_url+summaryApi.uploadProfilePic , formData)
        console.log(res , " this is response")
        if(res.data.success){
            toast.success(res.data.message)
            dispatch(setUserDetails(res.data.data))
            close();
        }
        if(res.data.error){
            toast.error(res.data.meesage);
            close()
        }
    }

  return (
    <section className='w-full h-full z-90 bg-neutral-400 bg-opacity-40 flex items-center justify-center fixed top-0 left-0'>
            <div className='w-[90%] md:w-[30%] h-auto shadow-md rounded-md bg-white'>
                    <button onClick={close} className='relative border-0  left-[93%] top-3'><IoMdClose size={20} /></button>
                    <img className='w-40 h-40 mx-auto mt-12' src={imgUrl} alt="" />
                    <div className='w-[90%] flex items-center justify-evenly mx-auto mt-10 mb-10 '>
                        <button onClick={handleImageUplaod} className='px-3 py-1 text-white bg-amber-400 rounded-md'>upload</button>
                        <label htmlFor='file' className='px-3 py-1 text-white bg-amber-400 rounded-md'>change</label>
                        <input onChange={(e) => hadleInputChange(e)} type="file"  id='file' className='none hidden 'accept="image/jpeg, image/jpg" />
                    </div>
            </div>
    </section>
  )
}

export default UploadProfile
