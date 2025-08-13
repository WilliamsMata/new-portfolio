/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [320, 360, 375, 414, 480, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        hostname: "api.microlink.io",
      },
    ],
  },
  experimental: {
    optimizePackageImports: [
      "framer-motion",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-hover-card",
      "@radix-ui/react-tooltip",
      "@radix-ui/react-select",
      "@radix-ui/react-separator",
      "@radix-ui/react-label",
    ],
  },
};

export default nextConfig;
