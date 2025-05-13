import { UserButton } from "@clerk/nextjs";

import MobileSidebar from "@/components/MobileSidebar";

export default function Navbar({apiLimitCount}:{apiLimitCount:number}) {
  return (
    <div className="flex items-center p-4">
      {/* Mobile sidebar toggle */}
      <MobileSidebar apiLimitCount={apiLimitCount} />
      {/* Desktop Navber */}
      <div className="flex justify-end w-full">
        <UserButton afterSwitchSessionUrl="/"/>
      </div>
    </div>
  );
}
