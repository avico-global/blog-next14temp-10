import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import Container from "@/components/common/Container";

export default function BlogBanner({ myblog, imagePath }) {
  return (
    <Container className="flex flex-col items-center gap-8 py-10">
      <div className="relative w-[400px]  lg:w-[1000px]  h-[600px] lg:h-screen">
        <Image
          src={`${imagePath}/${myblog?.file_name}`}
          alt={
            myblog?.value?.imageAltText ||
            myblog?.value?.tagline ||
            "No Banner Found"
          }
          title={myblog?.value?.imageTitle || myblog?.value.title}
          priority={true}
          fill={true}
          loading="eager"
          className="object-cover"
        />
      </div>
      
      <div className="flex flex-col items-center gap-8 text-center lg:w-[1000px]">
        <Badge>{myblog?.value?.article_category}</Badge>
        <h1
          style={{ fontSize: myblog?.value?.titleFontSize || 48 }}
          className="font-bold capitalize max-w-screen-md"
        >
          {myblog?.value?.title}
        </h1>
        <p
          style={{
            fontSize: myblog?.value?.taglineFontSize || 18,
          }}
        >
          {myblog?.value?.tagline}
        </p>
        <div className="flex items-center justify-center gap-4">
          <p>{myblog?.value?.author}</p> - <p>{myblog?.value?.published_at}</p>
        </div>
      </div>
    </Container>
  );
}
