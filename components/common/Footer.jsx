import React from "react";
import Container from "../common/Container";
import Link from "next/link";
import Logo from "./Logo";
import { sanitizeUrl } from "@/lib/myFun";
import MarkdownIt from "markdown-it";

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
    <div className="space-y-2">
      {quickLinks.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          className="block text-gray-400 hover:text-white transition-colors"
        >
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
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">Categories</h3>
      <div className="space-y-2">
        {uniqueCategories.map((category, index) => (
          <Link
            key={index}
            href={`/${sanitizeUrl(category.title)}`}
            className="block text-gray-400 hover:text-white transition-colors"
          >
            {category.title}
          </Link>
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
    <footer className="bg-gray-900 text-white border-t border-gray-800">
      <Container className="px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr] gap-8">
          <div className="space-y-4 flex flex-col items-start">
            <div className="">
              <Logo logo={logo} imagePath={imagePath} />
            </div>
            {content && (
              <div
                className="text-gray-400 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html:
                    content.length > 150
                      ? `${content.slice(0, 150)}...`
                      : content,
                }}
              />
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>
            <FooterLinks />
          </div>

          {/* Categories */}
          <div>
            <Categories imagePath={imagePath} categories={categories} />
          </div>
        </div>

        {/* Copyright */}
        {copyright && (
          <div className="border-t border-gray-800 mt-8 pt-6">
            <p className="text-center text-gray-400 text-sm">{copyright}</p>
          </div>
        )}
      </Container>
    </footer>
  );
}
