---
name: feature-sync
description: Sync an Ant Design React component or feature into NG-ZORRO. Use when checking or porting upstream APIs, behavior, styles, demos, documentation, or tests.
---

# Ant Design React Sync

Turn upstream functionality into an Angular implementation that fits NG-ZORRO's public API and maintenance model. Follow the repository's `AGENTS.md` first; it is the source of truth for the current Angular coding standards and global quality requirements.

## Establish the Upstream Contract

Inspect official upstream source and documentation before changing code. Read demos, tests, and changelog entries when they clarify the requested scope.

Establish:

- the public API, defaults, input boundaries, and deprecations;
- user-observable behavior, including interaction states, keyboard behavior, semantics, and animation;
- styling, theme tokens, and composition model; and
- the upstream version that introduced the target capability.

Use source and documentation as the contract. Changelog entries provide version and historical context, not a substitute for either. Distinguish an upstream capability that has not yet been ported from behavior that currently diverges from upstream.

## Map to Angular

Do not translate React source line by line. Preserve the public semantics while choosing the smallest, clearest Angular boundary.

Decide deliberately:

- how React props, callbacks, children, refs, and context map to Angular public APIs and composition;
- whether the capability belongs in a component, directive, service, or existing extension point;
- whether it needs browser-only DOM access, layout measurement, or side effects, and how it remains compatible with SSR and render timing; and
- whether Angular CDK or an existing NG-ZORRO public utility already solves the problem.

Translate upstream CSS-in-JS styling into the repository's Less theme variables and mixins. Keep theme defaults in Less; use ordinary inline styles only for public inputs whose values are genuinely runtime-dependent. Introduce CSS custom properties only when an existing integration specifically requires runtime inheritance or consumer customization.

When framework differences prevent a one-to-one mapping, choose an Angular API consistent with established repository patterns and document intentional differences.

## Integrate

Study comparable components before deciding the necessary integration points. Update public exports, styles, demos, documentation, tests, and site-generation inputs only when the feature requires them.

Treat generated artifacts according to the repository's tracking policy. Change the source of a generation pipeline instead of editing its output directly.

## Verify

Verify the upstream contract that was ported, not only implementation details.

1. Start with focused tests for defaults, critical states, and boundary inputs.
2. Run the repository checks, builds, and documentation generation appropriate to the changed surface.
3. Inspect generated output when the work affects presentation, interaction, or documentation.
4. Use `git diff --check` to catch whitespace and patch errors.

## Deliver

State the upstream scope that was synchronized, intentional framework differences, and the validation performed. Stage, commit, push, or create a pull request only when the user explicitly requests it.
