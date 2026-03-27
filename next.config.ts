import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'premierimobil.s3.eu-north-1.amazonaws.com'
      }
    ]
  }
};

export default nextConfig;
