import React from 'react'

export default function Button({text, className}) {
  return (
    <div>
      <button className={`bg-black text-white hover:bg-gray-100 hover:text-black  md:px-7 py-4   rounded-full transition-all duration-300  text-xs ${className}`}>{text}</button>
    </div>


  )
}
