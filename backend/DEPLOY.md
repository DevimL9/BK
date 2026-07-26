# Portfolio 后端部署指南

## 📋 前置要求

- 云服务器：2vCPU / 1GB 内存 / 30GB SSD
- 已安装：宝塔面板 + Docker
- 域名或 IP：`http://101.37.84.170`

---

## 🚀 部署步骤

### 第一步：上传后端代码

将 `portfolio/backend/` 文件夹上传到服务器，建议路径：
```
/www/wwwroot/portfolio-api/
```

### 第二步：配置环境变量

1. 复制环境变量示例文件：
```bash
cd /www/wwwroot/portfolio-api/
cp .env.example .env
```

2. 编辑 `.env` 文件：
```bash
vi .env
```

3. 修改以下配置：
```env
# 服务器配置
PORT=3001
NODE_ENV=production

# 你的前端域名/IP
CORS_ORIGIN=http://101.37.84.170

# 管理员密码（请立即修改！）
ADMIN_PASSWORD=你的安全密码

# 数据库路径
DB_PATH=/app/data/messages.db

# SMTP 邮件配置（以 QQ 邮箱为例）
SMTP_HOST=smtp.qq.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=你的QQ邮箱@qq.com
SMTP_PASS=你的SMTP授权码

# 接收通知的邮箱
NOTIFY_EMAIL=你的QQ邮箱@qq.com
```

### 第三步：获取 QQ 邮箱 SMTP 授权码

1. 登录 QQ 邮箱
2. 进入：设置 → 账户 → POP3/IMAP/SMTP/Exchange/CardDAV/CalDAV服务
3. 开启 SMTP 服务
4. 生成授权码
5. 将授权码填入 `.env` 文件的 `SMTP_PASS`

### 第四步：使用 Docker 部署

1. 进入后端目录：
```bash
cd /www/wwwroot/portfolio-api/
```

2. 构建 Docker 镜像：
```bash
docker-compose build
```

3. 启动服务：
```bash
docker-compose up -d
```

4. 查看运行状态：
```bash
docker-compose ps
docker-compose logs -f
```

5. 验证服务：
```bash
curl http://localhost:3001/api/health
```

应该返回：
```json
{"status":"ok","timestamp":"2026-07-21T..."}
```

### 第五步：配置 Nginx 反向代理

1. 在宝塔面板中，找到你的网站配置
2. 点击"设置" → "反向代理"
3. 添加反向代理：
   - 代理名称：`portfolio-api`
   - 目标URL：`http://127.0.0.1:3001`
   - 发送域名：`$host`
   
4. 或者手动编辑 Nginx 配置，在 `server` 块中添加：

```nginx
# 后端 API 反向代理
location /api/ {
    proxy_pass http://127.0.0.1:3001;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}

# 管理页面
location /admin {
    proxy_pass http://127.0.0.1:3001;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

5. 重载 Nginx：
```bash
nginx -s reload
```

### 第六步：重新构建前端

1. 在本地修改前端代码后，重新构建：
```bash
cd portfolio/
npm run build
```

2. 上传新的 `dist/` 文件夹到服务器覆盖原文件

---

## 🔧 常用命令

### Docker 管理
```bash
# 查看运行状态
docker-compose ps

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down

# 重启服务
docker-compose restart

# 重新构建并启动
docker-compose up -d --build
```

### 数据库备份
```bash
# 备份数据库
cp /www/wwwroot/portfolio-api/data/messages.db /www/backup/messages_$(date +%Y%m%d).db

# 恢复数据库
cp /www/backup/messages_20260721.db /www/wwwroot/portfolio-api/data/messages.db
docker-compose restart
```

### 修改管理员密码
```bash
# 方法1：通过管理页面修改
# 访问 http://101.37.84.170/admin 登录后修改

# 方法2：直接修改环境变量
vi .env  # 修改 ADMIN_PASSWORD
docker-compose restart
```

---

## 📊 访问地址

- **前端网站**: http://101.37.84.170
- **管理页面**: http://101.37.84.170/admin
- **API 健康检查**: http://101.37.84.170/api/health

---

## 🔒 安全建议

1. **立即修改默认密码**
2. **使用强密码**（至少8位，包含大小写字母、数字、特殊字符）
3. **定期备份数据库**
4. **查看访问日志**，发现异常及时处理

---

## ❓ 常见问题

### Q: 邮件发送失败？
A: 检查 SMTP 配置是否正确，授权码是否过期

### Q: 无法访问管理页面？
A: 检查 Nginx 反向代理配置，确保 3001 端口正常

### Q: 表单提交失败？
A: 检查 CORS 配置，确保 `CORS_ORIGIN` 与前端域名一致

### Q: 内存不足？
A: 1GB 内存足够运行，如果仍有问题，检查是否有其他服务占用过多内存

---

## 📞 技术支持

如有问题，请检查：
1. Docker 日志：`docker-compose logs -f`
2. Nginx 错误日志：`/www/wwwlogs/error.log`
3. 服务器资源：`htop` 或宝塔面板监控
