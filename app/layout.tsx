import '../styles/globals.css';
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
      <body className={inter.className}>
        <ThemeProvider>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
