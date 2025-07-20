import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    cors: {
      origin: "*",
      methods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"],
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,HEAD,PUT,POST,DELETE,PATCH",
      "Access-Control-Allow-Headers": "*",
    },
  },
});
