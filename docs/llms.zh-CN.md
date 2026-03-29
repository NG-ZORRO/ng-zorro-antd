---
order: 7
title: LLMs.txt
tag: new
---

本指南介绍如何让 AI 工具更好地理解 NG-ZORRO 组件库。

## 什么是 LLMs.txt？

我们支持通过 [LLMs.txt](https://llmstxt.org/) 文件向大语言模型（LLMs）提供 `ng-zorro-antd` 文档。此功能可帮助 AI 工具更好地理解我们的组件库、API 及使用模式。

## 可用资源

### LLMs.txt 聚合文件

我们提供多个聚合文件来帮助 AI 工具访问文档：

| 文件                                                       | 说明                                       |
| ---------------------------------------------------------- | ------------------------------------------ |
| [llms.txt](https://ng.ant.design/llms.txt)                 | 导航文件，包含所有文档和组件的链接         |
| [llms-full.txt](https://ng.ant.design/llms-full.txt)       | 完整的组件文档（英文），包含实现细节和示例 |
| [llms-full-cn.txt](https://ng.ant.design/llms-full-cn.txt) | 完整的组件文档（中文）                     |

### 单个组件文档

通过 `.md` 后缀直接访问单个组件文档：

- `https://ng.ant.design/components/button.en.md`（英文）
- `https://ng.ant.design/components/button.cn.md`（中文）

## 在 AI 工具中的使用

| 工具               | 说明                                                                                                                                                   | 提示词                                                                                                     |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| **Cursor**         | 使用 `@Docs` 功能引入 LLMs.txt，或添加提示词到 `.cursor/rules`。[文档](https://docs.cursor.com/zh/context/@-symbols/@-docs)                            | `阅读 https://ng.ant.design/llms-full-cn.txt 并理解 NG-ZORRO 组件库，在编写 NG-ZORRO 代码时使用这些知识。` |
| **Windsurf**       | 添加提示词到 `.windsurf/rules` 或使用 cascade memories。[文档](https://docs.windsurf.com/windsurf/cascade/memories)                                    | `阅读 https://ng.ant.design/llms-full-cn.txt 并理解 NG-ZORRO 组件库，在编写 NG-ZORRO 代码时使用这些知识。` |
| **Claude Code**    | 添加到 CLAUDE.md 或使用 `/memory` 持久化。[文档](https://docs.anthropic.com/en/docs/claude-code)                                                       | `阅读 https://ng.ant.design/llms-full-cn.txt 并理解 NG-ZORRO 组件库，在编写 NG-ZORRO 代码时使用这些知识。` |
| **GitHub Copilot** | 添加到 `.github/copilot-instructions.md`。[文档](https://docs.github.com/zh/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot) | `阅读 https://ng.ant.design/llms-full-cn.txt 并理解 NG-ZORRO 组件库，在编写 NG-ZORRO 代码时使用这些知识。` |
| **Codex**          | 添加到 `.codex/settings.json` 或 AGENTS.md。[文档](https://github.com/openai/codex)                                                                    | `阅读 https://ng.ant.design/llms-full-cn.txt 并理解 NG-ZORRO 组件库，在编写 NG-ZORRO 代码时使用这些知识。` |
| **Gemini CLI**     | 使用 `--context` 参数或添加到 `.gemini/config.json`。[文档](https://ai.google.dev/gemini-api/docs?hl=zh-cn)                                            | `阅读 https://ng.ant.design/llms-full-cn.txt 并理解 NG-ZORRO 组件库，在编写 NG-ZORRO 代码时使用这些知识。` |
| **Trae**           | 添加到项目的知识源设置中。[文档](https://trae.ai/docs)                                                                                                 | `阅读 https://ng.ant.design/llms-full-cn.txt 并理解 NG-ZORRO 组件库，在编写 NG-ZORRO 代码时使用这些知识。` |
| **Qoder**          | 添加到 `.qoder/config.yml` 或在对话中使用 `@docs`。[文档](https://docs.qoder.com/)                                                                     | `阅读 https://ng.ant.design/llms-full-cn.txt 并理解 NG-ZORRO 组件库，在编写 NG-ZORRO 代码时使用这些知识。` |
| **Neovate Code**   | 运行 `neovate` 并使用提示词描述任务。[文档](https://github.com/neovateai/neovate-code)                                                                 | `阅读 https://ng.ant.design/llms-full-cn.txt 并理解 NG-ZORRO 组件库，在编写 NG-ZORRO 代码时使用这些知识。` |
