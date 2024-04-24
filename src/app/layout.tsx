import type { Metadata } from "next";
import localFont from 'next/font/local'
import Providers from './providers'
import ContentWrapper from "@/components/ContentWrapper";
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
      <body className={`${Kanit.variable} 
      bg-color-background dark:bg-color-background-dark 
      text-color-foreground dark:text-color-foreground-dark`}
      >
        <Providers>
          {/* <Header /> */}
          <ContentWrapper>
            {children}
          </ContentWrapper>
        </Providers>
      </body>
    </html>
  );
}
