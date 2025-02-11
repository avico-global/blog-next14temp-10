import React from 'react'
import Image from 'next/image'
import HeroNavbar from '../common/HeroNavbar'
import image1 from "../../../public/hero2.webp"
import Button2 from '../common/Button2'

const content = {
  tag: "PERSONAL",
  heading: "SHADOWS WILL FALL BEHIND YOU",
  buttonLink: "/summer-collection"
};

function Herotext({ content }) {
  return (
    <div className='absolute left-1/2 -translate-x-1/2 text-center w-full px-4 md:px-0 md:w-[1000px] items-center flex flex-col justify-center top-[50%] -translate-y-1/2 md:top-10 md:translate-y-0'>
      <h3 className='text-white text-4xl md:text-3xl lg:text-4xl font-bold'>Lune d'Argent</h3>
      <h5 className='text-white text-[10px] md:text-xs font-bold pb-6 md:pb-11 tracking-[0.3rem] md:tracking-[0.4rem] py-2'>Dark and moody</h5>
      <HeroNavbar className=""/>
      <p className='text-gray-200 text-xs font-light pt-5'>{content.tag}</p>
      <h1 className='text-white text-3xl md:text-5xl lg:text-[70px] font-bold py-3 md:py-5 w-full md:w-[800px] text-center leading-tight md:leading-none text-capitalize px-4 md:px-0'>
        {content.heading}
      </h1>
      <Button2 
        text={"Read More"} 
        className='text-sm font-bold py-2 px-6 z-10 text-capitalize mt-2 md:mt-0'
      />
    </div>
  )
}

export default function Hero() {
  return (
    <div className="relative w-full h-[80vh] md:h-screen overflow-hidden">
      <div className="absolute w-full h-full">
        <Image
          src={image1}
          alt="hero"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <Herotext content={content} />
      </div>
    </div>
  )
}