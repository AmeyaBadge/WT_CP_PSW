import type { Metadata } from "next";
import PublicLayout from "@/components/PublicLayout";

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
  return <PublicLayout>{children}</PublicLayout>;
}
