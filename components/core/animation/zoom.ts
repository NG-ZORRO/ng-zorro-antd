/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { animate, AnimationTriggerMetadata, style, transition, trigger } from '@angular/animations';

import { AnimationCurves, AnimationDuration } from './animation-consts';

export const zoomBigMotion: AnimationTriggerMetadata = trigger('zoomBigMotion', [
  transition('void => active', [
    style({ opacity: 0, transform: 'scale(0.8)' }),
    animate(
      `${AnimationDuration.BASE} ${AnimationCurves.EASE_OUT_CIRC}`,
      style({
        opacity: 1,
        transform: 'scale(1)'
      })
    )
  ]),
  transition('active => void', [
    style({ opacity: 1, transform: 'scale(1)' }),
    animate(
      `${AnimationDuration.BASE} ${AnimationCurves.EASE_IN_OUT_CIRC}`,
      style({
        opacity: 0,
        transform: 'scale(0.8)'
      })
    )
  ])
]);
export const zoomBadgeMotion: AnimationTriggerMetadata = trigger('zoomBadgeMotion', [
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0) translate(50%, -50%)' }),
    animate(
      `${AnimationDuration.SLOW} ${AnimationCurves.EASE_OUT_BACK}`,
      style({
        opacity: 1,
        transform: 'scale(1) translate(50%, -50%)'
      })
    )
  ]),
  transition(':leave', [
    style({ opacity: 1, transform: 'scale(1) translate(50%, -50%)' }),
    animate(
      `${AnimationDuration.SLOW} ${AnimationCurves.EASE_IN_BACK}`,
      style({
        opacity: 0,
        transform: 'scale(0) translate(50%, -50%)'
      })
    )
  ])
]);
