import PublicHeader from "@/components/PublicHeader";
import PublicFooter from "@/components/PublicFooter";

interface PublicLayoutProps {
  children: React.ReactNode;
}

const PublicLayout = ({ children }: PublicLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <PublicHeader />
      <main className="flex-1">{children}</main>
      <PublicFooter />
    </div>
  );
};

export default PublicLayout;
