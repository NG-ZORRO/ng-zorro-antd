/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { NzOutletModule } from 'ng-zorro-antd/core/outlet';

import { ModalOptions } from './modal-types';

@Component({
  selector: 'div[nz-modal-title]',
  exportAs: 'nzModalTitleBuiltin',
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzOutletModule]
})
export class NzModalTitleComponent {
  public config = inject(ModalOptions);
}
