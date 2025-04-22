import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	webpack(config) {
		const fileLoaderRule = config.module.rules.find(
			(rule: { test?: { test?: (arg0: string) => boolean } }) =>
				rule.test?.test?.(".svg")
		);
		config.module.rules.push(
			{
				test: /\.svg$/i,
				include: /src\/assets\/.*\.svg$/,
			},
			{
				...fileLoaderRule,
				test: /\.svg$/i,
				resourceQuery: /url/, // *.svg?url
			},
			{
				test: /\.svg$/i,
				issuer: fileLoaderRule.issuer,
				resourceQuery: {
					not: [...fileLoaderRule.resourceQuery.not, /url/],
				},
				use: [
					{
						loader: "@svgr/webpack",
						options: {
							removeDimensions: true,
							dimensions: false,
							replaceAttrValues: {
								"#000": "currentColor",
								"#000000": "currentColor",
								"#FFF": "currentColor",
								"#FFFFFF": "currentColor",
								"#fff": "currentColor",
								"#ffffff": "currentColor",
							},
						},
					},
				],
			}
		);

		return config;
	},
	experimental: {
		turbo: {
			rules: {
				"*.svg": {
					loaders: ["@svgr/webpack"],
					as: "*.js",
				},
			},
		},
	},
};

export default nextConfig;
