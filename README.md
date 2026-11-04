# 我的学习库

一个阅读友好的个人学习库。
用 [Cloudflare Nimbus](https://github.com/cloudflare/nimbus)（Astro）展示。

## 快速开始

```sh
npm install
npm run dev
```

打开终端里显示的本地地址。

## 常用命令

这些命令默认由 AI 执行。

| 命令 | 作用 |
|---|---|
| `npm run dev` | 本地预览 |
| `npm run build` | 构建静态站点 |
| `npm run preview` | 预览构建结果 |
| `npm run lint:docs` | 检查内容 |
| `npm run typecheck` | 检查类型 |
| `npm run deploy` | 部署到 Cloudflare（可选） |

## 部署

推送到 `main` 后，GitHub Actions 自动发布。

- 站点地址：https://konghaoyao.github.io/learn/
- 本地预览：http://localhost:4321/learn/

## 目录

| 路径 | 用途 |
|---|---|
| `inbox/` | 快速捕获，不发布 |
| `templates/` | 模板 |
| `src/content/docs/` | 发布区，Nimbus 渲染 |
| `src/content/docs/notes/` | 长期笔记 |
| `src/content/docs/log/` | 学习日志 |
| `src/content/docs/projects/` | 练习 |
| `src/content/docs/meta/` | 规范、证据、调整记录 |
| `public/assets/` | 图片和图表 |
| `public/reference/` | 外部原文存档 |
| `CLAUDE.md` | AI 规则 |
| `AGENT.md` | Nimbus 技术规则 |

## 第一次使用

你只需要说出想学什么。

AI 会：

1. 建主题目录。
2. 复制模板。
3. 写笔记和索引。
4. 记录当天日志。

## 注意

- 正式域名在 `astro.config.ts` 里改。
- 发布前运行 `npm run lint:docs` 和 `npm run build`。
- 不把密钥、密码、个人隐私写进仓库。
