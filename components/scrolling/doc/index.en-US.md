---
category: Components
type: Other
title: Scrolling
cover: https://gw.alipayobjects.com/zos/alicdn/5rWLU27so/Grid.svg
---

Unified management of scrolling.

## When To Use

- The scroll event refreshes the position of tooltip related (including popconfirm popover) components.
- Large amounts of data require virtual scrolling

```ts
import { NzScrollingModule } from 'ng-zorro-antd/scrolling';
```

## API

### nz-scrolling

> Related interfaces of [CDK scrolling](https://material.angular.io/cdk/scrolling/api) only take effect when virtual scrolling is enabled.
> The virtual scroll view, which can be accessed from the [CdkVirtualScrollViewport](https://material.angular.io/cdk/scrolling/api#CdkVirtualScrollViewport) instance through the `virtualScrollViewport` member of the component instance.


| Property | Description | Type | Default | Global Config |
| --- | --- | --- | --- | --- |
| `[nzVirtual]` | Enable virtual scrolling | `boolean` | `false` | ✅ |
| `[nzStaticSize]` | The size of each item during virtual scrolling is the same as [CDK itemSize](https://material.angular.io/cdk/scrolling/api). When no value is passed, it will get height automatically based on `nzItemTemplate` | `number` | - |
| `[nzMinBufferPx]` | When the page buffer is less than this value, set the buffer to the maximum value, which is the same as [CDK minBufferPx](https://material.angular.io/cdk/scrolling/api), it will configure automatically when no value is passed | `number` | - | ✅ |
| `[nzMaxBufferPx]` |The maximum value of the page buffer, which is the same as [CDK maxBufferPx](https://material.angular.io/cdk/scrolling/api), it will configure automatically when no value is passed | `number` | - | ✅ |
| `[nzOrientation]` | Page scroll direction, same as [CDK orientation](https://material.angular.io/cdk/scrolling/api) | `horizontal \| vertical` | `vertical` |
| `[nzTemplateCacheSize]` | The number of `template` caches, same as [CDK cdkVirtualForTemplateCacheSize](https://material.angular.io/cdk/scrolling/api) | `number` | `20` | ✅ |
| `[nzTrackBy]` | `TrackByFunction` interface, same as [CDK cdkVirtualForTrackBy](https://material.angular.io/cdk/scrolling/api) | `TrackByFunction<T>` | - |
| `[nzViewportHeight]` | Page height, the unit is `px` when inputting a number | `string \| number` | - |
| `[nzHiddenBar]` | Hide scrollbar | `boolean` | `false` | ✅ |
| `[nzCustomContent]` | Custom content, `nzItemTemplate` is only used to automatically obtain the size of each item | `boolean` | `false` |
| `[nzViewportClass]` | Page add `class` | `NgClassInterface \| string` | - |
| `[nzViewportStyle]` | Page add `style` | `NgStyleInterface` | - |
| `[nzData]` | List Data | `T[]` | `[]` |
| `[nzItemTemplate]` | Rendering template | `TemplateRef<CdkVirtualForOfContext<T>>` | - |
| `(nzScrolledIndexChange)` | Callback function when the index of the first element visible changes in the viewport | `EventEmitter<number>` | - |
| `(nzAutoSizeChange)` | Callback function when the size of the element changes | `EventEmitter<number>` | - |
