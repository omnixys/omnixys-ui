// src/app/layout.tsx (MUI, ohne Wix)
import type { Metadata } from 'next';
// import { Inter } from "next/font/google";
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ThemeRegistry from './components/ThemeRegistry';

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'E-Commerce Application',
  description: 'Next.js + MUI Demo Shop (ohne Wix)',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // <html lang="en">
    //   <body className={inter.className}>
    <ThemeRegistry>
      <Navbar />
      {children}
      <Footer />
    </ThemeRegistry>
    //   </body>
    // </html>
  );
}
