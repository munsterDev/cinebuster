import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com'
      },
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io'
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org'
      },
      {
        protocol: 'https',
        hostname: 'i.gr-assets.com'
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com'
      },
      {
        protocol: 'https',
        hostname: 'image.tmdb.org'
      },
      {
        protocol: 'https',
        hostname: 'github.com'
      }
    ]
  },
};

export default nextConfig;
