---
order: 15
title: v19 升级指南
toc: false
---

本文档将帮助你从 `ng-zorro-antd` 18.x 版本升级到 19.x 版本。

## 开始之前

1. 确保 `Node.js` >= `18.19.1` 或 >= `20.11.0` 或 >= `22.0.0`
2. 创建新的分支，或者使用其他方式备份当前项目
3. 删除项目下 package-lock.json 文件

## 升级步骤

### 1. 升级相关依赖

- 前往 [https://angular.dev/update-guide](https://angular.dev/update-guide) 将项目升级到 Angular 19
- 如果你有单独使用 `@angular/cdk` 请执行 `ng update @angular/cdk`

### 2. 升级 NG-ZORRO

- 运行 `ng update ng-zorro-antd`
- 如果控制台出现警告消息请按提示修改对应代码

### 3. 移除废弃 API

- 请参考 [v19 changelog](/docs/changelog/zh#19-0-0) 移除废弃 API
