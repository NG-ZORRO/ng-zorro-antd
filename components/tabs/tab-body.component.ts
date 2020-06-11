/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewEncapsulation } from '@angular/core';

@Component({
  selector: '[nz-tab-body]',
  exportAs: 'nzTabBody',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container *ngIf="active || forceRender">
      <ng-template [ngTemplateOutlet]="content"></ng-template>
    </ng-container>
  `,
  host: {
    '[class.ant-tabs-tabpane-active]': 'active',
    '[class.ant-tabs-tabpane-inactive]': '!active'
  }
})
export class NzTabBodyComponent {
  @Input() content: TemplateRef<void> | null = null;
  @Input() active = false;
  @Input() forceRender = false;
}
