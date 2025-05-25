module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				primary: "var(--color-primary)",
				"primary-hover": "var(--color-primary-hover)",
				"primary-text": "var(--color-primary-text)",
				disabled: "var(--color-disabled)",
				dark: "var(--color-dark)",
				green: "var(--color-green)",
				yellow: "var(--color-yellow)",
				gray: "var(--color-gray)",
				red: "var(--color-red)",
				"light-background": "var(--color-light-background)",
				"text-muted": "var(--color-text-muted)",
				"text-dark": "var(--color-text-dark)",
				"gray-light": "var(--color-gray-light)",
				black: "var(--color-black)",
				"gray-medium": "var(--color-gray-medium)",
			},
			fontFamily: {
				nunito: "var(--font-nunito)",
				"open-sans": "var(--font-open-sans)",
			},
		},
	},
	plugins: [],
};
