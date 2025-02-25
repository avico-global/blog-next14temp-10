import React from "react";
import Image from "next/image";
import Link from "next/link";
import MarkdownIt from "markdown-it";
import { sanitizeUrl } from "@/lib/myFun";

const md = new MarkdownIt();

export default function RightBar({ about_me = {}, blog_list = [], imagePath }) {
  const content = md.render(about_me.value || "");
  const lastFiveBlogs = blog_list.slice(-5);

  return (
    <div className="pb-10 rounded-lg flex flex-col gap-4 items-center sticky top-[72px]">
      {/* About Section */}
      <div className="px-4 bg-gray-100 rounded-lg pb-10 mb-12">
        <div className="items-center py-10 justify-center overflow-hidden px-3 aspect-[3/4.5]">
          <Image
            src={`${imagePath}/${about_me.file_name}`}
            alt={`${content.slice(0, 100)}...`}
            title={`${content.slice(0, 100)}...`}
            className="w-full h-full object-cover rounded-lg"
            width={500}
            height={750}
          />
        </div>
        <div
          className="text-center text-lg"
          dangerouslySetInnerHTML={{ __html: `${content.slice(0, 100)}...` }}
        />
      </div>

      {/* Latest Posts Section */}
      <div className="w-full flex flex-col gap-4">
        <h3 className="text-xl border-b border-gray-300 pb-3 mb-3 text-center">
          Latest Posts
        </h3>
        {lastFiveBlogs.map((item, index) => (
          <Link
            key={index}
            title={item.title || "Article"}
            href={`/${encodeURI(
              sanitizeUrl(item.article_category)
            )}/${encodeURI(sanitizeUrl(item.title))}`}
          >
            <div className="flex gap-4">
              <div className="aspect-[1/1]">
                <Image
                  src={
                    item.image ? `${imagePath}/${item.image}` : "/no-image.png"
                  }
                  title={item?.tagline || item?.altText || "Article Thumbnail"}
                  className="w-[100px] h-full object-cover rounded-lg"
                  width={100}
                  height={100}
                  alt={item?.tagline || item?.altText || "Article Thumbnail"}
                />
              </div>
              <div className="flex flex-col gap-2 justify-center">
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.published_at}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
