import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative h-full">
      <div className="hidden md:flex h-full w-72 flex-col fixed inset-y-0 z-[80] bg-gray-900">
        <Sidebar/>
      </div>
      <main className="md:pl-72">
        <Navbar/>
        {children}
      </main>
    </div>
  );
}
