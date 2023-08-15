/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: "/readit/:path*",
        destination: "http://localhost:12000/readit/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
