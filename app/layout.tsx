import { Inter } from 'next/font/google';
import '../styles/globals.css';
import { ThemeProvider } from './theme-provider';
import { ThemeToggle } from './theme-toggle';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: "Rodrick Reborn | Developer & Creative",
  description: "Portfolio showcasing the work of Rodrick Reborn, a passionate developer and creative thinker.",
};

// This component will be rendered on the client side
function ClientLayout({ children }: { children: React.ReactNode }) {
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
                <ThemeToggle />
              </div>
            </nav>
            
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

// This is the server component that wraps the client component
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <ClientLayout>{children}</ClientLayout>;
}