/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ModalOptions } from './modal-types';
import { NzModalComponent } from './modal.component';

export function applyConfigDefaults(config: ModalOptions, defaultOptions: ModalOptions): ModalOptions {
  return { ...defaultOptions, ...config };
}

export function getValueWithConfig<T>(userValue: T | undefined, configValue: T | undefined, defaultValue: T): T | undefined {
  return typeof userValue === 'undefined' ? (typeof configValue === 'undefined' ? defaultValue : configValue) : userValue;
}

/**
 * Assign the params into the content component instance.
 * @deprecated Should use dependency injection to get the params for user
 * @breaking-change 10.0.0
 */
export function setContentInstanceParams<T>(instance: T, params: Partial<T> | undefined): void {
  Object.assign(instance, params);
}

export function getConfigFromComponent(component: NzModalComponent): ModalOptions {
  const {
    nzMask,
    nzMaskClosable,
    nzClosable,
    nzOkLoading,
    nzOkDisabled,
    nzCancelDisabled,
    nzCancelLoading,
    nzKeyboard,
    nzNoAnimation,
    nzContent,
    nzComponentParams,
    nzFooter,
    nzGetContainer,
    nzZIndex,
    nzWidth,
    nzWrapClassName,
    nzClassName,
    nzStyle,
    nzTitle,
    nzCloseIcon,
    nzMaskStyle,
    nzBodyStyle,
    nzOkText,
    nzCancelText,
    nzOkType,
    nzIconType,
    nzModalType,
    nzOnOk,
    nzOnCancel,
    nzAfterOpen,
    nzAfterClose,
    nzCloseOnNavigation,
    nzAutofocus
  } = component;
  return {
    nzMask,
    nzMaskClosable,
    nzClosable,
    nzOkLoading,
    nzOkDisabled,
    nzCancelDisabled,
    nzCancelLoading,
    nzKeyboard,
    nzNoAnimation,
    nzContent,
    nzComponentParams,
    nzFooter,
    nzGetContainer,
    nzZIndex,
    nzWidth,
    nzWrapClassName,
    nzClassName,
    nzStyle,
    nzTitle,
    nzCloseIcon,
    nzMaskStyle,
    nzBodyStyle,
    nzOkText,
    nzCancelText,
    nzOkType,
    nzIconType,
    nzModalType,
    nzOnOk,
    nzOnCancel,
    nzAfterOpen,
    nzAfterClose,
    nzCloseOnNavigation,
    nzAutofocus
  };
}
