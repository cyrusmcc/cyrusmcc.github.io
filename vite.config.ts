import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { join } from "path";

// https://vitejs.dev/config/
export default defineConfig({

  plugins: [vue()],
  base: "./",
  build: {
    rollupOptions: {
      external: [
      ]
    }
  },
  resolve: {
    alias: {
      "@": join(__dirname, "src"),
      "eventsource-polyfill": join(__dirname, "node_modules/sockjs-client/lib/transport/browser/eventsource.js"),
      "crypto": join(__dirname, "node_modules/sockjs-client/lib/utils/browser-crypto.js"),
    },
  },
  define: { "process.env": {}, "global": {}, },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/assets/scss/style.scss";`
      }
    }
  },
  server: {
    host: true,
    proxy: {
      '/api': {
        target: 'https://strboard.io',
        changeOrigin: true,
        secure: false,
        ws: true,
      }
    }
  },

});
