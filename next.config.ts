import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/clean",
        destination: "/app/clean",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
