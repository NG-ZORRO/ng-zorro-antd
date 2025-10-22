/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';

import { NzValidateStatus } from 'ng-zorro-antd/core/types';
import { NzIconModule } from 'ng-zorro-antd/icon';

const iconTypeMap = {
  error: 'close-circle-fill',
  validating: 'loading',
  success: 'check-circle-fill',
  warning: 'exclamation-circle-fill'
} as const;

@Component({
  selector: 'nz-form-item-feedback-icon',
  exportAs: 'nzFormFeedbackIcon',
  imports: [NzIconModule],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (iconType) {
      <nz-icon [nzType]="iconType" />
    }
  `,
  host: {
    class: 'ant-form-item-feedback-icon',
    '[class.ant-form-item-feedback-icon-error]': 'status==="error"',
    '[class.ant-form-item-feedback-icon-warning]': 'status==="warning"',
    '[class.ant-form-item-feedback-icon-success]': 'status==="success"',
    '[class.ant-form-item-feedback-icon-validating]': 'status==="validating"'
  }
})
export class NzFormItemFeedbackIconComponent implements OnChanges {
  public cdr = inject(ChangeDetectorRef);
  @Input() status: NzValidateStatus = '';

  iconType: (typeof iconTypeMap)[keyof typeof iconTypeMap] | null = null;

  ngOnChanges(_changes: SimpleChanges): void {
    this.updateIcon();
  }

  updateIcon(): void {
    this.iconType = this.status ? iconTypeMap[this.status] : null;
    this.cdr.markForCheck();
  }
}
