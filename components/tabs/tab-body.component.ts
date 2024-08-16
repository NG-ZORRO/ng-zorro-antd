/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import { tabSwitchMotion } from 'ng-zorro-antd/core/animation';

@Component({
  selector: '[nz-tab-body]',
  exportAs: 'nzTabBody',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if ((hasBeenActive || forceRender) && !hasBeenDestroy) {
      <ng-template [ngTemplateOutlet]="content"></ng-template>
    }
  `,
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
  standalone: true,
  animations: [tabSwitchMotion]
})
export class NzTabBodyComponent implements OnChanges {
  @Input() content: TemplateRef<void> | null = null;
  @Input() active = false;
  @Input() animated = true;
  @Input() forceRender = false;
  @Input() destroyInactive = false;

  /**
   * If this tab is ever activated, then the content should always be rendered.
   */
  protected hasBeenActive = false;
  /**
   * When the destroy property is true, this tab will be destroyed when active property change
   */
  protected hasBeenDestroy = false;

  ngOnChanges(changes: SimpleChanges): void {
    const { active } = changes;
    if (typeof active.currentValue === 'boolean') {
      if (active.currentValue) {
        this.hasBeenActive = true;
        this.hasBeenDestroy = false;
      }

      // value must change from true to false, avoid previousValue is undefined
      if (active.previousValue && !active.currentValue && this.destroyInactive) {
        this.hasBeenDestroy = true;
      }
    }
  }
}
