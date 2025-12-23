/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';
import { computed, type Signal } from '@angular/core';

import { AnimationCurves, AnimationDuration } from './animation-consts';
import { NZ_NO_ANIMATION_CLASS, withAnimationCheck, type NzNoAnimationDirective } from './no-animation';

const ANIMATION_TRANSITION_IN = `${AnimationDuration.BASE} ${AnimationCurves.EASE_OUT_QUINT}`;
const ANIMATION_TRANSITION_OUT = `${AnimationDuration.BASE} ${AnimationCurves.EASE_IN_QUINT}`;

export const slideAnimationEnter = (nzNoAnimation: NzNoAnimationDirective | null): Signal<string> => {
  const slideUpEnterMotion = withAnimationCheck(() => 'ant-slide-up-enter ant-slide-up-enter-active');
  return computed(() => (nzNoAnimation?.nzNoAnimation?.() ? NZ_NO_ANIMATION_CLASS : slideUpEnterMotion()));
};

export const slideAnimationLeave = (nzNoAnimation: NzNoAnimationDirective | null): Signal<string> => {
  const slideUpLeaveMotion = withAnimationCheck(() => 'ant-slide-up-leave ant-slide-up-leave-active');
  return computed(() => (nzNoAnimation?.nzNoAnimation?.() ? NZ_NO_ANIMATION_CLASS : slideUpLeaveMotion()));
};

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
