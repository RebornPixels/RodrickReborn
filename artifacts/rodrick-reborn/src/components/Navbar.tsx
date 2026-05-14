import { useState } from 'react';
import { Link } from 'wouter';
import { ThemeToggle } from '../theme-toggle';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAdmin, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-4 shadow-sm flex justify-between items-center">
      <Link href="/" className="font-bold text-xl hover:text-blue-600 dark:hover:text-blue-400 transition-colors" aria-label="Home">
        Rodrick Reborn
      </Link>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex space-x-6 items-center">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link>
          <Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</Link>
          <Link href="/projects" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Projects</Link>
          <Link href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</Link>
          {isAdmin && (
            <>
              <Link href="/admin/dashboard" className="text-xs px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors">
                Admin
              </Link>
              <button
                onClick={logout}
                className="text-xs text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
              >
                Sign out
              </button>
            </>
          )}
        </div>

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

      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 shadow-md absolute top-full left-0 w-full">
          <div className="flex flex-col space-y-4 p-4">
            <Link href="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)}>About</Link>
            <Link href="/projects" onClick={() => setMobileMenuOpen(false)}>Projects</Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
            {isAdmin && (
              <>
                <Link href="/admin/dashboard" onClick={() => setMobileMenuOpen(false)} className="text-blue-600 dark:text-blue-400">
                  Admin Dashboard
                </Link>
                <button onClick={logout} className="text-left text-red-500 dark:text-red-400">
                  Sign out
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
