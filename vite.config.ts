import { fileURLToPath, URL } from "node:url";

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import checker from "vite-plugin-checker";
import { VitePWA } from "vite-plugin-pwa";

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
        registerType: "autoUpdate",
        injectRegister: "auto",
        devOptions: {
          enabled: true,
        },
        includeAssets: ["favicon.ico"],
        manifest: {
          name: "Calatrave Waterworks",
          short_name: "CWS",
          description: "My Awesome App description",
          theme_color: "#ffffff",
          start_url: "/",
          icons: [
            {
              src: "/logo.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "/logo.png",
              sizes: "512x512",
              type: "image/png",
            },
            {
              src: "/logo.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "any",
            },
            {
              src: "/logo.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "maskable",
            },
          ],
        },
        // Switch to injectManifest
        injectManifest: {
          swSrc: "src/sw.js", // Your custom service worker
          swDest: "dist/sw.js", // Output location
          globPatterns: ["**/*.{js,css,html,ico,png,svg}"], // Files to precache
        },
        workbox: {
          // Optional: Add runtime caching if needed
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/www\.gstatic\.com\/firebasejs\//,
              handler: "CacheFirst",
              options: {
                cacheName: "firebase-scripts",
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 7, // 1 week
                },
              },
            },
          ],
          // Control update frequency
          // skipWaiting: true, // New SW activates immediately
          // clientsClaim: true, // Takes control of clients immediately
          cleanupOutdatedCaches: true, // Removes old caches
        },
      }),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  };
});
