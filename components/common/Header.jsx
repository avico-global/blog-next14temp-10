import React from 'react'
import HeroNavbar from './HeroNavbar'
import Logo from './Logo'

export default function Header({
  logo,
  categories,
  imagePath,
  blog_list,
}) {
  return (
    <div>

      {/* <div className="  bg-white pt-10 pb-6  text-center items-center  hidden lg:flex flex-col justify-center top-10">

        <Logo
        className=" "
         logo={logo}
         imagePath={imagePath}
        />
      
      </div> */}

      <div className="bg-black lg:px-60 text-center  items-center flex flex-col justify-center top-10">
        <HeroNavbar 
        logo={logo}
        categories={categories}
        imagePath={imagePath}
        blog_list={blog_list}
        className="" />
      </div>
     
    </div>
  )
}
