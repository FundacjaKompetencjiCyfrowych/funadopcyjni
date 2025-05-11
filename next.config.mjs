/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["a.storyblok.com"],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "a.storyblok.com",
				pathname: "/**",
			},
		],
	},
};

export default nextConfig;
