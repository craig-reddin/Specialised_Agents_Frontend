import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/socket.io": {
        target: "http://0.0.0.0:5000",
        changeOrigin: true,
        ws: true,
      },
    },
  },
  test: {
    testTimeout: 60000,
    hookTimeout: 60000,
    include: ["test/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    environment: "node",
  },
});
