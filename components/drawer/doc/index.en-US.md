---
type: Feedback
category: Components
subtitle:
title: Drawer
---

A Drawer is a panel that is typically overlaid on top of a page and slides in from the side. It contains a set of information or actions. Since that user can interact with the Drawer without leaving the current page, tasks can be achieved more efficient within the same context.

## When To Use

* Use a Form to create or edit a set of information.
* Processing subtasks. When subtasks are too heavy for Popover and we still want to keep the subtasks in the context of the main task, Drawer comes very handy.
* When a same Form is needed in multiple places.

## Import this Component Individually

You can get more detail [here](/docs/getting-started/en#import-a-component-individually).

```ts
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
```

## API

### nz-drawer

| Props | Description | Type | Default | Global Config |
| --- | --- | --- | --- | --- |
| `[nzClosable]` | Whether a close (x) button is visible on top right of the Drawer dialog or not. | `boolean` | `true` |
| `[nzMask]` | Whether to show mask or not. | `boolean` | `true` | ✅ |
| `[nzMaskClosable]` | Clicking on the mask (area outside the Drawer) to close the Drawer or not. | `boolean` | `true` | ✅ |
| `[nzKeyboard]` | Whether support press esc to close | `boolean` | `true` |
| `[nzMaskStyle]` | Style for Drawer's mask element. | `object` | `{}` |
| `[nzBodyStyle]` | Body style for drawer body element. Such as height, padding etc. | `object` | `{}` |
| `[nzTitle]` | The title for Drawer. | `string \| TemplateRef<void>` | - |
| `[nzVisible]` | Whether the Drawer dialog is visible or not. | `boolean` | `false` |
| `[nzPlacement]` | The placement of the Drawer. | `'top' \| 'right' \| 'bottom' \| 'left'` | `'right'` |
| `[nzWidth]` | Width of the Drawer dialog, only when placement is `'right'` or `'left'`.  | `number \| string` | `256` |
| `[nzHeight]` | Height of the Drawer dialog, only when placement is `'top'` or `'bottom'`.  | `number \| string` | `256` |
| `[nzOffsetX]` | The the X coordinate offset(px), only when placement is `'right'` or `'left'`. | `number` | `0` |
| `[nzOffsetY]` | The the Y coordinate offset(px), only when placement is `'top'` or `'bottom'`. | `number` | `0` |
| `[nzWrapClassName]` | The class name of the container of the Drawer dialog. | `string` | - |
| `[nzZIndex]` | The `z-index` of the Drawer. | `number` | `1000` |
| `(nzOnClose)` | Specify a callback that will be called when a user clicks mask, close button or Cancel button. | `EventEmitter<MouseEvent>` | - |

### NzDrawerService

| Method | Description | Params | Return |
| --- | --- | --- | --- |
| create | create and open an Drawer | `NzDrawerOptions<T, D, R>`| `NzDrawerRef<R>` |

### NzDrawerOptions

| Params | Description | Type | Default |
| --- | --- | --- | --- |
| nzContent |  The drawer body content. | `TemplateRef<{ $implicit: D, drawerRef: NzDrawerRef }> \| Type<T>` | - |
| nzContentParams | The component inputs the param / The Template context. | `D` | - |
| nzClosable | Whether a close (x) button is visible on top right of the Drawer dialog or not. | `boolean` | `true` |
| nzOnCancel | Execute when click on the mask or the upper cancel button, This function returns a promise, which is automatically closed when the execution is complete or the promise ends (return false to prevent closing) | `() => Promise<any>` | - |
| nzMaskClosable | Clicking on the mask (area outside the Drawer) to close the Drawer or not. | `boolean` | `true` |
| nzMask | Whether to show mask or not. | `boolean` | `true` |
| nzKeyboard | Whether support press esc to close | `boolean` | `true` |
| nzMaskStyle | Style for Drawer's mask element. | `object` | `{}` |
| nzBodyStyle | Body style for modal body element. Such as height, padding etc. | `object` | `{}` |
| nzTitle | The title for Drawer. | `string \| TemplateRef<void>` | - |
| nzWidth |  Width of the Drawer dialog.  | `number \| string` | `256` |
| nzHeight | Height of the Drawer dialog, only when placement is `'top'` or `'bottom'`.  | `number \| string` | `256` |
| nzWrapClassName | The class name of the container of the Drawer dialog. | `string` | - |
| nzZIndex| The `z-index` of the Drawer. | `number` | `1000` |
| nzPlacement | The placement of the Drawer. | `'top' \| 'right' \| 'bottom' \| 'left'` | `'right'` |
| nzOffsetX | The the X coordinate offset(px). | `number` | `0` |
| nzOffsetY | The the Y coordinate offset(px), only when placement is `'top'` or `'bottom'`. | `number` | `0` |

### NzDrawerRef

#### Methods
| Name | Description | Type |
| --- | --- | --- |
| close | close the drawer. | `(result?: R) => void` |
| open | open the drawer. | `() => void` |


#### Property
| Name | Description | Type |
| --- | --- | --- |
| afterOpen | Callback called after open. | `Observable<void>` |
| afterClose | Callback called after close. | `Observable<R>` |
| nzClosable | Whether a close (x) button is visible on top right of the Drawer dialog or not. | `boolean` |
| nzMaskClosable | Clicking on the mask (area outside the Drawer) to close the Drawer or not. | `boolean` |
| nzMask | Whether to show mask or not. | `boolean` |
| nzKeyboard | Whether support press esc to close | `boolean` |
| nzMaskStyle | Style for Drawer's mask element. | `object` |
| nzBodyStyle | Body style for modal body element. Such as height, padding etc. | `object` |
| nzTitle | The title for Drawer. | `string \| TemplateRef<void>` |
| nzWidth |  Width of the Drawer dialog.  | `number \| string` |
| nzHeight | Height of the Drawer dialog, only when placement is `'top'` or `'bottom'`.  | `number \| string` |
| nzWrapClassName | The class name of the container of the Drawer dialog. | `string` |
| nzZIndex| The `z-index` of the Drawer. | `number` |
| nzPlacement | The placement of the Drawer. | `'top' \| 'right' \| 'bottom' \| 'left'` |
| nzOffsetX | The the X coordinate offset(px). | `number` |
| nzOffsetY | The the Y coordinate offset(px), only when placement is `'top'` or `'bottom'`. | `number` |
