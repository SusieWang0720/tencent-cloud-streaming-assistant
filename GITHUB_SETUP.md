# GitHub 部署完整指南

## 📋 前置准备

1. 确保已安装 Git
2. 确保已注册 GitHub 账号
3. 确保项目已初始化 Git（已完成 ✅）

## 🚀 部署步骤

### 步骤 1: 在 GitHub 上创建新仓库

1. 访问 https://github.com 并登录
2. 点击右上角的 **"+"** 按钮，选择 **"New repository"**
3. 填写仓库信息：
   - **Repository name**: `tencent-cloud-streaming-assistant`（或你喜欢的名称）
   - **Description**: `Tencent Cloud Streaming Assistant - A modern streaming management platform`
   - 选择 **Public**（公开）或 **Private**（私有）
   - ⚠️ **不要**勾选 "Add a README file"、"Add .gitignore" 或 "Choose a license"
4. 点击 **"Create repository"** 按钮

### 步骤 2: 连接本地仓库到 GitHub

在终端中运行以下命令（**将 `YOUR_USERNAME` 替换为你的 GitHub 用户名**）：

```bash
cd "/Users/wangshuoxin/Desktop/推拉流助手"

# 添加远程仓库（替换 YOUR_USERNAME 为你的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/tencent-cloud-streaming-assistant.git

# 推送代码到 GitHub
git push -u origin main
```

**如果遇到认证问题**，可以使用以下方式之一：

#### 方式 A: 使用 Personal Access Token（推荐）
1. 访问 https://github.com/settings/tokens
2. 点击 "Generate new token" > "Generate new token (classic)"
3. 设置权限：勾选 `repo` 权限
4. 生成 token 后，在推送时使用：
   ```bash
   git push -u origin main
   # 用户名：你的 GitHub 用户名
   # 密码：粘贴刚才生成的 token
   ```

#### 方式 B: 使用 SSH（更安全）
```bash
# 添加 SSH 密钥到 GitHub，然后使用：
git remote set-url origin git@github.com:YOUR_USERNAME/tencent-cloud-streaming-assistant.git
git push -u origin main
```

### 步骤 3: 启用 GitHub Pages

1. 在 GitHub 仓库页面，点击 **Settings**（设置）
2. 在左侧菜单中找到 **Pages**（页面）
3. 在 **Source** 部分：
   - 选择 **"GitHub Actions"** 作为源
4. 保存设置

### 步骤 4: 等待自动部署

1. 推送代码后，GitHub Actions 会自动开始构建和部署
2. 在仓库页面点击 **Actions** 标签页查看部署进度
3. 部署完成后（通常需要 1-2 分钟），你的网站将在以下地址可用：
   ```
   https://YOUR_USERNAME.github.io/tencent-cloud-streaming-assistant/
   ```

## 🔧 重要配置说明

### 修改 base 路径

如果你的仓库名称不是 `tencent-cloud-streaming-assistant`，需要修改 `vite.config.ts` 中的 `base` 路径：

```typescript
base: process.env.NODE_ENV === 'production' ? '/你的仓库名称/' : '/',
```

### 更新部署

每次推送代码到 `main` 分支时，GitHub Actions 会自动重新部署网站。

## 📝 常用 Git 命令

```bash
# 查看状态
git status

# 添加所有更改
git add .

# 提交更改
git commit -m "描述你的更改"

# 推送到 GitHub
git push

# 查看远程仓库
git remote -v
```

## 🐛 故障排除

### 问题 1: 推送被拒绝
```bash
# 如果远程仓库有内容，先拉取：
git pull origin main --allow-unrelated-histories
# 然后再次推送
git push -u origin main
```

### 问题 2: 部署失败
- 检查 GitHub Actions 日志中的错误信息
- 确保 `package.json` 中的脚本正确
- 确保所有依赖都已正确安装

### 问题 3: 网站显示 404
- 检查 `vite.config.ts` 中的 `base` 路径是否正确
- 确保 GitHub Pages 设置中选择了 "GitHub Actions"
- 等待几分钟让 DNS 更新

## 📚 更多资源

- [GitHub Pages 文档](https://docs.github.com/en/pages)
- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [Vite 部署指南](https://vitejs.dev/guide/static-deploy.html)

