---
category: Components
type: Featured Components
title: CheckList
cols: 1
tag: 19.1.0
cover: 'https://img.alicdn.com/imgextra/i2/O1CN01E9BUpE1TCyZry8ETC_!!6000000002347-2-tps-386-453.png'
description: Used to organize the flow of tasks in a project.
---

## When To Use

If the current page business logic is too complex, and with a more mandatory sequential flow control, then you can use this component to help you simplify the process.

## API

### nz-check-list

| Property            | Description                                        | Type                          | Default | Global Config |
| ------------------- | -------------------------------------------------- | ----------------------------- | ------- | ------------- |
| `[nzItems]`         | check list elements                                | `NzItemProps`                 | `[]`    | -             |
| `[nzVisible]`       | show check-list                                    | `boolean`                     | `false` | -             |
| `[nzIndex]`         | current index                                      | `number`                      | `1`     | -             |
| `[nzProgress]`      | show progress                                      | `boolean`                     | `true`  | -             |
| `[nzTriggerRender]` | rendering template for float button                | `TemplateRef<void> \| string` | -       | -             |
| `[nzTitle]`         | rendering template for the check-list panel title  | `TemplateRef<void> \| string` | -       | -             |
| `[nzFooter]`        | rendering template for the check-list panel footer | `TemplateRef<void> \| string` | -       | -             |
| `(nzHide)`          | callback for hiding the check list                 | `EventEmitter<boolean>`       | `false` | -             |

> Value of `(nzHide)` is whether not show the check-list anymore.
> If the value is `true`, you can store a data in `LocalStorage` to avoid showing the check-list again.

### Interfaces

#### NzItemProps

| Property      | Description                           | Type         | Default |
| ------------- | ------------------------------------- | ------------ | ------- |
| `key`         | unique identifier                     | `string`     | -       |
| `description` | description content                   | `string`     | -       |
| `onClick`     | method triggered by clicking the step | `() => void` | -       |

> `key` is the unique identifier of the current item. If not set, `description` will be used as the key.
