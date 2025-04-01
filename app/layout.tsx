'use client'; // Add this at the top since we're using client-side features

import { Inter } from 'next/font/google';
import '../styles/globals.css';
import { ThemeProvider } from './theme-provider';
import { ThemeToggle } from './theme-toggle';
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: "Rodrick Reborn | Developer & Creative",
  description: "Portfolio showcasing the work of Rodrick Reborn, a passionate developer and creative thinker.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 antialiased transition-colors duration-200`}>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            <nav className="sticky top-0 z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-4 shadow-sm flex justify-between items-center">
              <a 
                href="/" 
                className="font-bold text-xl hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                aria-label="Home"
              >
                Rodrick Reborn
              </a>
              <div className="flex items-center gap-6">
                {/* Desktop Navigation */}
                <div className="hidden md:flex space-x-6">
                  <a href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors" aria-label="Home">
                    Home
                  </a>
                  <a href="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors" aria-label="About">
                    About
                  </a>
                  <a href="/projects" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors" aria-label="Projects">
                    Projects
                  </a>
                  <a href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors" aria-label="Contact">
                    Contact
                  </a>
                </div>
                
                {/* Mobile Menu Button */}
                <button 
                  className="md:hidden p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  aria-label="Toggle menu"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {mobileMenuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
                
                <ThemeToggle />
              </div>
            </nav>
            
            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <div className="md:hidden bg-white dark:bg-gray-800 shadow-md">
                <div className="flex flex-col space-y-4 p-4">
                  <a 
                    href="/" 
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Home
                  </a>
                  <a 
                    href="/about" 
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    About
                  </a>
                  <a 
                    href="/projects" 
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Projects
                  </a>
                  <a 
                    href="/contact" 
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contact
                  </a>
                </div>
              </div>
            )}
            
            <main className="flex-grow">
              {children}
            </main>
            
            <footer className="bg-gray-100 dark:bg-gray-800 py-6 text-center text-gray-600 dark:text-gray-400 text-sm">
              © {new Date().getFullYear()} Rodrick Reborn. All rights reserved.
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}