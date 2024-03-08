/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';

import { AnimationCurves } from './animation-consts';

/**
 * a move and resize transition in the horizontal direction
 */
export interface ThumbAnimationProps {
  transform: number;
  width: number;
}

export const thumbMotion: AnimationTriggerMetadata = trigger('thumbMotion', [
  state('from', style({ transform: 'translateX({{ transform }}px)', width: '{{ width }}px' }), {
    params: { transform: 0, width: 0 }
  }),

  state('to', style({ transform: 'translateX({{ transform }}px)', width: '{{ width }}px' }), {
    params: { transform: 100, width: 0 }
  }),

  transition('from => to', animate(`300ms ${AnimationCurves.EASE_IN_OUT}`))
]);
