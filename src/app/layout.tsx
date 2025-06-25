import type { Metadata, Viewport } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${process.env.SITE_TITLE} | Official Website`,
  description: "Official website of Panchayat Samiti Wai, Maharashtra",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Also supported but less commonly used
  // interactiveWidget: 'resizes-visual',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${notoSans.variable} antialiased`}>
      <body className="font-noto-sans">{children}</body>
    </html>
  );
}
