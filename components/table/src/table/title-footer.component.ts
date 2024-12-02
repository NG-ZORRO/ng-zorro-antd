/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewEncapsulation } from '@angular/core';

import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

@Component({
  selector: 'nz-table-title-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-container *nzStringTemplateOutlet="title">{{ title }}</ng-container>
    <ng-container *nzStringTemplateOutlet="footer">{{ footer }}</ng-container>
  `,
  host: {
    '[class.ant-table-title]': `title !== null`,
    '[class.ant-table-footer]': `footer !== null`
  },
  imports: [NzOutletModule]
})
export class NzTableTitleFooterComponent {
  @Input() title: string | TemplateRef<NzSafeAny> | null = null;
  @Input() footer: string | TemplateRef<NzSafeAny> | null = null;
}
