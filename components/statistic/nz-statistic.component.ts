/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NzStatisticValueType } from './nz-statistic-definitions';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'nz-statistic',
  exportAs: 'nzStatistic',
  templateUrl: './nz-statistic.component.html',
  host: {
    class: 'ant-statistic'
  },
  styles: ['nz-statistic { display: block; }']
})
export class NzStatisticComponent {
  @Input() nzPrefix: string | TemplateRef<void>;
  @Input() nzSuffix: string | TemplateRef<void>;
  @Input() nzTitle: string | TemplateRef<void>;
  @Input() nzValue: NzStatisticValueType;
  @Input() nzValueStyle = {};
  @Input() nzValueTemplate: TemplateRef<{ $implicit: NzStatisticValueType }>;
}
