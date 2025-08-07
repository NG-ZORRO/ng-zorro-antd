---
type: 反馈
category: Components
subtitle: 对话框
title: Modal
cover: 'https://gw.alipayobjects.com/zos/alicdn/3StSdUlSH/Modal.svg'
description: 展示一个对话框，提供标题、内容区、操作区。
---

## 何时使用

需要用户处理事务，又不希望跳转页面以致打断工作流程时，可以使用 `Modal` 在当前页面正中打开一个浮层，承载相应的操作。

另外当需要一个简洁的确认框询问用户时，可以使用精心封装好的 `NzModalService.confirm()` 等方法。

推荐使用加载 Component 的方式弹出 Modal，这样弹出层的 Component 逻辑可以与外层 Component 完全隔离，并且做到可以随时复用，

在弹出层 Component 中可以通过依赖注入`NzModalRef`方式直接获取模态框的组件实例，用于控制在弹出层组件中控制模态框行为。

## API

### NzModalService

对话框当前分为 2 种模式，`普通模式` 和 `确认框模式`（即`Confirm`对话框，通过调用`confirm/info/success/error/warning`弹出），两种模式对 API 的支持程度稍有不同。

| 参数                  | 说明                                                                                                                                                                                                                                                                                | 类型                                                        | 默认值              | 全局配置 |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | ------------------- | -------- |
| `nzAfterOpen`         | Modal 打开后的回调                                                                                                                                                                                                                                                                  | `EventEmitter`                                              | -                   |
| `nzAfterClose`        | Modal 完全关闭后的回调，可监听 close/destroy 方法传入的参数                                                                                                                                                                                                                         | `EventEmitter`                                              | -                   |
| `nzBodyStyle`         | Modal body 样式                                                                                                                                                                                                                                                                     | `object`                                                    | -                   |
| `nzCancelText`        | 取消按钮文字。<i>设为 null 表示不显示取消按钮（若在普通模式下使用了 nzFooter 参数，则该值无效）</i>                                                                                                                                                                                 | `string`                                                    | `'取消'`            |
| `nzCentered`          | 垂直居中展示 Modal                                                                                                                                                                                                                                                                  | `boolean`                                                   | `false`             |
| `nzClosable`          | 是否显示右上角的关闭按钮。<i>确认框模式下该值无效（默认会被隐藏）</i>                                                                                                                                                                                                               | `boolean`                                                   | `true`              |
| `nzOkLoading`         | 确定按钮 loading                                                                                                                                                                                                                                                                    | `boolean`                                                   | `false`             |
| `nzCancelLoading`     | 取消按钮 loading                                                                                                                                                                                                                                                                    | `boolean`                                                   | `false`             |
| `nzOkDisabled`        | 是否禁用确定按钮                                                                                                                                                                                                                                                                    | `boolean`                                                   | `false`             |
| `nzCancelDisabled`    | 是否禁用取消按钮                                                                                                                                                                                                                                                                    | `boolean`                                                   | `false`             |
| `nzDraggable`         | 模态框是否可拖动                                                                                                                                                                                                                                                                    | `boolean`                                                   | `false`             |
| `nzFooter`            | 底部内容。<br><i>1. 仅在普通模式下有效。<br>2. 可通过传入 ModalButtonOptions 来最大程度自定义按钮（详见案例或下方说明）。<br>3. 当不需要底部时，可以设为 null</i>                                                                                                                   | `string \| TemplateRef<{}> \| ModalButtonOptions[] \| null` | 默认的确定取消按钮  |
| `nzKeyboard`          | 是否支持键盘 esc 关闭                                                                                                                                                                                                                                                               | `boolean`                                                   | `true`              |
| `nzMask`              | 是否展示遮罩                                                                                                                                                                                                                                                                        | `boolean`                                                   | `true`              | ✅       |
| `nzMaskClosable`      | 点击蒙层是否允许关闭                                                                                                                                                                                                                                                                | `boolean`                                                   | `true`              | ✅       |
| `nzCloseOnNavigation` | 当用户在历史中前进/后退时是否关闭模态框。注意，这通常不包括点击链接（除非用户使用 HashLocationStrategy）。                                                                                                                                                                          | `boolean`                                                   | `true`              | ✅       |
| `nzDirection`         | 文字方向                                                                                                                                                                                                                                                                            | `'ltr' \| 'rtl'`                                            | -                   | ✅       |
| `nzMaskStyle`         | 遮罩样式                                                                                                                                                                                                                                                                            | `object`                                                    | -                   |
| `nzOkText`            | 确认按钮文字。<i>设为 null 表示不显示确认按钮（若在普通模式下使用了 nzFooter 参数，则该值无效）</i>                                                                                                                                                                                 | `string`                                                    | `'确定'`            |
| `nzOkType`            | 确认按钮类型。<i>与 `nz-button` 的 `nzType` 类型值一致</i>                                                                                                                                                                                                                          | `string`                                                    | `primary`           |
| `nzOkDanger`          | 确认按钮是否为危险按钮。<i>与 `nz-button` 的 `nzDanger` 值保持一致</i>                                                                                                                                                                                                              | `boolean`                                                   | `false`             |
| `nzStyle`             | 可用于设置浮层的样式，调整浮层位置等                                                                                                                                                                                                                                                | `object`                                                    | -                   |
| `nzTitle`             | 标题。<i>留空表示不展示标题。TemplateRef 的使用方法可参考案例</i>                                                                                                                                                                                                                   | `string \| TemplateRef<{}>`                                 | -                   |
| `nzCloseIcon`         | 自定义关闭图标                                                                                                                                                                                                                                                                      | `string \| TemplateRef<void>`                               | -                   |
| `nzVisible`           | 对话框是否可见。<i>当以 `<nz-modal>` 标签使用时，请务必使用双向绑定，例如：`[(nzVisible)]="visible"`</i>                                                                                                                                                                            | `boolean`                                                   | `false`             |
| `nzWidth`             | 宽度。<i>使用数字时，默认单位为 px</i>                                                                                                                                                                                                                                              | `string \| number`                                          | `520`               |
| `nzClassName`         | 对话框的类名                                                                                                                                                                                                                                                                        | `string`                                                    | -                   |
| `nzWrapClassName`     | 对话框外层容器的类名                                                                                                                                                                                                                                                                | `string`                                                    | -                   |
| `nzZIndex`            | 设置 Modal 的 `z-index`                                                                                                                                                                                                                                                             | `number`                                                    | `1000`              |
| `nzOnCancel`          | 点击遮罩层或右上角叉或取消按钮的回调（若 nzContent 为 Component，则将会以该 Component 实例作为参数）。<i>注：当以`NzModalService.create`创建时，此参数应传入 function（回调函数）。该函数可返回 promise，待执行完毕或 promise 结束时，将自动关闭对话框（返回 false 可阻止关闭）</i> | `EventEmitter`                                              | -                   |
| `nzOnOk`              | 点击确定回调（若 nzContent 为 Component，则将会以该 Component 实例作为参数）。<i>注：当以`NzModalService.create`创建时，此参数应传入 function（回调函数）。该函数可返回 promise，待执行完毕或 promise 结束时，将自动关闭对话框（返回 false 可阻止关闭）</i>                         | `EventEmitter`                                              | -                   |
| `nzContent`           | 内容                                                                                                                                                                                                                                                                                | `string \| TemplateRef<{}> \| Component \| ng-content`      | -                   |
| `nzIconType`          | 图标 Icon 类型。<i>仅 确认框模式 下有效</i>                                                                                                                                                                                                                                         | `string`                                                    | `'question-circle'` |
| `nzAutofocus`         | 自动聚焦及聚焦位置，为 `null` 时禁用                                                                                                                                                                                                                                                | `'ok' \| 'cancel' \| 'auto' \| null`                        | `'auto'`            |

#### 采用服务方式创建普通模式对话框

> 您可调用 `NzModalService.create(options)` 来动态创建**普通模式**对话框，这里的 `options` 是一个对象，支持上方 API 中给出的支持 **普通模式** 的参数

### 确认框模式 - NzModalService.method()

包括：

- `NzModalService.info`
- `NzModalService.success`
- `NzModalService.error`
- `NzModalService.warning`
- `NzModalService.confirm`

以上均为一个函数，参数为 object，与上方 API 一致。部分属性类型或初始值有所不同，已列在下方：

| 参数             | 说明                                                                                                                                                                                                      | 类型               | 默认值  |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ------- |
| `nzOnOk`         | 点击确定按钮时将执行的回调函数（若 nzContent 为 Component，则将会以该 Component 实例作为参数）。<i>该函数可返回 promise，待执行完毕或 promise 结束时，将自动关闭对话框（返回 false 可阻止关闭）</i>       | `function`         | -       |
| `nzOnCancel`     | 点击遮罩层或右上角叉或取消按钮的回调（若 nzContent 为 Component，则将会以该 Component 实例作为参数）。<i>该函数可返回 promise，待执行完毕或 promise 结束时，将自动关闭对话框（返回 false 可阻止关闭）</i> | `function`         | -       |
| `nzWidth`        | 宽度                                                                                                                                                                                                      | `string \| number` | `416`   |
| `nzMaskClosable` | 点击蒙层是否允许关闭                                                                                                                                                                                      | `boolean`          | `false` |

以上函数调用后，会返回一个引用，可以通过该引用关闭弹窗。

```ts
constructor(modal: NzModalService) {
  const ref: NzModalRef = modal.info();
  ref.close(); // 或 ref.destroy(); 将直接销毁对话框
}
```

### 相关类型定义

#### NzModalService 的其他方法/属性

| 方法/属性       | 说明                          | 类型               |
| --------------- | ----------------------------- | ------------------ |
| `openModals`    | 当前打开的所有 Modal 引用列表 | `NzModalRef[]`     |
| `afterAllClose` | 所有 Modal 完全关闭后的回调   | `Observable<void>` |
| `closeAll()`    | 关闭所有模态框                | `function`         |

#### NzModalRef

> NzModalRef 对象用于控制对话框以及进行内容间的通信

通过服务方式 `NzModalService.xxx()` 创建的对话框，都会返回一个 `NzModalRef` 对象，用于操控该对话框（若使用 nzContent 为 Component 时，也可通过依赖注入 `NzModalRef` 方式获得此对象），该对象具有以下方法：

| 方法/属性                                  | 说明                                                                                                                                    |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| `afterOpen`                                | 同 nzAfterOpen，但类型为 Observable&lt;void&gt;                                                                                         |
| `afterClose`                               | 同 nzAfterClose，但类型为 Observable&lt;result:any&gt;                                                                                  |
| `close(result: any)`                       | 关闭(隐藏)对话框。<i>注：当用于以服务方式创建的对话框，此方法将直接 销毁 对话框（同 destroy 方法）</i>                                  |
| `destroy(result: any)`                     | 销毁对话框。<i>注：仅用于服务方式创建的对话框（非服务方式创建的对话框，此方法只会隐藏对话框）</i>                                       |
| `getContentComponent()`                    | 获取对话框内容中`nzContent`的 Component 实例 instance。<i>注：当对话框还未初始化完毕（`ngOnInit`未执行）时，此函数将返回`undefined`</i> |
| `getContentComponentRef()`                 | 获取对话框内容中`nzContent`的 Component 引用 ComponentRef。<i>注：当对话框还未初始化完毕（`ngOnInit`未执行）时，此函数将返回`null`</i>  |
| `triggerOk()`                              | 手动触发 nzOnOk                                                                                                                         |
| `triggerCancel()`                          | 手动触发 nzOnCancel                                                                                                                     |
| `updateConfig(config: ModalOptions): void` | 更新配置                                                                                                                                |

### ModalButtonOptions（用于自定义底部按钮）

可将此类型数组传入 `nzFooter`，用于自定义底部按钮。

按钮配置项如下（与 button 组件保持一致）：

```ts
nzFooter: [{
  label: string; // 按钮文本
  type?: string; // 类型
  danger?: boolean; // 是否danger
  shape?: string; // 形状
  ghost?: boolean; // 是否ghost
  size?: string; // 大小
  autoLoading?: boolean; // 默认为true，若为true时，当onClick返回promise时此按钮将自动置为loading状态

  // 提示：下方方法的this指向该配置对象自身。当nzContent为组件类时，下方方法传入的contentComponentInstance参数为该组件类的实例
  // 是否显示该按钮
  show?: boolean | ((this: ModalButtonOptions, contentComponentInstance?: object) => boolean);
  // 是否显示为loading
  loading?: boolean | ((this: ModalButtonOptions, contentComponentInstance?: object) => boolean);
  // 是否禁用
  disabled?: boolean | ((this: ModalButtonOptions, contentComponentInstance?: object) => boolean);
  // 按钮点击回调
  onClick?(this: ModalButtonOptions, contentComponentInstance?: object): void | Promise<void> | any;
}]
```

以上配置项也可在运行态实时改变，来触发按钮行为改变。

### [nzModalTitle]

自定义标题。

```html
<div *nzModalTitle> Custom Modal Title </div>

<!-- or -->

<ng-template [nzModalTitle]> Custom Modal Title </ng-template>
```

### [nzModalContent]

自定义内容。

```html
<div *nzModalContent> Custom Modal Content </div>

<!-- or -->

<ng-template [nzModalContent]> Custom Modal Content </ng-template>
```

### [nzModalFooter]

自定义页脚。

```html
<div *nzModalFooter>
  <button nz-button nzType="default" (click)="handleCancel()">Custom Callback</button>
  <button nz-button nzType="primary" (click)="handleOk()" [nzLoading]="isConfirmLoading">Custom Submit</button>
</div>

<!-- or -->

<ng-template [nzModalFooter]>
  <button nz-button nzType="default" (click)="handleCancel()">Custom Callback</button>
  <button nz-button nzType="primary" (click)="handleOk()" [nzLoading]="isConfirmLoading">Custom Submit</button>
</ng-template>
```
