import React from 'react'
import {Container, Logo, LogoutBtn} from '../index'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import "./Header.css"

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

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
                        {!authStatus &&<div className="signup"><a href="/signup">Signup</a></div>}
                        {!authStatus &&<div className="signup"><a href="/login">Login</a></div>}
                    </div>
                </div>
            </nav>
        </Container>
    </header>
  )
}

export default Header