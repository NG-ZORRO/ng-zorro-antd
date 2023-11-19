---
order: 15
title: v17 Migration Guide
toc: false
---

This document will help you upgrade from `ng-zorro-antd` 16.x version to 17.x version.

## Before upgrade

1. Make sure `Node.js` >= `18.13.0` or >= `20.9.0`.
2. Create a new branch, or use other methods to back up the current project.
3. Delete the package-lock.json file.

### 1.Upgrade dependencies

- Upgrade Angular to 17.x version, ref [https://update.angular.io/](https://update.angular.io/).
- Run `ng update @angular/cdk`, if you have used `@angular/cdk`.

### 2.Upgrade NG-ZORRO

> For projects built in `standalone`, you need to update `ng-zorro-antd` manually

- Run `ng update ng-zorro-antd`.
- If any warning messages appear in the console, follow the prompts to modify the corresponding code.
