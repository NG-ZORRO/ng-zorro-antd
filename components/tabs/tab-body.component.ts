/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewEncapsulation } from '@angular/core';

import { tabSwitchMotion } from 'ng-zorro-antd/core/animation';

@Component({
  selector: '[nz-tab-body]',
  exportAs: 'nzTabBody',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-template [ngTemplateOutlet]="content"></ng-template>`,
  host: {
    class: 'ant-tabs-tabpane',
    '[class.ant-tabs-tabpane-active]': 'active',
    '[class.ant-tabs-tabpane-hidden]': 'animated ? null : !active',
    '[attr.tabindex]': 'active ? 0 : -1',
    '[attr.aria-hidden]': '!active',
    '[style.overflow-y]': 'animated ? active ? null : "none" : null',
    '[@tabSwitchMotion]': `active ? 'enter' : 'leave'`,
    '[@.disabled]': `!animated`
  },
  imports: [NgTemplateOutlet],
  animations: [tabSwitchMotion]
})
export class NzTabBodyComponent {
  @Input() content: TemplateRef<void> | null = null;
  @Input() active = false;
  @Input() animated = true;
}
