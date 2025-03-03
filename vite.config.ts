import { fileURLToPath, URL } from 'node:url';

import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import checker from 'vite-plugin-checker';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig(() => {
	return {
		plugins: [
			vue(),
			vueDevTools(),
			checker({
				vueTsc: true,
			}),
			VitePWA({
				registerType: 'autoUpdate',
				strategies: 'injectManifest', // ✅ Use injectManifest for FCM
				injectManifest: {
					globPatterns: ['**/*.{js,css,html,png,ico,jpg,svg}'],
				},
				srcDir: 'public', // ✅ Ensure this matches the location of your SW
				filename: 'firebase-messaging-sw.js', // ✅ Ensure this matches your file name
				// devOptions: {
				// 	enabled: true,
				// 	type: 'module',
				// },
				includeAssets: ['favicon.ico'],
				manifest: {
					name: 'My Awesome App',
					short_name: 'MyApp',
					description: 'My Awesome App description',
					theme_color: '#ffffff',
					icons: [
						{
							src: 'pwa-192x192.png',
							sizes: '192x192',
							type: 'image/png',
						},
						{
							src: 'pwa-512x512.png',
							sizes: '512x512',
							type: 'image/png',
						},
						{
							src: 'pwa-512x512.png',
							sizes: '512x512',
							type: 'image/png',
							purpose: 'any',
						},
						{
							src: 'pwa-512x512.png',
							sizes: '512x512',
							type: 'image/png',
							purpose: 'maskable',
						},
					],
				},
			}),
		],
		resolve: {
			alias: {
				'@': fileURLToPath(new URL('./src', import.meta.url)),
			},
		},
	};
});
