import React from 'react'

function Container({children}) {
  return <div className='w-full max-w-[1200px] px-[20px] mx-auto  inner-container'>{children}</div>;
}

export default Container
