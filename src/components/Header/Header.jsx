import React,{useState,useEffect} from 'react'
import {Container, Logo, LogoutBtn} from '../index'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import "./Header.css"

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const  [sidebarActive, setSidebarActive] = useState(false)

  
  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },  
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]


  return (
    <header className=''> 
      <Container>
      <nav className="nav mt-2">
                <div className="nav-container">
                    <div className="tech-wave-logo"><span className="text-gray">Tech</span><span>Wave</span>
                    </div>
                    <div className ="nav-items">
                        <ul className='nav-ul'>
                            {authStatus && <li><a href="/">Home</a></li>}
                            {authStatus && <li><a href="/all-posts">Your Post</a></li>}
                            {authStatus && <li><a href="/add-post">Add Post</a></li>}
                            {authStatus && <li><a><LogoutBtn /></a></li>}
                        </ul>
                       {authStatus && <div
                          onClick={() => {setSidebarActive(prev => !prev)}}
                          className='hamburger-icon'>
                          <img width={20} height={20} src={sidebarActive ? "" : "/hamburger.png"} alt="" />
                        </div>}
                        <div 
                         className={`sidebar ${sidebarActive ? "translate-x-0" : "translate-x-full"} 
                          transition-transform duration-300 ease-in-out
                          fixed top-0 right-0 h-full w-[226px] p-4 bg-white z-50 shadow-lg`}
                         >
                          <div 
                          onClick={() => {setSidebarActive(prev => !prev)}}
                          >
                            <img width={20} height={20} src={"/close.png" } alt="" />
                          </div>
                          <div className='px-4 mt-5'>
                          <ul className='flex flex-col !gap-7 list-none'>
                            {authStatus && <li><a href="/">Home</a></li>}
                            {authStatus && <li><a href="/all-posts">Your Post</a></li>}
                            {authStatus && <li><a href="/add-post">Add Post</a></li>}
                            {authStatus && <li><a><LogoutBtn /></a></li>}
                          </ul>
                          </div>
                        </div> 
                        {!authStatus &&
                        <div className="">
                          <a href="/login">
                          <button 
                        type="button" 
                        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4
                         focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800
                          dark:hover:bg-gray-700
                         dark:focus:ring-gray-700 dark:border-gray-700">Login</button>
                         </a>
                         </div>
                        }
                    </div>
                </div>
            </nav>
        </Container>
    </header>
  )
}

export default Header