---
order: 15
title: v21 升级指南
toc: false
---

本文档将帮助你从 `ng-zorro-antd` 20.x 版本升级到 21.x 版本。

## 开始之前

1. 确保 `Node.js` >= `20.19.0` 或 >= `22.12.0` 或 >= `24.0.0`
2. 创建新的分支，或者使用其他方式备份当前项目
3. 删除项目下 package-lock.json 文件

## 升级步骤

### 1. 升级相关依赖

- 参考[升级指南](https://angular.dev/update-guide)将项目升级到 Angular 21
- 如果有单独使用 `@angular/cdk` 请执行 `ng update @angular/cdk`
- 按需移除 `@angular/animations` 依赖

### 2. 升级 NG-ZORRO

- 运行 `ng update ng-zorro-antd`
- 如果控制台出现警告消息请按提示修改对应代码

### 3. 移除废弃 API

- 请参考 [v21 changelog](/docs/changelog/zh#2100) 移除废弃 API
