---
name: create-pr
description: Prepare or create an NG-ZORRO pull request using the repository template. Use when asked to open, draft, summarize, or create a PR for branch changes.
---

# NG-ZORRO Pull Request

Prepare a PR from the whole branch delta, not only the working tree or most recent commit. Inspect the current branch, remotes, its probable base, `git log <base>..HEAD`, and `git diff <base>...HEAD`. Use a user-specified base when present; otherwise infer it from repository state and flag uncertainty. `master` is the normal contribution target, while release and maintenance PRs must follow the project release workflow.

## Target repository

Open contribution PRs against `NG-ZORRO/ng-zorro-antd`; use `master` unless the user specifies another target. Resolve the PR destination independently of local remote names, which are not part of the workflow contract. Compare against the target repository's base branch, inspect that repository for an existing matching PR, and identify the owner and branch for the cross-repository head.

When presenting a PR proposal, state the target repository and base branch alongside the head in `<owner>:<branch>` form. After confirmation, re-check all three values before pushing and creating the PR.

Read and fill [`.github/PULL_REQUEST_TEMPLATE.md`](../../../.github/PULL_REQUEST_TEMPLATE.md) rather than inventing a body structure. Preserve its sections, remove instructional comments, and check only items supported by the branch contents and validation actually performed.

Draft:

- an English title that summarizes the branch's principal user-visible change and follows the repository's commit-message convention;
- the PR type matching the main outcome;
- current and new behavior, including the linked issue when known;
- an accurate breaking-change decision and migration information when applicable; and
- other information that helps review, such as focused validation or screenshots for visible changes.

Treat site-only, documentation-only, test-only, CI, and internal maintenance changes as such; do not manufacture user-facing behavior or release notes for them. For a release PR, defer to `version-release`.

Present the proposed target repository, base branch, head, title, body, and any assumptions for user confirmation before pushing a branch or calling `gh pr create`. Then create the PR only with the confirmed content.
