import { useRouter } from "next/router";
import React from "react";
import Container from "../components/common/Container";
import Link from "next/link";
import image1 from "../../public/hero.png";
import image2 from "../../public/hero2.webp";
import image3 from "../../public/post3.webp";
import Navbar from "../components/common/Navbar";
import Header from "../components/common/Header";
import Posts from "../components/categories/Posts";
import RightBar from "../components/categories/RightBar";
import Footer from "../components/common/Footer";
import { ChevronRight } from "lucide-react";


export default function Category() {
  const router = useRouter();
  const { category } = router.query;

  const data = [
    { category: "Inspirations" },
    { category: "Personal" },
    { category: "Travel" },
  ];
  const Latestpostsdata = [
    {
      title: "Post 1",
      content: "This is the first post.",
      date: "MAY 2024",
      views: 100,
      image: image1,
      link: "/",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    },
  ];

  const postsdata = [
    {
      title: "Post 1",
      content: "This is the first post.",
      date: "MAY 2024",
      views: 100,
      image: image1,
      link: "/",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    },
    {
      title: "Post 2",


      content: "This is the second post.",
      date: "JUNE 2024",
      views: 200,
      image: image2,
      link: "/",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    },


    {
      title: "Post 3",
      content: "This is the third post.",
      date: "JULY 2024",
      views: 300,
      image: image3,
      link: "/",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",


    },
  ];
  const latestrightbar = [
    {
      image: image1,
      title: "Post 1",
      date: "MAY 2024",
    },
    {
      image: image1,
      title: "Post 1",
      date: "MAY 2024",
    },
    {
      image: image1,
      title: "Post 1",
      date: "MAY 2024",
    },

  ];

 
  return (
    <>
      <Navbar />
      <Header />
      {/* links */}
      <Container className="mt-10 flex gap-1 items-center md:w-[1000px] py-4 md:py-0 px-5">
        <Link href="/">Home</Link>
        <ChevronRight size={20} />
        <Link href={`/${category}`}>{category}</Link>
      </Container>
      <Container className="px-16">
        <div className="flex flex-col  items-center justify-center py-8 lg:py-16">


          <h3 className="text-base lg:text-lg text-gray-500">
            You are viewing
          </h3>
          <h1 className="text-3xl lg:text-5xl font-bold">{category}</h1>
        </div>

        <div className="flex flex-wrap lg:flex-row gap-4 lg:gap-8 text-lg lg:text-xl font-bold items-center justify-center border-b-2 pb-4 lg:pb-6">
          <Link href="/">ALL</Link>
          {data.map((item, index) => (
            <div key={index}>
              <Link href={`/${item.category}`}>{item.category}</Link>
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-12 ">
          <div className="flex flex-col lg:w-[70%]  gap-4">
            <Posts data={postsdata} />
            <Posts data={Latestpostsdata} />
          </div>

          <div className="lg:w-[30%] ">
            <RightBar image={image1} data={latestrightbar} />
          </div>
        </div>
        
      </Container>
      <Footer />
    </>
  );
}
