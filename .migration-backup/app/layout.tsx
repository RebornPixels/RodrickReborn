import '../styles/globals.css';
import { Analytics } from "@vercel/analytics/react"
import { Inter } from 'next/font/google';
import { ThemeProvider } from './theme-provider';
import Navbar from './components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: "Rodrick Reborn | Developer & Creative",
  description: "Portfolio showcasing the work of Rodrick Reborn, a passionate developer and creative thinker.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}`}>
        <ThemeProvider>
          <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
              {children}
            </main>
            <Analytics />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}