import React from 'react'

function Button({
    chiidren,
    type = 'button',
    bgColor = 'bg-blue-600',
    textColor = 'text-white',
    className = '',
    value= "",
    ...props
}) {
  return (
    <button
    className={`px-4 py-2 rounded-lg hover:cursor-pointer 
      ${value == "Delete" ? "hover:bg-red-600" : ""} 
      ${value == "Submit" ? "hover:bg-blue-700" : ""} 
       ${value == "Update" || value == "Edit" ? "hover:bg-green-600" : ""}  
       ${bgColor} ${textColor} ${className} `}
    {...props}
    >
      {value}
    </button>
  )
}

export default Button
