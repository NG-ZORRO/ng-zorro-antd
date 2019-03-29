import { OverlayRef } from '@angular/cdk/overlay';
import { EventEmitter, TemplateRef, Type } from '@angular/core';

export type OnClickCallback<T> = (instance: T) => (false | void | {}) | Promise<false | void | {}>;

export type ModalType = 'default' | 'confirm'; // Different modal styles we have supported

export type ConfirmType = 'confirm' | 'info' | 'success' | 'error' | 'warning'; // Subtypes of Confirm Modal

// Public options for using by service
// tslint:disable-next-line:no-any
export interface ModalOptions<T = any, R = any> {
  nzModalType?: ModalType;
  nzVisible?: boolean;
  nzZIndex?: number;
  nzWidth?: number | string;
  nzWrapClassName?: string;
  nzClassName?: string;
  nzStyle?: object;
  nzIconType?: string; // Confirm Modal ONLY
  nzTitle?: string | TemplateRef<{}>;
  nzContent?: string | TemplateRef<{}> | Type<T>;
  nzComponentParams?: Partial<T>;
  nzClosable?: boolean;
  nzKeyboard?: boolean;
  nzMask?: boolean;
  nzMaskClosable?: boolean;
  nzMaskStyle?: object;
  nzBodyStyle?: object;
  nzFooter?: string | TemplateRef<{}> | Array<ModalButtonOptions<T>> | null; // Default Modal ONLY
  nzGetContainer?: HTMLElement | OverlayRef | (() => HTMLElement | OverlayRef); // STATIC
  nzAfterOpen?: EventEmitter<void>;
  nzAfterClose?: EventEmitter<R>;

  // --- Predefined OK & Cancel buttons
  nzOkText?: string | null;
  nzOkType?: string;
  nzOkLoading?: boolean;
  nzOkDisabled?: boolean;
  nzCancelDisabled?: boolean;
  nzOnOk?: EventEmitter<T> | OnClickCallback<T>; // Mixed using ng's Input/Output (Should care of "this" when using OnClickCallback)
  nzCancelText?: string | null;
  nzCancelLoading?: boolean;
  nzNoAnimation?: boolean;
  nzOnCancel?: EventEmitter<T> | OnClickCallback<T>; // Mixed using ng's Input/Output (Should care of "this" when using OnClickCallback)
}

// tslint:disable-next-line:no-any
export interface ModalOptionsForService<T = any> extends ModalOptions<T> {
  // Limitations for using by service
  nzOnOk?: OnClickCallback<T>;
  nzOnCancel?: OnClickCallback<T>;
}

// tslint:disable-next-line:no-any
export interface ModalButtonOptions<T = any> {
  label: string;
  type?: string;
  shape?: string;
  ghost?: boolean;
  size?: string;
  autoLoading?: boolean; // Default: true, indicate whether show loading automatically while onClick returned a Promise

  // [NOTE] "componentInstance" will refer to the component's instance when using Component
  show?: boolean | ((this: ModalButtonOptions<T>, contentComponentInstance?: T) => boolean);
  loading?: boolean | ((this: ModalButtonOptions<T>, contentComponentInstance?: T) => boolean); // This prop CAN'T use with autoLoading=true
  disabled?: boolean | ((this: ModalButtonOptions<T>, contentComponentInstance?: T) => boolean);
  onClick?(this: ModalButtonOptions<T>, contentComponentInstance?: T): (void | {}) | Promise<void | {}>;

  // tslint:disable-next-line:no-any
  [key: string]: any;
}
