import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [inspectAttr(), react()],
  server: {
    port: 3000,
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"), // 必做题：个人简历
        tank: path.resolve(__dirname, "tank.html"),  // 附加题：坦克大战
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
