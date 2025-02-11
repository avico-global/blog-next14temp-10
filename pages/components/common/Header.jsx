import React from 'react'
import HeroNavbar from './HeroNavbar'

export default function Header() {
  return (
    <div>

      <div className="bg-white pt-10  text-center items-center flex flex-col justify-center top-10">

        <h3 className="text-black text-4xl font-bold">Lune d'Argent</h3>
        <h5 className="text-black text-xs font-bold pb-11 tracking-[0.4rem] py-2">
          Dark and moody
        </h5>
      </div>

      <div className="bg-black lg:px-60 text-center  items-center flex flex-col justify-center top-10">
        <HeroNavbar className="" />
      </div>
     
    </div>
  )
}
