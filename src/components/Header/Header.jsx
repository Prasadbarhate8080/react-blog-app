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
  const [searchResult, setSearchResult] =useState([]);
  function search(query) {
    console.log(query)
  }

  function debounce(fn,delay) {
    let timerId = 0;
    return function (query) {
      clearTimeout(timerId)
      timerId = setTimeout(() => {
        fn(query);
      },delay)
    }
  }
  const delaySearch = debounce(search,3000);

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
                    {authStatus && <li><Link to="/">Home</Link></li>}
                    {authStatus && <li><Link to="/all-posts">Your Post</Link></li>}
                    {authStatus && <li><Link to="/add-post">Add Post</Link></li>}
                    <li className='flex group'>
                      <input type="text" placeholder='Search'
                      className=' indent-[10px] border-[1px] outline-none h-[30px] w-[200px]
                      rounded-tl-[4px] rounded-bl-[4px] border-[gray] border-r-0 focus:border-black focus:border-r-0' 
                      />
                      <div className='w-[35px] h-[30px] bg-[#E3E6E6] rounded-tr-[4px] rounded-br-[4px] 
                      border-[1px] border-[gray] outline-none flex justify-center items-center border-l-0
                        group-focus-within:border-black group-focus-within:border-l-0'
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="80" height="80" viewBox="0 0 30 30">
                            <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 
                            25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C
                            23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 
                            17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
                        </svg>
                      </div>
                      <div className='absolute hidden group-focus-within:block  h-96 w-[30%] bg-white shadow-xl rounded-xl right-52 z-10
                        top-[11%] p-5'
                      >
                        <ul>
                          <li></li>
                        </ul>
                      </div>
                    </li>
                    {authStatus && <li><Link><LogoutBtn /></Link></li>}
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
                      {authStatus && <li><Link to="/">Home</Link></li>}
                      {authStatus && <li><Link to="/all-posts">Your Post</Link></li>}
                      {authStatus && <li><Link to="/add-post">Add Post</Link></li>}
                      {authStatus && <li><Link><LogoutBtn className={"rounded-md mx-0 !py-2"} /></Link></li>}
                    </ul>
                  </div>
                  </div> 
                  {!authStatus &&
                  <div className="">
                    <Link to="/signup">
                    <button 
                  type="button" 
                  className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4
                    focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800
                    dark:hover:bg-gray-700
                    dark:focus:ring-gray-700 dark:border-gray-700">Signup</button>
                    </Link>
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