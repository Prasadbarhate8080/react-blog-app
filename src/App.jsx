import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appWrite/auth"
import {login, logout} from "./store/authSlice"
import { Footer } from './components'
import {Header} from './components'
import { Outlet } from 'react-router-dom'


function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])  
  
  return !loading ? (
    <div className='bg-[#f7f7f7]'>
      <div className='container'>
        <Header />
        <main>
        <Outlet />
        </main>
        <Footer />
      </div>
      </div>
  ) : null
}

export default App