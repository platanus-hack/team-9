"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  BellIcon as Bull,
  MessageSquare,
  Twitter,
  Github,
  Menu,
  X,
} from "lucide-react";
import { Button } from "./button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  //   const { isLoaded } = useSignIn()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  //   if (!isLoaded) return null

  return (
    <nav
      className={`fixed z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-[#1C2128] bg-[#0D1117]/80 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <Bull className="h-8 w-8 text-[#00FFA3]" />
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {["Product", "Docs", "Customers", "Pricing", "Blog"].map(
                  (item) => (
                    <Link
                      key={item}
                      href={`/${item.toLowerCase()}`}
                      className="px-3 py-2 text-sm font-medium text-gray-300 transition-colors duration-200 hover:text-white"
                    >
                      {item}
                    </Link>
                  ),
                )}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-6">
              <div className="flex items-center space-x-4">
                <Link
                  href="#"
                  className="text-gray-400 transition-colors duration-200 hover:text-white"
                >
                  <MessageSquare className="h-5 w-5" />
                </Link>
                <Link
                  href="#"
                  className="text-gray-400 transition-colors duration-200 hover:text-white"
                >
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link
                  href="#"
                  className="text-gray-400 transition-colors duration-200 hover:text-white"
                >
                  <Github className="h-5 w-5" />
                </Link>
              </div>
              <div className="flex items-center space-x-3">
                <Link
                  href="/login"
                  className="text-sm font-medium text-gray-300 transition-colors duration-200 hover:text-white"
                >
                  Login
                </Link>
                <Button className="rounded-md bg-[#00FFA3] px-4 py-2 text-sm font-medium text-black hover:bg-[#00FFA3]/90">
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
          <div className="flex md:hidden">
            <button
              type="button"
              className="text-gray-400 hover:text-white focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="border-t border-[#1C2128] bg-[#0D1117] md:hidden"
          id="mobile-menu"
        >
          <div className="space-y-1 px-2 pb-3 pt-2">
            {["Product", "Docs", "Customers", "Pricing", "Blog"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white"
              >
                {item}
              </Link>
            ))}
          </div>
          <div className="border-t border-[#1C2128] pb-3 pt-4">
            <div className="flex items-center justify-around px-5">
              <Link href="#" className="text-gray-400 hover:text-white">
                <MessageSquare className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Github className="h-6 w-6" />
              </Link>
            </div>
            <div className="mt-3 px-2">
              <Link
                href="/login"
                className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white"
              >
                Login
              </Link>
              <Button className="mt-2 w-full rounded-md bg-[#00FFA3] px-3 py-2 text-base font-medium text-black hover:bg-[#00FFA3]/90">
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
