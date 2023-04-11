/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input, OnInit } from '@angular/core';

import { NzCronExpressionLabelI18n } from 'ng-zorro-antd/i18n';

import { TimeType, TimeTypeError } from './typings';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'nz-cron-expression-label',
  exportAs: 'nzCronExpressionLabel',
  template: `
    <div
      class="ant-cron-expression-label"
      [class.ant-cron-expression-label-foucs]="labelFocus === type"
      [class.ant-cron-expression-error]="!valid"
    >
      <label nz-tooltip [nzTooltipTitle]="error" [nzTooltipVisible]="!valid" nzTooltipPlacement="bottom">
        {{ locale[type] }}
      </label>
    </div>
    <ng-template #error>
      <div class="ant-cron-expression-hint" [innerHTML]="locale[labelError]"></div>
    </ng-template>
  `
})
export class NzCronExpressionLabelComponent implements OnInit {
  @Input() type: TimeType = 'second';
  @Input() valid: boolean = true;
  @Input() locale!: NzCronExpressionLabelI18n;
  @Input() labelFocus: string | null = null;
  labelError: TimeTypeError = 'secondError';

  constructor() {}

  ngOnInit(): void {
    this.labelError = `${this.type}Error`;
  }
}
