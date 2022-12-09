import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { join } from "path";

// https://vitejs.dev/config/
export default defineConfig({

  plugins: [vue()],
  base: "/",
  build: {
    rollupOptions: {
      external: [
        '@pixi/mixin-get-{}-position'
      ]
    }
  },
  resolve: {
    alias: {
      "@": join(__dirname, "src"),
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
  },

});
