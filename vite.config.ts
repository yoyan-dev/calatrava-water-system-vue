import { fileURLToPath, URL } from 'node:url';

import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import checker from 'vite-plugin-checker';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd());
	return {
		plugins: [
			vue(),
			vueDevTools(),
			checker({
				vueTsc: true,
			}),
		],
		resolve: {
			alias: {
				'@': fileURLToPath(new URL('./src', import.meta.url)),
			},
		},
		// server: {
		// 	proxy: {
		// 		'/api': {
		// 			target: env.VITE_API_URL,
		// 			changeOrigin: true,
		// 			secure: false,
		// 		},
		// 	},
		// },
	};
});
