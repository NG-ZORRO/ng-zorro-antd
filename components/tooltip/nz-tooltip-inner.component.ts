/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { NzToolTipComponent } from './nz-tooltip.component';

/**
 * This component is a replacement of `NzTooltipComponent`. That component is dreprecated and would be remove in 9.0.0.
 *
 * This component should have similar API to the new dropdown component. It should be wrapped in a template.
 */
@Component({
  selector: 'nz-tooltip-inner',
  exportAs: 'nzTooltipInner',
  templateUrl: './nz-tooltip-inner.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class NzTooltipInnerComponent {
  constructor(private tooltipComponent: NzToolTipComponent) {}
}
