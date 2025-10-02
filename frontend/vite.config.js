import { defineConfig } from "vite";

// Simple Vite config for a static frontend folder.
export default defineConfig({
  root: ".",
  server: {
    port: 5173,
    open: true,
  },
});
