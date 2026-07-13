---
order: 15
title: v22 Migration Guide
toc: false
---

This document will help you upgrade from `ng-zorro-antd` 21.x version to 22.x version.

## Before upgrade

1. Make sure `Node.js` >= `22.22.3` or >= `24.15.0` or >= `26.0.0`.
2. Create a new branch, or use other methods to back up the current project.
3. Delete the package-lock.json file.

## Upgrade steps

### 1. Upgrade dependencies

- Upgrade Angular to 22.x version, ref [https://angular.dev/update-guide](https://angular.dev/update-guide).
- Run `ng update @angular/cdk`, if you have used `@angular/cdk`.
- Remove the `@angular/animations` dependency as needed.

### 2. Upgrade NG-ZORRO

- Run `ng update ng-zorro-antd`.
- If any warning messages appear in the console, follow the prompts to modify the corresponding code.

### 3. Remove deprecated APIs

- Remove deprecated APIs, please refer to the [v22 changelog](/docs/changelog/en#2200) for more information.

### 4. Configure date adapter

NG-ZORRO no longer provides a default date engine adapter. If your application uses date-related components such as DatePicker, Calendar, or TimePicker, configure a date adapter explicitly in `app.config.ts`.

To keep the previous date-fns based behavior:

```ts
import { ApplicationConfig } from '@angular/core';
import { provideNzDateFnsAdapter } from 'ng-zorro-antd/core/time';

export const appConfig: ApplicationConfig = {
  providers: [provideNzDateFnsAdapter()]
};
```

`date-fns` has been upgraded to v4. If your application uses `date-fns` APIs directly, update the imports and date-fns usage to be compatible with v4.
