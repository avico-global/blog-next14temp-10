import {
  Facebook,
  Instagram,
  Twitter,
  Search,
  ShoppingCart,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Fullcontainer from "./FullContainer";
import Container from "./Container";
import { useState, useEffect, useRef } from "react";
import Logo from "./Logo";
import { sanitizeUrl } from "@/lib/myFun";

export default function HeroNavbar({
  logo,
  nav_type,
  imagePath,
  blog_list,
  categories,
  category,
  className,
}) {
  const li =
    " py-2 bg-transparent  text-white hover:bg-white hover:text-black px-3 rounded-xl transition-all duration-300";
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [openSearch, setOpenSearch] = useState(false);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight - 100) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Add click outside handler for search
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setOpenSearch(false);
        setSearchQuery("");
        setFilteredBlogs([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchToggle = () => {
    setOpenSearch(!openSearch);
    setSearchQuery("");
    setFilteredBlogs([]);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setFilteredBlogs([]);
      return;
    }

    const filtered =
      blog_list?.filter((blog) =>
        blog.title.toLowerCase().includes(query.toLowerCase())
      ) || [];
    setFilteredBlogs(filtered);
  };

  return (
    <Fullcontainer className={`relative hidden md:block ${className || ""}`}>
      <Container className="border-y-[1px] border-gray-100 border-opacity-20">
        <div className="flex justify-between items-center mx-auto text-white px-5">
          <Logo logo={logo} imagePath={imagePath} />

          <ul className="hidden md:flex justify-between items-center text-md font-semibold">
            <Link href="/" className={li + " text-red-900"} title="Home">
              Home
            </Link>
            <div
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
              className="py-4"
            >
              <div className="py-2 text-white hover:bg-white hover:text-black px-3 rounded-xl transition-all duration-500">
                <div className="flex items-center gap-1 cursor-pointer">
                  Categories
                </div>
              </div>
            </div>
            <Link href="/about" className={li} title="About me">
              About me
            </Link>
            <Link href="/contact" className={li} title="Contact">
              Contact
            </Link>
          </ul>
          <div className="flex items-center justify-end gap-3 text-white relative">
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenSearch(true);
                }}
                className="cursor-pointer"
              >
                <Search className="w-7" />
              </button>

              {openSearch && (
                <SearchOverlay
                  isOpen={openSearch}
                  onClose={() => setOpenSearch(false)}
                  searchQuery={searchQuery}
                  onSearchChange={handleSearchChange}
                  filteredBlogs={filteredBlogs}
                  searchRef={searchRef}
                  imagePath={imagePath}
                />
              )}
            </div>
          </div>
        </div>
      </Container>

      {/* Dropdown Menu */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 w-[80%] bg-black text-white rounded-lg z-10 shadow-lg transition-all duration-300 ${
          dropdownOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible translate-y-[-10px]"
        }`}
        onMouseEnter={() => setDropdownOpen(true)}
        onMouseLeave={() => setDropdownOpen(false)}
      >
        <Categories categories={categories} imagePath={imagePath} />
      </div>
    </Fullcontainer>
  );
}

const Categories = ({ categories, imagePath }) => {
  return (
    <div className="w-full mt-8 bg-black rounded-lg p-6">
      <div className="grid grid-cols-3 gap-5 items-center">
        {categories?.map((category, index) => (
          <Link
            key={index}
            href={`/${encodeURI(category.title.toLowerCase())}`}
            title={`View ${category.title} category`}
            className="flex flex-col  items-center transition-all duration-500 hover:opacity-80"
          >
            <div className="rounded-lg aspect-[4/3] w-full h-40 flex items-center justify-center overflow-hidden">
              <Image
                src={`${imagePath}/${category.image}`}
                alt={category.title}
                title={category.title}
                height={160}
                width={213}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="mt-2 gap-1 flex flex-col text-center text-white">
              <p className="font-semibold text-xs capitalize">
                {category.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const SearchOverlay = ({
  isOpen,
  onClose,
  searchQuery,
  onSearchChange,
  filteredBlogs,
  searchRef,
  imagePath,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 transition-all duration-300">
      <div ref={searchRef} className="w-full max-w-3xl mx-auto mt-20 px-4">
        <div className="relative bg-black rounded-lg shadow-xl">
          <input
            type="text"
            value={searchQuery}
            onChange={onSearchChange}
            className="w-full bg-transparent text-white border-b-2 border-white/20 py-4 px-6 text-xl placeholder:text-white/50 focus:outline-none focus:border-white/40 transition-all rounded-lg"
            placeholder="Search articles..."
            autoFocus
          />
          <button
            onClick={onClose}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {searchQuery && (
          <div className="mt-6 bg-black rounded-lg backdrop-blur-md max-h-[60vh] overflow-y-auto">
            {filteredBlogs?.length > 0 ? (
              <div className="divide-y divide-white/10">
                {filteredBlogs.map((item, index) => (
                  <Link
                    key={index}
                    href={`/${sanitizeUrl(item.article_category)}/${sanitizeUrl(
                      item.title
                    )}`}
                    className="block p-4 hover:bg-white/5 transition-colors group"
                    onClick={onClose}
                  >
                    <div className="flex items-center gap-4">
                      {item.image && (
                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={`${imagePath}/${item.image}`}
                            alt={item.title}
                            width={64}
                            height={64}
                            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div>
                        <h3 className="text-white font-medium group-hover:text-secondary transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-white/60 text-sm mt-1">
                          {item.article_category}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-white/60 p-4 text-center">
                No articles found matching your search.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
