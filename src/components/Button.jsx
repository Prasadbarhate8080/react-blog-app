import React from 'react'

function Button({
    chiidren,
    type = 'button',
    bgColor = 'bg-blue-600',
    textColor = 'text-white',
    className = '',
    value= "",
    loading,
    ...props
}) {
  return (
      <button
      className={`px-4 py-2 rounded-lg flex justify-center items-center gap-4 hover:cursor-pointer 
      ${value == "Delete" ? "hover:bg-red-600" : ""} 
      ${value == "Submit" ? "hover:bg-blue-700" : ""} 
      ${value == "Update" || value == "Edit" ? "hover:bg-green-600" : ""}  
      ${bgColor} ${textColor} ${className} `}
      {...props}
      >
        {loading && <div className='h-5 w-5 border-2 rounded-full border-gray-400 border-t-white  animate-spin'></div>}
        <span>{value}</span>
      </button>
  )
}

export default Button
