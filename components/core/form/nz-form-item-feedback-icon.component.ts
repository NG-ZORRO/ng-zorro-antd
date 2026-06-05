/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';

import { NzValidateStatus } from 'ng-zorro-antd/core/types';
import { NzIconModule } from 'ng-zorro-antd/icon';

const iconTypeMap = {
  error: 'close-circle-fill',
  validating: 'loading',
  success: 'check-circle-fill',
  warning: 'exclamation-circle-fill'
} as const;
const CLASS_NAME = 'ant-form-item-feedback-icon';

@Component({
  selector: 'nz-form-item-feedback-icon',
  exportAs: 'nzFormFeedbackIcon',
  imports: [NzIconModule],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (iconType(); as type) {
      <nz-icon [nzType]="type" />
    }
  `,
  host: {
    '[class]': 'class()'
  }
})
export class NzFormItemFeedbackIconComponent {
  readonly status = input<NzValidateStatus>('');
  protected readonly iconType = computed(() => {
    const status = this.status();
    return status ? iconTypeMap[status] : null;
  });
  protected readonly class = computed(() => {
    const status = this.status();
    return {
      [CLASS_NAME]: true,
      [`${CLASS_NAME}-error`]: status === 'error',
      [`${CLASS_NAME}-warning`]: status === 'warning',
      [`${CLASS_NAME}-success`]: status === 'success',
      [`${CLASS_NAME}-validating`]: status === 'validating'
    };
  });
}
