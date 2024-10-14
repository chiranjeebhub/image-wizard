/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["picsum.photos"], // Allow images from Picsum
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
