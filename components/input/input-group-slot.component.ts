/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewEncapsulation } from '@angular/core';

import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzIconModule } from 'ng-zorro-antd/icon';

/**
 * @deprecated Will be removed in v22.0.0. This component will be removed along with input-group.
 */
@Component({
  selector: '[nz-input-group-slot]',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (icon) {
      <nz-icon [nzType]="icon" />
    }
    <ng-container *nzStringTemplateOutlet="template">{{ template }}</ng-container>
    <ng-content />
  `,
  host: {
    '[class.ant-input-group-addon]': `type === 'addon'`,
    '[class.ant-input-prefix]': `type === 'prefix'`,
    '[class.ant-input-suffix]': `type === 'suffix'`
  },
  imports: [NzIconModule, NzOutletModule]
})
export class NzInputGroupSlotComponent {
  @Input() icon?: string | null = null;
  @Input() type: 'addon' | 'prefix' | 'suffix' | null = null;
  @Input() template?: string | TemplateRef<void> | null = null;
}
