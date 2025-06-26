import type { Metadata } from "next";
import localFont from 'next/font/local'
import Providers from './providers'
import "./globals.css";

const Kanit = localFont({
  src: [
    {
      path: '../../public/fonts/Kanit/Kanit-Light.ttf',
      weight: '200'
    },
    {
      path: '../../public/fonts/Kanit/Kanit-Regular.ttf',
      weight: '400'
    },
    {
      path: '../../public/fonts/Kanit/Kanit-Medium.ttf',
      weight: '500'
    },
    {
      path: '../../public/fonts/Kanit/Kanit-Bold.ttf',
      weight: '700'
    }
  ],
  variable: '--font-kanit'
})

const Urbanist = localFont({
  src: [
    {
      path: '../../public/fonts/Urbanist/Urbanist-Regular.ttf',
      weight: '400',
    },
    {
      path: '../../public/fonts/Urbanist/Urbanist-Medium.ttf',
      weight: '500',
    },
    {
      path: '../../public/fonts/Urbanist/Urbanist-SemiBold.ttf',
      weight: '600',
    },
    {
      path: '../../public/fonts/Urbanist/Urbanist-Bold.ttf',
      weight: '700',
    }
  ],
  variable: '--font-urbanist',
})

export const metadata: Metadata = {
  title: "MyBess",
  description: "",
  icons: {
    icon: "/images/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${Kanit.variable} ${Urbanist.variable} 
      bg-background text-foreground`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
