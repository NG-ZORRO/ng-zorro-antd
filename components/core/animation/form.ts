/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { animate, AnimationTriggerMetadata, style, transition, trigger } from '@angular/animations';

import { AnimationCurves, AnimationDuration } from './animation-consts';

export const helpMotion: AnimationTriggerMetadata = trigger('helpMotion', [
  transition(':enter', [
    style({
      opacity: 0,
      transform: 'translateY(-5px)'
    }),
    animate(
      `${AnimationDuration.SLOW} ${AnimationCurves.EASE_IN_OUT}`,
      style({
        opacity: 1,
        transform: 'translateY(0)'
      })
    )
  ]),
  transition(':leave', [
    style({
      opacity: 1,
      transform: 'translateY(0)'
    }),
    animate(
      `${AnimationDuration.SLOW} ${AnimationCurves.EASE_IN_OUT}`,
      style({
        opacity: 0,
        transform: 'translateY(-5px)'
      })
    )
  ])
]);
