# Malize 的博客

VuePress 1 + Vdoing。文章源码位于 `docs/`，网站配置位于 `docs/.vuepress/`。

## 本地预览

使用 `.nvmrc` 中的 Node 22 版本：

```sh
nvm use
npm ci
npm run dev
```

绘图插件通过 Chrome 将 `docs/.vuepress/drawio/` 中的图转换成 SVG。
本地安装 Chrome 后会自动检测，也可通过 `CHROME_PATH` 指定路径。

## 发布博客

在 `master` 分支修改文章或配置，提交并推送源码：

```sh
git add docs
git commit -m "docs: 更新文章"
git push origin master
```

GitHub Actions 的 **Deploy blog** 工作流自动安装依赖、构建静态网页并发布到 GitHub Pages。
不再需要运行 `deploy.sh`，也不需要把打包文件提交或推送到分支。
构建失败时不会执行发布。

工作流状态：<https://github.com/Merrizee/Merrizee.github.io/actions/workflows/ci.yml>
正式网站：<https://www.malize.cn/>

## 仓库的一次性配置

- 默认分支设置为 `master`，使源码和工作流成为仓库的默认内容。
- **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。
- 保留自定义域名 `www.malize.cn`。
- 如果 `github-pages` 环境限制部署分支，允许 `master`。

旧 `main` 分支中的静态文件可以作为历史备份保留；新流程不再写入该分支。

## 其他命令

- `npm run build`：本地验证生产构建，输出到 `docs/.vuepress/dist/`。
- `npm run editFm`：按 `utils/config.yml` 批量调整文章元数据。
- 百度链接推送有独立工作流，与博客部署分开运行。

依赖有变更时一并提交 `package.json` 和 `package-lock.json`。
