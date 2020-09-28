---
order: 15
title: v10 升级指南
toc: false
---

本文档将帮助你从 `ng-zorro-antd` 9.x 版本升级到 10.x 版本，如果你是 8.x 或者更老的版本，请先参考之前的升级文档升级到 9.x。

## 开始之前

1. 首先确保你 `Node.js` >= `10.13`
2. 创建新的分支，或者使用其他方式备份当前项目
3. 删除项目下 package-lock.json 文件

## 升级步骤

### 1.迁移到二级入口（如果需要）

```ts
// 之前
import {  NzButtonModule, NzNoAnimationModule } from 'ng-zorro-antd';

// 之后
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
```

我们已经在 v8 中弃用了 `NgZorroAntdModule` 和一级入口，并保留了 2 个版本后在此版本中移除，你可以使用 [NG-ZORRO TSLint](https://github.com/NG-ZORRO/nz-tslint-rules) 来检查/修复项目中的引入入口。

#### (1) 安装 NG-ZORRO TSLint

```shell script
$ npm i nz-tslint-rules -D
```

#### (2) 配置 tslint.json

```json
{
  "rulesDirectory": [
    "node_modules/nz-tslint-rules"
  ],
  "rules": {
    "nz-secondary-entry-imports": true
  }
}
```

#### (1) 运行 TSLint 检查项目中的一级入口并修复

```shell script
$ tslint --project <tsconfig> --fix
```

### 2. 升级相关依赖

- 前往 https://update.angular.io/ 将项目升级到 Angular10。
- 如果你有单独使用 `@angular/cdk` 请执行 `ng update @angular/cdk`
- 如果你有单独使用 `date-fns@1.x` 请先升级到 `2.x`

### 3.升级 NG-ZORRO

- 运行 `ng update ng-zorro-antd`
- 如果控制台出现警告消息请按提示修改对应代码