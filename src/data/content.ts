// 作品集模拟数据
export const profile = {
  name: "DevimL",
  title: "创意全栈开发者 & 数字工匠",
  tagline: "在代码与创意的交汇处，构建未来的数字体验",
  bio: "专注于打造令人惊叹的Web应用和交互体验。5年+全栈开发经验，精通React生态、Node.js和云原生架构。热爱探索技术与艺术的融合边界。",
  location: "中国 · 深圳",
  email: "deviml99987@gmail.com",
  github: "https://github.com/DevimL9",
  linkedin: "https://linkedin.com/in/nexus-dev",
};

export const stats = [
  { label: "项目交付", value: "50+", suffix: "" },
  { label: "代码提交", value: "12K+", suffix: "" },
  { label: "开源贡献", value: "3", suffix: "个库" },
  { label: "客户好评", value: "100%", suffix: "" },
];

export const skills = [
  {
    category: "前端",
    icon: "Monitor",
    items: ["React", "TypeScript", "Next.js", "Vue 3", "Tailwind CSS", "Three.js"],
    color: "cyan" as const,
  },
  {
    category: "后端",
    icon: "Server",
    items: ["Node.js", "Python", "Go", "PostgreSQL", "Redis", "GraphQL"],
    color: "magenta" as const,
  },
  {
    category: "DevOps",
    icon: "Cloud",
    items: ["Docker", "K8s", "AWS", "CI/CD", "Terraform", "Monitoring"],
    color: "purple" as const,
  },
  {
    category: "设计",
    icon: "Palette",
    items: ["Figma", "Motion Design", "3D建模", "UI/UX", "品牌设计", "创意编码"],
    color: "green" as const,
  },
];

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  techStack: string[];
  color: "cyan" | "magenta" | "purple" | "green";
  year: string;
  link: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: "quantum-dashboard",
    title: "Quantum Dashboard",
    subtitle: "数据可视化平台",
    description: "为金融企业打造的实时数据分析仪表盘，支持多维度数据钻取和自定义图表组件。采用WebSocket实现实时数据推送，流畅的60fps动画过渡效果。",
    tags: ["数据可视化", "实时系统", "企业级"],
    techStack: ["React", "D3.js", "WebSocket", "Node.js"],
    color: "cyan",
    year: "2024",
    link: "#",
    featured: true,
  },
  {
    id: "synthwave-store",
    title: "SynthWave Store",
    subtitle: "沉浸式电商平台",
    description: "融合赛博朋克美学的下一代电商体验。3D产品预览、AI驱动的个性化推荐、以及丝滑的微交互设计，转化率提升340%。",
    tags: ["电商", "3D交互", "AI推荐"],
    techStack: ["Next.js", "Three.js", "Stripe", "TensorFlow.js"],
    color: "magenta",
    year: "2024",
    link: "#",
    featured: true,
  },
  {
    id: "neural-canvas",
    title: "Neural Canvas",
    subtitle: "AI创意工具",
    description: "基于扩散模型的在线创意工具，支持文字生成图像、风格迁移和智能编辑。集成多种AI模型，提供专业级的创作控制。",
    tags: ["AI工具", "创意编码", "SaaS"],
    techStack: ["Vue 3", "Python", "FastAPI", "Stable Diffusion"],
    color: "purple",
    year: "2023",
    link: "#",
    featured: true,
  },
  {
    id: "devflow",
    title: "DevFlow",
    subtitle: "开发者协作平台",
    description: "面向远程团队的开发者协作工具，集成代码审查、项目管理和实时通讯。支持VS Code插件和CLI工具链。",
    tags: ["协作工具", "开发者体验", "SaaS"],
    techStack: ["React", "Go", "gRPC", "PostgreSQL"],
    color: "green",
    year: "2023",
    link: "#",
    featured: false,
  },
  {
    id: "pixel-forge",
    title: "Pixel Forge",
    subtitle: "像素艺术编辑器",
    description: "浏览器端的像素艺术创作工具，支持图层管理、动画时间轴和调色板系统。使用WebAssembly实现高性能渲染。",
    tags: ["创意工具", "WebAssembly", "游戏开发"],
    techStack: ["Rust", "WebAssembly", "Canvas API", "React"],
    color: "cyan",
    year: "2023",
    link: "#",
    featured: false,
  },
  {
    id: "cloud-native-kit",
    title: "Cloud Native Kit",
    subtitle: "云原生脚手架",
    description: "开箱即用的云原生项目模板，集成微服务架构、服务网格、可观测性套件和自动化部署流水线。",
    tags: ["开源", "云原生", "DevOps"],
    techStack: ["Go", "Kubernetes", "Istio", "Prometheus"],
    color: "magenta",
    year: "2022",
    link: "#",
    featured: false,
  },
];

export const experience = [
  {
    role: "高级前端架构师",
    company: "ByteForge Technologies",
    period: "2022 - 至今",
    description: "主导前端技术栈升级，设计微前端架构，带领8人团队交付多个企业级项目。",
  },
  {
    role: "全栈开发工程师",
    company: "CyberWave Labs",
    period: "2020 - 2022",
    description: "负责核心产品开发，从0到1构建SaaS平台，实现10万+用户增长。",
  },
  {
    role: "前端开发工程师",
    company: "Digital Pulse Studio",
    period: "2019 - 2020",
    description: "参与多个创意项目开发，专注于交互动效和可视化领域。",
  },
];

export const testimonials = [
  {
    name: "张明远",
    role: "CTO @ ByteForge",
    content: "NEXUS的技术视野和执行力令人印象深刻。他主导的架构重构让我们的开发效率提升了200%。",
    avatar: "Z",
  },
  {
    name: "李思琪",
    role: "产品总监 @ CyberWave",
    content: "和NEXUS合作是一段非常愉快的经历。他总能在技术可行性和用户体验之间找到最佳平衡点。",
    avatar: "L",
  },
  {
    name: "王浩然",
    role: "创始人 @ StartupX",
    content: "NEXUS帮我们从零构建了整个产品。他的技术选型和架构设计让产品在早期就具备了良好的扩展性。",
    avatar: "W",
  },
];

export const navLinks = [
  { label: "首页", href: "#hero" },
  { label: "技能", href: "#skills" },
  { label: "作品", href: "#projects" },
  { label: "经历", href: "#experience" },
  { label: "评价", href: "#testimonials" },
  { label: "联系", href: "#contact" },
];
