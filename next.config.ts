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
        source: "/signup",
        destination: "/login",
        permanent: true,
      },
      {
        source: "/forgot-password",
        destination: "/login",
        permanent: true,
      },
      {
        source: "/auth/update-password",
        destination: "/login",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
