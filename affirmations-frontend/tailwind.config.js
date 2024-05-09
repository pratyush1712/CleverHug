/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				"main-background": "#141217",
				"sidebar-background": "#19161d",
				"sidebar-selected": "#2E2938",
				"purple-button": "#7e26f7"
			},
			fontFamily: {
				manrope: ["Manrope", "sans-serif"]
			}
		}
	},
	plugins: []
};
