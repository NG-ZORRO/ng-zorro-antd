/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ModalOptions } from './modal-types';

@Component({
  selector: 'button[nz-modal-close]',
  exportAs: 'NzModalCloseBuiltin',
  template: `
    <span class="ant-modal-close-x">
      <ng-container *nzStringTemplateOutlet="config.nzCloseIcon; let closeIcon">
        <span nz-icon [nzType]="closeIcon" class="ant-modal-close-icon"></span>
      </ng-container>
    </span>
  `,
  host: {
    class: 'ant-modal-close',
    'aria-label': 'Close'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NzModalCloseComponent {
  constructor(public config: ModalOptions) {}
}
