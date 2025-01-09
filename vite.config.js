import path from "path";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({ 
      registerType: 'autoUpdate',
      manifest: {
        "name": "Carb Counter Plus",
        "short_name": "CarbCounter+",
        "description": "An app that can help diabetics to more accurately calculate carb intake and insulin dosages.",
        "icons": [
            {
                "src": "./img/icons/android-chrome-192x192.png",
                "sizes": "192x192",
                "type": "image/png"
            },
            {
                "src": "./img/icons/android-chrome-512x512.png",
                "sizes": "512x512",
                "type": "image/png"
            }
        ],
        "display": "standalone",
        "background_color": "#ffffff",
        "theme_color": "#fcc90a"
      },
      devOptions: {
        enabled: true
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
