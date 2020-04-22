/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { InjectionToken } from '@angular/core';

export interface NzModalConfig {
  nzMask?: boolean;
  nzMaskClosable?: boolean;
}
export const NZ_MODAL_CONFIG = new InjectionToken<NzModalConfig>('NZ_MODAL_CONFIG');

export const ZOOM_CLASS_NAME_MAP = {
  enter: 'zoom-enter',
  enterActive: 'zoom-enter-active',
  leave: 'zoom-leave',
  leaveActive: 'zoom-leave-active'
};

export const FADE_CLASS_NAME_MAP = {
  enter: 'fade-enter',
  enterActive: 'fade-enter-active',
  leave: 'fade-leave',
  leaveActive: 'fade-leave-active'
};

export const MODAL_MASK_CLASS_NAME = 'ant-modal-mask';
