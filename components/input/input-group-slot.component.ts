/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewEncapsulation } from '@angular/core';

@Component({
  selector: '[nz-input-group-slot]',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span nz-icon [nzType]="icon" *ngIf="icon"></span>
    <ng-container *nzStringTemplateOutlet="template">{{ template }}</ng-container>
    <ng-content></ng-content>
  `,
  host: {
    '[class.ant-input-group-addon]': `type === 'addon'`,
    '[class.ant-input-prefix]': `type === 'prefix'`,
    '[class.ant-input-suffix]': `type === 'suffix'`
  }
})
export class NzInputGroupSlotComponent {
  @Input() icon?: string | null = null;
  @Input() type: 'addon' | 'prefix' | 'suffix' | null = null;
  @Input() template?: string | TemplateRef<void> | null = null;
}
