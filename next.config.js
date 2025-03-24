/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    basePath: '/CryptoNews',
    images: {
        unoptimized: true,
    },
    trailingSlash: true,
    assetPrefix: '/CryptoNews/',
}

module.exports = nextConfig 