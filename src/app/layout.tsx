import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Outfit } from 'next/font/google';
import '@/styles/globals.css';

import { PublicLayoutWrapper } from '@/components/layout/PublicLayoutWrapper';

const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
});

const heading = Outfit({
  subsets: ['latin'],
  variable: '--font-heading',
});

export const metadata: Metadata = {
  title: 'Destiny 4 NEET | Personal Mentorship for Medical Aspirants',
  description: 'Focused NEET preparation with small batches, personal guidance, mock-test strategy, and student-first mentorship.',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
  openGraph: {
    images: [{ url: '/logo.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/logo.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${heading.variable} scroll-smooth`}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans font-body antialiased bg-background text-on-surface selection:bg-primary-container selection:text-on-primary-container min-h-screen">
        <PublicLayoutWrapper>
          {children}
        </PublicLayoutWrapper>
      </body>
    </html>
  );
}
