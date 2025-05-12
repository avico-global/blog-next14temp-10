import React from "react";
import FullContainer from "../common/FullContainer.jsx";
import Container from "../common/Container";
import Image from "next/image";
import Link from "next/link";
import Button from "../common/Button";
import { Eye } from "lucide-react";
import dayjs from "dayjs";
import { sanitizeUrl } from "@/lib/myFun.js";



export default function Posts({ posts, imagePath }) {
  return (
    <div id="all-posts">
      <FullContainer className="py-12 md:py-24 px-8 md:px-7">
        <Container className={""}>
          {/* Added Heading Section */}
          <div className="mb-20 text-center">
            <h2 className="relative inline-block text-4xl md:text-5xl font-bold">
              <span className="relative z-10"> ALL POSTS</span>
              <div className="absolute -bottom-3 left-0 w-full h-3 bg-black -rotate-1"></div>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {posts.map((post) => (
              <div key={`${post.id}-${sanitizeUrl(post.title)}`}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  {/* Image Container */}
                  <div className="relative rounded-lg overflow-hidden aspect-[3/4] lg:h-[500px] w-full">
                    <Image
                      src={`${imagePath}/${post.image}`}
                      alt={post.heading || "Post Image"}
                      title={post.heading || "Post Image"}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>

                  {/* Content Container */}
                  <div className="p-4 md:p-6 flex flex-col gap-2 md:gap-3">
                    <span className="text-xs text-gray-500">{post.article_category}</span>
                    <h3 className="text-2xl md:text-4xl font-extrabold line-clamp-3">
                      {post.title}
                    </h3>
                    
                    {/* Date and Views */}
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{dayjs(post.published_at).format("MMMM D, YYYY")}</span>
                      <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                      <div className="flex items-center gap-1">
                        <Link 
                          href="/" 
                          className="flex items-center"
                          title="View post statistics"
                        >
                          <Eye size={12} />
                        </Link>
                        <span>{post.views || "0"} views</span>
                      </div>
                    </div>

                    <p className="text-base md:text-xl text-black line-clamp-2">
                      {post.tagline || post.description}
                    </p>
                    
                    <Link 
                      href={`/${sanitizeUrl(post.article_category)}/${sanitizeUrl(post.title)}`} 
                      className="w-fit"
                      title={`Read more about ${post.title}`}
                    >
                      <Button 
                        text="VIEW THE POST" 
                        className="w-fit my-3 md:my-5 px-4 text-sm md:text-base" 
                      />
                    </Link>

                    {/* Author Info */}
                    <div className="flex items-center gap-2 pt-3 md:pt-5 mt-auto">
                      {post.author_image && (
                        <Image
                          src={`${imagePath}/${post.author_image}`}
                          alt={post.author || "Author"}
                          title={post.author || "Author"}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                      )}
                      <span className="text-xs text-gray-500">
                        BY {post.author}
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
