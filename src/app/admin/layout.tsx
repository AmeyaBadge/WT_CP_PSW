import { AppSidebar } from "@/components/AppSidebar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: {
    default: `Login | ${process.env.SITE_TITLE}`,
    template: `%s | Admin Dashboard`,
  },
  description:
    "Admin dashboard panel to manage the Official website of Panchayat Samiti Wai",
};

export default function AdminRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="min-h-screen">{children}</div>
    </ThemeProvider>
  );
}
