import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'flagcdn.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'raw.githubusercontent.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'images.pexels.com',
                port: '',
                pathname: '/**',
            },
            // {
            //     protocol: 'https',
            //     hostname: 's3-inventorymanagement.s3.us-east-2.amazonaws.com',
            //     port: '',
            //     pathname: '/**',
            // },


        ],
    },
  reactStrictMode: true,
};

export default nextConfig;
