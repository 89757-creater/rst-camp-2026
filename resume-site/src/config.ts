/**
 * 简历内容配置 —— 全站文字都集中在这个文件
 * 修改内容只需要改这里，无需触碰任何组件代码
 * 标有 TODO 的字段请替换为你的真实信息
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
  // TODO: 替换为你的真实联系方式
  email: "chenbohao@example.com",
  wechat: "请替换为微信号",
  phone: "请替换为手机号",
};

/** 首屏下方的关键数据（value 为数字时会播放滚动计数动画） */
export const stats = [
  { value: 125, suffix: "", label: "高考英语", note: "浙江高考" },
  { value: 98, suffix: "", label: "高考政治", note: "浙江高考" },
  { value: 95, suffix: "", label: "高考历史", note: "浙江高考" },
  { value: 9, suffix: " 个年级", label: "可教跨度", note: "小学 — 高二" },
];

/** 关于我 */
export const about = {
  paragraphs: [
    "我是陈博皓，杭州师范大学汉语国际教育专业 2026 级本科生。性格随和，有耐心，相信好的引导比灌输更有力量。",
    "学习上我不主张死记硬背，更注重搭建知识框架——英语用“词根 + 语境”带词汇和阅读，历史和政治用时间轴、逻辑链把零散知识点串成体系，理解之后自然记住。",
    "专业训练让我对语言学习规律有系统的理解，也让我擅长与不同年龄段的人沟通。做事认真负责，习惯根据对方的具体情况调整节奏和方法。",
  ],
  traits: ["耐心细致", "善于引导", "框架思维", "认真负责"],
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
    name: "沟通与引导",
    detail: "因材施教，擅长与不同年龄段学生建立信任、激发主动性",
  },
  {
    name: "AI 工具应用",
    detail: "熟练使用 Kimi 等 AI 工具辅助备课、出题与知识整理",
  },
];

/** 兴趣爱好（TODO: 按你的真实情况调整） */
export const interests = ["阅读", "写作", "羽毛球", "书法", "志愿服务"];

/** 页脚 */
export const footer = {
  copyright: "© 2026 陈博皓 · 杭州师范大学",
  builtWith: "Designed & Built with React + Vite + Tailwind CSS",
};
