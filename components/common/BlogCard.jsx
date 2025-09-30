import Link from "next/link";
import Image from "next/image";
import Button from "./Button";
import { cn } from "@/lib/utils";

const BlogCard = ({
  href,
  image,
  title,
  tagline,
  altImage,
  className,
  imageTitle,
  imageHeight,
  published_at,
}) => {
  const encodedHref = href ? encodeURI(href) : "#";

  return (
    <div
      className={cn(
        "flex flex-col items-center text-center h-fit w-full",
        className
      )}
    >
      <Link
        title={imageTitle}
        href={encodedHref}
        className={cn(
          "relative overflow-hidden w-full rounded-lg",
          imageHeight || "aspect-[4/3] sm:aspect-[3/4] lg:aspect-[4/3]"
        )}
      >
        <Image
          src={image}
          width={331}
          height={parseInt(imageHeight, 10) || 420}
          loading="eager"
          alt={altImage}
          priority={true}
          title={imageTitle}
          className="w-full h-full absolute top-0 hover:scale-125 transition-all object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </Link>

      <div className="flex flex-col items-center gap-2 mt-3 px-2 sm:px-0">
        <Link
          className="font-extrabold text-sm sm:text-base lg:text-lg leading-tight hover:underline line-clamp-2"
          title={title}
          href={encodedHref}
        >
          {title}
        </Link>
        <p className="text-xs sm:text-sm font-medium text-gray-700">
          {published_at}
        </p>
      </div>
      <p className="mt-3 text-xs sm:text-sm px-2 sm:px-0">
        <span className="sm:hidden line-clamp-3">{tagline?.slice(0, 100)}</span>
        <span className="hidden sm:block">{tagline}</span>
      </p>
      <Link href={encodedHref} className="mt-3 w-full sm:w-auto px-2 sm:px-0">
        <Button className="rounded-full w-full sm:w-auto text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3">
          Read Article
        </Button>
      </Link>
    </div>
  );
};

export default BlogCard;
