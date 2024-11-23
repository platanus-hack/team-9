'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { BellIcon as Bull, MessageSquare, Twitter, Github, Menu, X } from 'lucide-react'
import { SignInButton, useSignIn } from '@clerk/nextjs'
import { Button } from './button'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { isLoaded } = useSignIn()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isLoaded) return null

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#0D1117]/80 backdrop-blur-md border-b border-[#1C2128]' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <Bull className="h-8 w-8 text-[#00FFA3]" />
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {['Product', 'Docs', 'Customers', 'Pricing', 'Blog'].map((item) => (
                  <Link
                    key={item}
                    href={`/${item.toLowerCase()}`}
                    className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-6">
              <div className="flex items-center space-x-4">
                <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  <MessageSquare className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  <Github className="h-5 w-5" />
                </Link>
              </div>
              <div className="flex items-center space-x-3">
                <Link 
                  href="/login" 
                  className="text-gray-300 hover:text-white text-sm font-medium transition-colors duration-200"
                >
                  Login
                </Link>
                <SignInButton>
                  <Button className="bg-[#00FFA3] text-black hover:bg-[#00FFA3]/90 px-4 py-2 rounded-md text-sm font-medium">
                    Sign Up
                  </Button>
                </SignInButton>
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
        <div className="md:hidden bg-[#0D1117] border-t border-[#1C2128]" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {['Product', 'Docs', 'Customers', 'Pricing', 'Blog'].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium"
              >
                {item}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-[#1C2128]">
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
              <SignInButton>
                <Button className="w-full bg-[#00FFA3] text-black hover:bg-[#00FFA3]/90 mt-2 px-3 py-2 rounded-md text-base font-medium">
                  Sign Up
                </Button>
              </SignInButton>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

