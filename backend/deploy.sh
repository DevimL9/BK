#!/bin/bash

# Portfolio API 快速部署脚本
# 使用方法: chmod +x deploy.sh && ./deploy.sh

set -e

echo "🚀 Portfolio API 部署脚本"
echo "========================"

# 检查 Docker 是否安装
if ! command -v docker &> /dev/null; then
    echo "❌ Docker 未安装，请先安装 Docker"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose 未安装，请先安装 Docker Compose"
    exit 1
fi

# 检查 .env 文件
if [ ! -f .env ]; then
    echo "⚠️  未找到 .env 文件"
    if [ -f .env.example ]; then
        echo "📋 复制 .env.example 为 .env..."
        cp .env.example .env
        echo "✅ 已创建 .env 文件"
        echo ""
        echo "⚠️  请编辑 .env 文件配置以下内容："
        echo "   - ADMIN_PASSWORD: 管理员密码"
        echo "   - SMTP_*: 邮件配置"
        echo "   - NOTIFY_EMAIL: 接收通知的邮箱"
        echo ""
        read -p "配置完成后按 Enter 继续..."
    else
        echo "❌ 未找到 .env.example 文件"
        exit 1
    fi
fi

# 创建数据目录
echo "📁 创建数据目录..."
mkdir -p data

# 构建镜像
echo "🔨 构建 Docker 镜像..."
docker-compose build

# 停止旧容器
echo "🛑 停止旧容器..."
docker-compose down 2>/dev/null || true

# 启动新容器
echo "🚀 启动新容器..."
docker-compose up -d

# 等待服务启动
echo "⏳ 等待服务启动..."
sleep 5

# 检查健康状态
echo "🏥 检查服务健康状态..."
if curl -s http://localhost:3001/api/health | grep -q '"status":"ok"'; then
    echo "✅ 服务启动成功！"
else
    echo "⚠️  服务可能未完全启动，请稍等片刻后访问"
fi

echo ""
echo "========================"
echo "🎉 部署完成！"
echo ""
echo "📌 访问地址："
echo "   - 管理页面: http://你的域名或IP/admin"
echo "   - API 健康检查: http://你的域名或IP/api/health"
echo ""
echo "📌 常用命令："
echo "   - 查看日志: docker-compose logs -f"
echo "   - 重启服务: docker-compose restart"
echo "   - 停止服务: docker-compose down"
echo ""
echo "⚠️  请确保 Nginx 反向代理已配置！"
echo "========================"
