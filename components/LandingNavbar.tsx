"use client";

import { montserrat } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

export default function LandingNavbar() {
  const { isSignedIn } = useAuth();
  return (
    <div className="p-4 bg-transparent flex items-center justify-between">
      <Link href="/" className="flex items-center">
        <div className="relative h-8 w-8 mr-4">
          <Image
            alt="Logo"
            src={"/images/LOGO.jpg"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="rounded-full"
          />
        </div>
        <h1
          className={cn("text-2xl font-bold text-white", montserrat.className)}
        >
          Genius
        </h1>
      </Link>

      <div className="flex items-center gap-x-2">
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button variant="outline" className="rounded-full">
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  );
}
