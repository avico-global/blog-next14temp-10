import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/common/Navbar";
import Header from "@/components/common/Header";

import Footer from "@/components/common/Footer";
import Link from "next/link";
import {
  callBackendApi,
  getDomain,
  getImagePath,
  sanitizeUrl,
} from "@/lib/myFun";
import Head from "next/head";
import MarkdownIt from "markdown-it";
import useBreadcrumbs from "@/lib/useBreadcrumbs";
import GoogleTagManager from "@/lib/GoogleTagManager";
import { Raleway } from "next/font/google";
import JsonLd from "@/components/json/JsonLd";
import BlogBanner from "@/components/Blog/BlogBanner";
import Fullcontainer from "@/components/common/FullContainer";

const myFont = Raleway({
  subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
});

export default function blogs({
  categories,
  blog_list,
  about_me,
  logo,
  imagePath,
  myblog,
  domain,
  favicon,
  blog_type,
  project_id,
  copyright,
}) {
  const router = useRouter();
  const { category, blog } = router.query;

  const markdownIt = new MarkdownIt();
  const content = markdownIt.render(
    myblog?.value?.articleContent?.replaceAll(
      `https://api.sitebuilderz.com/images/project_images/${project_id}/`,
      imagePath
    ) || ""
  );

  const breadcrumbs = useBreadcrumbs();

  useEffect(() => {
    if (
      category.includes("%20") ||
      category.includes(" ") ||
      blog.includes("%20") ||
      blog.includes(" ", "-")
    ) {
      const newCategory = sanitizeUrl(category);
      const newBlog = sanitizeUrl(blog);
      router.replace(`/${newCategory}/${newBlog}`);
    }
  }, [category, router, blog]);

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>{myblog?.value?.meta_title}</title>
        <meta name="description" content={myblog?.value?.meta_description} />
        <link rel="author" href={`https://www.${domain}`} />
        <link
          rel="canonical"
          href={`https://www.${domain}/${category}/${blog}`}
        />
        <meta name="theme-color" content="#008DE5" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <GoogleTagManager />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${favicon}`}
        />
      </Head>
      <div className={myFont.className}>
        <Navbar
          logo={logo}
          categories={categories}
          imagePath={imagePath}
          blog_list={blog_list}
        />
        <div className="mt-10 md:mt-0">
          <Header
            logo={logo}
            categories={categories}
            imagePath={imagePath}
            blog_list={blog_list}
          />
        </div>


        <BlogBanner
          myblog={myblog}
          imagePath={imagePath}
          blog_type={blog_type}
        />
        <Fullcontainer>
          <div className="text-center lg:w-[1000px] mx-auto mb-8">
            <div className="flex text-start justify-start">
              <article className="prose lg:prose-xl max-w-full">
                <div dangerouslySetInnerHTML={{ __html: content }} />
              </article>
            </div>
          </div>
        </Fullcontainer>

        <Footer
          about_me={about_me}
          categories={categories}
          logo={logo}
          imagePath={imagePath}
          copyright={copyright}
        />

        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "BlogPosting",
                mainEntityOfPage: {
                  "@type": "WebPage",
                  "@id": myblog
                    ? `https://${domain}${sanitizeUrl(
                        myblog.article_category
                      )}/${sanitizeUrl(myblog.value.title)}`
                    : "",
                  url: myblog
                    ? `https://${domain}${sanitizeUrl(
                        myblog.article_category
                      )}/${sanitizeUrl(myblog.value.title)}`
                    : "",
                },
                headline: myblog?.value?.title || "Default Title",
                description:
                  myblog?.value?.articleContent || "Default Description",
                datePublished:
                  myblog?.value?.published_at || new Date().toISOString(),
                author: {
                  "@type": "Person",
                  name: myblog?.value?.author || "Unknown Author",
                },
                image: myblog?.file_name
                  ? `${imagePath}/${myblog.file_name}`
                  : `${imagePath}/default-image.jpg`,
                publisher: {
                  "@type": "Organization",
                  name: "Site Manager",
                  logo: {
                    "@type": "ImageObject",
                    url: `${imagePath}/${logo?.file_name}`,
                  },
                },
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: breadcrumbs.map((breadcrumb, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  name: breadcrumb.label,
                  item: `https://${domain}${breadcrumb.url}`,
                })),
              },
            ],
          }}
        />
      </div>
    </>
  );
}

export async function getServerSideProps({ req, query }) {
  const domain = getDomain(req?.headers?.host);
  const { category, blog } = query;

  let layoutPages = await callBackendApi({
    domain,
    type: "layout",
  });

  if (!layoutPages?.data?.[0]?.value) {
    return {
      notFound: true,
    };
  }

  const categories = await callBackendApi({ domain, type: "categories" });
  const blog_list = await callBackendApi({ domain, type: "blog_list" });

  if (!blog_list?.data?.[0]?.value || !categories?.data?.[0]?.value) {
    return {
      notFound: true,
    };
  }

  const isValidBlog = blog_list.data[0].value.find(
    (item) => sanitizeUrl(item.title) === sanitizeUrl(blog)
  );

  const categoryExists = categories.data[0].value.some(
    (cat) => sanitizeUrl(cat?.title) === sanitizeUrl(category)
  );

  if (!categoryExists || !isValidBlog) {
    return {
      notFound: true,
    };
  }

  const myblog = await callBackendApi({ domain, type: isValidBlog?.key });
  const logo = await callBackendApi({ domain, type: "logo" });
  const favicon = await callBackendApi({ domain, type: "favicon" });
  const about_me = await callBackendApi({ domain, type: "about_me" });

  const blog_type = await callBackendApi({ domain, type: "blog_type" });

  let page = null;
  if (Array.isArray(layoutPages?.data) && layoutPages.data.length > 0) {
    const valueData = layoutPages.data[0].value;
    page = valueData?.find((page) => page.page === "blog page");
  }

  if (!page?.enable) {
    return {
      notFound: true,
    };
  }

  let project_id = logo?.data[0]?.project_id || null;
  let imagePath = await getImagePath(project_id, domain);

  return {
    props: {
      domain,
      imagePath,
      logo: logo?.data[0] || null,
      myblog: myblog?.data[0] || {},
      blog_list: blog_list?.data[0]?.value || null,
      categories: categories?.data[0]?.value || null,
      about_me: about_me?.data[0] || null,
      favicon: favicon?.data[0]?.file_name || null,
      blog_type: blog_type?.data[0]?.value || {},
      project_id,
      page,
    },
  };
}
