/**
 * 生成「双击即开」单文件版个人简历
 * 把 Vite 构建产物中的 JS / CSS 全部内联进一个 HTML，
 * 无需安装环境、无需联网，双击即可浏览完整简历（含动效与主题切换）
 */
const fs = require("fs");
const path = require("path");

const dist = path.join(__dirname, "dist");
let html = fs.readFileSync(path.join(dist, "index.html"), "utf8");

// 内联 JS：外部 module 脚本 → 内联 module 脚本（file:// 协议下可正常执行）
html = html.replace(
  /<script type="module" crossorigin src="\.\/(assets\/[^"]+\.js)"><\/script>/,
  (_, file) => {
    const js = fs.readFileSync(path.join(dist, file), "utf8");
    return `<script type="module">\n${js}\n</script>`;
  }
);

// 内联 CSS
html = html.replace(
  /<link rel="stylesheet" crossorigin href="\.\/(assets\/[^"]+\.css)">/,
  (_, file) => {
    const css = fs.readFileSync(path.join(dist, file), "utf8");
    return `<style>\n${css}\n</style>`;
  }
);

// 去掉 modulepreload 外链（内联后不再需要）
html = html.replace(/<link rel="modulepreload"[^>]*>\s*/g, "");

const outFile = path.join(__dirname, "陈博皓-个人简历-双击打开.html");
fs.writeFileSync(outFile, html);
console.log("written:", outFile, `(${(html.length / 1024).toFixed(0)} KB)`);
