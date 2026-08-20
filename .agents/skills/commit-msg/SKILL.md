---
name: commit-msg
description: Generate a conventional commit message for staged NG-ZORRO changes. Use when asked for a commit message, a git commit title, or a summary of staged changes.
---

# NG-ZORRO Commit Message

Generate a commit message from the change that will actually be committed. Inspect `git status --short`, `git diff --cached --stat`, `git diff --cached`, and recent commit subjects before drafting it. If nothing is staged, say so; include unstaged changes only when the user asks.

Follow `commitlint.config.js` and `CONTRIBUTING.md` as the authoritative format:

- use `type(scope): subject`, with an optional scope;
- choose one of `build`, `chore`, `ci`, `docs`, `feat`, `fix`, `perf`, `refactor`, `release`, `revert`, `style`, or `test`;
- use `module:<component>` for a component scope, or one of `showcase`, `release`, `packaging`, `changelog`, and `schematics` where applicable;
- write an imperative, lower-case subject without ending punctuation, keeping each line within 100 characters; and
- add a body or footer only when the user asks, the change needs motivation, or it carries a breaking-change or issue-closing reference.

Summarize the common intent of the entire staged set rather than listing files or copying the last commit. If the staged set has unrelated changes, point out the split before recommending a deliberately broad subject.

Return only the proposed subject by default. Explain the choice only when requested.
