---
category: Components
subtitle: 滚动
type: 其他
title: Scrolling
cover: https://gw.alipayobjects.com/zos/alicdn/5rWLU27so/Grid.svg
---

统一管理滚动.

## 何时使用

- 滚轴事件刷新 tooltip 相关(包括 popconfirm popover) 组件的位置.
- 大量数据需要虚拟滚动

```ts
import { NzScrollingModule } from 'ng-zorro-antd/scrolling';
```

## API

### nz-scrolling

> [CDK scrolling](https://material.angular.io/cdk/scrolling/api) 相关接口仅在启用虚拟滚动时生效.
> 虚拟滚动的视图，可以通过组件实例上的 `virtualScrollViewport` 成员访问 [CdkVirtualScrollViewport](https://material.angular.io/cdk/scrolling/api#CdkVirtualScrollViewport) 实例。

| 成员 | 说明 | 类型 | 默认值 | 全局配置 |
| --- | --- | --- | --- | --- |
| `[nzVirtual]` | 启用虚拟滚动 | `boolean` | `false` | ✅ |
| `[nzStaticSize]` | 虚拟滚动时每一项的大小，与 [CDK itemSize](https://material.angular.io/cdk/scrolling/api) 相同, 不传值时会自动根据 `nzItemTemplate` 获取高度 | `number` | - |
| `[nzMinBufferPx]` | 当页面缓存小于该值，获取缓存至最大值, 与 [CDK minBufferPx](https://material.angular.io/cdk/scrolling/api) 相同, 不传值时会自动配置 | `number` | - | ✅ |
| `[nzMaxBufferPx]` | 页面缓存至最大值, 与 [CDK maxBufferPx](https://material.angular.io/cdk/scrolling/api) 相同, 不传值时会自动配置 | `number` | - | ✅ |
| `[nzOrientation]` | 页面滚动方向, 与 [CDK orientation](https://material.angular.io/cdk/scrolling/api) 相同 | `horizontal \| vertical` | `vertical` |
| `[nzTemplateCacheSize]` | `template`缓存个数, 与 [CDK cdkVirtualForTemplateCacheSize](https://material.angular.io/cdk/scrolling/api) 相同 | `number` | `20` | ✅ |
| `[nzTrackBy]` | `TrackByFunction` 接口, 与 [CDK cdkVirtualForTrackBy](https://material.angular.io/cdk/scrolling/api) 相同 | `TrackByFunction<T>` | - |
| `[nzViewportHeight]` | 页面高度, 传入数字时单位为 `px` | `string \| number` | - |
| `[nzHiddenBar]` | 隐藏滚动条 | `boolean` | `false` | ✅ |
| `[nzCustomContent]` | 自定义内容, `nzItemTemplate` 仅用来自动获取每一项的大小  | `boolean` | `false` |
| `[nzViewportClass]` | 页面添加 `class`  | `NgClassInterface \| string` | - |
| `[nzViewportStyle]` | 页面添加 `style`  | `NgStyleInterface` | - |
| `[nzData]` | 列表数据  | `T[]` | `[]` |
| `[nzItemTemplate]` | 渲染模板  | `TemplateRef<CdkVirtualForOfContext<T>>` | - |
| `(nzScrolledIndexChange)` | 当视口中可见的第一个元素的索引更改时的回调函数  | `EventEmitter<number>` | - |
| `(nzAutoSizeChange)` | 当元素的大小更改时的回调函数  | `EventEmitter<number>` | - |
