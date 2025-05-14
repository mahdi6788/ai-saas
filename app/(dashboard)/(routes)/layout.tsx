import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { getApiLimitCount } from "@/lib/api-limit";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const apiLimitCount = await getApiLimitCount()

  return (
    <div className="relative h-full">
      <div className="hidden md:flex h-full w-72 flex-col fixed inset-y-0 bg-gray-900">
        <Sidebar apiLimitCount={apiLimitCount} />
      </div>
      <main className="md:pl-72">
        <Navbar apiLimitCount={apiLimitCount}/>
        {children}
      </main>
    </div>
  );
}
