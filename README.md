# Hellowen

基于 [morethan-log](https://github.com/morethanmin/morethan-log) 视觉设计的中文个人日志站。

当前版本不依赖 Notion，文章直接保存在仓库的 `content/` 目录中，部署时由 Next.js 读取并生成页面。

## 写文章

在 `content/` 下新建 Markdown 文件，例如 `content/my-first-post.md`：

```markdown
---
title: 我的第一篇文章
slug: my-first-post
date: 2026-09-24
type: Post
status: Public
category: 随笔
tags: 学习, 生活
summary: 文章摘要
author: Presson8
---

正文写在这里。

支持标题、段落、列表、引用、链接、代码块和行内代码。
```

保存后提交到 GitHub，Vercel 会自动重新构建网站。

## 本地运行

```bash
yarn install
yarn dev
```

打开 http://localhost:3000 查看效果。

## 部署

可以直接在 Vercel 中导入 `presson8/morethan-log`：

1. 选择 GitHub 仓库。
2. Framework Preset 选择 Next.js。
3. 不需要配置 `NOTION_PAGE_ID`。
4. 点击 Deploy。

以后只需要修改 `content/*.md` 或 `site.config.js`，提交到 `main` 分支，Vercel 就会自动部署最新版本。

## 主要配置

- `site.config.js`：头像、昵称、简介、博客标题和社交链接。
- `content/*.md`：文章内容及文章元数据。
- `src/apis/local-content/index.ts`：读取本地 Markdown。
- `src/components/MarkdownRenderer.tsx`：渲染文章正文。

## 视觉来源

本项目保留 morethan-log 的 Feed、侧栏、标签筛选、搜索、深色主题和文章详情页结构，并将内容来源替换为本地 Markdown。

原项目：[morethanmin/morethan-log](https://github.com/morethanmin/morethan-log)

## License

MIT
