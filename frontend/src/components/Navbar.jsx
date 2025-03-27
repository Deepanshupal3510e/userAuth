import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaRegCircleUser } from "react-icons/fa6";

const Navbar = () => {

  const user = useSelector(state => state.user);

  const [isUser , setIsUser] = useState(false)
  const [isProfilePic , setIsProfilePic] = useState(user?.profilePic)
  const location = useLocation()
  const Navigate = useNavigate()


  const handleProfileClick = () => {
    Navigate("/user-profile")
  }

  const handlepath = () => {
    if(isUser || location.pathname == "/login" || location.pathname == "register"){
        Navigate("/")
    }
  }

  useEffect(() => {
    setIsUser(!!user?.email);
    setIsProfilePic(!!user?.profilePic);
  }, [user]);

  return (
    <section>
        <nav className=' w-full h-20 shadow-md px-2 md:px-10 flex justify-between items-center fixed top-0 left-0 z-50 '>
            <img src="vite.svg" alt="this is logo" />
            <div className='w-auto h-auto flex justify-between items-center gap-3 md:gap-6' >
                <Link to="/" className='text-sm md:text-lg'>Home</Link>
                <Link to="/about" className='text-sm md:text-lg'>About</Link>
                <Link to="/contact" className='text-sm md:text-lg'>Contact</Link>
            </div>

            {isUser ?  isProfilePic ? <img onClick={handleProfileClick} className='w-10 h-10 rounded-full' src={user.profilePic} alt={user.name} /> :<FaRegCircleUser size={30} onClick={handleProfileClick} />: <div className='w-auto h-auto flex justify-between items-center gap-3 md:gap-6'>
                <Link to="/register" className='text-sm md:text-lg'>Sign in</Link>
                <Link to="/login" className='px-2 md:px-4 py-1 md:py-2 text-sm md:text-lg bg-blue-600 rounded-md text-white hover:bg-blue-800'>Login</Link>
            </div>}
            
          
        </nav>

    </section>
  )
}

export default Navbar
