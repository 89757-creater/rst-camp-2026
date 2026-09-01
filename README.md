# RST 竞赛训练营 · 入营筛选作品

**作者：陈博皓** ｜ 杭州师范大学 · 汉语国际教育（师范）· 2026 级本科

## 线上地址（Netlify 个性域名，推荐）

- 必做题 · 个人在线简历：<https://chenbohao.netlify.app/>
- 附加题 · 坦克大战（简历内嵌版）：<https://chenbohao.netlify.app/tank.html>

## 线上地址（GitHub Pages 自动部署）

- 必做题 · 个人在线简历：<https://89757-creater.github.io/rst-camp-2026/>
- 附加题 · 坦克大战（独立版）：<https://89757-creater.github.io/rst-camp-2026/tank/>
- 附加题 · 坦克大战（简历内嵌版）：<https://89757-creater.github.io/rst-camp-2026/tank.html>

## 仓库结构

| 目录 | 内容 | 详细说明 |
|---|---|---|
| `resume-site/` | 必做题：响应式个人简历（React + Vite + Tailwind） | 见 `resume-site/README.md` |
| `tank-battle/` | 附加题：坦克大战（原生 Canvas 2D + TypeScript） | 见 `tank-battle/README.md` |
| `.github/workflows/deploy.yml` | GitHub Pages 自动构建与部署 | push 到 main 即触发 |

## 本地运行

```bash
cd resume-site && npm install && npm run dev    # 简历（/tank.html 为内嵌游戏）
cd tank-battle && npm install && npm run dev    # 坦克大战独立版
```
