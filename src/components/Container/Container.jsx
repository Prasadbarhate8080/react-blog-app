import React from 'react'

function Container({className,children}) {
  return <div className={`w-full max-w-[1200px] px-[20px] mx-auto  inner-container ${className}`}>{children}</div>;
}

export default Container
