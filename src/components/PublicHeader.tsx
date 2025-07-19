"use client";
import Link from "next/link";
import Image from "next/image";
import LanguageSwitcher from "./LanguageSwitcher";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const menuItems = [
  { label: "Home", href: "/" },
  { label: "Schemes", href: "/schemes" },
  { label: "Departments", href: "/departments" },
  { label: "Announcements", href: "/announcements" },
  { label: "About Wai", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const PublicHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const pathname = usePathname();

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [menuOpen]);

  return (
    <header className="bg-white w-full z-50 relative">
      <div className="">
        {/* Government Strip */}
        <div className="bg-govt-saffron h-2 w-full" />

        {/* Main Header */}
        <div className="flex md:flex-row items-center justify-between py-4 px-4 md:px-10 shadow-lg">
          <div className="flex items-center space-x-4">
            {/* Ashoka Emblem */}
            <div className="size-12 md:size-16 relative">
              <Image
                src="/assets/National-Emblem.png"
                alt="Ashoka Emblem"
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Title */}
            <div>
              <h1 className="text-lg md:text-2xl font-bold text-govt-blue">
                Panchayat Samiti Wai
              </h1>
              <p className="text-sm text-gray-600">
                Satara District, Maharashtra
              </p>
            </div>
          </div>

          <div className="flex items-center">
            {/*Desktop Navigation */}
            <nav className=" relative" aria-label="Main navigation">
              {/* Desktop menu */}
              <ul className="hidden md:flex flex-wrap items-center justify-center gap-4 md:gap-6">
                {menuItems.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className={`px-2 py-1 transition-colors ${
                        pathname === item.href
                          ? "font-bold border-b-2 border-govt-blue text-govt-blue"
                          : "text-black/80 hover:text-govt-blue"
                      }`}
                      aria-current={pathname === item.href ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Hamburger for mobile */}
            <button
              className="md:hidden ml-4 p-2 rounded focus:outline-none focus:ring-2 focus:ring-govt-blue z-50"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <span className="sr-only">Toggle navigation</span>
              <svg
                className="w-7 h-7 text-govt-blue"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 8h16M4 16h16"
                  />
                )}
              </svg>
            </button>

            {/* Language Switcher */}
            <div className="hidden md:block ml-10">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu: slide down below header, cover rest of screen, animate in/out, staggered items */}
      <div
        ref={menuRef}
        className={`md:hidden fixed left-0 right-0 top-[calc(100px)] z-40 transition-all duration-500 ease-in-out bg-govt-blue ${
          menuOpen
            ? "h-[calc(100vh-100px)] opacity-100 pointer-events-auto visible"
            : "h-0 opacity-0 pointer-events-none invisible"
        }`}
        style={{
          transitionProperty: "height, opacity",
        }}
        aria-hidden={!menuOpen}
      >
        <ul className="flex flex-col items-center justify-center h-full gap-6 pt-8">
          {menuItems.map((item, idx) => (
            <li
              key={item.label}
              style={{
                transition: `opacity 0.4s ${
                  0.1 + idx * 0.12
                }s, transform 0.4s ${0.1 + idx * 0.12}s`,
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(40px)",
              }}
              className="w-full flex justify-center"
            >
              <Link
                href={item.href}
                className={`text-2xl font-bold px-6 py-3 rounded  transition-colors duration-200 block text-center ${
                  pathname === item.href
                    ? "bg-govt-saffron text-white"
                    : "hover:bg-govt-saffron text-white hover:text-white"
                }`}
                onClick={() => setMenuOpen(false)}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li
            style={{
              transition: `opacity 0.4s ${
                0.1 + menuItems.length * 0.12
              }s, transform 0.4s ${0.1 + menuItems.length * 0.12}s`,
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "translateY(0)" : "translateY(40px)",
            }}
            className="w-full flex justify-center"
          >
            <div className="mt-4">
              <LanguageSwitcher />
            </div>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default PublicHeader;
