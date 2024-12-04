import Link from "next/link"
import { UserCircle } from 'lucide-react'

export function Navbar() {
  return (
    <nav className="absolute top-0 z-40 flex h-16 w-full items-center justify-between bg-white/10 backdrop-blur-md px-4 sm:px-6 lg:px-8">
      <Link href="/" className="flex items-center gap-2">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="32" height="32" rx="16" fill="#6D28D9"/>
          <path d="M23 12L16 19L9 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 20L16 27L23 20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="text-xl font-bold text-white">AI Interview</span>
      </Link>
      <button className="text-white hover:text-purple-200 transition-colors duration-300">
        <UserCircle size={24} />
      </button>
    </nav>
  )
}

