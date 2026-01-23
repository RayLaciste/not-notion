import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  images: {
    domains: ["files.edgestore.dev"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
