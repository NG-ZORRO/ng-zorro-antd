/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  TemplateRef,
  ViewEncapsulation,
  booleanAttribute
} from '@angular/core';

import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import type { NzSizeLMSType } from 'ng-zorro-antd/core/types';

@Component({
  selector: 'nz-divider',
  exportAs: 'nzDivider',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (nzText) {
      <span class="ant-divider-inner-text">
        <ng-container *nzStringTemplateOutlet="nzText">{{ nzText }}</ng-container>
      </span>
    }
  `,
  host: {
    class: 'ant-divider',
    '[class.ant-divider-horizontal]': `nzType === 'horizontal'`,
    '[class.ant-divider-vertical]': `nzType === 'vertical'`,
    '[class.ant-divider-with-text]': `nzText`,
    '[class.ant-divider-plain]': `nzPlain`,
    '[class.ant-divider-with-text-left]': `nzText && nzOrientation === 'left'`,
    '[class.ant-divider-with-text-right]': `nzText && nzOrientation === 'right'`,
    '[class.ant-divider-with-text-center]': `nzText && nzOrientation === 'center'`,
    '[class.ant-divider-dashed]': `nzDashed || nzVariant === 'dashed'`,
    '[class.ant-divider-dotted]': `nzVariant === 'dotted'`,
    '[class.ant-divider-sm]': `nzSize === 'small'`,
    '[class.ant-divider-md]': `nzSize === 'middle'`
  },
  imports: [NzOutletModule]
})
export class NzDividerComponent {
  @Input() nzText?: string | TemplateRef<void>;
  @Input() nzType: 'horizontal' | 'vertical' = 'horizontal';
  @Input() nzOrientation: 'left' | 'right' | 'center' = 'center';
  @Input() nzVariant: 'dashed' | 'dotted' | 'solid' = 'solid';
  @Input() nzSize: NzSizeLMSType | undefined;
  @Input({ transform: booleanAttribute }) nzDashed = false;
  @Input({ transform: booleanAttribute }) nzPlain = false;
}
