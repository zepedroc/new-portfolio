import { Analytics } from '@vercel/analytics/react';

import Navigation from '@/components/Navigation';
import { Toaster as SonnerToaster } from '@/components/ui/sonner';
import { Toaster as AppToaster } from '@/components/ui/toaster';

import '@/index.css';

export const metadata = {
  title: 'José Mota',
  description: 'Portfolio',
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/favicon.svg' }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Analytics />
        <Navigation />
        {children}
        <AppToaster />
        <SonnerToaster />
      </body>
    </html>
  );
}
