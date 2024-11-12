---
category: Components
type: Data Display
title: CheckList
cols: 1
tag: 19.1.0
cover: https://img.alicdn.com/imgextra/i2/O1CN01E9BUpE1TCyZry8ETC_!!6000000002347-2-tps-386-453.png
---

用于在项目中梳理任务流程。

## 何时使用

- 如果当前页面业务逻辑过于复杂，且带有较为强制的顺序流控制，那么你可以采用这个组件来帮你简化流程。

```ts
import { NzCheckListModule } from 'ng-zorro-antd/check-list';
```

## API

### nz-check-list:standalone

| Property            | Description                                                                  | Type                    | Default | Global Config |
| ------------------- | ---------------------------------------------------------------------------- | ----------------------- | ------- | ------------- |
| `[nzShow]`          | show check list                                                              | `boolean`               | `true`  | -             |
| `[nzItems]`         | check list elements                                                          | `NzItemProps`           | `[]`    | -             |
| `[nzVisible]`       | show/hide check list                                                         | `boolean`               | `false` | -             |
| `[nzIndex]`         | Current location                                                             | `number`                | `1`     | -             |
| `[nzProgress]`      | show/hide Progress Bar                                                       | `boolean`               | `true`  | -             |
| `[nzTriggerRender]` | Rendering template for list floating button                                  | `TemplateRef<void>`     | -       | -             |
| `[nzTitle]`         | Rendering template for the inventory panel title                             | `TemplateRef<void>`     | -       | -             |
| `[nzFooter]`        | Rendering template at the bottom of the inventory panel                      | `TemplateRef<void>`     | -       | -             |
| `(nzHideCallback)`  | Callback for hiding the list, return value: value that is no longer operated | `EventEmitter<boolean>` | `false` | -             |

### NzItemProps

| Property        | Description                                                                                           | Type        | Default |
| --------------- | ----------------------------------------------------------------------------------------------------- | ----------- | ------- |
| `[key]`         | The unique key of the current item (if not filled in, description will be used as the key by default) | `string`    | -       |
| `[description]` | current element description content                                                                   | `string`    | -       |
| `[onClick]`     | click on the method triggered by the step                                                             | `()=> void` | -       |
