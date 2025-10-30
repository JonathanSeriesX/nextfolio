import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
  allowedDevOrigins: ["*.orb.local"],
};

export default nextConfig;
