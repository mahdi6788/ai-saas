"use client";
import Image from "next/image";
import Link from "next/link";
import { montserrat } from "@/lib/fonts";

import { cn } from "@/lib/utils";
import {
  Code,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  Music,
  Settings,
  VideoIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { FreeCounter } from "./free-counter";

const routes = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    icon: MessageSquare,
    label: "Conversation",
    href: "/conversation",
    color: "text-violet-500",
  },
  {
    icon: ImageIcon,
    label: "Image Generation",
    href: "/image",
    color: "text-pink-700",
  },
  {
    icon: VideoIcon,
    label: "Video Generation",
    href: "/video",
    color: "text-orange-700",
  },
  {
    icon: Music,
    label: "Music Generation",
    href: "/music",
    color: "text-emerald-500",
  },
  {
    icon: Code,
    label: "Code Generation",
    href: "/code",
    color: "text-green-700",
  },
  {
    icon: Settings,
    label: "Setting",
    href: "/settings",
  },
];

export default function Sidebar({
  apiLimitCount = 0,
  isPro,
}: {
  apiLimitCount: number;
  isPro: boolean;
}) {
  const pathname = usePathname();
  return (
    <div className="flex flex-col space-y-4 py-4 h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href={"/dashboard"} className="flex items-center pl-3 mb-14">
          <div className="relative flex items-center justify-between gap-2 w-8 h-8 mr-4">
            <Image
              alt="Logo"
              src="/images/LOGO.jpg"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="rounded-full"
            />
          </div>
          <h1 className={cn("text-2xl font-bold", montserrat.className)}>
            Genius
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "group flex justify-start w-full p-3 rounded-lg text-sm font-medium cursor-pointer transition hover:text-white hover:bg-white/10",
                pathname === route.href
                  ? "text-white bg-white/10"
                  : "text-zinc-400"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <FreeCounter apiLimitCount={apiLimitCount} isPro={isPro} />
    </div>
  );
}
