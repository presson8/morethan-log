---
title: Codex 切换为 ChatGPT 官方登录操作指南
slug: codex-chatgpt-login
date: 2026-09-24
type: Post
status: Public
category: 教程
tags: Codex, ChatGPT, 登录
summary: 处理旧 API Key、清理自定义模型缓存，并完成 Codex 官方账号登录。
author: Presson8
---

# Codex 切换为 ChatGPT 官方登录操作指南

## 一、问题描述

在尝试将 Codex 从 DeepSeek 的 API Key 登录切换回 ChatGPT 官方账号登录时，终端可能提示登录成功，但桌面端的“选择模型”下拉框仍显示 DeepSeek 模型。

常见原因是配置文件写死了 DeepSeek 模型，本地残留了自定义模型列表文件 `models.json`，或者桌面端 GUI 没有彻底重启。

## 二、具体操作步骤

### 步骤 1：账号安全与准备

切换登录方式前，先处理已经暴露的旧凭证：

- 前往 DeepSeek 开发者后台，永久删除或废弃此前用于测试的 API Key，防止被盗刷。
- 确认 Codex 本地执行文件路径，后续使用绝对路径执行命令。

### 步骤 2：修改核心配置文件 `config.toml`

打开 `C:\\Users\\wswwwynl\\.codex\\config.toml`，删除或注释所有强制使用 DeepSeek 的配置：

- `model = "deepseek-v4-..."`
- `model_provider = "deepseek"`
- `preferred_auth_method = "apikey"`
- `forced_login_method = "api"`
- `model_catalog_json = "C:/Users/wswwwynl/.codex/models.json"`

然后添加：

```toml
forced_login_method = "chatgpt"
```

同时删除文件底部的 `[model_providers.deepseek]` 配置块及其全部内容，保存并关闭文件。

### 步骤 3：清理界面模型缓存

进入 `C:\\Users\\wswwwynl\\.codex\\`，找到 `models.json` 并删除，或重命名为 `models.json.bak`。

### 步骤 4：在终端执行官方账号登录

在 PowerShell 中使用 Codex 的绝对路径执行：

```powershell
& "C:\\Users\\wswwwynl\\AppData\\Local\\OpenAI\\Codex\\bin\\cdef5aaf3e41ab53\\codex.exe" logout
& "C:\\Users\\wswwwynl\\AppData\\Local\\OpenAI\\Codex\\bin\\cdef5aaf3e41ab53\\codex.exe" login
```

浏览器会打开 ChatGPT 官方登录页面。按照提示登录并授权，终端出现 `Successfully logged in` 即表示成功。

### 步骤 5：彻底重启桌面端应用

1. 关闭 Codex 桌面端窗口。
2. 按 `Ctrl + Shift + Esc` 打开任务管理器。
3. 结束所有 Codex、Electron 或相关残留进程。
4. 重新打开 Codex 桌面端。

### 步骤 6：验证结果

打开“选择模型”下拉框，确认 DeepSeek 选项已消失，并显示 OpenAI 官方模型。

如果仍有残留，进入 Codex 设置手动切换为官方模型。

> 提醒：不同版本的 Codex 配置项和模型名称可能不同，修改前请先备份配置文件。
