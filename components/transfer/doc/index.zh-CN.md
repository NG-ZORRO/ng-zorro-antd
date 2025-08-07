---
category: Components
subtitle: 穿梭框
type: 数据录入
cols: 1
title: Transfer
cover: 'https://gw.alipayobjects.com/zos/alicdn/QAXskNI4G/Transfer.svg'
description: 双栏穿梭选择框。
---

## 何时使用

- 需要在多个可选项中进行多选时。
- 比起 Select 和 TreeSelect，穿梭框占据更大的空间，可以展示可选项的更多信息。

穿梭选择框用直观的方式在两栏中移动元素，完成选择行为。

选择一个或以上的选项后，点击对应的方向键，可以把选中的选项移动到另一栏。
其中，左边一栏为 `source`，右边一栏为 `target`，API 的设计也反映了这两个概念。

## API

### nz-transfer

| 参数                    | 说明                                                                                                                  | 类型                                                   | 默认值             |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ | ------------------ |
| `[nzDataSource]`        | 数据源，其中若数据属性 `direction: 'right'` 将会被渲染到右边一栏中或使用 `nzTargetKeys`                               | `TransferItem[]`                                       | `[]`               |
| `[nzDisabled]`          | 是否禁用                                                                                                              | `boolean`                                              | `false`            |
| `[nzTitles]`            | 标题集合，顺序从左至右                                                                                                | `string[]`                                             | `['', '']`         |
| `[nzOperations]`        | 操作文案集合，顺序从下至上                                                                                            | `string[]`                                             | `['', '']`         |
| `[nzListStyle]`         | 两个穿梭框的自定义样式，等同 `ngStyle`                                                                                | `object`                                               | -                  |
| `[nzItemUnit]`          | 单数单位                                                                                                              | `string`                                               | `'项目'`           |
| `[nzItemsUnit]`         | 复数单位                                                                                                              | `string`                                               | `'项目'`           |
| `[nzRenderList]`        | 自定义渲染列表，见示例                                                                                                | `Array<TemplateRef<void> \| null>`                     | `[null, null]`     |
| `[nzRender]`            | 每行数据渲染模板，见示例                                                                                              | `TemplateRef<void>`                                    | -                  |
| `[nzFooter]`            | 底部渲染模板，见示例                                                                                                  | `TemplateRef<void>`                                    | -                  |
| `[nzShowSelectAll]`     | 是否显示全选框                                                                                                        | `boolean`                                              | `true`             |
| `[nzShowSearch]`        | 是否显示搜索框                                                                                                        | `boolean`                                              | `false`            |
| `[nzFilterOption]`      | 接收 `inputValue` `option` 两个参数，当 `option` 符合筛选条件时，应返回 `true`，反之则返回 `false`。                  | `(inputValue: string, item: TransferItem) => boolean`  | -                  |
| `[nzSearchPlaceholder]` | 搜索框的默认值                                                                                                        | `string`                                               | `'请输入搜索内容'` |
| `[nzNotFoundContent]`   | 当列表为空时显示的内容                                                                                                | `string`                                               | `'列表为空'`       |
| `[nzCanMove]`           | 穿梭时二次校验。**注意：** 穿梭组件内部始终只保留一份数据，二次校验过程中需取消穿梭项则直接删除该项；具体用法见示例。 | `(arg: TransferCanMove) => Observable<TransferItem[]>` | -                  |
| `[nzSelectedKeys]`      | 设置被选中的 key 集合                                                                                                 | `string[]`                                             | -                  |
| `[nzTargetKeys]`        | 显示在右侧框数据的 key 集合                                                                                           | `string[]`                                             | -                  |
| `[nzOneWay]`            | 展示为单向样式                                                                                                        | `boolean`                                              | `false`            |
| `[nzStatus]`            | 设置校验状态                                                                                                          | `'error' \| 'warning'`                                 | -                  |
| `(nzChange)`            | 选项在两栏之间转移时的回调函数                                                                                        | `EventEmitter<TransferChange>`                         | -                  |
| `(nzSearchChange)`      | 搜索框内容时改变时的回调函数                                                                                          | `EventEmitter<TransferSearchChange>`                   | -                  |
| `(nzSelectChange)`      | 选中项发生改变时的回调函数                                                                                            | `EventEmitter<TransferSearchChange>`                   | -                  |

#### TransferItem

| 参数      | 说明                                                | 类型                | 默认值  |
| --------- | --------------------------------------------------- | ------------------- | ------- |
| title     | 标题，用于显示及搜索关键字判断                      | `string`            | -       |
| direction | 指定数据方向，若指定 `right` 为右栏，其他情况为左栏 | `'left' \| 'right'` | -       |
| disabled  | 指定 checkbox 为不可用状态                          | `boolean`           | `false` |
| checked   | 指定 checkbox 为选中状态                            | `boolean`           | `false` |

#### TransferCanMove

| 参数      | 说明     | 类型                | 默认值 |
| --------- | -------- | ------------------- | ------ |
| direction | 数据方向 | `'left' \| 'right'` | -      |
| list      | 数据源   | `TransferItem[]`    | `[]`   |

#### TransferChange

| 参数 | 说明     | 类型                | 默认值 |
| ---- | -------- | ------------------- | ------ |
| from | 数据方向 | `'left' \| 'right'` | -      |
| to   | 数据方向 | `'left' \| 'right'` | -      |
| list | 数据源   | `TransferItem[]`    | `[]`   |

#### TransferSearchChange

| 参数      | 说明       | 类型                | 默认值 |
| --------- | ---------- | ------------------- | ------ |
| direction | 数据方向   | `'left' \| 'right'` | -      |
| value     | 搜索关键词 | `string`            | -      |

#### nzRenderList

| 参数              | 说明           | 类型                           | 默认值 |
| ----------------- | -------------- | ------------------------------ | ------ |
| `direction`       | 渲染列表的方向 | `'left' \| 'right'`            | -      |
| `disabled`        | 是否禁用列表   | `boolean`                      | -      |
| `items`           | 过滤后的数据   | `TransferItem[]`               | -      |
| `onItemSelect`    | 勾选条目       | `(item: TransferItem) => void` | -      |
| `onItemSelectAll` | 勾选一组条目   | `(selected: boolean) => void`  | -      |
