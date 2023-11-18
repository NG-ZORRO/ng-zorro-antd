/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input } from '@angular/core';

import { NzCronExpressionLabelI18n } from 'ng-zorro-antd/i18n';

import { TimeType } from './typings';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'nz-cron-expression-label',
  exportAs: 'nzCronExpressionLabel',
  template: `
    <div class="ant-cron-expression-label" [class.ant-cron-expression-label-foucs]="labelFocus === type">
      <label>
        {{ locale[type] }}
      </label>
    </div>
  `
})
export class NzCronExpressionLabelComponent {
  @Input() type: TimeType = 'second';
  @Input() locale!: NzCronExpressionLabelI18n;
  @Input() labelFocus: string | null = null;
}
