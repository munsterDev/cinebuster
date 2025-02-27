"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-8 px-6 text-[#F1FFFA] flex flex-col items-center justify-center">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {/* Section 1: Navigation */}
        <div>
          <h3 className="text-lg font-semibold text-[#C5E03E]">Browse</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="/browse/movies" className="hover:underline">Movies</Link></li>
            <li><Link href="/browse/series" className="hover:underline">TV Shows</Link></li>
            <li><Link href="/explore" className="hover:underline">Explore</Link></li>
            <li><Link href="/my-library" className="hover:underline">My Library</Link></li>
          </ul>
        </div>

        {/* Section 2: Company Info */}
        <div>
          <h3 className="text-lg font-semibold text-[#C5E03E]">Company</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/about" className="hover:underline">About Us</Link></li>
            <li><Link href="/careers" className="hover:underline">Careers</Link></li>
            <li><Link href="/press" className="hover:underline">Press</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>

        {/* Section 3: Support & Legal */}
        <div>
          <h3 className="text-lg font-semibold text-[#C5E03E]">Help & Legal</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/help" className="hover:underline">Help Center</Link></li>
            <li><Link href="/terms" className="hover:underline">Terms of Service</Link></li>
            <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
            <li><Link href="/cookie-policy" className="hover:underline">Cookie Policy</Link></li>
          </ul>
        </div>

        {/* Section 4: Social Links */}
        <div>
          <h3 className="text-lg font-semibold text-[#C5E03E]">Follow Us</h3>
          <div className="mt-3 flex justify-center space-x-4">
            <Link href="https://facebook.com" className="hover:text-[#C5E03E] transition-colors">
              <span className="sr-only">Facebook</span>
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M22 12C22 6.48 17.52 2 12 2S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15h-2v-3h2v-2c0-2.21 1.34-3.42 3.32-3.42.94 0 1.89.17 1.89.17v2h-1.06c-1.05 0-1.38.65-1.38 1.32V12h2.5l-.4 3h-2.1v6.8c4.56-.93 8-4.96 8-9.8z"/>
              </svg>
            </Link>
            <Link href="https://twitter.com" className="hover:text-[#C5E03E] transition-colors">
              <span className="sr-only">Twitter</span>
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M22.46 6c-.77.35-1.61.58-2.48.69a4.33 4.33 0 001.9-2.38c-.82.49-1.73.84-2.7 1.03A4.3 4.3 0 0015.8 4a4.3 4.3 0 00-4.28 5.3A12.24 12.24 0 013 5.14a4.3 4.3 0 001.33 5.73c-.64-.02-1.25-.2-1.78-.49v.05a4.3 4.3 0 003.44 4.22 4.3 4.3 0 01-1.92.07 4.3 4.3 0 004.03 3 8.63 8.63 0 01-6.38 1.79 12.18 12.18 0 006.6 1.92c8.05 0 12.47-6.67 12.47-12.46 0-.19 0-.38-.01-.57A8.93 8.93 0 0022.46 6z"/>
              </svg>
            </Link>
            <Link href="https://instagram.com" className="hover:text-[#C5E03E] transition-colors">
              <span className="sr-only">Instagram</span>
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M7.75 2A5.75 5.75 0 002 7.75v8.5A5.75 5.75 0 007.75 22h8.5A5.75 5.75 0 0022 16.25v-8.5A5.75 5.75 0 0016.25 2h-8.5zM12 5.75a6.25 6.25 0 110 12.5 6.25 6.25 0 010-12.5zm0 1.5a4.75 4.75 0 100 9.5 4.75 4.75 0 000-9.5zm6.13-.98a1.13 1.13 0 110 2.26 1.13 1.13 0 010-2.26z"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-6 pt-4 text-center text-xs w-full">
        <p>&copy; {new Date().getFullYear()} Cinebuster. All rights reserved.</p>
      </div>
    </footer>
  );
}