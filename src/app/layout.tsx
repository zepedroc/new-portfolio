import Navigation from '@/components/Navigation';
import { Toaster as SonnerToaster } from '@/components/ui/sonner';
import { Toaster as AppToaster } from '@/components/ui/toaster';

import '@/index.css';

export const metadata = {
  title: 'José Mota',
  description: 'Portfolio',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        {children}
        <AppToaster />
        <SonnerToaster />
      </body>
    </html>
  );
}
