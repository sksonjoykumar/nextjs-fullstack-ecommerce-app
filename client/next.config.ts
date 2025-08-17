// import type { NextConfig } from 'next';

// const nextConfig: NextConfig = {
//   /* config options here */
//   reactStrictMode: false,
//   images: {
//     domains: ['res.cloudinary.com'],
//   },
// };

// export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;