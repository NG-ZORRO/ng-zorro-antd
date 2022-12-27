---
order: 15
title: v15 升级指南
toc: false
---

本文档将帮助你从 `ng-zorro-antd` 14.x 版本升级到 15.x 版本。

## 开始之前

1. 首先确保你 `Node.js` >= `14.20.0` 或 >= `16.13.0` 或 >= `18.10.0`
2. 创建新的分支，或者使用其他方式备份当前项目
3. 删除项目下 package-lock.json 文件

## 升级步骤

### 1. 升级相关依赖

- 前往 [https://update.angular.io/](https://update.angular.io/) 将项目升级到 Angular 15
- 如果你有单独使用 `@angular/cdk` 请执行 `ng update @angular/cdk`

### 升级 NG-ZORRO

- 运行 `ng update ng-zorro-antd`
- 如果控制台出现警告消息请按提示修改对应代码