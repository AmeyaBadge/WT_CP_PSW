import type { Metadata, Viewport } from "next";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: {
    default: `${process.env.SITE_TITLE} | Official Website`,
    template: `%s | ${process.env.SITE_TITLE}`,
  },
  description: "Official website of Panchayat Samiti Wai, Maharashtra",
};

export default function ClientRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-govt-extra-light min-h-screen">
      <Header />
      {children}
    </div>
  );
}
