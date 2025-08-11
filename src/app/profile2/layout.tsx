import type { Metadata } from 'next';
import Navbar from './components/Navbar';
import Providers from './providers';

export const metadata: Metadata = {
  title: 'Lama Dev Social Media App',
  description: 'Social media app built with Next.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
        <Providers>
          {/* Top bar container */}
          <div style={{ width: '100%', background: '#fff' }}>
            <div style={{ margin: '0 auto', padding: '0 2rem', maxWidth: 1280 }}>
              <Navbar />
            </div>
          </div>

          {/* Page content container */}
          <div style={{ background: 'rgba(0,0,0,0.03)' }}>
            <div style={{ margin: '0 auto', padding: '0 2rem', maxWidth: 1280 }}>
              {children}
            </div>
          </div>
        </Providers>
  );
}
