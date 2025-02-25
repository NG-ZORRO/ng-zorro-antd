/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { AnimationTriggerMetadata, animate, state, style, transition, trigger } from '@angular/animations';

import { AnimationDuration } from './animation-consts';

export const tabSwitchMotion: AnimationTriggerMetadata = trigger('tabSwitchMotion', [
  state(
    'leave',
    style({
      display: 'none'
    })
  ),
  transition('* => enter', [
    style({
      display: 'block',
      opacity: 0
    }),
    animate(AnimationDuration.SLOW)
  ]),
  transition('* => leave, :leave', [
    style({
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%'
    }),
    animate(
      AnimationDuration.SLOW,
      style({
        opacity: 0
      })
    ),
    style({
      display: 'none'
    })
  ])
]);
