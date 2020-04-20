---
order: 15
title: 9.x 升级指南
toc: false
---

本文档将帮助你从 `ng-zorro-antd` 8.x 版本升级到 9.x 版本，如果你是 7.x 或者更老的版本，请先参考之前的升级文档升级到 8.x。

## 开始之前

1. 首先确保你 `Node.js` >= `10.13`
2. 创建新的分支，或者使用其他方式备份当前项目
3. 删除项目下 package-lock.json 文件

## 升级步骤

### 第一步 - 升级相关依赖

- 前往 https://update.angular.io/ 将项目升级到 Angular9。
- 如果你有单独使用 `@angular/cdk` 请执行 `ng update @angular/cdk`
- 如果你有单独使用 `date-fns` 请先升级到 `2.x`
- 如果你有使用 `monaco-editor` 请先升级到 `0.20.x`, 使用 `monaco-editor-webpack-plugin` 时请将其升级到 `1.9.x`

### 第二步 - 升级 NG-ZORRO

- 运行 `ng update ng-zorro-antd`
- 如果控制台出现警告消息请按提示修改对应代码