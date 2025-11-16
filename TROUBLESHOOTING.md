# GitHub Pages 部署故障排除

## 问题：页面显示空白或 404 错误

### 可能的原因和解决方案

#### 1. 浏览器缓存问题
**症状**：页面空白，控制台显示 404 错误

**解决方案**：
- 清除浏览器缓存：按 `Ctrl+Shift+Delete` (Windows) 或 `Cmd+Shift+Delete` (Mac)
- 或者使用无痕/隐私模式访问
- 或者硬刷新：`Ctrl+Shift+R` (Windows) 或 `Cmd+Shift+R` (Mac)

#### 2. 部署尚未完成
**症状**：访问网站显示 404 或空白

**解决方案**：
1. 检查 GitHub Actions 状态：
   - 进入仓库的 **Actions** 标签页
   - 查看最新的工作流运行状态
   - 确保显示绿色的 ✓ 表示成功
2. 等待 1-2 分钟让部署完成
3. 刷新页面

#### 3. 资源路径问题
**症状**：控制台显示 `GET .../src/main.tsx 404`

**解决方案**：
- 确保已推送最新的代码（包含修复）
- 检查 `vite.config.ts` 中的 `base` 路径是否正确
- 检查 `src/App.tsx` 中的 `basename` 是否正确

#### 4. 检查部署的文件
在 GitHub 仓库中：
1. 进入 **Settings** > **Pages**
2. 查看部署状态
3. 点击 "Visit site" 按钮测试

#### 5. 验证构建输出
本地测试构建：
```bash
npm run build
# 检查 dist/index.html 中的资源路径是否包含 /tencent-cloud-streaming-assistant/
```

### 当前配置检查清单

✅ `vite.config.ts` - base 路径设置为 `/tencent-cloud-streaming-assistant/`
✅ `src/App.tsx` - Router basename 设置为 `/tencent-cloud-streaming-assistant`
✅ `.github/workflows/deploy.yml` - 部署工作流配置正确

### 如果问题仍然存在

1. **检查浏览器控制台**（F12）：
   - 查看 Network 标签页，找出哪些资源加载失败
   - 查看 Console 标签页，查看 JavaScript 错误

2. **检查 GitHub Actions 日志**：
   - 进入仓库的 Actions 标签页
   - 点击最新的工作流运行
   - 查看构建日志，确认没有错误

3. **验证文件结构**：
   - 在 GitHub 仓库中，查看是否有 `dist` 目录（部署后会在 gh-pages 分支）
   - 确认 `index.html` 和资源文件都存在

4. **重新部署**：
   ```bash
   git push origin main
   ```
   然后等待 GitHub Actions 重新部署

