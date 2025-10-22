/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, Input, TemplateRef } from '@angular/core';

import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'nz-tab-close-button, button[nz-tab-close-button]',
  template: `
    <ng-container *nzStringTemplateOutlet="closeIcon; let icon">
      <nz-icon [nzType]="icon" nzTheme="outline" />
    </ng-container>
  `,
  host: {
    class: 'ant-tabs-tab-remove',
    'aria-label': 'Close tab',
    type: 'button'
  },
  imports: [NzOutletModule, NzIconModule]
})
export class NzTabCloseButtonComponent {
  @Input() closeIcon: string | TemplateRef<NzSafeAny> = 'close';
}
