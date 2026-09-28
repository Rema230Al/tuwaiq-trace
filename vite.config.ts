import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Relative base so the built site works from any path (GitHub Pages, a sub-folder, etc.).
  base: "./",
  plugins: [react(), tailwindcss()],
});
