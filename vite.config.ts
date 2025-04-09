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
        srcDir: "src",
        filename: "sw.ts",
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
        strategies: "injectManifest",
        injectManifest: {
          swSrc: "src/sw.ts",
          swDest: "sw.js",
          rollupFormat: "iife",
        },
        devOptions: {
          enabled: true,
          type: "module",
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
