import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		fontFamily: {
			sans: ["var(--font-nunito)", "sans-serif"],
			nunito: ["var(--font-nunito)", "sans-serif"],
		},
		extend: {
			colors: {
				primary: "#FFB833",
				"primary-hover": "#FFA90A",
				"primary-text": "#001524",
				disabled: "#707070",
			},
			borderRadius: {
				button: "32px",
			},
		},
	},
	plugins: [],
};

export default config;
