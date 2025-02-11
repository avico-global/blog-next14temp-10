import React from "react";
import Container from "./Container";
import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

export default function Footer1() {
  const quicklinks = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "About",
      link: "/about",
    },
    {
      name: "Contact",
      link: "/contact",
    },
    {
      name: "Categories",
      link: "/",
    },
  ];

  const categories = [
    {
      name: "Travel",
      link: "/travel",
    },
    {
      name: "Lifestyle",
      link: "/lifestyle",
    },
    {
      name: "Fashion",
      link: "/fashion",
    },
  ];

  return (
    <div className="bg-black text-white">
      <Container className="px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About Section */}
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Lune d'Argent</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              A personal blog sharing daily inspirations, lifestyle tips, and fashion trends.
            </p>
            <div className="flex gap-4 pt-4">
              <Link href="/" className="hover:text-gray-400 transition-colors">
                <Facebook size={20} />
              </Link>
              <Link href="/" className="hover:text-gray-400 transition-colors">
                <Instagram size={20} />
              </Link>
              <Link href="/" className="hover:text-gray-400 transition-colors">
                <Twitter size={20} />
              </Link>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold">Quick Links</h2>
            <div className="flex flex-col gap-3">
              {quicklinks.map((link, index) => (
                <Link 
                  key={index} 
                  href={link.link}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Categories Section */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold">Categories</h2>
            <div className="flex flex-col gap-3">
              {categories.map((category, index) => (
                <Link 
                  key={index} 
                  href={category.link}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold">Contact Us</h2>
            <div className="flex flex-col gap-3 text-gray-400">
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span>info@lunedargent.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span>+1 234 567 890</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>123 Street, City, Country</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
          <p>© 2024 Lune d'Argent. All rights reserved.</p>
        </div>
      </Container>
    </div>
  );
}
