'use client';
import { useState } from 'react';
import { ThemeToggle } from '../theme-toggle';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-4 shadow-sm flex justify-between items-center">
      <a href="/" className="font-bold text-xl hover:text-blue-600 dark:hover:text-blue-400 transition-colors" aria-label="Home">
        Rodrick Reborn
      </a>

      <div className="flex items-center gap-6">
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          <a href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</a>
          <a href="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</a>
          <a href="/projects" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Projects</a>
          <a href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</a>
        </div>

        {/* Mobile Toggle Button */}
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

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 shadow-md absolute top-full left-0 w-full">
          <div className="flex flex-col space-y-4 p-4">
            <a href="/" onClick={() => setMobileMenuOpen(false)}>Home</a>
            <a href="/about" onClick={() => setMobileMenuOpen(false)}>About</a>
            <a href="/projects" onClick={() => setMobileMenuOpen(false)}>Projects</a>
            <a href="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
          </div>
        </div>
      )}
    </nav>
  );
}
