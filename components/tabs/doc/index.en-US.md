---
category: Components
type: Data Display
title: Tabs
cols: 1
---

Tabs make it easy to switch between different views.

### When To Use

Ant Design has 3 types of Tabs for different situations.

- Card Tabs: for managing too many closeable views.
- Normal Tabs: for functional aspects of a page.
- [RadioButton](/components/radio/en/#components-radio-demo-radiobutton): for secondary tabs.

## API

### nz-tabset

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| nzSelectedIndex | Current tab's index | number | - |
| nzSelectedIndexChange | Current tab's index change callback | (nzSelectedIndex:number)=>{} | - |
| nzSelectChange | Current tab's change callback | (nzSelectedIndex: number,tab: NzTabComponent)=>{} | - |
| nzAnimated | Whether to change tabs with animation. Only works while `nzTabPosition="top"｜"bottom"` | boolean ｜ {inkBar:boolean, tabPane:boolean} | `true`, `false` when `type="card"` |
| nzSize | preset tab bar size | `large` ｜ `default` ｜ `small` | `default` |
| nzTabBarExtraContent | Extra content in tab bar | `TemplateRef<void>` | - |
| nzTabBarStyle | Tab bar style object | object | - |
| nzTabPosition | Position of tabs | `top` ｜ `right` ｜ `bottom` ｜ `left` | `top` |
| nzType | Basic style of tabs | `line` ｜ `card`  | `line` |
| nzOnNextClick | Callback executed when next button is clicked | Function | - |
| nzOnPrevClick | Callback executed when prev button is clicked | Function | - |
| nzTabBarGutter | The gap between tabs | number | - |
| nzHideAll | Whether hide all tabs | boolean | false |
| nzShowPagination | Whether show pre or next button when exceed display area | boolean | true |

### nz-tab

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| nzTitle | Show text in tab's head | string｜`TemplateRef<void>` | - |
| nzDisabled | tab disable | boolean | - |
| nzClick | title click callback | ()=>{} | - |
| nzSelect | title select callback | ()=>{} | - |
| nzDeselect | title deselect callback | ()=>{} | - |
