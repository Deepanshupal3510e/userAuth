import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {saveAs} from "file-saver"

const Home = () => {
  const user = useSelector(state => state.user);
  const [isUser , setIsUser] = useState(false)
  const [isVerified , setIsVerified] = useState(false)


  useEffect(() => {
    if (user && user.email) {
      setIsUser(true);
      setIsVerified(user.verified);
    } else {
      setIsUser(false);
      setIsVerified(false);
    }
  }, [user]);

  const saveImage = () => {
    saveAs("logo" , "vite.svg")
  }

  return (
      <section className=' w-full h-full flex justify-center items-center mt-50'>
           { isUser ? isVerified ? " " : <section className='fixed top-22 right-2 shadow-md bg-neutral-200 rounded-sm p-4 flex justify-between gap-4 items-center'>
          <div >Please verify your email</div>
          <Link to='/verify-email' className="px-3 py-1 bg-green-500 rounded-sm text-white ">Verify</Link>
        </section> : ""}
        

            <img onClick={saveImage} src="vite.svg" alt="vite image" />
     
      </section>
  )
}

export default Home
