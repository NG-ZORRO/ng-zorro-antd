/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { InjectionToken } from '@angular/core';

import { NzConfigKey } from 'ng-zorro-antd/core/config';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

export const ZOOM_CLASS_NAME_MAP = {
  enter: 'ant-zoom-enter',
  enterActive: 'ant-zoom-enter-active',
  leave: 'ant-zoom-leave',
  leaveActive: 'ant-zoom-leave-active'
};

export const FADE_CLASS_NAME_MAP = {
  enter: 'ant-fade-enter',
  enterActive: 'ant-fade-enter-active',
  leave: 'ant-fade-leave',
  leaveActive: 'ant-fade-leave-active'
};

export const MODAL_MASK_CLASS_NAME = 'ant-modal-mask';
export const NZ_CONFIG_MODULE_NAME: NzConfigKey = 'modal';
export const NZ_MODAL_DATA = new InjectionToken<NzSafeAny>(
  typeof ngDevMode !== 'undefined' && ngDevMode ? 'nz-modal-data' : ''
);
