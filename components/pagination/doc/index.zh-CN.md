---
category: Components
subtitle: 分页
type: Navigation
title: Pagination
cols: 1
---

采用分页的形式分隔长列表，每次只加载一个页面。

## 何时使用

- 当加载/渲染所有数据将花费很多时间时；
- 可切换页码浏览数据。

## API

```html
<nz-pagination [nzPageIndex]="1" [nzTotal]="50"></nz-pagination>
```

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| nzTotal | 数据总数 | number | - |
| nzPageIndex | 当前页数，可双向绑定 | number | 1 |
| nzPageIndexChange | 页码改变的回调 | (nzPageIndex)=>{} | - |
| nzPageSize | 每页条数 ，可双向绑定| number | 10|
| nzPageSizeChange | 每页条数改变的回调 | (nzPageSize)=>{} | - |
| nzShowQuickJumper | 是否可以快速跳转至某页 | boolean | false |
| nzShowSizeChanger | 是否可以改变 `nzPageSize` | boolean | false |
| nzSimple | 当添加该属性时，显示为简单分页 | boolean | - |
| nzSize | 当为「small」时，是小尺寸分页 | string | "" |
| nzPageSizeOptions | 指定每页可以显示多少条 | `number[]` | `[10, 20, 30, 40]` |
| nzItemRender | 用于自定义页码的结构 | `TemplateRef<{ $implicit: 'page' ｜ 'prev' ｜ 'next', page: number }>` | - |
| nzShowTotal | 用于显示数据总量和当前数据范围	 | `TemplateRef<{ $implicit: number, range: [ number, number ] }>` | - |
| nzHideOnSinglePage | 只有一页时是否隐藏分页器 | boolean | false |
