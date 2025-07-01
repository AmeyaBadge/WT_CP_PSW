import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: {
    default: `Dashboard | ${process.env.SITE_TITLE}`,
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
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        <div>{children}</div>
      </main>
    </SidebarProvider>
  );
}
