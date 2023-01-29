/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, Input, TemplateRef } from '@angular/core';

import { NzSafeAny } from 'ng-zorro-antd/core/types';

@Component({
  selector: 'nz-tab-close-button, button[nz-tab-close-button]',
  template: `
    <ng-container *nzStringTemplateOutlet="closeIcon; let icon">
      <span nz-icon [nzType]="icon" nzTheme="outline"></span>
    </ng-container>
  `,
  host: {
    class: 'ant-tabs-tab-remove',
    'aria-label': 'Close tab',
    type: 'button'
  }
})
export class NzTabCloseButtonComponent {
  @Input() closeIcon: string | TemplateRef<NzSafeAny> = 'close';

  constructor() {}
}
