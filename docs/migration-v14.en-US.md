---
order: 15
title: v14 Migration Guide
toc: false
---

This document will help you upgrade from `ng-zorro-antd` 13.x version to 14.x version.

## Before upgrade

1. Make sure `Node.js` >= `14.15.0` or >= `16.10.0`.
2. Create a new branch, or use other methods to back up the current project.
3. Delete the package-lock.json file.

### 1.Upgrade dependencies

- Upgrade Angular to 14.x version, ref [https://update.angular.io/](https://update.angular.io/).
- Run `ng update @angular/cdk`, if you have used `@angular/cdk`.

### 2.Upgrade NG-ZORRO

- Run `ng update ng-zorro-antd`.
- If any warning messages appear in the console, follow the prompts to modify the corresponding code.