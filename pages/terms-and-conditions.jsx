import React, { useEffect } from "react";

// Components
import Container from "@/components/common/Container";
import GoogleTagManager from "@/lib/GoogleTagManager";
import MarkdownIt from "markdown-it";
import { callBackendApi, getDomain, getImagePath } from "@/lib/myFun";

import Head from "next/head";
import { Raleway } from "next/font/google";
import JsonLd from "@/components/json/JsonLd";
import { useRouter } from "next/router";
import Fullcontainer from "@/components/common/FullContainer";
import Header from "@/components/common/Header";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const myFont = Raleway({
  subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
});

export default function Terms({
  blog_list,
  imagePath,
  favicon,
  domain,
  logo,
  meta,
  terms,
  categories,
  about_me,
  copyright,
}) {
  const markdownIt = new MarkdownIt();
  const content = markdownIt?.render(terms || "");
  const router = useRouter();
  const currentPath = router.pathname;

  useEffect(() => {
    if (currentPath.includes("%20") || currentPath.includes(" ")) {
      router.replace("/privacy-policy");
    }
  }, [currentPath, router]);

  return (
    <div
      className={`min-h-screen flex flex-col justify-between ${myFont.className}`}
    >
      <Head>
        <meta charSet="UTF-8" />
        <title>{meta?.title}</title>
        <meta name="description" content={meta?.description} />
        <link rel="author" href={`https://${domain}`} />
        <link rel="publisher" href={`https://${domain}`} />
        <link rel="canonical" href={`https://${domain}/terms-and-conditions`} />
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
          title="term & conditions"
          href="/terms-and-conditions"
          className="text-gray-500"
        >
          Terms & Conditions
        </Link>
      </Container>
      <Fullcontainer>
        <Container className=" mx-auto max-w-[1400px] my-6 px-4 ">
          <div
            className="prose max-w-full w-full mb-5"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </Container>
      </Fullcontainer>

      <Footer
        about_me={about_me}
        logo={logo}
        imagePath={imagePath}
        blog_list={blog_list}
        categories={categories}
        copyright={copyright}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "@id": `https://${domain}/terms-and-conditions`,
              url: `https://${domain}/terms-and-conditions`,
              name: meta?.title,
              description: meta?.description,
              inLanguage: "en-US",
              publisher: {
                "@type": "Organization",
                "@id": `https://${domain}`,
              },
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

  const meta = await callBackendApi({ domain, type: "meta_terms" });
  const logo = await callBackendApi({ domain, type: "logo" });
  const favicon = await callBackendApi({ domain, type: "favicon" });
  const blog_list = await callBackendApi({ domain, type: "blog_list" });
  const categories = await callBackendApi({
    domain,
    type: "categories",
  });

  const terms = await callBackendApi({ domain, type: "terms" });
  const layout = await callBackendApi({ domain, type: "layout" });
  const about_me = await callBackendApi({ domain, type: "about_me" });

  let page = null;
  if (Array.isArray(layoutPages?.data) && layoutPages.data.length > 0) {
    const valueData = layoutPages.data[0].value;
    page = valueData?.find((page) => page.page === "terms");
  }

  if (!page?.enable) {
    return {
      notFound: true,
    };
  }

  let project_id = logo?.data[0]?.project_id || null;
  let imagePath = null;
  imagePath = await getImagePath(project_id, domain);

  return {
    props: {
      domain,
      imagePath,
      logo: logo?.data[0] || null,
      about_me: about_me.data[0] || null,
      favicon: favicon?.data[0]?.file_name || null,
      layout: layout?.data[0]?.value || null,
      blog_list: blog_list?.data[0]?.value || [],
      categories: categories?.data[0]?.value || null,
      meta: meta?.data[0]?.value || null,
      terms: terms?.data[0]?.value || "",
      page,
    },
  };
}
