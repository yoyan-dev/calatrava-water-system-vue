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
        strategies: "injectManifest",
        srcDir: "src",
        filename: "sw.ts",
        injectManifest: {
          globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
          globDirectory: "dist",
        },
        devOptions: {
          enabled: true,
          type: "module",
        },
        includeAssets: ["favicon.ico", "logo.png"],
        manifest: {
          name: "Calatrava Waterworks",
          short_name: "CWS",
          start_url: "/",
          display: "standalone",
          theme_color: "#ffffff",
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
              purpose: "maskable",
            },
          ],
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
