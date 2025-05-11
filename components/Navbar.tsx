import { UserButton } from "@clerk/nextjs";

import MobileSidebar from "@/components/MobileSidebar";

export default function Navbar() {
  return (
    <div className="flex items-center p-4">
      {/* Mobile sidebar toggle */}
      <MobileSidebar />
      {/* Desktop Navber */}
      <div className="flex justify-end w-full">
        <UserButton afterSwitchSessionUrl="/"/>
      </div>
    </div>
  );
}
