/**
 * 简历内容配置 —— 全站文字都集中在这个文件
 * 修改内容只需要改这里，无需触碰任何组件代码
 */

/** 个人基本信息 */
export const profile = {
  name: "陈博皓",
  nameEn: "CHEN BOHAO",
  gender: "男",
  school: "杭州师范大学",
  major: "汉语国际教育（师范）",
  grade: "2026 级本科",
  location: "浙江 · 杭州",
  // 首屏宣言：分两行展示，第二行中的 accent 词会用衬线强调
  taglineTop: "用框架思维",
  taglineBottom: "点亮每一次学习",
  taglineAccent: "点亮",
  // 个人照片：把照片放进 public/ 目录（如 public/photo.jpg），然后把 null 改为 "photo.jpg"
  photo: null as string | null,
  email: "suge002008@outlook.com",
  wechat: "byemelodyrose89757",
  phone: "17205775225",
};

/** 首屏下方的关键数据（value 为数字时会播放滚动计数动画） */
export const stats = [
  { value: 125, suffix: "", label: "高考英语", note: "浙江高考" },
  { value: 98, suffix: "", label: "高考政治", note: "浙江高考" },
  { value: 95, suffix: "", label: "高考历史", note: "浙江高考" },
  { value: 3, suffix: " 个", label: "开源项目", note: "GitHub 开源" },
];

/** 关于我 */
export const about = {
  paragraphs: [
    "我是陈博皓，杭州师范大学汉语国际教育专业 2026 级本科生，文学爱好者。性格随和，有耐心，相信好的引导比灌输更有力量。",
    "学习上我不主张死记硬背，更注重搭建知识框架——英语用“词根 + 语境”带词汇和阅读，历史和政治用时间轴、逻辑链把零散知识点串成体系，理解之后自然记住。",
    "我持有阿里达摩院人工智能训练师初级与高级证书，日常用 Vibe Coding 方式开发 AI 智能体技能并开源——从磁盘清理到股票盯仓，习惯把真实问题做成能跑的工具。",
  ],
  traits: ["耐心细致", "善于引导", "框架思维", "认真负责", "文学爱好者"],
};

/** 教育背景 */
export const education = [
  {
    period: "2026.09 — 至今",
    school: "杭州师范大学",
    degree: "汉语国际教育 · 本科（师范类）",
    detail:
      "师范生培养体系，系统修读语言学、教育学与第二语言教学课程，训练教学设计与课堂表达能力。",
  },
  {
    period: "2023.09 — 2026.06",
    school: "浙江省内高中",
    degree: "高中 · 文科方向",
    detail:
      "浙江高考英语 125 分、政治 98 分、历史 95 分。擅长用框架化方法整理文综知识体系。",
  },
];

/** 专业证书 */
export const certificates = [
  { name: "人工智能训练师（高级）", issuer: "阿里达摩院", year: "2026" },
  { name: "人工智能训练师（初级）", issuer: "阿里达摩院", year: "2026" },
];

/** 项目经历 */
export const projects = [
  {
    name: "First-Principles Disk Sentinel · 磁盘监测清理 Skill",
    period: "2026",
    link: "https://github.com/89757-creater/first-principles-disk-sentinel",
    detail:
      "Vibe Coding 创作的 AI 智能体技能：先测量后行动，只清理可证明安全的类目，操作结果可量化验证；跨平台支持 Windows / macOS / Linux，默认 dry-run 防误删。",
    tags: ["Kimi Skill", "跨平台", "GitHub 开源"],
  },
  {
    name: "股票盯仓监测与舆情风险预判 Skill",
    period: "2026",
    link: "https://github.com/89757-creater",
    detail:
      "Vibe Coding 作品：自动盯仓监测持仓标的，持续收集社会新闻与舆论信息，结合持仓结构做风险预判与预警提示。",
    tags: ["Kimi Skill", "金融数据", "GitHub 开源"],
  },
  {
    name: "个人在线简历 + 坦克大战小游戏",
    period: "2026.08",
    link: "https://github.com/89757-creater/rst-camp-2026",
    detail:
      "RST 竞赛训练营筛选作品（即本网站）：响应式简历 + Canvas 坦克大战，GitHub Actions 自动构建并部署到 GitHub Pages。",
    tags: ["React", "Canvas", "GitHub Pages"],
  },
];

/** 实践经历 */
export const experience = [
  {
    period: "2025.03 — 2025.06",
    title: "初二英语一对一辅导",
    role: "家教老师",
    detail:
      "学生基础薄弱，单词记不住、阅读看不懂，对英语有畏难情绪，成绩在 70 分左右徘徊。从词根入手帮他建立记忆方法，带他精读课文培养语感，布置适量巩固练习并及时讲解错题。三个月后学习兴趣明显提升，期末成绩提高到 95 分左右。",
  },
  {
    period: "2025.07 — 2025.08",
    title: "高一政治暑期辅导",
    role: "家教老师",
    detail:
      "学生知识点背了很多但考试不会组织答案，大题得分率低。带他梳理各单元知识框架，用“原理 + 材料分析”的答题模板训练主观题，教他从题干中定位考点。开学摸底考政治从班级中游进入前十。",
  },
  {
    period: "2024.09 — 2024.12",
    title: "小学五年级英语辅导",
    role: "家教老师",
    detail:
      "帮助学生从 80 分提高到 92 分，学习兴趣明显增强，能主动完成预习和复习。",
  },
];

/** 专业技能 */
export const skills = [
  {
    name: "英语教学",
    detail: "词根词缀记忆法、长难句精读、语感培养，覆盖小学至高中",
  },
  {
    name: "文科框架梳理",
    detail: "历史时间轴、政治逻辑链、主观题“原理 + 材料”答题模板",
  },
  {
    name: "AI 工具开发",
    detail: "阿里达摩院人工智能训练师（初/高级），用 Vibe Coding 开发并开源 AI Skill",
  },
  {
    name: "沟通与引导",
    detail: "因材施教，擅长与不同年龄段学生建立信任、激发主动性",
  },
];

/** 兴趣爱好 */
export const interests = ["文学", "阅读", "写作", "书法", "羽毛球", "志愿服务"];

/** 页脚 */
export const footer = {
  copyright: "© 2026 陈博皓 · 杭州师范大学",
  builtWith: "Designed & Built with React + Vite + Tailwind CSS",
};
