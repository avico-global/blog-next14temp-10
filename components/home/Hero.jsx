import React from "react";
import Image from "next/image";
import HeroNavbar from "../common/HeroNavbar";
import image1 from "@/public/hero2.webp";
import Button2 from "../common/Button2";
import Logo from "../common/Logo";

function Herotext({ data, categories,blog_list, imagePath, logo }) {
  const scrollToPosts = () => {
    const element = document.getElementById('all-posts');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="absolute left-1/2 -translate-x-1/2 text-center w-full px-4 md:px-0 md:w-[1000px] items-center flex flex-col justify-center top-[50%] -translate-y-1/2 md:top-10 md:translate-y-0">
      <div className="hidden lg:flex">
        <Logo logo={logo} imagePath={imagePath} />
      </div>

      <HeroNavbar blog_list={blog_list} categories={categories} imagePath={imagePath} />
      <h1
        className="text-white text-3xl mt-11 md:text-5xl lg:text-[70px] font-bold py-3 md:py-5 w-full md:w-[800px] text-center leading-tight md:leading-none capitalize px-4 md:px-0"
        style={{ fontSize: data.titleFontSize || undefined }}
      >
        {data.title}
      </h1>
      <p
        className="text-gray-200 text-xs font-light py-5"
        style={{ fontSize: data.taglineFontSize || undefined }}
      >
        {data.tagline}
      </p>

      <Button2
        text={data.buttonText || "Read More"}
        className="text-sm font-bold py-2 px-6 z-10 capitalize mt-2 md:mt-0"
        onClick={scrollToPosts}
      />
    </div>
  );
}

export default function Hero({ data, image, categories, imagePath, logo,blog_list }) {
  return (
    <div className="relative w-full h-[80vh] md:h-screen overflow-hidden">
      <div
        className="absolute w-full h-full"
        style={{
          backgroundColor: `rgba(0, 0, 0, ${data?.opacity / 100})`,
          color: data.textColor || "white",
        }}
      >
        <Image
          src={image || image1}
          title={data.imageTitle || data.title || "Hero Banner"}
          alt={data.altImage || data.tagline || "Hero Banner"}
          fill
          priority
          className="object-cover -z-10"
          sizes="(max-width: 320px) 320px,
                (max-width: 480px) 480px,
                (max-width: 768px) 768px,
                (max-width: 1024px) 1024px,
                (max-width: 1280px) 1280px,
                (max-width: 1600px) 1600px,
                (max-width: 1920px) 1920px,
                (max-width: 2560px) 2560px,
                (max-width: 3840px) 3840px,
                100vw"
        />
        <Herotext
          data={data}
          categories={categories}
          imagePath={imagePath}
          logo={logo}
          blog_list={blog_list}
        />
      </div>
    </div>
  );
}
