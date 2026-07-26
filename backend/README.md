# Portfolio 后端 API

基于 Node.js + Express + SQLite 的轻量级后端，用于接收和管理联系表单消息。

## ✨ 功能特性

- 📨 接收联系表单消息
- 💾 SQLite 数据库存储
- 📧 邮件通知（可选）
- 🔐 管理员认证
- 📊 管理页面查看消息
- 🛡️ 请求限流保护
- 🐳 Docker 部署支持

## 📁 项目结构

```
backend/
├── server.js           # 主服务器文件
├── package.json        # 依赖配置
├── Dockerfile          # Docker 镜像配置
├── docker-compose.yml  # Docker Compose 配置
├── deploy.sh           # 快速部署脚本
├── DEPLOY.md           # 部署文档
├── .env.example        # 环境变量示例
├── .dockerignore       # Docker 忽略文件
├── .gitignore          # Git 忽略文件
├── admin/              # 管理页面
│   └── index.html
└── data/               # 数据目录（自动创建）
    └── messages.db     # SQLite 数据库
```

## 🚀 快速开始

### 1. 配置环境变量

```bash
cp .env.example .env
# 编辑 .env 文件，配置管理员密码和邮件服务
```

### 2. 使用 Docker 部署

```bash
# 构建并启动
docker-compose up -d

# 查看日志
docker-compose logs -f

# 访问管理页面
# http://你的域名或IP/admin
```

### 3. 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

## 📡 API 接口

### 公开接口

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/messages` | 提交联系消息 |
| GET | `/api/health` | 健康检查 |

### 管理接口（需要认证）

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/admin/login` | 管理员登录 |
| POST | `/api/admin/logout` | 管理员登出 |
| GET | `/api/messages` | 获取所有消息 |
| GET | `/api/messages/unread-count` | 获取未读消息数量 |
| PATCH | `/api/messages/:id/read` | 标记消息为已读 |
| DELETE | `/api/messages/:id` | 删除消息 |
| PUT | `/api/admin/password` | 修改管理员密码 |

## 🔧 环境变量

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| PORT | 服务端口 | 3001 |
| NODE_ENV | 运行环境 | development |
| CORS_ORIGIN | 允许的前端域名 | * |
| ADMIN_PASSWORD | 管理员密码 | admin123 |
| DB_PATH | 数据库路径 | ./data/messages.db |
| SMTP_HOST | SMTP 服务器 | - |
| SMTP_PORT | SMTP 端口 | 587 |
| SMTP_SECURE | 使用 SSL | false |
| SMTP_USER | SMTP 用户名 | - |
| SMTP_PASS | SMTP 密码/授权码 | - |
| NOTIFY_EMAIL | 接收通知的邮箱 | - |

## 📦 资源占用

- **内存**: ~100-150MB
- **CPU**: 极低
- **磁盘**: ~50MB + 数据库文件

适合 1GB 内存的云服务器运行。

## 📄 许可证

MIT
