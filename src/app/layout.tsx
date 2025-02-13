import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { UserProvider } from '@/providers/UserProvider';

import './globals.css';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { ModeToggle } from '@/components/ui/mode-toggler';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'My sidecar app',
  description: 'Test project',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col justify-center items-center min-h-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <UserProvider>
            {children}
            <ModeToggle />
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
