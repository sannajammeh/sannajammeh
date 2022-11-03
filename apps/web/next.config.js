/**
 * @type import('next').NextConfig
 */
const config = {
  swcMinify: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "images.unsplash.com",
      "api.daily.dev",
    ],
    formats: ["image/avif", "image/webp"],
  },
  experimental: {},
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(config);
