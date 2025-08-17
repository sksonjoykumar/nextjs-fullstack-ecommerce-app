import LeftSideBar from '@/components/layout/LeftSideBar';
import TopBar from '@/components/layout/TopBar';
import ToasterProvider from '@/lib/toast-provider/ToasterProvider';
import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import '../globals.css';


// google fonts
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body suppressHydrationWarning className={inter.className}>
          {/* Toast Message */}
          <ToasterProvider />
          <div className="h-screen flex ">
            {/* sidebar */}
            <div className="hidden md:block w-60 bg-slate-100">
              <LeftSideBar />
            </div>

            {/* main content area */}
            <div className="flex flex-col flex-1 overflow-y-auto">
              {/* TopBar visible only mobile */}
              <div className="md:hidden">
                <TopBar />
              </div>

              <main className="flex-1 p-6 overflow-y-auto">{children}</main>
            </div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
