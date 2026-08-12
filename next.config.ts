import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "https://cp-tracker-backend-iia7.onrender.com/api/:path*",
      },
    ];
  },
};

export default nextConfig;