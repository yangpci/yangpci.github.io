# yangpci.github.io

个人 GitHub Pages 站点，使用 Markdown + Jekyll 构建。

## 1. 本地预览

```bash
bundle install
bundle exec jekyll serve
```

浏览器访问 http://localhost:4000

## 2. 远程发布

推送到 `main` 分支后，站点会自动发布到 https://yangpci.github.io

首次使用需在 GitHub 仓库 **Settings → Pages** 中确认 Source 为 `Deploy from a branch`，Branch 选择 `main` / `/ (root)`。

## 3. 树形导航

左侧目录由 `_data/navigation.yml` 配置，支持多级嵌套。新增页面后，在该文件中添加对应条目即可。
