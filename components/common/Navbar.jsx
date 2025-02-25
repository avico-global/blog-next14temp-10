import Image from "next/image";
import Link from "next/link";
import React, { useRef, useEffect, useState } from "react";
import Fullcontainer from "./FullContainer";
import Container from "./Container";
import { cn } from "@/lib/utils";
import { sanitizeUrl } from "@/lib/myFun";
import {
  Facebook,
  Instagram,
  Twitter,
  Search,
  ShoppingCart,
  Menu,
  X,
} from "lucide-react";
import Logo from "./Logo";

export default function Navbar({
  categories,
  imagePath,
  logo,
  logo_black,
  blog_list,
}) {
  const li =
    " py-2 bg-black text-white hover:bg-white hover:text-black px-3 rounded-xl transition-all duration-300";
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      // Only handle scroll events if window width is >= 1024px (lg breakpoint)
      if (window.innerWidth >= 1024) {
        const currentScrollY = window.scrollY;
        setVisible(currentScrollY > 100 && lastScrollY > currentScrollY);
        setLastScrollY(currentScrollY);
      } else {
        // Keep navbar hidden on smaller screens
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    // Handle clicks anywhere in the document
    const handleClickOutside = (event) => {
      // Close search if click is outside search container AND
      // the click isn't on the search toggle button
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    // Add event listener if search is open
    if (isSearchOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    // Cleanup function
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isSearchOpen]); // Re-run effect when search state changes

  const closeSidebar = () => {
    setSidebar(false);
  };

  const handleSearchClick = (e) => {
    e.stopPropagation(); // Prevent click from immediately closing search
    setIsSearchOpen(true);
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
    <Fullcontainer
      className={`fixed top-0 left-0 w-full bg-black text-white shadow-lg transition-transform duration-300 z-40 ${
        visible ? "md:translate-y-0" : "md:-translate-y-full"
      }`}
    >
      <Container className="lg:w-[900px] py-4 md:py-0 px-5">
        <div className="  flex justify-between items-center  mx-auto text-white px-5">
          <ul className="flex justify-between items-center gap-4 text-sm font-semibold">
            <Link href="/" title="Facebook">
              <Facebook size={20} />
            </Link>
            <Link href="/" title="Instagram">
              <Instagram size={20} />
            </Link>
            <Link href="/" title="Twitter">
              <Twitter size={20} />
            </Link>
          </ul>

          <ul className=" hidden md:flex justify-between items-center text-md font-semibold">
            <Link href="/" className={li} title="Home">
              Home
            </Link>
            <div
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
              className="py-4 "
            >
              <div className=" group py-2 bg-black text-white hover:bg-white hover:text-black px-3 rounded-xl transition-all duration-500">
                <div className="flex items-center gap-1 cursor-pointer ">
                  Categories
                </div>
                <div
                  className={`absolute top-16 left-[10%] bg-black w-[80%] text-white h-[300px]  rounded-lg z-10 shadow-lg transition-all duration-300 ${
                    dropdownOpen
                      ? "opacity-100 visible translate-y-0"
                      : "opacity-0 invisible translate-y-[-10px]"
                  }`}
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <Categories categories={categories} imagePath={imagePath} />
                </div>
              </div>
            </div>

            <Link href="/about" className={li} title="About me">
              About me
            </Link>
            <Link href="/contact" className={li} title="Contact">
              Contact
            </Link>

            <div className="flex items-center justify-end gap-3 text-white relative">
              <div className="relative">
                <button onClick={handleSearchClick} className="cursor-pointer">
                  <Search className="w-7" />
                </button>

                {isSearchOpen && (
                  <SearchOverlay
                    isOpen={isSearchOpen}
                    onClose={() => setIsSearchOpen(false)}
                    searchQuery={searchQuery}
                    onSearchChange={handleSearchChange}
                    filteredBlogs={filteredBlogs}
                    searchRef={searchRef}
                    imagePath={imagePath}
                  />
                )}
              </div>
            </div>
          </ul>

          <div className=" flex lg:hidden justify-between items-center gap-4 text-sm font-semibold">
            <button onClick={() => setSidebar(!sidebar)}>
              <Menu size={20} />
            </button>
          </div>
          <div className="hidden lg:flex  ">
            <Logo logo={logo} logo_black={logo_black} imagePath={imagePath} />
          </div>
        </div>

        {/* Add Mobile Menu */}
        <div
          className={`sidebar fixed top-0 right-0 h-screen flex flex-col justify-between bg-black shadow-lg text-white z-50 overflow-x-hidden p-10 lg:p-6 ${
            sidebar ? "open" : "-mr-96"
          }`}
        >
          <div>
            <div className="flex items-center justify-between">
              <Logo logo={logo} logo_black={logo_black} imagePath={imagePath} />
              <X
                className="w-8 text-white cursor-pointer"
                onClick={closeSidebar}
              />
            </div>

            <div className="relative w-full mt-8" ref={searchRef}>
              <div className="flex lg:hidden items-center gap-3 font-normal w-full">
                <Search className="w-7" />
                <input
                  className="bg-transparent border-b border-white/50 pb-1 outline-none flex-1"
                  placeholder="Search..."
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
              {searchQuery && (
                <div className="absolute left-0 top-full mt-2 bg-black text-white shadow-2xl rounded-md z-10 w-full max-h-60 overflow-y-auto">
                  {filteredBlogs?.length > 0 ? (
                    filteredBlogs.map((item, index) => (
                      <Link
                        key={index}
                        title={item.title}
                        href={`/${sanitizeUrl(
                          item.article_category
                        )}/${sanitizeUrl(item.title)}`}
                        onClick={closeSidebar}
                      >
                        <div className="p-2 hover:bg-gray-700 border-b border-gray-700">
                          {item.title}
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="p-2 text-gray-400">No results found</div>
                  )}
                </div>
              )}
            </div>

            <div className="flex flex-col pt-10">
              {categories?.map((item, index) => (
                <Link
                  key={index}
                  title={item?.title}
                  href={`/${sanitizeUrl(item?.title)}`}
                  className={cn(
                    "font-semibold text-white capitalize border-transparent transition-all py-2 px-2 border-b border-gray-600"
                  )}
                  onClick={closeSidebar}
                >
                  {item.title}
                </Link>
              ))}
            </div>
            <div className="flex flex-col  ">
              <Link
                title="About"
                href="/about"
                className=" font-semibold capitalize  text-white py-2 px-2 border-b border-gray-600"
              >
                About Us
              </Link>
              <Link
                title="Contact Us"
                href="/contact"
                className="font-semibold capitalize text-white py-2 px-2 border-b border-gray-600"
              >
                Contact Us
              </Link>
            </div>
          </div>
          <div>
            <p className="text-normal">© 2024 Katen. All Rights Reserved.</p>
          </div>
        </div>
      </Container>
    </Fullcontainer>
  );
}

const Categories = ({ categories, imagePath }) => {
  return (
    <div className="w-full mt-8 bg-black rounded-lg p-6">
      <div className="grid grid-cols-3 gap-5">
        {categories?.map((category, index) => (
          <Link
            title={`View ${category.title} category` || "Category"}
            key={index}
            href={`/${encodeURI(category.title.toLowerCase())}`}
            className="flex flex-col items-center transition-all duration-500 hover:opacity-80"
          >
            <div className="rounded-lg aspect-[4/3] flex items-center justify-center overflow-hidden">
              <Image
                src={`${imagePath}/${category.image}`}
                title={category.title}
                alt={category.title}
                height={170}
                width={230}
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
        {/* Search Input with Background */}
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

        {/* Search Results */}
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
