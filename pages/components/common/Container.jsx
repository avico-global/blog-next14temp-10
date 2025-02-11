import React from 'react'

export default function container({children, className}) {
  return (
    <div className={`container mx-auto ${className}`}>
      {children}
    </div>
  )

}
