---
category: Components
type: 特色组件
title: CheckList
subtitle: 任务清单
cols: 1
tag: 19.1.0
cover: 'https://img.alicdn.com/imgextra/i2/O1CN01E9BUpE1TCyZry8ETC_!!6000000002347-2-tps-386-453.png'
description: 用于在项目中梳理任务流程。
---

## 何时使用

如果当前页面业务逻辑过于复杂，且带有较为强制的顺序流控制，那么你可以采用这个组件来帮你简化流程。

## API

### nz-check-list

| 参数                | 说明                   | 类型                          | 默认值  | 全局配置 |
| ------------------- | ---------------------- | ----------------------------- | ------- | -------- |
| `[nzItems]`         | 任务清单元素           | `NzItemProps`                 | `[]`    | -        |
| `[nzVisible]`       | 显示任务清单           | `boolean`                     | `false` | -        |
| `[nzIndex]`         | 当前所属位置           | `number`                      | `1`     | -        |
| `[nzProgress]`      | 显示任务进度           | `boolean`                     | `true`  | -        |
| `[nzTriggerRender]` | 清单悬浮按钮的渲染模板 | `TemplateRef<void> \| string` | -       | -        |
| `[nzTitle]`         | 清单面板标题的渲染模板 | `TemplateRef<void> \| string` | -       | -        |
| `[nzFooter]`        | 清单面板底部的渲染模板 | `TemplateRef<void> \| string` | -       | -        |
| `(nzHide)`          | 隐藏清单的回调         | `EventEmitter<boolean>`       | `false` | -        |

> `(nzHide)` 的回调值为是否不再显示清单。你可以在回调中存储数据到 `LocalStorage` 中，以避免再次显示清单。

### Interfaces

#### NzItemProps

| 参数          | 说明               | 类型         | 默认值 |
| ------------- | ------------------ | ------------ | ------ |
| `key`         | 清单元素的唯一 key | `string`     | -      |
| `description` | 清单元素描述内容   | `string`     | -      |
| `onClick`     | 点击步骤触发的方法 | `() => void` | -      |

> `key` 为清单元素的唯一标识，如果不填写，则默认使用 `description` 作为 key。
