---
order: 7
title: LLMs.txt
---

This guide explains how to enable AI tools like Cursor, Windsurf, and Claude to better understand `ng-zorro-antd`.

## What is LLMs.txt?

We support [LLMs.txt](https://llmstxt.org/) files for making the Ant Design documentation available to large language models (LLMs). This feature helps AI tools better understand our component library, its APIs, and usage patterns.

## Available Routes

We provide several LLMs.txt routes to help AI tools access our documentation:

- [llms.txt](https://ng.ant.design/llms.txt) - Contains a structured overview of all components and their documentation links
- [llms-full.txt](https://ng.ant.design/llms-full.txt) - Provides comprehensive documentation including implementation details and examples

## Usage with AI Tools

### GitHub Copilot

In GitHub Copilot, you can reference LLMs.txt files by adding them to your workspace's `.github/copilot-instructions.md` or mentioning the documentation URL directly in conversations.

[Learn more about GitHub Copilot instructions](https://docs.github.com/en/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot)

### Cursor

Use the `@Docs` feature in Cursor to include the LLMs.txt files in your project. This helps Cursor provide more accurate code suggestions and documentation for `ng-zorro-antd`.

[Read more about @Docs in Cursor](https://docs.cursor.com/context/@-symbols/@-docs)

### Windsurf

Reference the LLMs.txt files using `@` or in your `.windsurf/rules` files to enhance Windsurf's understanding of `ng-zorro-antd` components.

[Read more about Windsurf Memories](https://docs.windsurf.com/windsurf/cascade/memories)

### Claude Code

In Claude Code, add `LLMs.txt` to the workspace Knowledge Base (Docs / Context Files) configuration. This allows the file to be referenced during code completion and explanation, improving understanding of `ng-zorro-antd` components.

[Learn more about Claude Code document context configuration](https://code.claude.com/docs)

### Gemini CLI

In Gemini CLI, you can specify the `LLMs.txt` file path with the `--context` parameter or in `.gemini/config.json`, enabling Gemini to reference the document when answering or generating code.

[Learn more about Gemini CLI context configuration](https://ai.google.dev/gemini-api/docs?hl=en)

### Trae

In Trae, place the `LLMs.txt` file into the project’s knowledge sources and enable referencing in the settings.

[Learn more about Trae knowledge sources](https://trae.ai/docs)

### Qoder

In Qoder, you can add `LLMs.txt` as an external knowledge file in `.qoder/config.yml`, or temporarily reference it in a conversation with `@docs LLMs.txt`, enhancing support for `ng-zorro-antd` components.

[Learn more about Qoder configuration](https://docs.qoder.com/)

### Other AI Tools

Any AI tool that supports LLMs.txt can use these routes to better understand `ng-zorro-antd`. Simply point your tool to any of the routes above.
