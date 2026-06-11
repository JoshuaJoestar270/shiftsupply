import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ShiftSupply - Best Prices for Nurses',
  description: 'Real-time price comparison for scrubs, stethoscopes, nursing shoes and medical supplies.',
  icons: {
    icon: [
      '/favicon_io/favicon-16x16.png',
      '/favicon_io/favicon-32x32.png',
    ],
    apple: '/favicon_io/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}