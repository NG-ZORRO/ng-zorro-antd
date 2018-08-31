---
type: Feedback
category: Components
subtitle: 对话框
title: Modal
---

模态对话框。

## 何时使用

需要用户处理事务，又不希望跳转页面以致打断工作流程时，可以使用 `Modal` 在当前页面正中打开一个浮层，承载相应的操作。

另外当需要一个简洁的确认框询问用户时，可以使用精心封装好的 `NzModalService.confirm()` 等方法。

推荐使用加载Component的方式弹出Modal，这样弹出层的Component逻辑可以与外层Component完全隔离，并且做到可以随时复用，

在弹出层Component中可以通过依赖注入`NzModalRef`方式直接获取模态框的组件实例，用于控制在弹出层组件中控制模态框行为。

## API

### NzModalService

对话框当前分为2种模式，`普通模式` 和 `确认框模式`（即`Confirm`对话框，通过调用`confirm/info/success/error/warning`弹出），两种模式对API的支持程度稍有不同。

| 参数 | 说明 | 类型 | 默认值 |
|----|----|----|----|
| nzAfterOpen      | Modal 打开后的回调 | EventEmitter | 无 |
| nzAfterClose      | Modal 完全关闭后的回调，可监听close/destroy方法传入的参数 | EventEmitter | 无 |
| nzBodyStyle       | Modal body 样式 | object | 无 |
| nzCancelText      | 取消按钮文字。<i>设为 null 表示不显示取消按钮（若在普通模式下使用了 nzFooter 参数，则该值无效）</i> | string | 取消 |
| nzClosable        | 是否显示右上角的关闭按钮。<i>确认框模式下该值无效（默认会被隐藏）</i> | boolean | true |
| nzOkLoading       | 确定按钮 loading | boolean | false |
| nzCancelLoading   | 取消按钮 loading | boolean | false |
| nzFooter          | 底部内容。<i>1. 仅在普通模式下有效。<br>2. 可通过传入 ModalButtonOptions 来最大程度自定义按钮（详见案例或下方说明）。<br>3. 当不需要底部时，可以设为 null</i> | string<br>TemplateRef<br>ModalButtonOptions | 默认的确定取消按钮 |
| nzGetContainer    | 指定 Modal 挂载的 HTML 节点 | HTMLElement<br>() => HTMLElement| 默认容器 |
| nzMask            | 是否展示遮罩 | boolean | true |
| nzMaskClosable    | 点击蒙层是否允许关闭 | boolean | true |
| nzMaskStyle       | 遮罩样式 | object | 无 |
| nzOkText          | 确认按钮文字。<i>设为 null 表示不显示取消按钮（若在普通模式下使用了 nzFooter 参数，则该值无效）</i> | string | 确定 |
| nzOkType          | 确认按钮类型。<i>与button的type类型值一致</i> | string | primary |
| nzStyle           | 可用于设置浮层的样式，调整浮层位置等 | object | 无 |
| nzTitle           | 标题。<i>留空表示不展示标题。TemplateRef的使用方法可参考案例</i> | string<br>TemplateRef | 无 |
| nzVisible         | 对话框是否可见。<i>当以 `<nz-modal>` 标签使用时，请务必使用双向绑定，例如：`[(nzVisible)]="visible"`</i> | boolean | false |
| nzWidth           | 宽度。<i>使用数字时，默认单位为px</i> | string<br>number | 520 |
| nzWrapClassName   | 对话框外层容器的类名 | string | 无 |
| nzZIndex          | 设置 Modal 的 `z-index` | number | 1000 |
| nzOnCancel        | 点击遮罩层或右上角叉或取消按钮的回调（若nzContent为Component，则将会以该Component实例作为参数）。<i>注：当以`NzModalService.create`创建时，此参数应传入function（回调函数）。该函数可返回promise，待执行完毕或promise结束时，将自动关闭对话框（返回false可阻止关闭）</i> | EventEmitter | 无 |
| nzOnOk            | 点击确定回调（若nzContent为Component，则将会以该Component实例作为参数）。<i>注：当以`NzModalService.create`创建时，此参数应传入function（回调函数）。该函数可返回promise，待执行完毕或promise结束时，将自动关闭对话框（返回false可阻止关闭）</i> | EventEmitter | 无 |
| nzContent         | 内容 | string<br>TemplateRef<br>Component<br>ng-content | 无 |
| nzComponentParams | 当nzContent为组件类(Component)时，该参数中的属性将传入nzContent实例中 | object | 无 |
| nzIconType        | 图标 Icon 类型。<i>仅 确认框模式 下有效</i> | string | question-circle |

#### 注意

> `<nz-modal>` 默认关闭后状态不会自动清空, 如果希望每次打开都是新内容，请采用 `NzModalService` 服务方式创建对话框（当以服务方式创建时，默认会监听 `nzAfterClose` 并销毁对话框）。

> 通过 `NzModalService` 服务方式创建的对话框需要自行管理其生命周期。比如你在页面路由切换时，服务方式创建的对话框并不会被销毁，你需要使用对话框引用来手动销毁（`NzModalRef.close()` 或 `NzModalRef.destroy()`）。

#### 采用服务方式创建普通模式对话框

> 您可调用 `NzModalService.create(options)` 来动态创建**普通模式**对话框，这里的 `options` 是一个对象，支持上方API中给出的支持 **普通模式** 的参数

### 确认框模式 - NzModalService.method()

包括：

- `NzModalService.info`
- `NzModalService.success`
- `NzModalService.error`
- `NzModalService.warning`
- `NzModalService.confirm`

以上均为一个函数，参数为 object，与上方API一致。部分属性类型或初始值有所不同，已列在下方：

| 参数       | 说明           | 类型             | 默认值       |
|------------|----------------|------------------|--------------|
| nzOnOk          | 点击确定按钮时将执行的回调函数（若nzContent为Component，则将会以该Component实例作为参数）。<i>该函数可返回promise，待执行完毕或promise结束时，将自动关闭对话框（返回false可阻止关闭）</i> | function | 无 |
| nzOnCancel      | 点击遮罩层或右上角叉或取消按钮的回调（若nzContent为Component，则将会以该Component实例作为参数）。<i>该函数可返回promise，待执行完毕或promise结束时，将自动关闭对话框（返回false可阻止关闭）</i> | function | 无 |
| nzWidth         | 宽度 | string<br>number | 416 |
| nzMaskClosable  | 点击蒙层是否允许关闭 | boolean | false |

以上函数调用后，会返回一个引用，可以通过该引用关闭弹窗。

```ts
constructor(modal: NzModalService) {
  const ref: NzModalRef = modal.info();
  ref.close(); // 或 ref.destroy(); 将直接销毁对话框
}
```

### 相关类型定义

#### NzModalService的其他方法/属性

| 方法/属性 | 说明 | 类型 |
|----|----|
| openModals | 当前打开的所有Modal引用列表 | NzModalRef[] |
| afterAllClose | 所有Modal完全关闭后的回调 | Observable&lt;void&gt; |
| closeAll() | 关闭所有模态框 | function |

#### NzModalRef

> NzModalRef 对象用于控制对话框以及进行内容间的通信

通过服务方式 `NzModalService.xxx()` 创建的对话框，都会返回一个 `NzModalRef` 对象，用于操控该对话框（若使用nzContent为Component时，也可通过依赖注入 `NzModalRef` 方式获得此对象），该对象具有以下方法：

| 方法/属性 | 说明 |
|----|----|
| afterOpen                 | 同nzAfterOpen，但类型为Observable&lt;void&gt; |
| afterClose                | 同nzAfterClose，但类型为Observable&lt;result:any&gt; |
| open()                    | 打开(显示)对话框。<i>若对话框已销毁，则调用此函数将失效</i> |
| close(result: any)        | 关闭(隐藏)对话框。<i>注：当用于以服务方式创建的对话框，此方法将直接 销毁 对话框（同destroy方法）</i> |
| destroy(result: any)      | 销毁对话框。<i>注：仅用于服务方式创建的对话框（非服务方式创建的对话框，此方法只会隐藏对话框）</i> |
| getContentComponent()     | 获取对话框内容中`nzContent`的Component实例instance。<i>注：当对话框还未初始化完毕（`ngOnInit`未执行）时，此函数将返回`undefined`</i> |
| triggerOk()               | 手动触发nzOnOk |
| triggerCancel()           | 手动触发nzOnCancel |

#### ModalButtonOptions（用于自定义底部按钮）

可将此类型数组传入 `nzFooter`，用于自定义底部按钮。

按钮配置项如下（与button组件保持一致）：

```ts
nzFooter: [{
  label: string; // 按钮文本
  type?: string; // 类型
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
  onClick?(this: ModalButtonOptions, contentComponentInstance?: object): void | Promise&lt;void&gt; | any;
}]
```

以上配置项也可在运行态实时改变，来触发按钮行为改变。
