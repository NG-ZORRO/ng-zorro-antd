/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'nz-card-tab',
  exportAs: 'nzCardTab',
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-template>
      <ng-content />
    </ng-template>
  `
})
export class NzCardTabComponent {
  @ViewChild(TemplateRef, { static: true }) template!: TemplateRef<void>;
}
