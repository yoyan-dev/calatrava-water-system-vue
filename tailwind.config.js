/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ['selector', '[class~="my-app-dark"]'],
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {},
	plugins: [require('tailwindcss-primeui')],
};
