import { defineConfig } from "vite"

// base 设为相对路径，保证部署到 GitHub Pages 子目录（/rst-camp-2026/tank/）也能正确加载资源
export default defineConfig({
  base: "./",
})
