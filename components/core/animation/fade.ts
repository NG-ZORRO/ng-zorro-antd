/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { animate, AnimationTriggerMetadata, style, transition, trigger } from '@angular/animations';

import { AnimationDuration } from './animation-consts';

/**
 * @deprecated This animation has been migrated to CSS. Use CSS classes with [animate.enter] and [animate.leave] instead.
 * The animation will be removed in v23.
 * CSS classes: .fade-enter and .fade-leave
 */
export const fadeMotion: AnimationTriggerMetadata = trigger('fadeMotion', [
  transition('* => enter', [style({ opacity: 0 }), animate(`${AnimationDuration.BASE}`, style({ opacity: 1 }))]),
  transition('* => leave, :leave', [style({ opacity: 1 }), animate(`${AnimationDuration.BASE}`, style({ opacity: 0 }))])
]);
