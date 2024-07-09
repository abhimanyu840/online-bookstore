/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['images.unsplash.com']
    },
    env: {
        PROD_SERVER: process.env.PROD_SERVER
    }
};

export default nextConfig;
