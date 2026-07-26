# DevimL 个人作品集

这是一个使用 React、TypeScript 和 Vite 构建的个人作品集网站，用于展示个人技能、项目经历、职业经历和联系方式。

## 在线访问

- 网站地址：[https://deviml.ccwu.cc](https://deviml.ccwu.cc)
- GitHub 主页：[https://github.com/DevimL9](https://github.com/DevimL9)

## 主要功能

- 响应式单页布局，适配桌面端和移动端
- 导航栏定位与平滑滚动
- 首页打字机动画和粒子背景
- 技能、项目、职业经历和合作评价展示
- 滚动进入动画与交互反馈
- GitHub、邮箱等外部联系方式
- 联系表单输入校验

> 联系表单目前只包含前端校验和提交成功状态，尚未接入邮件服务或后端接口。

## 技术栈

- React 18
- TypeScript
- Vite 6
- Tailwind CSS
- Framer Motion
- Lucide React

## 本地运行

请先安装 Node.js 18 或更高版本。

```bash
npm install
npm run dev
```

启动后，根据终端输出访问本地开发地址。

## 生产构建

```bash
npm run build
```

构建完成后，生产文件会生成在 `dist` 目录中。将 `dist` 目录中的全部内容上传到 Web 服务器站点根目录即可部署。

如需在本地预览生产构建：

```bash
npm run preview
```

## 项目结构

```text
portfolio/
├─ public/                 静态资源
├─ src/
│  ├─ components/         页面组件
│  ├─ data/               个人资料和展示内容
│  ├─ hooks/              通用 React Hooks
│  ├─ App.tsx             页面结构入口
│  └─ main.tsx            应用入口
├─ index.html
├─ package.json
├─ tailwind.config.js
└─ vite.config.ts
```

## 修改个人信息

个人名称、邮箱、GitHub 地址、技能、项目和经历等内容集中在：

```text
src/data/content.ts
```

修改后重新执行 `npm run build`，并替换服务器上的 `dist` 内容。

## 联系方式

- GitHub：[DevimL9](https://github.com/DevimL9)
- 邮箱：deviml99987@gmail.com
