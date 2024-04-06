/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { AnimationTriggerMetadata, animate, style, transition, trigger } from '@angular/animations';

import { AnimationDuration } from './animation-consts';

export const drawerMaskMotion: AnimationTriggerMetadata = trigger('drawerMaskMotion', [
  transition(':enter', [style({ opacity: 0 }), animate(`${AnimationDuration.SLOW}`, style({ opacity: 1 }))]),
  transition(':leave', [style({ opacity: 1 }), animate(`${AnimationDuration.SLOW}`, style({ opacity: 0 }))])
]);
