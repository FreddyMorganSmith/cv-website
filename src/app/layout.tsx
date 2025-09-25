import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Freddy Morgan-Smith | Student",
  description: "Software Engineering student at Bournemouth University. Building web applications, Discord bots, and exploring modern technologies.",
  keywords: ["Freddy Morgan-Smith", "Software Engineer", "Student", "Developer", "Portfolio", "Next.js", "React", "TypeScript"],
  authors: [{ name: "Freddy Morgan-Smith" }],
  creator: "Freddy Morgan-Smith",
  metadataBase: new URL('https://portfolio-sentrisentri.vercel.app'),
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon.svg', sizes: '192x192', type: 'image/svg+xml' }
    ],
    apple: [
      { url: '/icon.svg', type: 'image/svg+xml' }
    ],
    shortcut: '/favicon.svg',
  },
  openGraph: {
    title: "Freddy Morgan-Smith | Cyber Security Student",
    description: "Cyber Security and Digital Forensics student at Bournemouth University. Specializing in incident response, malware analysis, and network security.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Freddy Morgan-Smith | Cyber Security Student",
    description: "Cyber Security and Digital Forensics student at Bournemouth University. Specializing in incident response, malware analysis, and network security.",
    creator: "@sentrisentri",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
