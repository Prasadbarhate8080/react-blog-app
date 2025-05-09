import React from 'react'

function Container({children}) {
  return <div className='w-full max-w-[1200px] px-[20px] mx-auto px-4 inner-container'>{children}</div>;
}

export default Container
