---
category: Components
subtitle: 提及
type: 数据录入
title: Mention
cover: 'https://gw.alipayobjects.com/zos/alicdn/jPE-itMFM/Mentions.svg'
description: 用于在输入中提及某人或某事。
---

## 何时使用

用于在输入中提及某人或某事，常用于发布、聊天或评论功能。

## API

```html
<nz-mention [nzSuggestions]="suggestions">
  <textarea nz-input [(ngModel)]="value" nzMentionTrigger> </textarea>
</nz-mention>
```

### nz-mention

| 参数                    | 说明                              | 类型                                           | 默认值                           |
| ----------------------- | --------------------------------- | ---------------------------------------------- | -------------------------------- |
| `[nzMentionTrigger]`    | 用于指定提及的触发元素 **(必须)** | `HTMLTextAreaElement \| HTMLInputElement`      | -                                |
| `[nzMentionSuggestion]` | 自定义建议渲染模板                | `TemplateRef<any>`                             | -                                |
| `[nzLoading]`           | 加载中                            | `boolean`                                      | `false`                          |
| `[nzNotFoundContent]`   | 未找到时的内容                    | `string`                                       | `'无匹配结果，轻敲空格完成输入'` |
| `[nzPlacement]`         | 建议框位置                        | `'bottom' \| 'top'`                            | `'bottom'`                       |
| `[nzPrefix]`            | 触发弹出下拉框的字符              | `string \| string[]`                           | `'@'`                            |
| `[nzSuggestions]`       | 建议内容                          | `any[]`                                        | `[]`                             |
| `[nzStatus]`            | 设置校验状态                      | `'error' \| 'warning'`                         | -                                |
| `[nzValueWith]`         | 建议选项的取值方法                | `(any) => string \| (value: string) => string` |
| `(nzOnSelect)`          | 下拉框选择建议时回调              | `EventEmitter<any>`                            | -                                |
| `(nzOnSearchChange)`    | 输入框中 @ 变化时回调             | `EventEmitter<MentionOnSearchTypes>`           | -                                |

#### 方法

| 方法名      | 说明                                        |
| ----------- | ------------------------------------------- |
| getMentions | 获取 `input[nzMentionTrigger]` 中的提及数组 |

### nzMentionTrigger

用于指定提及的触发元素

```html
<nz-mention>
  <textarea nzMentionTrigger></textarea>
</nz-mention>
```

```html
<nz-mention>
  <input nzMentionTrigger />
</nz-mention>
```

### nzMentionSuggestion

自定义建议渲染模板

```html
<nz-mention [nzSuggestions]="items" [nzValueWith]="valueWith">
  <input nz-input nzMentionTrigger />
  <ng-container *nzMentionSuggestion="let item">
    <span>{{ item.label }} - {{ item.value }}</span>
  </ng-container>
</nz-mention>
```

### MentionOnSearchTypes

| 参数   | 说明       | 类型     | 默认值 |
| ------ | ---------- | -------- | ------ |
| value  | 搜索关键词 | `string` | -      |
| prefix | 触发前缀   | `string` | -      |
