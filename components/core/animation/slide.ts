/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';
import type { Signal } from '@angular/core';

import { AnimationCurves, AnimationDuration } from './animation-consts';
import { withAnimationCheck } from './no-animation';

const ANIMATION_TRANSITION_IN = `${AnimationDuration.BASE} ${AnimationCurves.EASE_OUT_QUINT}`;
const ANIMATION_TRANSITION_OUT = `${AnimationDuration.BASE} ${AnimationCurves.EASE_IN_QUINT}`;

export const SLIDE_ANIMATION_CLASS = {
  enter: 'ant-slide-up-enter ant-slide-up-enter-active',
  leave: 'ant-slide-up-leave ant-slide-up-leave-active'
};

export const slideAnimationEnter = (): Signal<string> => withAnimationCheck(() => SLIDE_ANIMATION_CLASS.enter);

export const slideAnimationLeave = (): Signal<string> => withAnimationCheck(() => SLIDE_ANIMATION_CLASS.leave);

export const slideMotion: AnimationTriggerMetadata = trigger('slideMotion', [
  state(
    'void',
    style({
      opacity: 0,
      transform: 'scaleY(0.8)'
    })
  ),
  state(
    'enter',
    style({
      opacity: 1,
      transform: 'scaleY(1)'
    })
  ),
  transition('void => *', [animate(ANIMATION_TRANSITION_IN)]),
  transition('* => void', [animate(ANIMATION_TRANSITION_OUT)])
]);
