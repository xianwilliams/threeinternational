import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { StoreProvider } from '@/components/store-provider';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import './globals.css';
import './editorial.css';

const altform = localFont({
  src: [
    { path: '../../public/fonts/Altform-Regular.otf', weight: '400', style: 'normal' },
    { path: '../../public/fonts/Altform-Light.ttf', weight: '300', style: 'normal' },
  ],
  variable: '--font-altform',
  display: 'swap',
});
export const metadata: Metadata = {
  title: { default: 'THREE | Good Science. Everyday Possibilities.', template: '%s | THREE' },
  description:
    'Discover GLP THREE and thoughtfully formulated supplements and skincare. Explore the science, find your routine, and shop THREE.',
  robots: { index: false, follow: false },
  icons: { icon: '/images/three-icon.png', apple: '/images/three-icon.png' },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={altform.variable}>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <StoreProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
        </StoreProvider>
      </body>
    </html>
  );
}
