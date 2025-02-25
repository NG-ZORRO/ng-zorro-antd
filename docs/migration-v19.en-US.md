---
order: 15
title: v19 Migration Guide
toc: false
---

This document will help you upgrade from `ng-zorro-antd` 18.x version to 19.x version.

## Before upgrade

1. Make sure `Node.js` >= `18.19.1` or >= `20.11.0` or >= `22.0.0`.
2. Create a new branch, or use other methods to back up the current project.
3. Delete the package-lock.json file.

### 1. Upgrade dependencies

- Upgrade Angular to 19.x version, ref [https://angular.dev/update-guide](https://angular.dev/update-guide).
- Run `ng update @angular/cdk`, if you have used `@angular/cdk`.

### 2. Upgrade NG-ZORRO

- Run `ng update ng-zorro-antd`.
- If any warning messages appear in the console, follow the prompts to modify the corresponding code.

### 3. Remove deprecated APIs

- Remove deprecated APIs, please refer to the [v19 changelog](/docs/changelog/en#19-0-0) for more information.
