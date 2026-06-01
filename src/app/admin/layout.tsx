import { type Metadata } from "next";
import { AdminAuthGate } from "@/components/admin/AdminAuthGate";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { LogoutButton } from "@/components/admin/LogoutButton";

export const metadata: Metadata = {
  title: "Admin Portal | Sovereign Scholar",
  description: "Admin dashboard for managing resources and student progress.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthGate>
      <div className="flex min-h-screen bg-background text-on-surface antialiased">
        <AdminSidebar />
        <div className="flex flex-grow flex-col">


          {/* Main Content */}
          <main className="flex-grow p-4 md:p-8">
            {children}
          </main>
        </div>
      </div>
    </AdminAuthGate>
  );
}
