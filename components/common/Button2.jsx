import React from 'react'

export default function Button2({text, className, onClick}) {
  return (
    <div>
      <button 
        onClick={onClick}
        className={`bg-white text-black hover:bg-black hover:text-white  md:px-7 py-4   rounded-full transition-all duration-300  text-xs ${className}`}
      >
        {text}
      </button>
    </div>




  )
}
