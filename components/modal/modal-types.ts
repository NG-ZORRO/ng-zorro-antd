/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction } from '@angular/cdk/bidi';
import { EventEmitter, TemplateRef, Type, ViewContainerRef } from '@angular/core';

import { NzButtonShape, NzButtonSize, NzButtonType } from 'ng-zorro-antd/button';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

export type OnClickCallback<T> = (instance: T) => (false | void | {}) | Promise<false | void | {}>;

export type ModalTypes = 'default' | 'confirm'; // Different modal styles we have supported

export type ConfirmType = 'confirm' | 'info' | 'success' | 'error' | 'warning'; // Subtypes of Confirm Modal

export interface StyleObjectLike {
  [key: string]: string;
}

const noopFun = () => void 0;

export class ModalOptions<T = NzSafeAny, D = NzSafeAny, R = NzSafeAny> {
  nzCentered?: boolean = false;
  nzClosable?: boolean = true;
  nzOkLoading?: boolean = false;
  nzOkDisabled?: boolean = false;
  nzCancelDisabled?: boolean = false;
  nzCancelLoading?: boolean = false;
  nzDraggable?: boolean = false;
  nzNoAnimation?: boolean = false;
  nzAutofocus?: 'ok' | 'cancel' | 'auto' | null = 'auto';
  nzMask?: boolean;
  nzMaskClosable?: boolean;
  nzKeyboard?: boolean = true;
  nzZIndex?: number = 1000;
  nzWidth?: number | string = 520;
  nzCloseIcon?: string | TemplateRef<void> = 'close';
  nzOkType?: NzButtonType = 'primary';
  nzOkDanger?: boolean = false;
  nzModalType?: ModalTypes = 'default';
  nzOnCancel?: EventEmitter<T> | OnClickCallback<T> = noopFun;
  nzOnOk?: EventEmitter<T> | OnClickCallback<T> = noopFun;
  nzData?: D;
  nzMaskStyle?: StyleObjectLike;
  nzBodyStyle?: StyleObjectLike;
  nzWrapClassName?: string;
  nzClassName?: string;
  nzStyle?: object;
  nzTitle?: string | TemplateRef<{}>;
  nzFooter?: string | TemplateRef<{}> | Array<ModalButtonOptions<T>> | null; // Default Modal ONLY
  nzCancelText?: string | null;
  nzOkText?: string | null;
  nzContent?: string | TemplateRef<NzSafeAny> | Type<T>;
  nzCloseOnNavigation?: boolean;
  nzViewContainerRef?: ViewContainerRef;
  // Template use only
  nzAfterOpen?: EventEmitter<void>;
  nzAfterClose?: EventEmitter<R>;

  // Confirm
  nzIconType?: string = 'question-circle';
  nzDirection?: Direction;
}

export interface ModalButtonOptions<T = NzSafeAny> {
  label: string;
  type?: NzButtonType;
  danger?: boolean;
  shape?: NzButtonShape;
  ghost?: boolean;
  size?: NzButtonSize;
  autoLoading?: boolean; // Default: true, indicate whether show loading automatically while onClick returned a Promise

  // [NOTE] "componentInstance" will refer to the component's instance when using Component
  show?: boolean | ((this: ModalButtonOptions<T>, contentComponentInstance?: T) => boolean);
  loading?: boolean | ((this: ModalButtonOptions<T>, contentComponentInstance?: T) => boolean); // This prop CAN'T use with autoLoading=true
  disabled?: boolean | ((this: ModalButtonOptions<T>, contentComponentInstance?: T) => boolean);
  onClick?(this: ModalButtonOptions<T>, contentComponentInstance?: T): NzSafeAny | Promise<NzSafeAny>;
  [key: string]: NzSafeAny;
}
