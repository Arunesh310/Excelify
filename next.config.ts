import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/clean",
        destination: "/app/clean",
        permanent: true,
      },
      {
        source: "/login",
        destination: "/app",
        permanent: false,
      },
      {
        source: "/signup",
        destination: "/app",
        permanent: false,
      },
      {
        source: "/forgot-password",
        destination: "/app",
        permanent: false,
      },
      {
        source: "/auth/:path*",
        destination: "/app",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
