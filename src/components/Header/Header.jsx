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

  useEffect(() => {
   console.log(sidebarActive)
  }, [sidebarActive])

  useEffect(() => {
    console.log("run on every render")
  })
  

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
                            <li><a href="/">Home</a></li>
                            {authStatus && <li><a href="/all-posts">Your Post</a></li>}
                            {authStatus && <li><a href="/add-post">Add Post</a></li>}
                            {authStatus && <li><a><LogoutBtn /></a></li>}
                        </ul>
                        <div
                        onClick={() => {setSidebarActive(prev => !prev)}}
                        className='hamburger-div'>
                          <img width={20} height={20} src={sidebarActive ? "" : "/hamburger.png"} alt="" />
                          </div>
                        <div 
                         className={`${sidebarActive ? "translate-x-0" : "translate-x-full"} 
                         transition-transform duration-300 ease-in-out
                          h-80 w-[226px] p-2  bg-white top-8 absolute left-[40%] z-10`}
                         >
                          <div 
                          onClick={() => {setSidebarActive(prev => !prev)}}
                          >
                            <img width={20} height={20} src={"/close.png" } alt="" />
                          </div>
                          this is the sidebar
                        </div> 
                        {!authStatus &&
                        <div className="signup font-bold border-2 rounded-md px-0.5"><a href="/login">Log in</a></div>
                        }
                    </div>
                </div>
            </nav>
        </Container>
    </header>
  )
}

export default Header