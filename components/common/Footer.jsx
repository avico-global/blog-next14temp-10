import React, { useMemo } from "react";
import Container from "../common/Container";
import Link from "next/link";
import Logo from "./Logo";
import { sanitizeUrl } from "@/lib/myFun";
import MarkdownIt from "markdown-it";
import { Facebook, Instagram, Twitter } from "lucide-react";

const md = new MarkdownIt();

// Footer Links Component
const FooterLinks = () => {
  const quickLinks = [
    { title: "Home", href: "/" },
    { title: "About Us", href: "/about" },
    { title: "Contact Us", href: "/contact" },
    { title: "Privacy Policy", href: "/privacy-policy" },
    { title: "Terms & Conditions", href: "/terms-and-conditions" },
  ];

  return (
    <div className="flex flex-col gap-3">
      {quickLinks.map((link, index) => (
        <Link
          key={index}
          title={`Navigate to ${link.title}`}
          href={link.href}
          className="text-zinc-400 hover:text-white transition-colors duration-300 hover:translate-x-2 transform flex items-center gap-2"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-100 to-pink-100"></span>
          {link.title}
        </Link>
      ))}
    </div>
  );
};

// Categories Component
const Categories = ({ categories, imagePath }) => {
  if (!categories || categories.length === 0) return null;

  // Remove duplicates based on category title
  const uniqueCategories = Array.from(
    new Map(categories.map((item) => [item.title, item])).values()
  );

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold text-zinc-200">Categories</h2>
      <div className="grid grid-cols-2 gap-4">
        {uniqueCategories.map((category, index) => (
          <div key={index} className="flex items-center gap-3">
            {category.image && (
              <img
                src={`${imagePath}/${category.image}`}
                alt={category.title || "Category Image"}
                title={category.title}
                className="w-12 h-12 object-cover rounded"
              />
            )}
            <Link
              href={`/${sanitizeUrl(category.title)}`}
              title={`View ${category.title} category` || "Category"}
              className="text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              <span className="text-sm">{category.title}</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Footer({
  categories = [],
  copyright,
  logo,
  imagePath,
  about_me = {},
}) {
  const content = md.render(about_me.value || "");

  return (
    <footer className="relative bg-black text-white">
      {/* Decorative top border */}

      {/* Main content */}
      <Container className="px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Logo and About Section */}
          <div className="md:col-span-5 space-y-8">
            <div className="transform hover:scale-105 transition-transform duration-300">
              <Logo logo={logo} imagePath={imagePath} />
            </div>
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-gray-500 via-gray-100 to-orange-200 rounded-lg blur opacity-25"></div>
              <div className="relative bg-black/90 backdrop-blur-sm rounded-lg p-6 shadow-2xl">
                <div
                  className="text-zinc-300 text-sm leading-relaxed prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{
                    __html:
                      content.length > 200
                        ? `${content.slice(0, 200)}...`
                        : content,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-gray-500 to-pink-100 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
              <div className="relative bg-black/90 backdrop-blur-sm p-6 rounded-lg shadow-2xl h-full">
                <h2 className="text-xl font-bold text-white bg-clip-text  mb-6">
                  Quick Links
                </h2>
                <FooterLinks />
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="md:col-span-4">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-100 to-orange-200 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
              <div className="relative bg-black/90 backdrop-blur-sm p-6 rounded-lg shadow-2xl h-full">
                <Categories imagePath={imagePath} categories={categories} />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
