---
category: Components
type: Data Display
title: Tabs
cols: 1
---

Tabs make it easy to switch between different views.

## When To Use

Ant Design has 3 types of Tabs for different situations.

- Card Tabs: for managing too many closeable views.
- Normal Tabs: for functional aspects of a page.
- [RadioButton](/components/radio/en/#components-radio-demo-radiobutton): for secondary tabs.

## Import this Component Individually

You can get more detail [here](/docs/getting-started/en#import-a-component-individually).

```ts
import { NzTabsModule } from 'ng-zorro-antd/tabs';
```

## API

### nz-tabset

| Property | Description | Type | Default | Global Config |
| -------- | ----------- | ---- | ------- | ------------- |
| `[nzSelectedIndex]` | Current tab's index | `number` | - |
| `[nzAnimated]` | Whether to change tabs with animation. Only works while `nzTabPosition="top" \| "bottom"` | `boolean \| {inkBar:boolean, tabPane:boolean}` | `true`, `false` when `type="card"` | ✅ |
| `[nzSize]` | preset tab bar size | `'large' \| 'small' \| 'default'` | `'default'` | ✅ |
| `[nzTabBarExtraContent]` | Extra content in tab bar | `TemplateRef<void>` | - |
| `[nzTabBarStyle]` | Tab bar style object | `object` | - |
| `[nzTabPosition]` | Position of tabs | `'top' \| 'right' \| 'bottom' \| 'left'` | `'top'` | |
| `[nzType]` | Basic style of tabs | `'line' \| 'card'` | `'line'` | ✅ |
| `[nzTabBarGutter]` | The gap between tabs | `number` | - | ✅ |
| `[nzHideAll]` | Whether hide all tabs | `boolean` | `false` |
| `[nzShowPagination]` | Whether show pre or next button when exceed display area | `boolean` | `true` | ✅ |
| `[nzLinkRouter]` | Link with Angular router. It supports child mode and query param mode | `boolean` | `false` ||
| `[nzLinkExact]` | Use exact routing matching | `boolean` | `true` |
| `(nzSelectedIndexChange)` | Current tab's index change callback | `EventEmitter<number>` | - |
| `(nzSelectChange)` | Current tab's change callback | `EventEmitter<{nzSelectedIndex: number,tab: NzTabComponent}>` | - |
| `(nzOnNextClick)` | Callback executed when next button is clicked | `EventEmitter<void>` | - |
| `(nzOnPrevClick)` | Callback executed when prev button is clicked | `EventEmitter<void>` | - |

### nz-tab

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[nzTitle]` | Show text in tab's head | `string \| TemplateRef<void>` | - |
| `[nzForceRender]` | Forced render of content in tabs, not lazy render after clicking on tabs | `boolean` | `false` |
| `[nzDisabled]` | tab disable | `boolean` | - |
| `(nzClick)` | title click callback | `EventEmitter<void>` | - |
| `(nzSelect)` | title select callback | `EventEmitter<void>` | - |
| `(nzDeselect)` | title deselect callback | `EventEmitter<void>` | - |

### [nz-tab]

Tab contents can be lazy loaded by declaring the body in a `ng-template` with the `[nz-tab]` attribute.

### nz-tab-link

Show a link in tab's head. Used in router link mode.

### Link Router

This make the tabs component changes `nzSelectedIndex` with Angular route. You must use `nz-tab-link` instead of `[nzTitle]` in this situation.
