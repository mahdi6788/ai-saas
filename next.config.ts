import type { NextConfig } from "next";
import withPWA from "next-pwa";

const pwaConfig = withPWA({
  dest: "public", // Output directory for service worker
  register: true, // Automatically register service worker
  skipWaiting: true, // Skip waiting for service worker activation
  disable: process.env.NODE_ENV === "development", // Disable PWA in development

  runtimeCaching: [
    {
      urlPattern: /^https?.*/, // Cache all HTTP/HTTPS requests,
      handler: "NetworkFirst", // Try network first, fallback to cache
      options: {
        cacheName: "offlineCache",
        expiration: {
          maxEntries: 200,
        },
      },
    },
    {
      urlPattern: /\/offline\.html$/, // Cache offline.html
      handler: "CacheFirst", // Serve from cache first
      options: {
        cacheName: "offline-page",
        expiration: {
          maxEntries: 1,
        },
      },
    },
  ],
});

const nextConfig: NextConfig = {
  // Add other Next.js config options here if needed
  reactStrictMode: true,
};

export default pwaConfig(nextConfig);
