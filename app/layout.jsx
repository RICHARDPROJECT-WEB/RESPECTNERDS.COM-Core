import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '../components/Navbar';
import ThemeProvider from '../components/ThemeProvider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: 'Respect Nerds - The Hacker Forum',
  description: 'A modern, secure community for tech enthusiasts, hackers, and nerds.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <Navbar />
          <main className="page-main container">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
