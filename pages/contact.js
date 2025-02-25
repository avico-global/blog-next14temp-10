import React from "react";
import Head from "next/head";


import { callBackendApi, getDomain, getImagePath } from "@/lib/myFun";

// Font
import { Raleway } from "next/font/google";
import GoogleTagManager from "@/lib/GoogleTagManager";
import useBreadcrumbs from "@/lib/useBreadcrumbs";
import JsonLd from "@/components/json/JsonLd";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";

const myFont = Raleway({
  subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
});

export default function Contact({
  categories,
  imagePath,
  favicon,
  logo,
  meta,
  domain,
  blog_list,
  footer_type,
  about_me,
}) {
  const breadcrumbs = useBreadcrumbs();

  return (
    <div className={myFont.className}>
      <Head>
        <meta charSet="UTF-8" />
        <title>{meta?.title}</title>
        <meta name="description" content={meta?.description} />
        <link rel="author" href={`https://www.${domain}`} />
        <link rel="publisher" href={`https://www.${domain}`} />
        <link rel="canonical" href={`https://www.${domain}/contact`} />
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
 {/* Contact Form Section */}
 <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
              <p className="text-lg text-gray-600">We&apos;d love to hear from you. Please fill out this form.</p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <form className="space-y-6">
                {/* Name Fields in Flex */}
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary1 focus:ring-2 focus:ring-primary1/20 transition-all duration-200 bg-white text-gray-900 placeholder-gray-400"
                        placeholder="John"
                        required
                      />
                    </div>
                  </div>

                  <div className="relative flex-1">
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary1 focus:ring-2 focus:ring-primary1/20 transition-all duration-200 bg-white text-gray-900 placeholder-gray-400"
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Email and Phone in Flex */}
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary1 focus:ring-2 focus:ring-primary1/20 transition-all duration-200 bg-white text-gray-900 placeholder-gray-400"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="relative flex-1">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary1 focus:ring-2 focus:ring-primary1/20 transition-all duration-200 bg-white text-gray-900 placeholder-gray-400"
                        placeholder="+1 (555) 000-0000"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary1 focus:ring-2 focus:ring-primary1/20 transition-all duration-200 bg-white text-gray-900 placeholder-gray-400 resize-none"
                    placeholder="Write your message here..."
                    required
                  />
                </div>

                <div className="mt-8">
                  <button
                    type="submit"
                    className="w-full bg-gray-900 text-white px-6 py-4 rounded-lg font-semibold text-base focus:outline-none focus:ring-4 focus:ring-gray-500/20 transform transition-all duration-200 hover:bg-gray-800 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
     



     
        <Footer
        about_me={about_me}
        categories={categories}
        logo={logo}
        imagePath={imagePath}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "@id": `https://${domain}/contact`,
              url: `https://${domain}/contact`,
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
  const blog_list = await callBackendApi({ domain, type: "blog_list" });
 
  const categories = await callBackendApi({
    domain,
    type: "categories",
  });
  const meta = await callBackendApi({ domain, type: "meta_contact" });
  const layout = await callBackendApi({ domain, type: "layout" });
  const nav_type = await callBackendApi({ domain, type: "nav_type" });
  const footer_type = await callBackendApi({ domain, type: "footer_type" });
  const about_me = await callBackendApi({ domain, type: "about_me" });

  let page = null;
  if (Array.isArray(layoutPages?.data) && layoutPages.data.length > 0) {
    const valueData = layoutPages.data[0].value;
    page = valueData?.find((page) => page.page === "contact");
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
      logo: logo?.data[0],
      about_me: about_me.data[0] || null,
      blog_list: blog_list.data[0].value,
      layout: layout?.data[0]?.value || null,
      categories: categories?.data[0]?.value || null,
      meta: meta?.data[0]?.value || null,
      favicon: favicon?.data[0]?.file_name || null,
      nav_type: nav_type?.data[0]?.value || {},
      footer_type: footer_type?.data[0]?.value || {},
      page,
    },
  };
}
