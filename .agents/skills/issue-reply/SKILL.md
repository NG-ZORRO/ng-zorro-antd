---
name: issue-reply
description: Triage and draft replies for NG-ZORRO GitHub issues. Use when asked to review, answer, label, close, or maintain issues.
---

# NG-ZORRO Issue Reply

First read the issue body, labels, linked issues or pull requests, and discussion. Classify the report as a reproducible bug, feature request, usage question, duplicate, or insufficient/invalid report. Check existing component documentation, APIs, demos, issues, and changelog entries before deciding that functionality is absent or a regression is unresolved.

Write in the language used by the reporter's issue body. Keep the response specific, polite, and actionable. Do not promise an implementation date or acceptance of a feature.

Apply the repository's community policy from `CONTRIBUTING.md` and `.github/nz-boot.yml`:

- For a bug without a minimal reproduction, request a StackBlitz reproduction or minimal repository and use the configured `Need Reproduce` / `Need More Info` flow.
- For a valid reproducible bug, recommend the appropriate component label; use `Component: <component>` where the report is clearly owned by one component.
- For a feature request, check whether an existing API already solves the scenario before discussing a new API. Major features need an issue discussion; small features may be proposed as a PR.
- For a usage question, help with a documented API when possible; otherwise direct support questions to the channels named in `CONTRIBUTING.md`.
- For a duplicate, point to the canonical issue and explain the closure succinctly.
- Do not close uncertain bugs, active discussions, or valid feature requests. The repository's no-response automation handles stale `Need More Info` issues after seven days.

For any request that would comment, label, assign, reopen, or close an issue, first produce a triage summary and proposed response/actions. Perform GitHub mutations only after the user confirms the proposal.
