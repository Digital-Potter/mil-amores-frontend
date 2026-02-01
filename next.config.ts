/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '5007',
				pathname: '/td/**',
			},
			{
				protocol: 'https',
				hostname: 'thedavid.digitalpotter.io',
			},
		],
		qualities: [25, 50, 75, 100],
		minimumCacheTTL: 86400, // Cache optimized images for 24 hours
	},

	async redirects() {
		return [
			// Redirect index.html to root
			{
				source: '/index.html',
				destination: '/',
				permanent: true,
			},
		];
	},

	async headers() {
		return [
			{
				source: '/:path*',
				headers: [
					{
						key: 'Link',
						value: '<https://milamorestaqueriava.com>; rel="canonical"',
					},
				],
			},
			{
				source: '/icons/:path*',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=31536000, immutable',
					},
				],
			},
			{
				source: '/images/:path*',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=31536000, immutable',
					},
				],
			},
			{
				source: '/_next/static/:path*',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=31536000, immutable',
					},
				],
			},
		];
	},

	async rewrites() {
		return [
			{
				source: '/td/:path*',
				destination: 'https://thedavid.digitalpotter.io/:path*', // Proxy to Backend
			},
		];
	},
};

export default nextConfig;
