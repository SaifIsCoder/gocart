/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.firebasestorage.googleapis.com',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
        ],
    },
    // Enable static exports if needed
    // output: 'export',
};

export default nextConfig;
