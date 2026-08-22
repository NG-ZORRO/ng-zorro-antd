---
name: changelog-collect
description: Collect and draft NG-ZORRO changelog entries between releases or branches. Use when asked to compare release ranges, collect PR changes, or prepare changelog content before release staging.
---

# NG-ZORRO Changelog Collection

Use this skill to analyze a release range and prepare a reviewable changelog draft. Use `version-release` for version bumps, release branches, Azure publishing, and writing the final release files.

Establish the range from the requested tags or branches. Inspect the commits in that range and associated pull requests when available; use the complete branch delta, not commit subjects alone. Compare changed public APIs, documentation, and user-visible behavior when a commit message is ambiguous.

Draft entries in the existing root [`CHANGELOG.md`](../../../CHANGELOG.md) style:

- group public changes under the conventional generated headings such as Features, Bug Fixes, Performance Improvements, and Breaking Changes;
- keep component scopes and API identifiers accurate;
- describe the effect on library users rather than the implementation; and
- retain issue or PR references when they identify the public change.

Exclude pure formatting, CI, routine tooling, internal refactors, and tests unless they change the distributed package, public API, documented behavior, accessibility, or performance in a user-relevant way. Treat dependency updates case by case: retain them only when their externally visible consequence is known.

Call out breaking changes, deprecations, and migration requirements explicitly. Present the range, draft entries, excluded changes, and unresolved items for review before editing changelog files. Do not change versions or stage a release as part of collection.
