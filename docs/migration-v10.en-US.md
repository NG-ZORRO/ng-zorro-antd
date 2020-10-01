---
order: 15
title: v10 Migration Guide
toc: false
---

This document will help you upgrade from `ng-zorro-antd` 9.x version to 10.x version. If you are using 8.x or older version, please upgrade to 9.x first.

## Before upgrade

1. Make sure `Node.js` >= `10.13`.
2. Create a new branch, or use other methods to back up the current project.
3. Delete the package-lock.json file.

### 1.Migration to secondary entry(if needed)

```ts
// Before
import {  NzButtonModule, NzNoAnimationModule } from 'ng-zorro-antd';

// After
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
```

We have deprecated `NgZorroAntdModule` and the primary entry in v8, and kept it for 2 versions before removing it in this version, you can use [NG-ZORRO TSLint](https://github.com/NG-ZORRO/nz-tslint-rules) to check/fix the import entry in your project.

#### (1) Install NG-ZORRO TSLint

```shell script
$ npm i nz-tslint-rules -D
```

#### (2) Configuration tslint.json

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

#### (1) Run TSLint to check/fix your project

```shell script
$ tslint --project <tsconfig> --fix
```

### 2.Upgrade dependencies

- Upgrade Angular to 10.x version, ref https://update.angular.io/ .
- Run `ng update @angular/cdk`, if you have used `@angular/cdk`.
- If you have used `date-fns@1.x` in your project, upgrade it to `2.x` version, ref https://github.com/date-fns/date-fns-upgrade.

### 3.Upgrade NG-ZORRO

- Run `ng update ng-zorro-antd`.
- If a warning message appears in the console, follow the prompts to modify the corresponding code.
