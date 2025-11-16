# GitHub 部署指南

## 步骤 1: 在 GitHub 上创建仓库

1. 登录 GitHub (https://github.com)
2. 点击右上角的 "+" 按钮，选择 "New repository"
3. 填写仓库信息：
   - Repository name: `tencent-cloud-streaming-assistant` (或你喜欢的名称)
   - Description: `Tencent Cloud Streaming Assistant - Restream UI`
   - 选择 Public 或 Private
   - **不要**勾选 "Initialize this repository with a README"
4. 点击 "Create repository"

## 步骤 2: 连接本地仓库到 GitHub

在终端中运行以下命令（将 `YOUR_USERNAME` 替换为你的 GitHub 用户名）：

```bash
cd "/Users/wangshuoxin/Desktop/推拉流助手"
git remote add origin https://github.com/YOUR_USERNAME/tencent-cloud-streaming-assistant.git
git branch -M main
git push -u origin main
```

## 步骤 3: 使用 GitHub Pages 部署（可选）

### 方法 1: 使用 GitHub Actions（推荐）

1. 在项目根目录创建 `.github/workflows/deploy.yml` 文件
2. 文件内容已自动创建（见下方）
3. 推送代码到 GitHub
4. 在 GitHub 仓库设置中启用 GitHub Pages：
   - 进入 Settings > Pages
   - Source 选择 "GitHub Actions"

### 方法 2: 手动构建并部署

```bash
# 构建项目
npm run build

# 将 dist 目录的内容推送到 gh-pages 分支
# （需要先安装 gh-pages: npm install -D gh-pages）
npx gh-pages -d dist
```

## 步骤 4: 访问部署的网站

部署完成后，你的网站将在以下地址可用：
`https://YOUR_USERNAME.github.io/tencent-cloud-streaming-assistant/`

## 注意事项

- 如果使用 GitHub Pages，确保 `vite.config.ts` 中设置了正确的 `base` 路径
- 如果仓库名称不是 `tencent-cloud-streaming-assistant`，需要相应调整 base 路径

