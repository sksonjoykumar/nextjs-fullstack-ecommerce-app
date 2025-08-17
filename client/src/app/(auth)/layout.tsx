import { ClerkProvider } from '@clerk/nextjs';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';

// google fonts inter
const inter = Inter({ subsets: ['latin'] });

// metadata
export const metadata: Metadata = {
  title: "Buying | Auth",
  description: "Buying E-commerce App",
};

// root layout
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning={true}>
        <body
          className={`${inter.className} h-screen flex items-center justify-center`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
