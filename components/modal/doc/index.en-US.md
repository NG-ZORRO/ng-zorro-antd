---
type: Feedback
category: Components
title: Modal
---

Modal dialogs.

## When To Use

When requiring users to interact with application, but without jumping to a new page to interrupt
the user's workflow, you can use `Modal` to create a new floating layer over the current page for user
getting feedback or information purposes.
Additionally, if you need show a simple confirmation dialog, you can use `NzModalService.confirm()`,
and so on.

It is recommended to use the `Component` way to pop up the Modal, so that the component logic of the popup layer can be completely isolated from the outer component, and can be reused at any time. In the popup layer component, you can obtain Modal's component instance by injecting `NzModalRef` to control the behavior of the modal box.

## How To Use

If you want to modify the global default configuration, you can modify the value of provider `NZ_MODAL_CONFIG`.
(eg, add `{ provide: NZ_MODAL_CONFIG, useValue: { autoBodyPadding: false }}` to `providers` of your module, `NZ_MODAL_CONFIG` can be imported from `ng-zorro-antd`)

The default global configuration is:
```js
{
  autoBodyPadding: true, // Whether to automatically add "padding" and "overflow" the body to hide the scroll bar
}
```

## API

### NzModalService

The dialog is currently divided into 2 modes, `normal mode` and `confirm box mode` (ie the `Confirm` dialog, which is called by calling `confirm/info/success/error/warning`). The degree of API support for the two modes is slightly different.

| Property | Description | Type | Default |
|----|----|----|----|
| nzAfterOpen      | Specify a EventEmitter that will be emitted when modal opened | EventEmitter | - |
| nzAfterClose      | Specify a EventEmitter that will be emitted when modal is closed completely (Can listen for parameters passed in the close/destroy method) | EventEmitter | - |
| nzBodyStyle       | Body style for modal body element. Such as height, padding etc. | object | - |
| nzCancelText      | Text of the Cancel button. <i>Set to null to show no cancel button (this value is invalid if the nzFooter parameter is used in normal mode)</i> | string | Cancel |
| nzClosable        | Whether a close (x) button is visible on top right of the modal dialog or not. <i>Invalid value in confirm box mode (default will be hidden)</i> | boolean | true |
| nzOkLoading       | Whether to apply loading visual effect for OK button or not | boolean | false |
| nzCancelLoading   | Whether to apply loading visual effect for Cancel button or not | boolean | false |
| nzFooter          | Footer content, set as footer=null when you don't need default buttons. <i>1. Only valid in normal mode.<br>2. You can customize the buttons to the maximum extent by passing a `ModalButtonOptions` configuration (see the case or the instructions below).</i> | string<br>TemplateRef<br>ModalButtonOptions | OK and Cancel buttons |
| nzGetContainer    | The mount node for Modal | HTMLElement / () => HTMLElement| A default container |
| nzMask            | Whether show mask or not. | boolean | true |
| nzMaskClosable    | Whether to close the modal dialog when the mask (area outside the modal) is clicked | boolean | true |
| nzMaskStyle       | Style for modal's mask element. | object | - |
| nzOkText          | Text of the OK button. <i>Set to null to show no cancel button (this value is invalid if the nzFooter parameter is used in normal mode)</i> | string | OK |
| nzOkType          | Button type of the OK button. <i>Consistent with the type of the `nz-button`.</i> | string | primary |
| nzStyle           | Style of floating layer, typically used at least for adjusting the position. | object | - |
| nzTitle           | The modal dialog's title. <i>Leave blank to show no title. The usage of TemplateRef can refer to the case</i> | string / TemplateRef | - |
| nzVisible         | Whether the modal dialog is visible or not. <i>When using the `<nz-modal>` tag, be sure to use two-way binding, for example: `[(nzVisible)]="visible"`.</i> | boolean | false |
| nzWidth           | Width of the modal dialog. <i>When using numbers, the default unit is `px`</i> | string<br>number | 520 |
| nzWrapClassName   | The class name of the container of the modal dialog | string | - |
| nzZIndex          | The z-index of the Modal | number | 1000 |
| nzOnCancel        | Specify a function that will be called when a user clicks mask, close button on top right or Cancel button (If nzContent is Component, the Component instance will be put in as an argument). <i>Note: When created with `NzModalService.create`, this parameter should be passed into the type of function (callback function). This function returns a promise, which is automatically closed when the execution is complete or the promise ends (return `false` to prevent closing)</i> | EventEmitter | - |
| nzOnOk            | Specify a EventEmitter that will be emitted when a user clicks the OK button (If nzContent is Component, the Component instance will be put in as an argument). <i>Note: When created with `NzModalService.create`, this parameter should be passed into the type of function (callback function). This function returns a promise, which is automatically closed when the execution is complete or the promise ends (return `false` to prevent closing)</i> | EventEmitter | 无 |
| nzContent         | Content | string / TemplateRef / Component / ng-content | - |
| nzComponentParams | When nzContent is a Component, the attributes in this parameter will be passed to the nzContent instance | object | - |
| nzIconType        | Icon type of the Icon component. <i>Only valid in confirm box mode</i> | string | question-circle |

#### Attentions

> The default state of `<nz-modal>` will not be automatically cleared. If you wish to open new content each time, use the `NzModalService` service to create modals (when created as a service, the `nzAfterClose` event will be listened by default aim to destroy the modal).

> Modals created through the `NzModalService` service need you to manage their own life cycle. For example, when you switch the page route, the modal box created by service will not be destroyed automatically. You need to use the modal box's reference to manually destroy it (`NzModalRef.close()` or `NzModalRef.destroy()`).

#### Using service to create Normal Mode modal

> You can call `NzModalService.create(options)` to dynamically create **normal mode** modals, where `options` is an object that supports the support given in the API above **normal mode** parameters

### Confirm box mode - NzModalService.method()

There are five ways to display the information based on the content's nature:

- `NzModalService.info`
- `NzModalService.success`
- `NzModalService.error`
- `NzModalService.warning`
- `NzModalService.confirm`

The items listed above are all functions, expecting a settings object as parameter.
Consistent with the above API, some property types or initial values are different as follows:

| Property   | Description    | Type             | Default       |
|------------|----------------|------------------|---------------|
| nzOnOk          | Specify a EventEmitter that will be emitted when a user clicks the OK button (If nzContent is Component, the Component instance will be put in as an argument.). <i>This function returns a promise, which is automatically closed when the execution is complete or the promise ends (return `false` to prevent closing)</i> | function | - |
| nzOnCancel      | Specify a function that will be called when a user clicks mask, close button on top right or Cancel button (If nzContent is Component, the Component instance will be put in as an argument.). <i>This function returns a promise, which is automatically closed when the execution is complete or the promise ends (return `false` to prevent closing)</i> | function | - |
| nzWidth         | Width of the modal dialog | string / number | 416 |
| nzMaskClosable  | Whether to close the modal dialog when the mask (area outside the modal) is clicked | boolean | false |

All the `NzModalService.method`s will return a reference, and then we can close the popup by the reference.

```ts
constructor(modal: NzModalService) {
  const ref: NzModalRef = modal.info();
  ref.close(); // Or ref.destroy(); This dialog will be destroyed directly
}
```

### Related type definition

#### Other Methods/Attributes for NzModalService

| Methods/Attributes | Description | Type |
|----|----|
| openModals | All currently open Modal list | NzModalRef[] |
| afterAllClose | Callback called after all Modals closed completely | Observable&lt;void&gt; |
| closeAll() | Close all modals | function |

#### NzModalRef

> NzModalRef object is used to control dialogs and communicate with inside content

The dialog created by the service method `NzModalService.xxx()` will return a `NzModalRef` object that is used to manipulate the dialog (this object can also be obtained by dependency injection `NzModalRef` if `nzContent` is used as Component) , This object has the following methods:

| Method | Description |
|----|----|
| afterOpen                 | Same as nzAfterOpen but of type Observable&lt;void&gt; |
| afterClose | Same as nzAfterClose, but of type Observable&lt;result:any&gt; |
| open()                    | Open (display) dialog box. <i>Calling this function will fail if the dialog is already destroyed</i> |
| close()                   | Close (hide) the dialog. <i>Note: When used for a dialog created as a service, this method will destroy the dialog directly (as with the destroy method)</i> |
| destroy()                 | Destroy the dialog. <i>Note: Used only for dialogs created by the service (non-service created dialogs, this method only hides the dialog)</i> |
| getContentComponent()  | Gets the Component instance in the contents of the dialog for `nzContent`. <i> Note: When the dialog is not initialized (`ngOnInit` is not executed), this function will return `undefined`</i> |
| triggerOk()               | Manually trigger nzOnOk |
| triggerCancel()           | Manually trigger nzOnCancel |

#### ModalButtonOptions (used to customize the bottom button)

An array of `ModalButtonOptions` type can be passed to `nzFooter` for custom bottom buttons.

The button configuration items are as follows (along with the button component):

```ts
nzFooter: [{
  label: string; // Button text
  type?: string; // Types
  shape?: string; // Shape
  ghost?: boolean; // Whether ghost
  size?: string; // Size
  autoLoading?: boolean; // The default is true. If true, this button will automatically be set to the loading state when onClick returns a promise.

  // Tip: The `this` of below methods points to the configuration object itself. When nzContent is a component class, the contentComponentInstance parameter passed in by the method below is an instance of the component class
  // Whether to show this button
  show?: boolean | ((this: ModalButtonOptions, contentComponentInstance?: object) => boolean);
  // Whether to display loading
  loading?: boolean | ((this: ModalButtonOptions, contentComponentInstance?: object) => boolean);
  // Is it disabled
  disabled?: boolean | ((this: ModalButtonOptions, contentComponentInstance?: object) => boolean);
  // Callback of clicking
  onClick?(this: ModalButtonOptions, contentComponentInstance?: object): void | Promise&lt;void&gt; | any;
}]
```

The above configuration items can also be changed in real-time to trigger the button behavior change.
