import React from "react";
import FullContainer from "../common/FullContainer.jsx";
import Container from "../common/Container";
import Image from "next/image";
import post1 from "../../../public/hero2.webp";
import post2 from "../../../public/hero.png";
import post3 from "../../../public/post3.webp";
import post4 from "../../../public/post4.webp";
import Link from "next/link";
import Button from "../common/Button";
import postby from "../../../public/postby.webp";
import { Eye } from "lucide-react";

const posts = [
  {
    id: 1,
    tag: "INSPIRATION PERSONAL",
    heading: "PRACTISE A POWER POSE",
    date: "SEPTEMBER 6, 2023",
    views: "1.7K ",
    description:
      "Self-belief is like a shadow in the midday sun. Just as we think we've caught it, ...",
    image: post1,
    postlink: "Content Link",
    postby: "BY CLAIR JONES",
    postbyimage: postby,
  },

  {
    id: 2,
    tag: "PERSONAL",
    heading: "Shadows will fall behind you",
    date: "August 18, 2023",
    views: "4.3K ",
    description:
      "Self-belief is like a shadow in the midday sun. Just as we think we've caught it, ...",
    image: post2,
    postlink: "Content Link",
    postby: "BY CLAIR JONES",
    postbyimage: postby,
  },
  {
    id: 3,
    tag: "TRAVEL",
    heading: "Don't dwell on mistakes",
    date: "July 27, 2023",
    views: "2.6K ",
    description:
      "Self-belief is like a shadow in the midday sun. Just as we think we've caught it, ...",
    image: post3,
    postlink: "Content Link",
    postby: "BY CLAIR JONES",
    postbyimage: postby,
  },
  {
    id: 4,
    tag: "INSPIRATION TRAVEL",
    heading: "Redefine yourself",
    date: "May 24, 2023",
    views: "3.4K",
    description:
      "Self-belief is like a shadow in the midday sun. Just as we think we've caught it, ...",
    image: post4,
    postlink: "Content Link",
    postby: "BY CLAIR JONES",
    postbyimage: postby,
  },
];

export default function Posts() {
  return (
    <div>
      <FullContainer className="py-12 md:py-24 px-8 md:px-7 ">
        <Container className={""}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {posts.map((post) => (
              <div key={post.id}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 bg-white rounded-lg  overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  {/* Image Container */}
                  <div className="relative rounded-lg overflow-hidden aspect-[3/4]  lg:h-[500px]  w-full">
                    <Image
                      src={post.image}
                      alt={post.heading}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>

                  {/* Content Container */}
                  <div className="p-4 md:p-6 flex flex-col gap-2 md:gap-3">
                    <span className="text-xs text-gray-500">{post.tag}</span>
                    <h3 className="text-2xl md:text-4xl font-extrabold line-clamp-3">
                      {post.heading}
                    </h3>
                    
                    {/* Date and Views */}
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{post.date}</span>
                      <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                      <div className="flex items-center gap-1">
                        <Link href="/" className="flex items-center">
                          <Eye size={12} />
                        </Link>
                        <span>{post.views} views</span>
                      </div>
                    </div>

                    <p className="text-base md:text-xl text-black line-clamp-2">
                      {post.description}
                    </p>
                    
                    <Link href={post.postlink} className="w-fit">
                      <Button 
                        text="VIEW THE POST" 
                        className="w-fit my-3 md:my-5 text-sm md:text-base" 
                      />
                    </Link>

                    {/* Author Info */}
                    <div className="flex items-center gap-2 pt-3 md:pt-5 mt-auto">
                      <Image
                        src={post.postbyimage}
                        alt="postby"
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                      <span className="text-xs text-gray-500">
                        {post.postby}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </FullContainer>
    </div>
  );
}
