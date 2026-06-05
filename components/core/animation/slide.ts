/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import type { Signal } from '@angular/core';

import { withAnimationCheck } from './no-animation';

export const SLIDE_UP_ANIMATION_CLASS = {
  enter: 'ant-slide-up-enter ant-slide-up-enter-active',
  leave: 'ant-slide-up-leave ant-slide-up-leave-active'
};

export const SLIDE_DOWN_ANIMATION_CLASS = {
  enter: 'ant-slide-down-enter ant-slide-down-enter-active',
  leave: 'ant-slide-down-leave ant-slide-down-leave-active'
};

type SlideDirection = 'up' | 'down';

export function slideAnimationEnter(directionFn: () => SlideDirection = () => 'up'): Signal<string> {
  return withAnimationCheck(() => {
    if (directionFn() === 'up') {
      return SLIDE_UP_ANIMATION_CLASS.enter;
    } else {
      return SLIDE_DOWN_ANIMATION_CLASS.enter;
    }
  });
}
export function slideAnimationLeave(directionFn: () => SlideDirection = () => 'up'): Signal<string> {
  return withAnimationCheck(() => {
    if (directionFn() === 'up') {
      return SLIDE_UP_ANIMATION_CLASS.leave;
    } else {
      return SLIDE_DOWN_ANIMATION_CLASS.leave;
    }
  });
}
