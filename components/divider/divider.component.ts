/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewEncapsulation } from '@angular/core';
import { BooleanInput } from 'ng-zorro-antd/core/types';

import { InputBoolean } from 'ng-zorro-antd/core/util';

@Component({
  selector: 'nz-divider',
  exportAs: 'nzDivider',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span *ngIf="nzText" class="ant-divider-inner-text">
      <ng-container *nzStringTemplateOutlet="nzText">{{ nzText }}</ng-container>
    </span>
  `,
  host: {
    '[class.ant-divider]': 'true',
    '[class.ant-divider-horizontal]': `nzType === 'horizontal'`,
    '[class.ant-divider-vertical]': `nzType === 'vertical'`,
    '[class.ant-divider-with-text-left]': `nzText && nzOrientation === 'left'`,
    '[class.ant-divider-with-text-right]': `nzText && nzOrientation === 'right'`,
    '[class.ant-divider-with-text-center]': `nzText && nzOrientation === 'center'`,
    '[class.ant-divider-dashed]': `nzDashed`
  }
})
export class NzDividerComponent {
  static ngAcceptInputType_nzDashed: BooleanInput;

  @Input() nzText?: string | TemplateRef<void>;
  @Input() nzType: 'horizontal' | 'vertical' = 'horizontal';
  @Input() nzOrientation: 'left' | 'right' | 'center' = 'center';
  @Input() @InputBoolean() nzDashed = false;
}
