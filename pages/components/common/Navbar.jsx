import {
  Facebook,
  Instagram,
  Twitter,
  Search,
  ShoppingCart,
  Menu,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Fullcontainer from "./FullContainer";
import Container from "./Container";
import { useState, useEffect } from "react";
import image1 from "../../../public/hero.png";
import image2 from "../../../public/hero2.webp";
import image3 from "../../../public/post3.webp";

export default function Navbar() {
  const li =
    " py-2 bg-black text-white hover:bg-white hover:text-black px-3 rounded-xl transition-all duration-300";
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight - 100) {
        setShowNavbar(true);
      } else {
        // Only hide on larger screens
        setShowNavbar(window.innerWidth >= 768 ? false : true);
      }
    };

    // Set initial state
    setShowNavbar(window.innerWidth < 768);
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Fullcontainer
      className={`fixed top-0 left-0 w-full bg-black text-white shadow-lg transition-all duration-[600ms] z-50 ${
        showNavbar ? "opacity-100 translate-y-0" : "md:opacity-0 md:-translate-y-full"
      }`}
    >

      <Container className="lg:w-[900px] py-4 md:py-0 px-5">
        <div className="  flex justify-between items-center  mx-auto text-white px-5">
          <ul className="flex justify-between items-center gap-4 text-sm font-semibold">
            <Link href="/">
              <Facebook size={20} />
            </Link>
            <Link href="/">
              <Instagram size={20} />
            </Link>
            <Link href="/">
              <Twitter size={20} />
            </Link>
          </ul>

          <ul className=" hidden md:flex justify-between items-center text-md font-semibold">
            <Link href="/" className={li}>
              Home
            </Link>
            <Link
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
              className="py-4 "
              href="/"
            >


              <div className=" group py-2 bg-black text-white hover:bg-white hover:text-black px-3 rounded-xl transition-all duration-500">
                <div className="flex items-center gap-1">Categories</div>
                <div
                  className={`absolute top-16 left-[10%] bg-black w-[80%] text-white h-[300px]  rounded-lg z-10 shadow-lg transition-all duration-300 ${
                    dropdownOpen
                      ? "opacity-100 visible translate-y-0"
                      : "opacity-0 invisible translate-y-[-10px]"
                  }`}



                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <Categories />
                </div>
              </div>
            </Link>

            <Link href="/" className={li}>
              About me
            </Link>
            <Link href="/" className={li}>
              Contact
            </Link>

            <Link href="/" className="py-2 px-3">
              <Search size={12} />
            </Link>
          </ul>

          <div className="flex justify-between items-center gap-4 text-sm font-semibold">
                <Menu size={20} />
          </div>
        </div>
      </Container>
    </Fullcontainer>
  );
}

const Categories = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  const contentData = {
    tab1: {
      image: image1,
      image2: image2,
      image3: image3,
      title: "Practice a power pose",
      title2: "Redefine your self",
      title3: "The garden of dream",
      date: "May 12, 2024",
      date2: "September 13, 2024",
      date3: "December 15, 2024",
    },
    tab2: {
      image: image3,
      image2: image2,
      image3: image1,
      title: "Don't dwell on mistakes",
      title2: "Redefine your self",
      title3: "Connect to impress",
      date: "May 12, 2024",
      date2: "September 13, 2024",
      date3: "December 15, 2024",
    },
    tab3: {
      image: image2,
      image2: image1,
      image3: image3,
      title: "Practice a power pose",
      title2: "Shadows will fall behind you",
      title3: "The garden of dream",
      date: "May 12, 2024",
      date2: "September 13, 2024",
      date3: "December 15, 2024",
    },
  };

  const imageStyle =
    "rounded-lg  aspect-[4/3] flex items-center justify-center overflow-hidden";


  return (
    <div className="w-full mt-8 bg-black rounded-lg p-6 flex">
      {/* Content Section */}
      <div className="grid grid-cols-3 gap-5  w-full">
        {["image", "image2", "image3"].map((imgKey, index) => (

          <div
            key={index}
            className="flex flex-col items-center transition-all duration-500"
          >
            <div className={imageStyle}>
              <Image
                src={contentData[activeTab][imgKey]}
                alt="image"
                height={170}
                width={230}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="mt-2 gap-1 flex flex-col text-center text-white">
              <p className="font-semibold text-xs">
                {index === 0
                  ? contentData[activeTab].title
                  : contentData[activeTab][`title${index + 1}`]}
              </p>
              <p className="text-xs text-gray-400">
                {index === 0
                  ? contentData[activeTab].date
                  : contentData[activeTab][`date${index + 1}`]}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Tabs Section */}
      <div className="flex flex-col gap-4 text-xs px-6 w-[230px] ">
        {["tab1", "tab2", "tab3"].map((tab, index) => (
          <button
            key={index}
            onMouseEnter={() => setActiveTab(tab)}
            className={`px-4 py-2 text-start rounded-lg transition-all duration-300 ${
              activeTab === tab
                ? "bg-white text-black font-semibold"
                : "bg-black text-white"
            }`}
          >
            {tab === "tab1"
              ? "Inspiration"
              : tab === "tab2"
              ? "Travel"
              : "Personal"}
          </button>
        ))}
      </div>
    </div>
  );
};
