import { AppSidebar } from "@/components/admin/AppSidebar";
import AdminHeader from "@/components/admin/Header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarProvider } from "@/components/ui/sidebar";
import type { Metadata } from "next";

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
      <main className="flex-1">
        <ScrollArea>
          <AdminHeader />
          <div className="p-4 md:p-6">{children}</div>
        </ScrollArea>
      </main>
    </SidebarProvider>
  );
}
