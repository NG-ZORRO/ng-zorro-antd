---
category: Components
type: 特色组件
title: CheckList
subtitle: 任务清单
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

### nz-check-list

| 参数                | 说明                                 | 类型                              | 默认值  | 全局配置 |
| ------------------- | ------------------------------------ |---------------------------------| ------- | -------- |
| `[nzShow]`          | 显示任务清单                         | `boolean`                       | `true`  | -        |
| `[nzItems]`         | 任务清单元素                         | `NzItemProps`                   | `[]`    | -        |
| `[nzVisible]`       | 显示隐藏任务面板                     | `boolean`                       | `false` | -        |
| `[nzIndex]`         | 当前所属位置                         | `number`                        | `1`     | -        |
| `[nzProgress]`      | 显示隐藏进度条                       | `boolean`                       | `true`  | -        |
| `[nzTriggerRender]` | 清单悬浮按钮的渲染模板               | `TemplateRef<void> \| string`   | -       | -        |
| `[nzTitle]`         | 清单面板标题的渲染模板               | `TemplateRef<void> \| string`   | -       | -        |
| `[nzFooter]`        | 清单面板底部的渲染模板               | `TemplateRef<void> \| string`   | -       | -        |
| `(nzHideCallback)`  | 隐藏清单的回调，返回值：不再操作的值 | `EventEmitter<boolean>`         | `false` | -        |

### NzItemProps

| 参数            | 说明                                                         | 类型        | 默认值 |
| --------------- | ------------------------------------------------------------ | ----------- | ------ |
| `[key]`         | 当前 item 的唯一 key（不填默认会采用 description 作为 key ） | `string`    | -      |
| `[description]` | 当前元素描述内容                                             | `string`    | -      |
| `[onClick]`     | 点击步骤触发的方法                                           | `()=> void` | -      |
