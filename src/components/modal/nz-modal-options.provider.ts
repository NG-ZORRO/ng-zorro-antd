import {
  Injectable,
  TemplateRef,
  Type,
} from '@angular/core';

export class BaseOptions {

  /**
   * The modal display status
   */
  visible = false;

  /**
   * The modal title
   */
  title: string | TemplateRef<void>;

  /**
   * The modal content
   *
   * string | TemplateRef<any> | component
   *
   * A reference to a <ng-template> tag that if set will override the popovers template. Use like so:
   * <ng-template #customTemplate let-options="options">
   *   <div [class]="'popover ' + options.placement" style="display: block">
   *     My custom template
   *   </div>
   * </ng-template>
   *
   * Then pass customTemplate to the mwlConfirm directive like so `[content]="customTemplate"`
   *
   */
  content: string | TemplateRef<void> | Type<void>;
  class: string;

  /**
   * The modal width
   */
  width: string | number;

  /**
   * The modal zIndex
   */
  zIndex: number;

  /**
   * The modal ok button text
   */
  okText: string;

  /**
   * The modal cancel button text
   */
  cancelText: string;

  /**
   * A custom CSS style to be added to the modal
   */
  style: object;

  /**
   * The modal ok button handler
   */
  onOk: () => void;

  /**
   * The modal cancel button handler
   */
  onCancel: () => void;

}

export class ModalOptions extends BaseOptions {

  closable = true;
  maskClosable = true;
  wrapClassName: string;
  footer: TemplateRef<void> | boolean;
  componentParams: object;

}

export class ConfirmOptions extends BaseOptions {

  iconType: string;
  confirmType: string;

}
