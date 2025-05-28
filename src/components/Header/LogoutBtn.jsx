import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appWrite/auth'
import {logout} from '../../store/authSlice'

function LogoutBtn({className}) {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
  return (
    <button 
      onClick={logoutHandler}
      type="button" 
      className={` text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4
      focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800
      dark:hover:bg-gray-700
      dark:focus:ring-gray-700 dark:border-gray-700 ${className}`}
      >
        Logout
      </button>
  )
}

export default LogoutBtn