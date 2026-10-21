---
type: 反馈
category: Components
subtitle: 抽屉
title: Drawer
cover: 'https://gw.alipayobjects.com/zos/alicdn/7z8NJQhFb/Drawer.svg'
description: 屏幕边缘滑出的浮层面板。
---

抽屉从父窗体边缘滑入，覆盖住部分父窗体内容。用户在抽屉内操作时不必离开当前任务，操作完成后，可以平滑地回到到原任务。

## 何时使用

- 当需要一个附加的面板来控制父窗体内容，这个面板在需要时呼出。比如，控制界面展示样式，往界面中添加内容。
- 当需要在当前任务流中插入临时任务，创建或预览附加内容。比如展示协议条款，创建子对象。

## API

### nz-drawer

| 参数                    | 说明                                                                                                         | 类型                                     | 默认值      | 全局配置 |
| ----------------------- | ------------------------------------------------------------------------------------------------------------ | ---------------------------------------- | ----------- | -------- |
| `[nzClosable]`          | 是否显示左上角的关闭按钮                                                                                     | `boolean`                                | `true`      |
| `[nzCloseIcon]`         | 自定义关闭图标                                                                                               | `string \| TemplateRef<void> \| null`    | `'close'`   |
| `[nzExtra]`             | 抽屉右上角的操作区域                                                                                         | `string \| TemplateRef<void> \| null`    | -           |
| `[nzMaskClosable]`      | 点击蒙层是否允许关闭                                                                                         | `boolean`                                | `true`      | ✅       |
| `[nzMask]`              | 是否展示遮罩                                                                                                 | `boolean`                                | `true`      | ✅       |
| `[nzCloseOnNavigation]` | 当用户在历史中前进/后退时是否关闭抽屉组件。注意，这通常不包括点击链接（除非用户使用 HashLocationStrategy）。 | `boolean`                                | `true`      | ✅       |
| `[nzMaskStyle]`         | 遮罩样式                                                                                                     | `object`                                 | `{}`        |
| `[nzKeyboard]`          | 是否支持键盘 esc 关闭                                                                                        | `boolean`                                | `true`      |
| `[nzBodyStyle]`         | Drawer body 样式                                                                                             | `object`                                 | `{}`        |
| `[nzTitle]`             | 标题                                                                                                         | `string \| TemplateRef<void>`            | -           |
| `[nzFooter]`            | 抽屉的页脚                                                                                                   | `string \| TemplateRef<void>`            | -           |
| `[nzVisible]`           | Drawer 是否可见，可以使用 `[(nzVisible)]` 双向绑定                                                           | `boolean`                                | -           |
| `[nzPlacement]`         | 抽屉的方向                                                                                                   | `'top' \| 'right' \| 'bottom' \| 'left'` | `'right'`   |
| `[nzSize]`              | 预设抽屉宽度（或高度），default `378px` 和 large `736px`                                                     | `'default' \| 'large'`                   | `'default'` |
| `[nzWidth]`             | 宽度, 只在方向为 `'right'`或`'left'` 时生效，优先级高于 `nzSize`                                             | `number \| string`                       | -           |
| `[nzHeight]`            | 高度, 只在方向为 `'top'`或`'bottom'` 时生效，优先级高于 `nzSize`                                             | `number \| string`                       | -           |
| `[nzOffsetX]`           | x 坐标移量(px), 只在方向为 `'right'`或`'left'` 时生效                                                        | `number`                                 | `0`         |
| `[nzOffsetY]`           | y 坐标移量(px), 高度, 只在方向为 `'top'`或`'bottom'` 时生效                                                  | `number`                                 | `0`         |
| `[nzWrapClassName]`     | 对话框外层容器的类名                                                                                         | `string`                                 | -           |
| `[nzZIndex]`            | 设置 Drawer 的 `z-index`                                                                                     | `number`                                 | `1000`      |
| `(nzOnClose)`           | 点击遮罩层或右上角叉的回调                                                                                   | `EventEmitter<MouseEvent>`               | -           |

### [nzDrawerFooter]

自定义抽屉页脚，支持在通过 `NzDrawerService` 打开的内容组件中使用。
导入 `NzDrawerFooterDirective` 或 `NzDrawerModule`，支持以下两种语法：

```html
<ng-template nzDrawerFooter>
  <button nz-button nzType="primary" (click)="save()">保存</button>
</ng-template>
<!-- 也可以使用：<div *nzDrawerFooter>...</div> -->
```

该指令会替换 `nzFooter`。条件页脚被移除时，仅当抽屉仍使用该模板才会清空 `nzFooter`。

### NzDrawerService

| 方法名          | 说明                  | 参数                    | 返回                |
| --------------- | --------------------- | ----------------------- | ------------------- |
| create<T, D, R> | 创建并打开一个 Drawer | `NzDrawerOptions<T, D>` | `NzDrawerRef<T, R>` |

### NzDrawerOptions

`NzDrawerOptionsOfComponent` 是 `NzDrawerOptions` 的已弃用兼容别名。

| 参数                | 说明                                                                                                                   | 类型                                                               | 默认值      | 全局配置 |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ | ----------- | -------- |
| nzContent           | Drawer body 的内容                                                                                                     | `TemplateRef<{ $implicit: D, drawerRef: NzDrawerRef }> \| Type<T>` | -           |
| nzContentParams     | 内容组件的输入参数 / Template 的 context                                                                               | `D`                                                                | -           |
| nzOnCancel          | 点击遮罩层或右上角叉时执行,该函数可返回 promise 待执行完毕或 promise 结束时，将自动关闭对话框（返回 false 可阻止关闭） | `() => Promise<any>`                                               | -           |
| nzClosable          | 是否显示左上角的关闭按钮                                                                                               | `boolean`                                                          | `true`      |
| nzCloseIcon         | 自定义关闭图标                                                                                                         | `string \| TemplateRef<void> \| null`                              | `'close'`   |
| nzExtra             | 抽屉右上角的操作区域                                                                                                   | `string \| TemplateRef<void> \| null`                              | -           |
| nzMaskClosable      | 点击蒙层是否允许关闭                                                                                                   | `boolean`                                                          | `true`      | ✅       |
| nzMask              | 是否展示遮罩                                                                                                           | `boolean`                                                          | `true`      | ✅       |
| nzCloseOnNavigation | 当用户在历史中前进/后退时是否关闭抽屉组件。注意，这通常不包括点击链接（除非用户使用 HashLocationStrategy）。           | `boolean`                                                          | `true`      | ✅       |
| nzDirection         | 文字方向                                                                                                               | `'ltr' \| 'rtl'`                                                   | -           | ✅       |
| nzKeyboard          | 是否支持键盘 esc 关闭                                                                                                  | `boolean`                                                          | `true`      |
| nzMaskStyle         | 遮罩样式                                                                                                               | `object`                                                           | `{}`        |
| nzBodyStyle         | Modal body 样式                                                                                                        | `object`                                                           | `{}`        |
| nzTitle             | 标题                                                                                                                   | `string \| TemplateRef<void>`                                      | -           |
| nzFooter            | 页脚                                                                                                                   | `string \| TemplateRef<void>`                                      | -           |
| nzSize              | 预设抽屉宽度（或高度），default `378px` 和 large `736px`                                                               | `'default' \| 'large'`                                             | `'default'` |
| nzWidth             | 宽度, 只在方向为 `'right'`或`'left'` 时生效，优先级高于 `nzSize`                                                       | `number \| string`                                                 | -           |
| nzHeight            | 高度, 只在方向为 `'top'`或`'bottom'` 时生效，优先级高于 `nzSize`                                                       | `number \| string`                                                 | -           |
| nzWrapClassName     | 对话框外层容器的类名                                                                                                   | `string`                                                           | -           |
| nzZIndex            | 设置 Drawer 的 `z-index`                                                                                               | `number`                                                           | `1000`      |
| nzPlacement         | 抽屉的方向                                                                                                             | `'top' \| 'right' \| 'bottom' \| 'left'`                           | `'right'`   |
| nzOffsetX           | x 坐标移量(px)                                                                                                         | `number`                                                           | `0`         |
| nzOffsetY           | y 坐标移量(px), 高度, 只在方向为 `'top'`或`'bottom'` 时生效                                                            | `number`                                                           | `0`         |

### NzDrawerRef

#### 方法

使用 `updateConfig()` 在打开后更新抽屉配置并触发渲染，支持无 Zone 应用。
例如：`drawerRef.updateConfig({ nzFooter: footerTemplate, nzOnCancel: () => Promise.resolve(false) })`。
更新配置不会重新创建内容组件。

| 名称                | 说明                                | 类型                                    |
| ------------------- | ----------------------------------- | --------------------------------------- |
| close               | 关闭 Drawer                         | `(result?: R) => void`                  |
| open                | 打开 Drawer                         | `() => void`                            |
| updateConfig        | 更新抽屉配置并触发渲染              | `(options: NzDrawerOptions<T>) => void` |
| getContentComponent | 返回 `nzContent` 为组件时的组件实例 | `() => T \| null`                       |

#### 属性

| 名称            | 说明                                                                   | 类型                                     |
| --------------- | ---------------------------------------------------------------------- | ---------------------------------------- |
| afterOpen       | 打开之后的回调                                                         | `Observable<void>`                       |
| afterClose      | 关闭之后的回调                                                         | `Observable<R>`                          |
| nzClosable      | 是否显示右上角的关闭按钮                                               | `boolean`                                |
| nzCloseIcon     | 自定义关闭图标                                                         | `string \| TemplateRef<void> \| null`    |
| nzMaskClosable  | 点击蒙层是否允许关闭                                                   | `boolean`                                |
| nzMask          | 是否展示遮罩                                                           | `boolean`                                |
| nzMaskStyle     | 遮罩样式                                                               | `object`                                 |
| nzKeyboard      | 是否支持键盘 esc 关闭                                                  | `boolean`                                |
| nzBodyStyle     | Modal body 样式                                                        | `object`                                 |
| nzTitle         | 标题                                                                   | `string \| TemplateRef<void>`            |
| nzFooter        | 抽屉的页脚                                                             | `string \| TemplateRef<void>`            |
| nzExtra         | 抽屉右上角的操作区域                                                   | `string \| TemplateRef<void>`            |
| nzOnCancel      | 服务创建的抽屉的当前关闭回调，返回的 Promise 结果为 `false` 时阻止关闭 | `() => Promise<any>`                     |
| nzWidth         | 宽度                                                                   | `number \| string`                       |
| nzHeight        | 高度, 只在方向为 `'top'`或`'bottom'` 时生效                            | `number \| string`                       |
| nzWrapClassName | 对话框外层容器的类名                                                   | `string`                                 |
| nzZIndex        | 设置 Drawer 的 `z-index`                                               | `number`                                 |
| nzPlacement     | 抽屉的方向                                                             | `'top' \| 'right' \| 'bottom' \| 'left'` |
| nzOffsetX       | x 坐标移量(px)                                                         | `number`                                 |
| nzOffsetY       | y 坐标移量(px), 高度, 只在方向为 `'top'`或`'bottom'` 时生效            | `number`                                 |
