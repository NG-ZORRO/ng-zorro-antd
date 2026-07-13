---
order: 15
title: v22 升级指南
toc: false
---

本文档将帮助你从 `ng-zorro-antd` 21.x 版本升级到 22.x 版本。

## 开始之前

1. 确保 `Node.js` >= `22.22.3` 或 >= `24.15.0` 或 >= `26.0.0`
2. 创建新的分支，或者使用其他方式备份当前项目
3. 删除项目下 package-lock.json 文件

## 升级步骤

### 1. 升级相关依赖

- 参考[升级指南](https://angular.dev/update-guide)将项目升级到 Angular 22
- 如果有单独使用 `@angular/cdk` 请执行 `ng update @angular/cdk`
- 按需移除 `@angular/animations` 依赖

### 2. 升级 NG-ZORRO

- 运行 `ng update ng-zorro-antd`
- 如果控制台出现警告消息请按提示修改对应代码

### 3. 移除废弃 API

- 请参考 [v22 changelog](/docs/changelog/zh#2200) 移除废弃 API

### 4. 配置日期适配器

NG-ZORRO 不再内置默认日期引擎适配器。如果你的应用使用 DatePicker、Calendar、TimePicker 等日期相关组件，需要在 `app.config.ts` 中显式配置日期适配器。

如需保持旧版本基于 date-fns 的行为：

```ts
import { ApplicationConfig } from '@angular/core';
import { provideNzDateFnsAdapter } from 'ng-zorro-antd/core/time';

export const appConfig: ApplicationConfig = {
  providers: [provideNzDateFnsAdapter()]
};
```

`date-fns` 已升级至 v4。如果你的应用直接使用 `date-fns` API，请同步更新 import 和相关用法以兼容 v4。
