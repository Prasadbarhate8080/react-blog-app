import React from 'react'
import { Link } from 'react-router-dom'
function Logo({width = "100px"}) {
  return (
    <div>
        <div className="tech-wave-logo">
          <Link to="/"><span className="text-gray">Tech</span><span>Wave</span></Link>
        </div>
    </div>
  )
}

export default Logo
