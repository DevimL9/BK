require('dotenv').config();
const express = require('express');
const cors = require('cors');
const initSqlJs = require('sql.js');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const rateLimit = require('express-rate-limit');
const path = require('path');
const crypto = require('crypto');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

// ============ 中间件 ============

// CORS 配置
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '1mb' }));

// 安全头配置
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// 限流配置 - 防止滥用
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 分钟
  max: 100, // 每个 IP 最多 100 个请求
  message: { error: '请求过于频繁，请稍后再试' }
});

const messageLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 小时
  max: 10, // 每小时最多 10 条消息
  message: { error: '发送消息过于频繁，请稍后再试' }
});

app.use('/api/', apiLimiter);

// ============ 数据库初始化 ============

const dbPath = process.env.DB_PATH || path.join(__dirname, 'data', 'messages.db');
let db = null;

// sql.js 包装器：模拟 better-sqlite3 的同步 API
function prepareAndRun(sql, params = []) {
  const stmt = db.prepare(sql);
  stmt.bind(params);
  stmt.step();
  const changes = db.getRowsModified();
  stmt.free();
  saveDb();
  return { changes, lastInsertRowid: db.exec("SELECT last_insert_rowid()")[0]?.values[0]?.[0] };
}

function prepareAndGet(sql, params = []) {
  const stmt = db.prepare(sql);
  stmt.bind(params);
  let result = null;
  if (stmt.step()) {
    result = stmt.getAsObject();
  }
  stmt.free();
  return result;
}

function prepareGetAll(sql, params = []) {
  const stmt = db.prepare(sql);
  if (params.length > 0) stmt.bind(params);
  const results = [];
  while (stmt.step()) {
    results.push(stmt.getAsObject());
  }
  stmt.free();
  return results;
}

function saveDb() {
  const data = db.export();
  const buffer = Buffer.from(data);
  const dir = path.dirname(dbPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(dbPath, buffer);
}

async function initDatabase() {
  const SQL = await initSqlJs();

  // 尝试加载已有数据库文件
  if (fs.existsSync(dbPath)) {
    const fileBuffer = fs.readFileSync(dbPath);
    db = new SQL.Database(fileBuffer);
  } else {
    db = new SQL.Database();
  }

  // 创建消息表
  db.run(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      is_read INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // 创建管理员表
  db.run(`
    CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // 创建会话表
  db.run(`
    CREATE TABLE IF NOT EXISTS sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      token TEXT UNIQUE NOT NULL,
      admin_id INTEGER NOT NULL,
      expires_at DATETIME NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (admin_id) REFERENCES admins(id)
    )
  `);

  saveDb();

  // 初始化默认管理员
  const adminExists = prepareAndGet('SELECT id FROM admins WHERE username = ?', ['admin']);
  if (!adminExists) {
    const defaultPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const passwordHash = bcrypt.hashSync(defaultPassword, 10);
    prepareAndRun('INSERT INTO admins (username, password_hash) VALUES (?, ?)', ['admin', passwordHash]);
    console.log('✅ 默认管理员已创建 (用户名: admin)');
    console.log('⚠️  请立即修改默认密码！');
    console.log('⚠️  当前默认密码: ' + defaultPassword);
    console.log('⚠️  请登录后立即修改密码！');
  }
}

// ============ 邮件配置 ============

let transporter = null;

const initEmailTransporter = () => {
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
    console.log('✅ 邮件服务已配置');
  } else {
    console.log('⚠️  邮件服务未配置（设置 SMTP_* 环境变量以启用）');
  }
};

initEmailTransporter();

// HTML 转义函数 - 防止 XSS
const escapeHtml = (text) => {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
};

// 发送邮件通知
const sendEmailNotification = async (message) => {
  if (!transporter || !process.env.NOTIFY_EMAIL) {
    return;
  }

  try {
    await transporter.sendMail({
      from: `"Portfolio" <${process.env.SMTP_USER}>`,
      to: process.env.NOTIFY_EMAIL,
      subject: `新消息: ${escapeHtml(message.name)}`,
      html: `
        <h2>收到新的联系消息</h2>
        <p><strong>姓名:</strong> ${escapeHtml(message.name)}</p>
        <p><strong>邮箱:</strong> ${escapeHtml(message.email)}</p>
        <p><strong>时间:</strong> ${new Date().toLocaleString('zh-CN')}</p>
        <hr>
        <p><strong>消息内容:</strong></p>
        <p>${escapeHtml(message.message).replace(/\n/g, '<br>')}</p>
      `
    });
    console.log('✅ 邮件通知已发送');
  } catch (error) {
    console.error('❌ 邮件发送失败:', error.message);
  }
};

// ============ 认证中间件 ============

const generateToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: '未授权访问' });
  }

  const token = authHeader.substring(7);

  const session = prepareAndGet(`
    SELECT s.*, a.username
    FROM sessions s
    JOIN admins a ON s.admin_id = a.id
    WHERE s.token = ? AND s.expires_at > datetime('now')
  `, [token]);

  if (!session) {
    return res.status(401).json({ error: '会话已过期，请重新登录' });
  }

  req.admin = { id: session.admin_id, username: session.username };
  next();
};

// ============ API 路由 ============

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 提交联系消息
app.post('/api/messages', messageLimiter, (req, res) => {
  const { name, email, message } = req.body;

  // 验证输入
  if (!name || !email || !message) {
    return res.status(400).json({ error: '请填写所有必填字段' });
  }

  if (name.length > 100) {
    return res.status(400).json({ error: '姓名过长' });
  }

  if (email.length > 200 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: '请输入有效的邮箱地址' });
  }

  if (message.length > 5000) {
    return res.status(400).json({ error: '消息内容过长' });
  }

  try {
    const result = prepareAndRun('INSERT INTO messages (name, email, message) VALUES (?, ?, ?)', [name.trim(), email.trim(), message.trim()]);

    // 异步发送邮件通知
    sendEmailNotification({ name: name.trim(), email: email.trim(), message: message.trim() });

    res.status(201).json({
      success: true,
      message: '消息已发送',
      id: result.lastInsertRowid
    });
  } catch (error) {
    console.error('保存消息失败:', error);
    res.status(500).json({ error: '服务器错误，请稍后再试' });
  }
});

// 管理员登录
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: '请填写用户名和密码' });
  }

  const admin = prepareAndGet('SELECT * FROM admins WHERE username = ?', [username]);

  if (!admin || !bcrypt.compareSync(password, admin.password_hash)) {
    return res.status(401).json({ error: '用户名或密码错误' });
  }

  // 生成会话 token（7天有效）
  const token = generateToken();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

  prepareAndRun('INSERT INTO sessions (token, admin_id, expires_at) VALUES (?, ?, ?)', [token, admin.id, expiresAt]);

  res.json({
    success: true,
    token,
    username: admin.username
  });
});

// 管理员登出
app.post('/api/admin/logout', authMiddleware, (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.substring(7);

  prepareAndRun('DELETE FROM sessions WHERE token = ?', [token]);

  res.json({ success: true, message: '已登出' });
});

// 获取所有消息（需要认证）
app.get('/api/messages', authMiddleware, (req, res) => {
  const { page = 1, limit = 50, unread_only = false } = req.query;
  const offset = (parseInt(page) - 1) * parseInt(limit);

  let query = 'SELECT * FROM messages';
  let countQuery = 'SELECT COUNT(*) as total FROM messages';
  const params = [];
  const countParams = [];

  if (unread_only === 'true') {
    query += ' WHERE is_read = 0';
    countQuery += ' WHERE is_read = 0';
  }

  query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';

  const messages = prepareGetAll(query, [parseInt(limit), offset]);
  const countResult = prepareAndGet(countQuery, countParams);
  const total = countResult ? countResult.total : 0;

  res.json({
    messages,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / parseInt(limit))
    }
  });
});

// 获取未读消息数量
app.get('/api/messages/unread-count', authMiddleware, (req, res) => {
  const result = prepareAndGet('SELECT COUNT(*) as count FROM messages WHERE is_read = 0');
  res.json({ count: result ? result.count : 0 });
});

// 标记消息为已读
app.patch('/api/messages/:id/read', authMiddleware, (req, res) => {
  const { id } = req.params;

  const result = prepareAndRun('UPDATE messages SET is_read = 1 WHERE id = ?', [id]);

  if (result.changes === 0) {
    return res.status(404).json({ error: '消息不存在' });
  }

  res.json({ success: true, message: '已标记为已读' });
});

// 删除消息
app.delete('/api/messages/:id', authMiddleware, (req, res) => {
  const { id } = req.params;

  const result = prepareAndRun('DELETE FROM messages WHERE id = ?', [id]);

  if (result.changes === 0) {
    return res.status(404).json({ error: '消息不存在' });
  }

  res.json({ success: true, message: '消息已删除' });
});

// 修改管理员密码
app.put('/api/admin/password', authMiddleware, (req, res) => {
  const { current_password, new_password } = req.body;

  if (!current_password || !new_password) {
    return res.status(400).json({ error: '请填写当前密码和新密码' });
  }

  if (new_password.length < 6) {
    return res.status(400).json({ error: '新密码至少6位' });
  }

  if (new_password.length > 128) {
    return res.status(400).json({ error: '新密码过长' });
  }

  const admin = prepareAndGet('SELECT * FROM admins WHERE id = ?', [req.admin.id]);

  if (!bcrypt.compareSync(current_password, admin.password_hash)) {
    return res.status(401).json({ error: '当前密码错误' });
  }

  const newPasswordHash = bcrypt.hashSync(new_password, 10);
  prepareAndRun('UPDATE admins SET password_hash = ? WHERE id = ?', [newPasswordHash, admin.id]);

  // 清除所有会话（强制重新登录）
  prepareAndRun('DELETE FROM sessions WHERE admin_id = ?', [admin.id]);

  res.json({ success: true, message: '密码已修改，请重新登录' });
});

// ============ 静态文件服务 ============

// 前端 dist
app.use(express.static(path.join(__dirname, '..', 'dist')));

// 管理页面
app.use('/admin', express.static(path.join(__dirname, 'admin')));

// 前端 SPA 回退：非 /api 和 /admin 的请求返回 index.html
app.get('*', (req, res) => {
  if (req.path.startsWith('/api') || req.path.startsWith('/admin')) {
    return res.status(404).json({ error: '未找到' });
  }
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

// ============ 启动服务器 ============

async function start() {
  await initDatabase();

  app.listen(PORT, () => {
    console.log(`🚀 服务器已启动: http://localhost:${PORT}`);
    console.log(`📊 管理页面: http://localhost:${PORT}/admin`);
    console.log(`💾 数据库: ${dbPath}`);
  });
}

start();

// 优雅关闭
process.on('SIGINT', () => {
  console.log('\n🛑 正在关闭服务器...');
  saveDb();
  if (db) db.close();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 正在关闭服务器...');
  saveDb();
  if (db) db.close();
  process.exit(0);
});
