---
category: Components
type: Featured Components
title: CheckList
cols: 1
tag: 19.1.0
cover: https://img.alicdn.com/imgextra/i2/O1CN01E9BUpE1TCyZry8ETC_!!6000000002347-2-tps-386-453.png
---

Used to organize the flow of tasks in a project.

## When To Use

- If the current page business logic is too complex, and with a more mandatory sequential flow control, then you can use this component to help you simplify the process.

```ts
import { NzCheckListModule } from 'ng-zorro-antd/check-list';
```

## API

### nz-check-list

| Property            | Description                                                                  | Type                             | Default | Global Config |
| ------------------- | ---------------------------------------------------------------------------- |----------------------------------| ------- | ------------- |
| `[nzShow]`          | show check list                                                              | `boolean`                        | `true`  | -             |
| `[nzItems]`         | check list elements                                                          | `NzItemProps`                    | `[]`    | -             |
| `[nzVisible]`       | show/hide check list                                                         | `boolean`                        | `false` | -             |
| `[nzIndex]`         | Current location                                                             | `number`                         | `1`     | -             |
| `[nzProgress]`      | show/hide Progress Bar                                                       | `boolean`                        | `true`  | -             |
| `[nzTriggerRender]` | Rendering template for list floating button                                  | `TemplateRef<void> \| string`    | -       | -             |
| `[nzTitle]`         | Rendering template for the inventory panel title                             | `TemplateRef<void> \| string`    | -       | -             |
| `[nzFooter]`        | Rendering template at the bottom of the inventory panel                      | `TemplateRef<void> \| string`    | -       | -             |
| `(nzHideCallback)`  | Callback for hiding the list, return value: value that is no longer operated | `EventEmitter<boolean>`          | `false` | -             |

### NzItemProps

| Property        | Description                                                                                           | Type        | Default |
| --------------- | ----------------------------------------------------------------------------------------------------- | ----------- | ------- |
| `[key]`         | The unique key of the current item (if not filled in, description will be used as the key by default) | `string`    | -       |
| `[description]` | current element description content                                                                   | `string`    | -       |
| `[onClick]`     | click on the method triggered by the step                                                             | `()=> void` | -       |
