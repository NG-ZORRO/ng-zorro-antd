---
category: Components
subtitle: 分页
type: 导航
title: Pagination
cols: 1
cover: 'https://gw.alipayobjects.com/zos/alicdn/1vqv2bj68/Pagination.svg'
description: 分页器用于分隔长列表，每次只加载一个页面。
---

## 何时使用

- 当加载/渲染所有数据将花费很多时间时；
- 可切换页码浏览数据。

## API

```html
<nz-pagination [nzPageIndex]="1" [nzTotal]="50"></nz-pagination>
```

### nz-pagination

| 参数                   | 说明                                                       | 类型                                                                                         | 默认值             | 全局配置 | 版本   |
| ---------------------- | ---------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ------------------ | -------- | ------ |
| `[nzTotal]`            | 数据总数                                                   | `number`                                                                                     | -                  | -        |
| `[nzPageIndex]`        | 当前页数，可双向绑定                                       | `number`                                                                                     | `1`                | -        |
| `[nzPageSize]`         | 每页条数，可双向绑定                                       | `number`                                                                                     | `10`               | -        |
| `[nzDisabled]`         | 是否禁用                                                   | `boolean`                                                                                    | `false`            | -        |
| `[nzShowQuickJumper]`  | 是否可以快速跳转至某页                                     | `boolean`                                                                                    | `false`            | ✅       |
| `[nzShowSizeChanger]`  | 是否可以改变 `nzPageSize`                                  | `boolean`                                                                                    | `false`            | ✅       |
| `[nzSimple]`           | 当添加该属性时，显示为简单分页                             | `boolean`                                                                                    | -                  | ✅       |
| `[nzSize]`             | 当为`'small'` 时，是小尺寸分页                             | `'small' \| 'default'`                                                                       | `'default'`        | ✅       |
| `[nzResponsive]`       | 当 `nzSize` 未指定时，根据屏幕宽度自动调整尺寸             | `boolean`                                                                                    | `false`            | -        |
| `[nzPageSizeOptions]`  | 指定每页可以显示多少条                                     | `number[]`                                                                                   | `[10, 20, 30, 40]` | ✅       |
| `[nzItemRender]`       | 用于自定义页码的结构                                       | `TemplateRef<{ $implicit: 'page' \| 'prev' \| 'next'\| 'prev_5'\| 'next_5', page: number }>` | -                  | -        |
| `[nzShowTotal]`        | 用于显示数据总量和当前数据范围，具体使用方式见代码演示部分 | `TemplateRef<{ $implicit: number, range: [ number, number ] }>`                              | -                  | -        |
| `[nzHideOnSinglePage]` | 只有一页时是否隐藏分页器                                   | `boolean`                                                                                    | `false`            | -        |
| `[nzAlign]`            | 对齐方式                                                   | `NzPaginationAlign`                                                                          | `start`            | -        | 20.4.0 |
| `(nzPageIndexChange)`  | 页码改变的回调                                             | `EventEmitter<number>`                                                                       | -                  | -        |
| `(nzPageSizeChange)`   | 每页条数改变的回调                                         | `EventEmitter<number>`                                                                       | -                  | -        |
