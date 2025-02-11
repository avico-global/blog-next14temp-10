import React from "react";
import Image from "next/image";
export default function RightBar({ image, data = [] }) {
  return (
    <>
      <div className="  pb-10 rounded-lg flex flex-col gap-4 items-center sticky top-[72px]">
        <div className="  px-4 bg-gray-100 rounded-lg pb-10 mb-12">
          <div className="items-center py-10 justify-center overflow-hidden px-3 aspect-[3/4.5]">
            <Image
              src={image}
              alt="image"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <p className="text-center text-2xl font-bold">Hi, my name is Kate</p>
          <p className="text-center text-lg">
            I am a personal stylist. This blog is to provide you with daily
            outfit ideas and share my personal style.
          </p>
        </div>

        <div className=" w-full flex flex-col gap-4">
          <h3 className="text-xl border-b border-gray-300 pb-3 mb-3 text-center">
            Inspiration
          </h3>
          {data?.map((item, index) => (
            <div key={index} className="flex gap-4">
              <div className="aspect-[1/1]">
                <Image
                  src={item.image}
                  className="w-[100px] h-full object-cover rounded-lg"
                />
              </div>
              <div className="flex flex-col gap-2  justify-center">
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
