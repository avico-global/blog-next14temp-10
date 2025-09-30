import React from "react";
import Image from "next/image";
import { Eye } from "lucide-react";
import Link from "next/link";
import Button from "../common/Button";
export default function Posts({ data = [] }) {
  return (
    <div className="col-span-1 lg:col-span-2 py-6 sm:py-10 border-b border-gray-300">
      {data?.map((item, index) => (
        <div
          key={index}
          className="mb-6 sm:mb-8 flex flex-col items-center px-4 sm:px-6 lg:px-0"
        >
          <div className="p-3 sm:p-4 w-full pb-6 sm:pb-10">
            <h1 className="text-lg sm:text-xl lg:text-lg text-gray-800 text-center">
              Travel
            </h1>

            <p className="text-center text-2xl sm:text-3xl lg:text-[40px] capitalize font-extrabold leading-tight sm:leading-tight lg:leading-tight">
              {item.content}
            </p>
            <div className="text-xs sm:text-sm flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 text-gray-500 mt-2">
              <span>{item.date}</span>
              <span className="hidden sm:inline">•</span>
              <div className="flex flex-row items-center gap-1">
                <Eye size={14} className="sm:w-4 sm:h-4" />
                <span>{item.views} views</span>
              </div>
            </div>
          </div>

          <div className="aspect-[4/3] sm:aspect-[3/4] relative w-full max-w-2xl overflow-hidden">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 700px"
            />
          </div>
          <p className="text-left text-gray-800 text-base sm:text-lg w-full py-3 sm:py-4 leading-relaxed">
            {item.description}
          </p>
          <div className="w-full sm:w-auto">
            <Link href={item.link} className="w-full sm:w-auto">
              <Button
                className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base"
                text="Read More"
              ></Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
