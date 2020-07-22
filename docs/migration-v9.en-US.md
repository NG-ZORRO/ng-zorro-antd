---
order: 15
title: v9 Migration Guide
toc: false
---

This document will help you upgrade from `ng-zorro-antd` 8.x version to 9.x version. If you are using 7.x or older version, please upgrade to 8.x first.

## Before upgrade

1. Make sure `Node.js` >= `10.13`.
2. Create a new branch, or use other methods to back up the current project.
3. Delete the package-lock.json file.

## Upgrade dependencies

- Upgrade Angular to 9.x version, ref https://update.angular.io/ .
- Run `ng update @angular/cdk`, if you have used `@angular/cdk`.
- If you have used `date-fns` in your project, upgrade it to `2.x` version, ref https://github.com/date-fns/date-fns-upgrade.
- If you have used `monaco-editor` please upgrade it to `0.20.x`, don't forget to upgrade `monaco-editor-webpack-plugin` to `1.9.x` if you have used it.

## Upgrade NG-ZORRO

- Run `ng update ng-zorro-antd`.
- If a warning message appears in the console, follow the prompts to modify the corresponding code.
