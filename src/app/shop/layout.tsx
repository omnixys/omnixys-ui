// import type { Metadata } from 'next';
// import { Outfit } from 'next/font/google';
import Providers from './providers';

// const outfit = Outfit({ subsets: ['latin'], weight: ['300', '400', '500'] });

// export const metadata: Metadata = {
//   title: 'QuickCart - GreatStack',
//   description: 'E-Commerce with Next.js',
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <html lang="en">
    //   <body className={outfit.className}>
    <Providers>{children}</Providers>
    //   </body>
    // </html>
  );
}
