import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  
  build: {
    target: "es2015",
    minify: "esbuild",
    cssCodeSplit: true,

    rollupOptions: {
      output: {
        manualChunks: {
          reactVendor: ["react", "react-dom"],
          router: ["react-router-dom"],
          helmet: ["react-helmet-async"],
          axios: ["axios"]
        }
      }
    }
  },

  esbuild: {
    drop: ["console", "debugger"]
  }
});
