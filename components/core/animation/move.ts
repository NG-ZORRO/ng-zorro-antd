/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { animate, AnimationTriggerMetadata, style, transition, trigger } from '@angular/animations';

import { AnimationDuration } from './animation-consts';

export const moveUpMotion: AnimationTriggerMetadata = trigger('moveUpMotion', [
  transition('* => enter', [
    style({
      transformOrigin: '0 0',
      transform: 'translateY(-100%)',
      opacity: 0
    }),
    animate(
      `${AnimationDuration.BASE}`,
      style({
        transformOrigin: '0 0',
        transform: 'translateY(0%)',
        opacity: 1
      })
    )
  ]),
  transition('* => leave', [
    style({
      transformOrigin: '0 0',
      transform: 'translateY(0%)',
      opacity: 1
    }),
    animate(
      `${AnimationDuration.BASE}`,
      style({
        transformOrigin: '0 0',
        transform: 'translateY(-100%)',
        opacity: 0
      })
    )
  ])
]);
