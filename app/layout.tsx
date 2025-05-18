import "./globals.css";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import Link from "next/link";

import { ModalProvider } from "@/components/ModalProvider";
import { CrispChat } from "@/components/CrispChat";
import { geistMono, geistSans } from "@/lib/fonts";


export const metadata: Metadata = {
  title: "AI SaaS Genius",
  description:
    "The PWA that provides you with AI capabilities to generate chat, code, image, music, and video easily",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <CrispChat />
        <head>
          <Link rel="manifest" href="/manifest.ts" />
          <meta name="theme-color" content="#000000" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <Link href="/images/LOGO192.png" />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ModalProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
