/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import type { Signal } from '@angular/core';

import { withAnimationCheck } from './no-animation';

export const SLIDE_ANIMATION_CLASS = {
  enter: 'ant-slide-up-enter ant-slide-up-enter-active',
  leave: 'ant-slide-up-leave ant-slide-up-leave-active'
};

export const slideAnimationEnter = (): Signal<string> => withAnimationCheck(() => SLIDE_ANIMATION_CLASS.enter);

export const slideAnimationLeave = (): Signal<string> => withAnimationCheck(() => SLIDE_ANIMATION_CLASS.leave);
