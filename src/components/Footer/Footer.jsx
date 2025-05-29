import React from 'react'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import Logo from '../Logo'
import "./Footer.css"

function Footer() {
  return (
    <section >
        <footer>
            <div className="footer-one">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/">Contact Us</Link></li>
                    <li><Link to="/">Privacy Policy</Link></li>
                    <li><Link to="/">About Us</Link></li>
                    <li><Link to="/">Terms And Condition</Link></li>
                </ul>
            </div>
            <div className="footer-two">
                <span>Copyright © 2025 Techwave</span>
            </div>
        </footer>
    </section>
  )
}

export default Footer