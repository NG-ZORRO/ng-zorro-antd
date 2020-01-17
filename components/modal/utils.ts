/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NzModal2Component } from './modal.component';
import { ModalConfig } from './nz-modal.type';

export function applyConfigDefaults(config: ModalConfig, defaultOptions: ModalConfig): ModalConfig {
  return { ...defaultOptions, ...config };
}

/**
 * Assign the params into the content component instance.
 * @deprecated Should use dependency injection to get the params for user
 * @breaking-change 10.0.0
 */
export function setContentInstanceParams<T>(
  instance: T,
  // tslint:disable-next-line:no-any
  params: Partial<T> | undefined
): void {
  Object.assign(instance, params);
}

export function getConfigFromComponent(component: NzModal2Component): ModalConfig {
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
    nzAfterClose
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
    nzAfterClose
  };
}
