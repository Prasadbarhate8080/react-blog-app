import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'
import "./Footer.css"

function Footer() {
  return (
    <section >
        <footer>
            <div className="footer-one">
                <ul>
                    <li><a href="/frontend/index.html">Home</a></li>
                    <li><a href="/frontend/contact.html">Contact Us</a></li>
                    <li><a href="/frontend/privacy.html">Privacy Policy</a></li>
                    <li><a href="/frontend/about.html">About Us</a></li>
                    <li><a href="/frontend/terms.html">Terms And Condition</a></li>
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