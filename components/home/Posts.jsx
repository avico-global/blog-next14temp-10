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
      <FullContainer className="py-16 md:py-32 px-4 md:px-0">
        <Container className={""}>
          {/* Enhanced Heading Section */}
          <div className="mb-24 md:mb-32 text-center">
            <h2 className="relative inline-block text-5xl md:text-7xl font-black tracking-tight">
              <span className="relative z-10 bg-gradient-to-b from-black to-gray-600 bg-clip-text text-transparent">
                ALL POSTS
              </span>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-black -rotate-1 rounded-full"></div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gray-400 rotate-1 rounded-full"></div>
            </h2>
            <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Discover our latest insights, stories, and expert perspectives
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            {posts.map((post, index) => (
              <div
                key={`${post.id}-${sanitizeUrl(post.title)}`}
                className="group w-full"
              >
                <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 sm:gap-6 bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_0_rgba(0,0,0,0.08)] hover:shadow-[0_8px_40px_0_rgba(0,0,0,0.12)] transition-all duration-500 hover:transform hover:-translate-y-2 border border-gray-100">
                  {/* Enhanced Image Container */}
                  <div className="relative rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none overflow-hidden aspect-[16/10] sm:aspect-[4/3] lg:h-[350px] xl:h-[400px] w-full">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <Image
                      src={`${imagePath}/${post.image}`}
                      alt={post.heading || "Post Image"}
                      title={post.heading || "Post Image"}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
                    />
                    {/* Post number badge */}
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-white/90 backdrop-blur-sm text-black text-xs font-bold px-2 py-1 sm:px-3 sm:py-1 rounded-full z-20">
                      #{String(index + 1).padStart(2, "0")}
                    </div>
                  </div>

                  {/* Enhanced Content Container */}
                  <div className="p-4 sm:p-6 lg:p-6 xl:p-8 flex flex-col gap-3 sm:gap-4 lg:gap-5">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest border-b border-gray-200 pb-2 w-fit">
                      {post.article_category}
                    </span>

                    <h3 className="text-xl sm:text-2xl lg:text-2xl xl:text-3xl font-bold line-clamp-2 sm:line-clamp-3 leading-tight group-hover:text-gray-700 transition-colors duration-300">
                      {post.title}
                    </h3>

                    {/* Enhanced Date and Views */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-gray-500 font-medium">
                      <span className="bg-gray-100 px-2 py-1 rounded-md whitespace-nowrap">
                        {dayjs(post.published_at).format("MMM D, YYYY")}
                      </span>
                      <div className="w-1 h-1 bg-gray-400 rounded-full hidden sm:block"></div>
                      <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-md">
                        <Link
                          href="/"
                          className="flex items-center hover:text-black transition-colors"
                          title="View post statistics"
                        >
                          <Eye size={12} />
                        </Link>
                        <span className="whitespace-nowrap">
                          {post.views || "0"} views
                        </span>
                      </div>
                    </div>

                    <p className="text-sm sm:text-base lg:text-base text-gray-700 line-clamp-2 sm:line-clamp-3 leading-relaxed">
                      {post.tagline || post.description}
                    </p>

                    {/* Button and Author Info Container */}
                  </div>
                  <div className="w-full px-4 sm:px-6 pb-4 sm:pb-6">
                    <div className="flex items-center gap-3">
                      {post.author_image && (
                        <div className="relative">
                          <Image
                            src={`${imagePath}/${post.author_image}`}
                            alt={post.author || "Author"}
                            title={post.author || "Author"}
                            width={40}
                            height={40}
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full ring-2 ring-gray-100"
                          />
                          <div className="absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-400 rounded-full border-2 border-white"></div>
                        </div>
                      )}
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-400 uppercase tracking-wide">
                          Written by
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-gray-800">
                          {post.author}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full px-4 sm:px-6 pb-4 sm:pb-6">
                    <Link
                      href={`/${sanitizeUrl(
                        post.article_category
                      )}/${sanitizeUrl(post.title)}`}
                      className="w-fit group/button"
                      title={`Read more about ${post.title}`}
                    >
                      <Button
                        text="READ MORE"
                        className="w-fit px-4 sm:px-6 py-2.5 sm:py-3 text-sm md:text-base font-semibold group-hover/button:scale-105 transition-transform duration-200 shadow-lg hover:shadow-xl"
                      />
                    </Link>
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
