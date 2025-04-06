import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
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
        devOptions: {
          enabled: true,
          type: "classic",
        },
        strategies: "injectManifest",
        injectManifest: {
          swSrc: "public/firebase-messaging-sw.js",
          swDest: "firebase-messaging-sw.js",
          globPatterns: ["**/*.{js,css,html,png,jpg,svg}"],
          exclude: [/firebase-messaging-sw\.js$/],
        } as any,
      }),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  };
});
