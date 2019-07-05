/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { animate, state, style, transition, trigger, AnimationTriggerMetadata } from '@angular/animations';
import { AnimationCurves, AnimationDuration } from './animation-consts';

const ANIMATION_TRANSITION_IN = `${AnimationDuration.BASE} ${AnimationCurves.EASE_OUT_QUINT}`;
const ANIMATION_TRANSITION_OUT = `${AnimationDuration.BASE} ${AnimationCurves.EASE_IN_QUINT}`;

export const slideMotion: AnimationTriggerMetadata = trigger('slideMotion', [
  state(
    'bottom',
    style({
      opacity: 1,
      transform: 'scaleY(1)',
      transformOrigin: '0% 0%'
    })
  ),
  state(
    'top',
    style({
      opacity: 1,
      transform: 'scaleY(1)',
      transformOrigin: '0% 100%'
    })
  ),
  transition('void => bottom', [
    style({
      opacity: 0,
      transform: 'scaleY(0.8)',
      transformOrigin: '0% 0%'
    }),
    animate(ANIMATION_TRANSITION_IN)
  ]),
  transition('bottom => void', [
    animate(
      ANIMATION_TRANSITION_OUT,
      style({
        opacity: 0,
        transform: 'scaleY(0.8)',
        transformOrigin: '0% 0%'
      })
    )
  ]),
  transition('void => top', [
    style({
      opacity: 0,
      transform: 'scaleY(0.8)',
      transformOrigin: '0% 100%'
    }),
    animate(ANIMATION_TRANSITION_IN)
  ]),
  transition('top => void', [
    animate(
      ANIMATION_TRANSITION_OUT,
      style({
        opacity: 0,
        transform: 'scaleY(0.8)',
        transformOrigin: '0% 100%'
      })
    )
  ])
]);

export const slideAlertMotion: AnimationTriggerMetadata = trigger('slideAlertMotion', [
  transition(':leave', [
    style({ opacity: 1, transform: 'scaleY(1)', transformOrigin: '0% 0%' }),
    animate(
      `${AnimationDuration.SLOW} ${AnimationCurves.EASE_IN_OUT_CIRC}`,
      style({
        opacity: 0,
        transform: 'scaleY(0)',
        transformOrigin: '0% 0%'
      })
    )
  ])
]);
