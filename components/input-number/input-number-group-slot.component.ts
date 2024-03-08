/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewEncapsulation } from '@angular/core';

import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: '[nz-input-number-group-slot]',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (icon) {
      <span nz-icon [nzType]="icon"></span>
    }
    <ng-container *nzStringTemplateOutlet="template">{{ template }}</ng-container>
    <ng-content></ng-content>
  `,
  host: {
    '[class.ant-input-number-group-addon]': `type === 'addon'`,
    '[class.ant-input-number-prefix]': `type === 'prefix'`,
    '[class.ant-input-number-suffix]': `type === 'suffix'`
  },
  imports: [NzIconModule, NzOutletModule],
  standalone: true
})
export class NzInputNumberGroupSlotComponent {
  @Input() icon?: string | null = null;
  @Input() type: 'addon' | 'prefix' | 'suffix' | null = null;
  @Input() template?: string | TemplateRef<void> | null = null;
}
