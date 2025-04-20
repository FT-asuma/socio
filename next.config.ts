/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "192.168.100.6",
        port: "8080",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
