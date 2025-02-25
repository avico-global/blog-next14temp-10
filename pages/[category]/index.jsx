import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import dayjs from "dayjs";
import JsonLd from "@/json/JsonLd";

import Navbar from "@/components/common/Navbar";
import Header from "@/components/common/Header";
import RightBar from "@/components/categories/RightBar";
import Footer from "@/components/common/Footer";
import {
  callBackendApi,
  getDomain,
  getImagePath,
  sanitizeUrl,
} from "@/lib/myFun";
import { cn } from "@/lib/utils";
import Head from "next/head";
import GoogleTagManager from "@/lib/GoogleTagManager";

export default function Category({
  banner,
  logo,
  blog_list,
  imagePath,
  meta,
  domain,
  categories,
  about_me,
  favicon,
  layout,
  copyright,
}) {
  const router = useRouter();
  const { category } = router.query;

  const filteredBlogList = blog_list.filter((item) => {
    return sanitizeUrl(item.article_category) === sanitizeUrl(category);
  });

  useEffect(() => {
    const currentPath = router.asPath;

    if (category && (category.includes("%20") || category.includes(" "))) {
      const newCategory = category.replace(/%20/g, "-").replace(/ /g, "-");
      router.replace(`/${newCategory}`);
    }

    if (currentPath.includes("contact-us")) {
      router.replace("/contact");
    }
    if (currentPath.includes("about-us")) {
      router.replace("/about");
    }
  }, [category, router]);

  const page = layout?.find((page) => page.page === "category");

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>{meta?.title}</title>
        <meta name="description" content={meta?.description} />
        <link rel="author" href={`https://www.${domain}`} />
        <link rel="publisher" href={`https://www.${domain}`} />
        <link rel="canonical" href={`https://www.${domain}`} />
        <meta name="theme-color" content="#008DE5" />
        <link rel="manifest" href="/manifest.json" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <GoogleTagManager />
        <meta
          name="google-site-verification"
          content="zbriSQArMtpCR3s5simGqO5aZTDqEZZi9qwinSrsRPk"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${favicon}`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${favicon}`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${favicon}`}
        />
      </Head>

      <Navbar
        logo={logo}
        imagePath={imagePath}
        blog_list={blog_list}
        categories={categories}
      />
      <div className=" md:mt-0">
        <Header
          logo={logo}
          categories={categories}
          imagePath={imagePath}
          blog_list={blog_list}
        />
      </div>

      <div className="mb-12  mt-24 lg:mt-26 px-4 mx-auto max-w-[1500px] ">
        <p className="text-secondary font-bold text-center">You are viewing</p>
        <h1 className="text-5xl text-black font-bold capitalize py-1 mb-7 min-w-full text-center">
          {category?.replaceAll("-", " ")}
        </h1>

        <div className="flex gap-6 mb-10 justify-center">
          {categories?.map((item, index) => (
            <Link
              key={index}
              title={item?.title || "Category Link"}
              href={`/${sanitizeUrl(item.title)}`}
              className={cn(
                "uppercase text-lg font-bold text-black hover:border-b transition-all",
                category === item.title && "text-secondary"
              )}
            >
              {item.title}
            </Link>
          ))}
        </div>

        <div className="grid lg:grid-cols-rightBar  gap-12 w-full border-t ">
          <div>
            {filteredBlogList?.length === 0 && (
              <div className="flex items-center justify-center border px-10 py-40 text-lg bg-gray-200">
                No articles found related to {category}
              </div>
            )}

            {filteredBlogList.map((item, index) => (
              <div key={index} className=" my-10 ">
                <Link
                  title={item?.title || "Article Link"}
                  href={`/${sanitizeUrl(item.article_category)}/${sanitizeUrl(
                    item?.title
                  )}`}
                >
                  <p className="font-bold text-5xl text-center my-4 text-secondary transition-colors">
                    {item.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1  mb-5 justify-center">
                    <p className="text-sm text-gray-600 font-semibold">
                      <span className="text-gray-700 text-sm">By</span>:{" "}
                      {item.author}
                    </p>
                    <span className="text-gray-500"> . </span>
                    <p className="text-sm text-gray-700 font-semibold">
                      {dayjs(item?.published_at)?.format("MMM D, YYYY")}
                    </p>
                  </div>
                  <div className="overflow-hidden relative min-h-40 rounded lg:min-h-lvh w-full bg-black flex-1">
                    <Image
                      title={item?.title || "Blog Image"}
                      src={
                        item.image
                          ? `${imagePath}/${item.image}`
                          : "/no-image.png"
                      }
                      fill={true}
                      loading="lazy"
                      alt={item?.title || "Blog Image"}
                      className="min-w-full h-full  object-cover absolute top-0 hover:scale-125 transition-all"
                    />
                  </div>
                </Link>
                <Link
                  title={`View ${category} category`}
                  className="flex justify-start"
                  href={`/${sanitizeUrl(category)}`}
                >
                  <Badge className="mt-4 inline-block text-white">
                    {category}
                  </Badge>
                </Link>

                <p className="text-gray-600 mt-2 mb-12">{item.tagline}</p>
                <Link
                  href={`/${sanitizeUrl(category)}/${sanitizeUrl(item?.title)}`}
                  className="font-bold text-secondary border-2 border-secondary rounded-full p-6 hover:bg-secondary hover:text-black/60 transition-colors"
                >
                  Continue Reading
                </Link>
              </div>
            ))}
          </div>
          <div>
            <RightBar
              about_me={about_me}
              blog_list={blog_list}
              imagePath={imagePath}
            />
          </div>
        </div>
      </div>

      <Footer
        about_me={about_me}
        logo={logo}
        footer_text=""
        categories={categories}
        imagePath={imagePath}
        copyright={copyright}
      />

      <JsonLd
        data={{
          "@context": "https://www.schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "@id": `https://${domain}/`,
              url: `https://${domain}/`,
              name: meta?.title,
              isPartOf: {
                "@id": `https://${domain}`,
              },
              description: meta?.description,
              inLanguage: "en-US",
              primaryImageOfPage: {
                "@type": "ImageObject",
                url: `${imagePath}/${banner?.file_name}`,
                width: 1920,
                height: 1080,
              },
            },
            {
              "@type": "Organization",
              "@id": `https://${domain}`,
              name: domain,
              url: `https://${domain}`,
              logo: {
                "@type": "ImageObject",
                url: `${imagePath}/${logo.file_name}`,
                width: logo.width,
                height: logo.height,
              },
              sameAs: [
                "https://www.facebook.com",
                "https://www.twitter.com",
                "https://instagram.com",
              ],
            },
            {
              "@type": "ItemList",
              url: `https://${domain}`,
              name: "blog",
              itemListElement: blog_list?.map((blog, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: {
                  "@type": "Article",
                  url: `https://${domain}/${sanitizeUrl(
                    blog?.article_category
                  )}/${sanitizeUrl(blog?.title)}`,
                  name: blog?.title,
                },
              })),
            },
          ],
        }}
      />
    </>
  );
}

export async function getServerSideProps({ req, query }) {
  const domain = getDomain(req?.headers?.host);
  const { category } = query;

  const logo = await callBackendApi({
    domain,
    query,
    type: "logo",
  });

  const favicon = await callBackendApi({ domain, query, type: "favicon" });
  const banner = await callBackendApi({ domain, query, type: "banner" });

  const copyright = await callBackendApi({
    domain,
    query,
    type: "copyright",
  });
  const blog_list = await callBackendApi({ domain, query, type: "blog_list" });
  const categories = await callBackendApi({
    domain,
    query,
    type: "categories",
  });
  const meta = await callBackendApi({ domain, query, type: "meta_category" });
  const about_me = await callBackendApi({ domain, query, type: "about_me" });
  const layout = await callBackendApi({ domain, type: "layout" });

  let project_id = logo?.data[0]?.project_id || null;
  let imagePath = await getImagePath(project_id, domain);

  const categoryExists = categories?.data[0]?.value?.some(
    (cat) =>
      cat?.title?.toLowerCase() === category?.replaceAll("-", " ").toLowerCase()
  );

  if (!categoryExists) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      domain,
      imagePath,
      meta: meta?.data[0]?.value || null,
      favicon: favicon?.data[0]?.file_name || null,
      logo: logo?.data[0],
      layout: layout?.data[0]?.value || null,
      banner: banner?.data[0] || null,
      blog_list: blog_list?.data[0]?.value || null,
      categories: categories?.data[0]?.value || null,
      copyright: copyright?.data[0]?.value || null,
      domain: domain === "hellospace.us" ? req?.headers?.host : domain,
      about_me: about_me?.data[0] || null,
    },
  };
}
