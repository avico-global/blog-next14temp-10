import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Button from '../common/Button'
import { Eye } from 'lucide-react'

export default function Post({ data }) {
  if (!data || !Array.isArray(data)) {
    return null;
  }
 
  return (
    <div className="col-span-1 lg:col-span-2 py-10 border-b">
      {data.map((item, index) => (
        <div
          key={index}
          className="mb-8 flex flex-col items-center px-4 lg:px-0"
        >
          <div className="aspect-[3/4] relative w-full overflow-hidden">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 100vw, 700px"
            />
          </div>
          <div className="p-4 w-full pb-10">
            <h1 className="text-xl lg:text-lg text-gray-800 text-center">
              {item.category}
            </h1>

            <p className="text-center text-[40px] capitalize font-extrabold">
              {item.content}
            </p>
            <div className="text-sm flex flex-row justify-center gap-4 text-gray-500 mt-2">
              {item.date} •{" "}
              <div className="flex flex-row items-center">
                <Eye size={16} /> {item.views} views
              </div>
            </div>
          </div>

          <p className="text-left text-gray-800 text-lg w-full py-4">
            {item.description}
          </p>
          <div>
          </div>
        </div>
      ))}
    </div>
  );
}

Post.defaultProps = {
  data: []
};
