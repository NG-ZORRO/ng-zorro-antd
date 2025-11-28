---
category: Components
type: Navigation
title: Tabs
cols: 1
cover: 'https://gw.alipayobjects.com/zos/antfincdn/lkI2hNEDr2V/Tabs.svg'
description: Tabs make it easy to switch between different views.
---

## When To Use

Ant Design has 3 types of Tabs for different situations.

- Card Tabs: for managing too many closeable views.
- Normal Tabs: for functional aspects of a page.
- [RadioButton](/components/radio/en/#components-radio-demo-radiobutton): for secondary tabs.

## API

### nz-tabs

| Property                     | Description                                                                               | Type                                                | Default                            | Global Config |
| ---------------------------- | ----------------------------------------------------------------------------------------- | --------------------------------------------------- | ---------------------------------- | ------------- |
| `[nzSelectedIndex]`          | Current tab's index                                                                       | `number`                                            | -                                  |
| `[nzAnimated]`               | Whether to change tabs with animation. Only works while `nzTabPosition="top" \| "bottom"` | `boolean \| {inkBar:boolean, tabPane:boolean}`      | `true`, `false` when `type="card"` | ✅            |
| `[nzSize]`                   | preset tab bar size                                                                       | `'large' \| 'small' \| 'default'`                   | `'default'`                        | ✅            |
| `[nzTabBarExtraContent]`     | Extra content in tab bar                                                                  | `TemplateRef<void>`                                 | -                                  |
| `[nzTabBarStyle]`            | Tab bar style object                                                                      | `object`                                            | -                                  |
| `[nzTabPosition]`            | Position of tabs                                                                          | `'top' \| 'right' \| 'bottom' \| 'left'`            | `'top'`                            |               |
| `[nzType]`                   | Basic style of tabs                                                                       | `'line' \| 'card' \| 'editable-card'`               | `'line'`                           | ✅            |
| `[nzTabBarGutter]`           | The gap between tabs                                                                      | `number`                                            | -                                  | ✅            |
| `[nzHideAll]`                | Whether hide all tabs                                                                     | `boolean`                                           | `false`                            |
| `[nzLinkRouter]`             | Link with Angular router. It supports child mode and query param mode                     | `boolean`                                           | `false`                            |               |
| `[nzLinkExact]`              | Use exact routing matching                                                                | `boolean`                                           | `true`                             |
| `[nzCanDeactivate]`          | Determine if a tab can be deactivated                                                     | `NzTabsCanDeactivateFn`                             | -                                  |
| `[nzCentered]`               | Centers tabs                                                                              | `boolean`                                           | `false`                            |
| `[nzDestroyInactiveTabPane]` | Whether destroy inactive TabPane when change tab                                          | `boolean`                                           | `false`                            |
| `(nzSelectedIndexChange)`    | Current tab's index change callback                                                       | `EventEmitter<number>`                              | -                                  |
| `(nzSelectChange)`           | Current tab's change callback                                                             | `EventEmitter<{index: number,tab: NzTabComponent}>` | -                                  |

### nz-tabs[nzType="editable-card"]

| Property      | Description                    | Type                              | Default | Global Config |
| ------------- | ------------------------------ | --------------------------------- | ------- | ------------- |
| `[nzHideAdd]` | Hide plus icon or not          | `boolean`                         | `false` |
| `[nzAddIcon]` | Add icon                       | `string \| TemplateRef<void>`     | -       |
| `(nzAdd)`     | When add button clicked emit   | `EventEmitter<>`                  | -       |
| `(nzClose)`   | When close button clicked emit | `EventEmitter<{ index: number }>` | -       |

### nz-tab

| Property          | Description                                                              | Type                          | Default |
| ----------------- | ------------------------------------------------------------------------ | ----------------------------- | ------- |
| `[nzTitle]`       | Show text in tab's head                                                  | `string \| TemplateRef<void>` | -       |
| `[nzForceRender]` | Forced render of content in tabs, not lazy render after clicking on tabs | `boolean`                     | `false` |
| `[nzDisabled]`    | tab disable                                                              | `boolean`                     | -       |
| `(nzClick)`       | title click callback                                                     | `EventEmitter<void>`          | -       |
| `(nzContextmenu)` | title contextmenu callback                                               | `EventEmitter<MouseEvent>`    | -       |
| `(nzSelect)`      | title select callback                                                    | `EventEmitter<void>`          | -       |
| `(nzDeselect)`    | title deselect callback                                                  | `EventEmitter<void>`          | -       |

### nz-tabs[nzType="editable-card"] > nz-tab

| Property        | Description            | Type                          | Default | Global Config |
| --------------- | ---------------------- | ----------------------------- | ------- | ------------- |
| `[nzClosable]`  | Show close icon or not | `boolean`                     | `false` |
| `[nzCloseIcon]` | Close icon             | `string \| TemplateRef<void>` | -       |

#### Template variable references of `nz-tab[nzTitle]`

| Property  | Description                                                                         | Type      |
| --------- | ----------------------------------------------------------------------------------- | --------- |
| `visible` | Is the title in the visible area, will be rendered to the dropdown menu if `false`. | `boolean` |

Use in `nz-tab[nzTitle]`

```html
<nz-tab [nzTitle]="titleTemplate">
  ...
  <ng-template #titleTemplate let-visible="visible">...</ng-template>
</nz-tab>
```

Use in `*nzTabLink`

```html
<nz-tab>
  <a *nzTabLink="let visible = visible" nz-tab-link [routerLink]="['.']">...</a>
</nz-tab>
```

### [nz-tab]

Tab contents can be lazy loaded by declaring the body in a `ng-template` with the `[nz-tab]` attribute.

### ng-template[nzTabLink] > a[nz-tab-link]

Show a link in tab's head. Used in router link mode.

```html
<nz-tabs nzLinkRouter>
  <nz-tab>
    <a *nzTabLink nz-tab-link [routerLink]="['.']">Link</a>
    Default.
  </nz-tab>
</nz-tabs>
```

### [nzTabBarExtraContent]

> Note: `*nzTabBarExtraContent` has a higher priority than `nz-tabs[nzTabBarExtraContent]`.

| Property                 | Description               | Type               | Default | Global Config |
| ------------------------ | ------------------------- | ------------------ | ------- | ------------- |
| `[nzTabBarExtraContent]` | Position of extra content | `'start' \| 'end'` | `'end'` |
