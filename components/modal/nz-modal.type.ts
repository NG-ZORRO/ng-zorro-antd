import { EventEmitter, TemplateRef, Type } from '@angular/core';

export type OnClickCallback = (($event: MouseEvent) => (false | void | {}) | Promise<false | void | {}>);

export type ModalType = 'default' | 'confirm'; // Different modal styles we have supported

export type ConfirmType = 'confirm' | 'info' | 'success' | 'error' | 'warning'; // Subtypes of Confirm Modal

// Public options for using by service
export interface ModalOptions {
  nzModalType?: ModalType;
  nzVisible?: boolean;
  nzZIndex?: number;
  nzWidth?: number | string;
  nzWrapClassName?: string;
  nzClassName?: string;
  nzStyle?: object;
  nzIconType?: string; // Confirm Modal ONLY
  nzTitle?: string | TemplateRef<{}>;
  nzContent?: string | TemplateRef<{}> | Type<{}>;
  nzComponentParams?: object;
  nzClosable?: boolean;
  nzMask?: boolean;
  nzMaskClosable?: boolean;
  nzMaskStyle?: object;
  nzBodyStyle?: object;
  nzFooter?: string | TemplateRef<{}> | ModalButtonOptions[]; // Default Modal ONLY
  nzGetContainer?: HTMLElement | (() => HTMLElement); // STATIC
  nzAfterClose?: EventEmitter<void>;

  // --- Predefined OK & Cancel buttons
  nzOkText?: string;
  nzOkType?: string;
  nzOkLoading?: boolean;
  nzOnOk?: EventEmitter<MouseEvent> | OnClickCallback; // Mixed using ng's Input/Output (Should care of "this" when using OnClickCallback)
  nzCancelText?: string;
  nzCancelLoading?: boolean;
  nzOnCancel?: EventEmitter<MouseEvent> | OnClickCallback; // Mixed using ng's Input/Output (Should care of "this" when using OnClickCallback)
}

export interface ModalOptionsForService extends ModalOptions { // Limitations for using by service
  nzOnOk?: OnClickCallback;
  nzOnCancel?: OnClickCallback;
}

export interface ModalButtonOptions {
  label: string;
  type?: string;
  shape?: string;
  ghost?: boolean;
  size?: string;
  autoLoading?: boolean; // Default: true, indicate whether show loading automatically while onClick returned a Promise

  // [NOTE] "componentInstance" will refer to the component's instance when using Component
  show?: boolean | ((this: ModalButtonOptions, contentComponentInstance?: object) => boolean);
  loading?: boolean | ((this: ModalButtonOptions, contentComponentInstance?: object) => boolean); // This prop CAN'T use with autoLoading=true
  disabled?: boolean | ((this: ModalButtonOptions, contentComponentInstance?: object) => boolean);
  onClick?(this: ModalButtonOptions, contentComponentInstance?: object): (void | {}) | Promise<(void | {})>;
}
