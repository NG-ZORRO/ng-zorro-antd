/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';

export const notificationMotion: AnimationTriggerMetadata = trigger('notificationMotion', [
  state('enterRight', style({ opacity: 1, transform: 'translateX(0)' })),
  transition('* => enterRight', [style({ opacity: 0, transform: 'translateX(5%)' }), animate('100ms linear')]),
  state('enterLeft', style({ opacity: 1, transform: 'translateX(0)' })),
  transition('* => enterLeft', [style({ opacity: 0, transform: 'translateX(-5%)' }), animate('100ms linear')]),
  state('enterTop', style({ opacity: 1, transform: 'translateY(0)' })),
  transition('* => enterTop', [style({ opacity: 0, transform: 'translateY(-5%)' }), animate('100ms linear')]),
  state('enterBottom', style({ opacity: 1, transform: 'translateY(0)' })),
  transition('* => enterBottom', [style({ opacity: 0, transform: 'translateY(5%)' }), animate('100ms linear')]),
  state(
    'leave',
    style({
      opacity: 0,
      transform: 'scaleY(0.8)',
      transformOrigin: '0% 0%'
    })
  ),
  transition('* => leave', [
    style({
      opacity: 1,
      transform: 'scaleY(1)',
      transformOrigin: '0% 0%'
    }),
    animate('100ms linear')
  ])
]);
