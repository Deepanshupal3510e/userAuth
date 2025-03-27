import { useEffect, useState } from 'react'
import './App.css'
import { Outlet} from 'react-router-dom'
import Navbar from './components/Navbar'
import { base_url, summaryApi } from './summary'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUserDetails } from '../store/user.store'
import { ToastContainer } from 'react-toastify'

export function App() {

  const dispatch = useDispatch()
  const token = localStorage.getItem("authToken")
  axios.defaults.headers.common['Authorization'] = token ;


  const getUserDetails = async () => {
    try {
        const res = await axios.get(base_url+summaryApi.getUserDetails);
        if(res.data.success){
          dispatch(setUserDetails(res.data.user))
        }
    } catch (error) {
      console.log(error , " this is user details get error on app.jsx");
    }
  }

  useEffect(() => {
  

    getUserDetails()
  },[])
  return (
    <>
      <main>
        <Navbar />
        <Outlet />
        <ToastContainer />
      </main>
    </>
  )
}


