/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { animate, state, style, transition, trigger, AnimationTriggerMetadata } from '@angular/animations';
import { AnimationCurves } from './animation-consts';

export const collapseMotion: AnimationTriggerMetadata = trigger('collapseMotion', [
  state('expanded', style({ height: '*' })),
  state('collapsed', style({ height: 0, overflow: 'hidden' })),
  state('hidden', style({ height: 0, overflow: 'hidden', borderTopWidth: '0' })),
  transition('expanded => collapsed', animate(`150ms ${AnimationCurves.EASE_IN_OUT}`)),
  transition('expanded => hidden', animate(`150ms ${AnimationCurves.EASE_IN_OUT}`)),
  transition('collapsed => expanded', animate(`150ms ${AnimationCurves.EASE_IN_OUT}`)),
  transition('hidden => expanded', animate(`150ms ${AnimationCurves.EASE_IN_OUT}`))
]);

export const treeCollapseMotion: AnimationTriggerMetadata = trigger('treeCollapseMotion', [
  transition(':leave', [
    style({ overflow: 'hidden' }),
    animate(`150ms ${AnimationCurves.EASE_IN_OUT}`, style({ height: 0 }))
  ]),
  transition(':enter', [
    style({ overflow: 'hidden', height: 0 }),
    animate(`150ms ${AnimationCurves.EASE_IN_OUT}`, style({ overflow: 'hidden', height: '*' }))
  ])
]);
