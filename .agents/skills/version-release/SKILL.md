---
name: ng-zorro-version-release
description: NG-ZORRO/ng-zorro-antd repository release workflow. Use this skill whenever the user mentions 发版, 发布版本, release, release PR, stage-release, 升级版本号, changelog 发布准备, Azure publish, 部署官网, GitHub Release, or asks to prepare or execute an NG-ZORRO version release. This skill is project-specific and should be preferred over generic npm publish guidance.
---

# NG-ZORRO Version Release Guide

## Scope

This skill is for the real release process of the `NG-ZORRO/ng-zorro-antd` repository.
It is not a generic npm release checklist.

It covers:

1. Preparing a release branch and release PR
2. Using the agent-friendly `stage-release prepare` mode for local release file preparation
3. Maintaining the root changelog and both documentation changelog files
4. Publishing the npm package through the Azure release pipeline
5. Deploying the documentation site through Azure
6. Post-release follow-up such as GitHub Release, blog, and social announcements

Do not use this skill for unrelated changelog editing, normal feature PRs, or ad hoc package
publishing outside the repository release process.

## Key Project Facts

- The root `package.json` version is `0.0.0-NOT-USED`; do not treat it as the release version.
- The library version lives in `components/package.json`.
- The Angular version token is updated in `components/version/version.ts`.
- The helper script is `npm run stage-release`, implemented by `scripts/release/release.ts`.
- Running `npm run stage-release` with no subcommand starts the original interactive human workflow.
- Agent work should use the non-interactive prepare mode:
  `npm run stage-release -- prepare --version <version> --base <branch>`.
- Prepare mode only prepares local release files. It does not build, push, publish, or deploy.
- Release PRs normally update three changelog files: `CHANGELOG.md`, `docs/changelog.en-US.md`,
  and `docs/changelog.zh-CN.md`.
- The docs changelog format is not identical to `CHANGELOG.md`; preserve each file's existing
  frontmatter, intro text, headings, and style.
- `docs/changelog.zh-CN.md` should be a Chinese translation of the public release notes, not a raw
  copy of the English text.
- Build, library publishing, and site deployment are normally performed by Azure pipelines, not by
  local agent execution.
- Official npm publishing is done from Azure after CI succeeds; do not default to local
  `npm publish`.

## Before Acting

First inspect the repository state instead of guessing:

```bash
git status --short
git branch --show-current
git remote -v
node -v
cat components/package.json
git tag --list | grep -v -E '(experimental|alpha|resource)' | sort -V | tail -20
```

Confirm:

- The working tree is clean before running `npm run stage-release`.
- A remote pointing at `NG-ZORRO/ng-zorro-antd` exists; the script auto-detects it as upstream.
- The local Node version satisfies the root `package.json` engines.
- The next version is greater than the current `components/package.json` version.

If the working tree has user changes, do not overwrite or stage them unless the user explicitly asks.

## Preparing a Release PR As An Agent

Use this flow when the user asks to prepare a release, create a release PR, or bump a version.

### 1. Use The Non-Interactive Prepare Mode

Use:

```bash
npm run stage-release -- prepare --version <version> --base <branch>
```

Examples:

```bash
npm run stage-release -- prepare --version 21.3.2 --base v21
npm run stage-release -- prepare --version 22.0.0 --base master
```

Prepare mode:

- Fetches the requested upstream base branch and tags.
- Verifies the working tree is clean before writing files.
- Verifies current `HEAD` is based on the requested base branch.
- Detects the previous release tag from tags merged into that base branch.
- Updates `components/package.json`.
- Updates `components/version/version.ts`.
- Runs `npm run changelog`.
- Prints the changelog boundary and the PR base branch to use.
- Does not run local build, push a release branch, publish npm, or deploy the site.

Use `--dry-run` to check the base branch and changelog boundary without writing files:

```bash
npm run stage-release -- prepare --version 21.3.2 --base v21 --dry-run
```

The original interactive mode is still available for human releasers:

```bash
npm run stage-release
```

### 2. Version Bump

Prepare mode updates the release version in:

- `components/package.json`
- `components/version/version.ts`

Use the version requested by the user if valid. If the user does not give a version, inspect the
current version, recent tags, and pending release context before recommending one.

Allowed formats are `x.y.z`, `x.y.z-alpha.n`, `x.y.z-beta.n`, and `x.y.z-rc.n`.

Do not manually edit the root `package.json` release version.

### 3. Changelog

Prepare mode generates or refreshes changelog content by running:

```bash
npm run changelog
```

In this repository, changelog content is generated into `CHANGELOG.md` and then processed for the
site. That generated output is only the starting point.

Manually update and review all three changelog files:

- `CHANGELOG.md`
- `docs/changelog.en-US.md`
- `docs/changelog.zh-CN.md`

Important formatting rules:

- Keep `CHANGELOG.md` in its existing root changelog format.
- Keep `docs/changelog.en-US.md` in the docs page format, including frontmatter and intro content.
- Keep `docs/changelog.zh-CN.md` in the Chinese docs page format, including frontmatter and intro
  content.
- Add the target release section near the top of each file, following the existing `## <version>`
  and date layout in that file.
- Do not blindly paste the same Markdown block into all three files; docs changelog files have their
  own page structure.

Review each release entry carefully:

- Make sure the target version heading exists.
- Make sure important PRs are represented and grouped sensibly.
- Remove noise if needed.
- Keep English wording suitable for public release notes.
- Translate the Chinese changelog entries naturally in `docs/changelog.zh-CN.md`, preserving PR links,
  issue links, commit links, component scopes, and code identifiers.

Do not mark the changelog step complete until the English and Chinese release notes have both been
reviewed.

### 4. Commit And Create The Release PR

Create a release branch:

```bash
git checkout -b release/<version>
```

Stage only the release files that belong in the PR. Usually these are:

- `CHANGELOG.md`
- `docs/changelog.en-US.md`
- `docs/changelog.zh-CN.md`
- `components/package.json`
- `components/version/version.ts`

Use this commit message:

```text
chore(release): release <version>
```

Push the release branch to the user's fork or configured `origin`, then create a PR.

Use the repository PR template at `.github/PULL_REQUEST_TEMPLATE.md`.

The PR base must match the `--base` value used during prepare. For example, if prepare was run with
`--base v21`, create the PR against `NG-ZORRO/ng-zorro-antd:v21`, not `master`.

For the normal public release train, the PR target is usually `master`. For a maintenance release,
use the matching maintenance branch only when explicitly requested.

### 5. Leave Build, Publish, And Deploy To Azure

Do not run local `Build release`, `Push library release`, or `Push site release` as the default agent
flow. The local script contains these stages, but the expected project workflow is that Azure handles:

- Building release artifacts
- Publishing the npm package
- Deploying the documentation website

If the user asks to run local build as an extra sanity check, run `npm run build` only after making it
clear that this is validation, not the official publish/deploy path.

## Azure Publishing And Site Deployment

Use this section only after the release PR has passed CI and the maintainer is ready to publish.

The project wiki says the official package publication happens through Azure:

1. Open the Azure release pipeline.
2. Enter the release.
3. Click `Publish` to publish npm; approval is required.
4. Click `Deploy` to update the website.

Do not run `npm publish` locally for the official NG-ZORRO package unless the maintainer explicitly
overrides the normal Azure process.

For the website:

- Prefer the Azure `Deploy` action.
- The website may also update by cron.
- Manual server login is an internal fallback, not the default agent action.

## After Publishing

After npm publishing and site deployment:

1. Merge the release PR to its target branch.
2. Launch a GitHub Release at `https://github.com/NG-ZORRO/ng-zorro-antd/releases`.
3. For major and minor versions, update the official blog at `https://github.com/NG-ZORRO/blog`.
4. For major and minor versions, prepare a short social announcement with links to the website and release notes.

Patch releases usually do not require blog or social follow-up unless the user asks.

## Safety Rules

- Do not run `npm publish` as the default publishing path.
- Do not start a release from a dirty working tree.
- Do not overwrite user changes.
- Do not guess the release branch if the user asks for a maintenance release; inspect branches and ask if ambiguous.
- Do not drive the interactive `npm run stage-release` flow through build or push stages without explicit confirmation.
- Do not create a release PR with a base branch different from the `prepare --base` value.
- Do not create or push tags manually unless the maintainers explicitly request it.
- Do not continue from a failed build, failed CI, or failed Azure publish step.

## Agent Checklist

When assisting with an NG-ZORRO release:

1. Inspect git state, remotes, Node version, current package version, and recent tags.
2. Determine whether this is patch, minor, prerelease, or maintenance.
3. Run `npm run stage-release -- prepare --version <version> --base <branch>`.
4. Verify `components/package.json`, `components/version/version.ts`, `CHANGELOG.md`,
   `docs/changelog.en-US.md`, and `docs/changelog.zh-CN.md`.
5. Commit the release files on `release/<version>`.
6. Create the release PR with `.github/PULL_REQUEST_TEMPLATE.md`, using the same base branch passed to
   `prepare --base`.
7. Stop after PR creation unless the user explicitly asks to proceed with Azure publishing.
8. For official publishing, use Azure `Publish` and `Deploy`; do not default to local `npm publish`.
9. Complete post-release GitHub Release, blog, and announcement tasks when applicable.
