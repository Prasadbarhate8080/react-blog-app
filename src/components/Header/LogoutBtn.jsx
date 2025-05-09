import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appWrite/auth'
import {logout} from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
  return (
    <button
    className='inline-bock  cursor-pointer '
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn