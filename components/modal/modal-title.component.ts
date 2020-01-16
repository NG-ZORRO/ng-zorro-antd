/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ModalConfig } from './nz-modal.type';

@Component({
  selector: 'div[nz-modal-title]',
  exportAs: 'NzModalTitle',
  template: `
    <div class="ant-modal-title">
      <ng-container *nzStringTemplateOutlet="config.nzTitle">
        <div [innerHTML]="config.nzTitle"></div>
      </ng-container>
    </div>
  `,
  host: {
    class: 'ant-modal-header'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NzModalTitleComponent {
  constructor(public config: ModalConfig) {}
}
