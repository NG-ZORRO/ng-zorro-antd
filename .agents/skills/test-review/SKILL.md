---
name: test-review
description: Review the value of NG-ZORRO tests. Use when asked whether a test should be kept, rewritten, or removed, especially for duplicated coverage or implementation-detail assertions.
---

# NG-ZORRO Test Review

Review tests for the public contract they protect; this is a review task, not a request to add tests or change production code. Inspect the relevant issue, documentation, demos, implementation, and nearby Vitest specifications as needed. Do not run tests unless the user asks for execution evidence.

State the claimed contract in observable terms: given a condition, a consumer should observe a result. A useful expected value has an independent source such as a reported regression, public API, documented behavior, accessibility semantics, browser behavior, or a user-visible result.

Prefer assertions on rendered DOM, ARIA semantics, emitted outputs, public API behavior, and interaction outcomes. Treat assertions of private helpers, intermediate state, temporary classes, CSS custom properties, or isolated style declarations as implementation-coupled unless the test has an independent visual or compatibility contract.

Check whether an existing spec already protects the same condition. Classify each reviewed test as:

- **Keep** — independently specified, externally observable, and non-duplicative.
- **Rewrite** — the intended regression is valid but its assertion is coupled to implementation.
- **Remove** — the expected value is derived from the same implementation, only proves existence, or duplicates an existing contract.

Lead with the classification and give the few strongest reasons. Offer a rewrite direction only when requested.
