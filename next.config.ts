import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // to handle image hosting problem
  images:{
    domains: [
      "oaidalleapiprodscus.blob.core.windows.net"
    ]
  }
};

export default nextConfig;
