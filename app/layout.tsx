import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Fraunces } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700", "800"],
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Eldvora — Secure Crypto Investment Platform",
  description: "Invest smarter with Eldvora. Automated trading protocols, real-time portfolio tracking, and secure crypto investment plans.",
  applicationName: "Eldvora",
  keywords: ["Crypto Investment", "Automated Trading", "Bitcoin", "Secure Investment Platform", "Yield Farming", "Algorithmic Trading", "DeFi"],
  authors: [{ name: "Eldvora Protocol", url: "https://eldvora.com" }],
  creator: "Eldvora Protocol",
  publisher: "Eldvora",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Eldvora — Secure Crypto Investment Platform",
    description: "Invest smarter with Eldvora. Automated trading protocols, real-time portfolio tracking, and secure crypto investment plans.",
    url: "https://eldvora.com",
    siteName: "Eldvora",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eldvora — Secure Crypto Investment Platform",
    description: "Invest smarter with Eldvora. Automated trading protocols, real-time portfolio tracking, and secure crypto investment plans.",
  },
  other: {
    // Advanced Geo Tagging mapping
    "geo.region": "US",
    "geo.placename": "New York",
    "geo.position": "40.7128;-74.0060",
    "ICBM": "40.7128, -74.0060",
  }
};

import Script from "next/script";

import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";
import AutoLogout from "./components/AutoLogout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jakarta.variable} ${fraunces.variable} antialiased`}
      >
        <SessionProvider>
          <AutoLogout />
          <Toaster position="top-right" richColors />
          {children}
        </SessionProvider>
        <Script id="tawk-to-script" strategy="afterInteractive">
          {`
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
            var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
            s1.async=true;
            s1.src='https://embed.tawk.to/69a966658628811c37bb2c2d/1jiurfv35';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
            })();
          `}
        </Script>
      </body>
    </html>
  );
}
