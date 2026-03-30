---
order: 7
title: LLMs.txt
tag: new
---

This guide explains how to enable AI tools to better understand NG-ZORRO.

## What is LLMs.txt?

We support [LLMs.txt](https://llmstxt.org/) files for making the NG-ZORRO documentation available to large language models (LLMs). This feature helps AI tools better understand our component library, its APIs, and usage patterns.

## Available Resources

### LLMs.txt Aggregated Files

We provide several aggregated files to help AI tools access our documentation:

| File                                                       | Description                                                                         |
| ---------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| [llms.txt](https://ng.ant.design/llms.txt)                 | Navigation file with links to all documentation and components                      |
| [llms-full.txt](https://ng.ant.design/llms-full.txt)       | Complete component documentation (English) with implementation details and examples |
| [llms-full-cn.txt](https://ng.ant.design/llms-full-cn.txt) | Complete component documentation (Chinese)                                          |

### Single Component Documentation

Access individual component documentation with `.md` suffix:

- `https://ng.ant.design/components/button.en.md` (English)
- `https://ng.ant.design/components/button.cn.md` (Chinese)

## Usage with AI Tools

| Tool               | Description                                                                                                                                                     | Prompt                                                                                                                             |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **Cursor**         | Use `@Docs` feature to include LLMs.txt, or add prompt to `.cursor/rules`. [Documentation](https://docs.cursor.com/context/@-symbols/@-docs)                    | `Read https://ng.ant.design/llms-full.txt and understand NG-ZORRO components. Use this knowledge when writing code with NG-ZORRO.` |
| **Windsurf**       | Add prompt to `.windsurf/rules` or use cascade memories. [Documentation](https://docs.windsurf.com/windsurf/cascade/memories)                                   | `Read https://ng.ant.design/llms-full.txt and understand NG-ZORRO components. Use this knowledge when writing code with NG-ZORRO.` |
| **Claude Code**    | Add to CLAUDE.md or use `/memory` to persist. [Documentation](https://docs.anthropic.com/en/docs/claude-code)                                                   | `Read https://ng.ant.design/llms-full.txt and understand NG-ZORRO components. Use this knowledge when writing code with NG-ZORRO.` |
| **GitHub Copilot** | Add to `.github/copilot-instructions.md`. [Documentation](https://docs.github.com/en/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot) | `Read https://ng.ant.design/llms-full.txt and understand NG-ZORRO components. Use this knowledge when writing code with NG-ZORRO.` |
| **Codex**          | Add to `.codex/settings.json` or AGENTS.md. [Documentation](https://github.com/openai/codex)                                                                    | `Read https://ng.ant.design/llms-full.txt and understand NG-ZORRO components. Use this knowledge when writing code with NG-ZORRO.` |
| **Gemini CLI**     | Use `--context` parameter or add to `.gemini/config.json`. [Documentation](https://ai.google.dev/gemini-api/docs?hl=en)                                         | `Read https://ng.ant.design/llms-full.txt and understand NG-ZORRO components. Use this knowledge when writing code with NG-ZORRO.` |
| **Trae**           | Add to project's knowledge sources in settings. [Documentation](https://trae.ai/docs)                                                                           | `Read https://ng.ant.design/llms-full.txt and understand NG-ZORRO components. Use this knowledge when writing code with NG-ZORRO.` |
| **Qoder**          | Add to `.qoder/config.yml` or use `@docs` in conversation. [Documentation](https://docs.qoder.com/)                                                             | `Read https://ng.ant.design/llms-full.txt and understand NG-ZORRO components. Use this knowledge when writing code with NG-ZORRO.` |
| **Neovate Code**   | Run `neovate` and describe task with prompt. [Documentation](https://github.com/neovateai/neovate-code)                                                         | `Read https://ng.ant.design/llms-full.txt and understand NG-ZORRO components. Use this knowledge when writing code with NG-ZORRO.` |
