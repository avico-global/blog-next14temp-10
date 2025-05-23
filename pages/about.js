import React, { useMemo } from "react";
import Head from "next/head";
import MarkdownIt from "markdown-it";
import { callBackendApi, getDomain, getImagePath } from "@/lib/myFun";
import Image from "next/image";

import GoogleTagManager from "@/lib/GoogleTagManager";
import JsonLd from "@/components/json/JsonLd";

// Font
import { Raleway } from "next/font/google";
import useBreadcrumbs from "@/lib/useBreadcrumbs";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import Fullcontainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
const myFont = Raleway({
  subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
});

export default function About({
  contact_details,
  categories,
  imagePath,
  about_me,
  logo,
  meta,
  page,
  domain,
  favicon,
  nav_type,
  blog_list,
  footer_type,
}) {
  const markdownIt = new MarkdownIt();
  const content = markdownIt?.render(about_me?.value);

  const reversedLastFiveBlogs = useMemo(() => {
    const lastFiveBlogs = blog_list?.slice(-5);
    return lastFiveBlogs ? [...lastFiveBlogs].reverse() : [];
  }, [blog_list]);

  const breadcrumbs = useBreadcrumbs();

  return (
    <div className={myFont.className}>
      <Head>
        <meta charSet="UTF-8" />
        <title>{meta?.title}</title>
        <meta name="description" content={meta?.description} />
        <link rel="author" href={`https://${domain}`} />
        <link rel="publisher" href={`https://${domain}`} />
        <link rel="canonical" href={`https://${domain}/about`} />
        {/* <meta name="robots" content="noindex" /> */}
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

      <Container className="mt-10 flex gap-1 mx-auto max-w-[1400px]  py-4 md:py-0 px-4 ">
        <Link href="/">Home</Link>
        <ChevronRight size={20} />
        <Link
          title="About"
          href="/about"
          className="text-gray-500"
        >
          About
        </Link>
      </Container>

      <Fullcontainer className="bg-gradient-to-b  min-h-screen">
        <Container className="py-24">
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text  text-black mb-6">
              About Our Journey
            </h1>
            <div className="w-24 h-1 mx-auto bg-gradient-to-r from-gray-400 to-blue-100 rounded-full" />
          </div>

          <div className="grid lg:grid-cols-2 gap-16 p-4">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl blur-2xl group-hover:blur-3xl transition-all duration-500" />

              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                <Image
                  src={`${imagePath}/${about_me.file_name}`}
                  title="About Us"
                  alt="About Us Banner"
                  priority={true}
                  fill={true}
                  loading="eager"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10">
                    <p className="text-white/90 text-sm font-medium">
                      "Discover our story and vision"
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

              <div className="relative">
                <div
                  className="prose prose-lg  max-w-full"
                  dangerouslySetInnerHTML={{ __html: content }}
                />

                <div className="mt-12 pt-8 border-t border-white/10">
                  <div className="flex items-center gap-4">
                    <div className="h-1 w-12 bg-gradient-to-r from-gray-500 to-blue-200 rounded-full" />
                    <p className="text-gray-400 text-sm font-medium">
                      Join us on this amazing journey
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Fullcontainer>

      <Footer
        logo={logo}
        about_me={about_me}
        imagePath={imagePath}
        blog_list={blog_list}
        categories={categories}
        footer_type={footer_type}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "@id": `https://${domain}/about`,
              url: `https://${domain}/about`,
              name: meta?.title,
              description: meta?.description,
              inLanguage: "en-US",
              publisher: {
                "@type": "Organization",
                "@id": `https://${domain}`,
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
  );
}

export async function getServerSideProps({ req }) {
  const domain = getDomain(req?.headers?.host);

  let layoutPages = await callBackendApi({
    domain,
    type: "layout",
  });

  const logo = await callBackendApi({ domain, type: "logo" });
  const favicon = await callBackendApi({ domain, type: "favicon" });
  const about_me = await callBackendApi({ domain, type: "about_me" });
  const categories = await callBackendApi({ domain, type: "categories" });
  const blog_list = await callBackendApi({ domain, type: "blog_list" });
  const meta = await callBackendApi({ domain, type: "meta_about" });
  const contact_details = await callBackendApi({
    domain,
    type: "contact_details",
  });
  const copyright = await callBackendApi({ domain, type: "copyright" });
  const nav_type = await callBackendApi({ domain, type: "nav_type" });
  const footer_type = await callBackendApi({ domain, type: "footer_type" });

  let page = null;
  if (Array.isArray(layoutPages?.data) && layoutPages.data.length > 0) {
    const valueData = layoutPages.data[0].value;
    page = valueData?.find((page) => page.page === "about");
  }

  if (!page?.enable) {
    return {
      notFound: true,
    };
  }

  let project_id = logo?.data?.[0]?.project_id || null;
  const imagePath = await getImagePath(project_id, domain);

  return {
    props: {
      domain,
      imagePath,
      meta: meta?.data?.[0]?.value || null,
      favicon: favicon?.data?.[0]?.file_name || null,
      logo: logo?.data?.[0] || null,
      about_me: about_me?.data?.[0] || null,
      blog_list: blog_list?.data?.[0]?.value,
      categories: categories?.data?.[0]?.value || null,
      contact_details: contact_details?.data?.[0]?.value || null,
      copyright: copyright?.data?.[0]?.value || null,
      nav_type: nav_type?.data?.[0]?.value || {},
      footer_type: footer_type?.data?.[0]?.value || {},
      page,
    },
  };
}
