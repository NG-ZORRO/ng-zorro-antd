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
    class: 'ant-tabs-tabpane',
    '[class.ant-tabs-tabpane-active]': 'active',
    '[attr.tabindex]': 'active ? 0 : -1',
    '[attr.aria-hidden]': '!active',
    '[style.visibility]': 'tabPaneAnimated ? active ? null : "hidden" : null',
    '[style.height]': 'tabPaneAnimated ? active ? null : 0 : null',
    '[style.overflow-y]': 'tabPaneAnimated ? active ? null : "none" : null',
    '[style.display]': '!tabPaneAnimated ? active ? null : "none" : null'
  }
})
export class NzTabBodyComponent {
  @Input() content: TemplateRef<void> | null = null;
  @Input() active = false;
  @Input() tabPaneAnimated = true;
  @Input() forceRender = false;
}
