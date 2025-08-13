/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        hostname: "api.microlink.io",
      },
    ],
  },
};

export default nextConfig;
