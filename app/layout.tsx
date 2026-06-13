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
  other: {
    'Impact-Site-Verification': '163e2763-78ec-4a32-925d-84523a499246',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  );
}