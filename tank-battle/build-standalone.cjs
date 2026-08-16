/**
 * 生成「双击即玩」单文件版坦克大战
 * 把 TypeScript 编译后的游戏逻辑和 base64 底图全部内联进一个 HTML，
 * 评审无需安装任何环境，双击文件即可游玩
 */
const fs = require("fs");
const path = require("path");
const esbuild = require("esbuild");

const root = __dirname;

// 1. 编译游戏逻辑（TS → JS，iife 格式，无模块依赖）
const ts = fs.readFileSync(path.join(root, "src", "main.ts"), "utf8");
let js = esbuild.transformSync(ts, {
  loader: "ts",
  format: "iife",
  target: "es2020",
}).code;

// 2. 底图转 base64，替换掉对 public/tank-bg.jpg 的引用
const imgB64 = fs
  .readFileSync(path.join(root, "public", "tank-bg.jpg"))
  .toString("base64");
const dataUrl = "data:image/jpeg;base64," + imgB64;
// esbuild 会把 import.meta 改写为 import_meta，两种写法都覆盖
js = js.replace(
  /import_meta\.env\.BASE_URL\s*\+\s*"tank-bg\.jpg"|import\.meta\.env\.BASE_URL\s*\+\s*"tank-bg\.jpg"/,
  JSON.stringify(dataUrl)
);
if (js.includes("tank-bg.jpg")) {
  throw new Error("底图引用替换失败，请检查 main.ts 中的图片路径写法");
}

// 3. 把编译后的 JS 内联进页面
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const out = html.replace(
  '<script type="module" src="/src/main.ts"></script>',
  () => `<script>\n${js}\n</script>`
);
if (out === html) {
  throw new Error("script 标签替换失败，请检查 index.html 中的引用写法");
}

const outFile = path.join(root, "坦克大战-双击即玩.html");
fs.writeFileSync(outFile, out);
console.log("written:", outFile, `(${(out.length / 1024).toFixed(0)} KB)`);
