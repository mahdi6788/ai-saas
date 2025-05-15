import { UserButton } from "@clerk/nextjs";

import MobileSidebar from "@/components/MobileSidebar";

export default function Navbar({
  apiLimitCount,
  isPro,
}: {
  apiLimitCount: number;
  isPro: boolean;
}) {
  return (
    <div className="flex items-center p-4">
      {/* Mobile sidebar toggle */}
      <MobileSidebar apiLimitCount={apiLimitCount} isPro={isPro} />
      {/* Desktop Navber */}
      <div className="flex justify-end w-full">
        <UserButton afterSwitchSessionUrl="/" />
      </div>
    </div>
  );
}
