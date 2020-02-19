/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewEncapsulation } from '@angular/core';
import { collapseMotion } from 'ng-zorro-antd/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzMenuModeType } from './menu.types';

@Component({
  selector: '[nz-submenu-inline-child]',
  animations: [collapseMotion],
  exportAs: 'nzSubmenuInlineChild',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-template [ngTemplateOutlet]="templateOutlet"></ng-template>
  `,
  host: {
    '[class.ant-menu]': 'true',
    '[class.ant-menu-inline]': 'true',
    '[class.ant-menu-sub]': 'true',
    '[class]': 'menuClass',
    '[@collapseMotion]': 'expandState'
  }
})
export class NzSubmenuInlineChildComponent implements OnInit, OnChanges {
  @Input() templateOutlet: TemplateRef<NzSafeAny> | null = null;
  @Input() menuClass: string | null = null;
  @Input() mode: NzMenuModeType = 'vertical';
  @Input() nzOpen = false;
  expandState = 'collapsed';
  calcMotionState(): void {
    if (this.nzOpen) {
      this.expandState = 'expanded';
    } else {
      this.expandState = 'collapsed';
    }
  }
  ngOnInit(): void {
    this.calcMotionState();
  }
  ngOnChanges(changes: SimpleChanges): void {
    const { mode, nzOpen } = changes;
    if (mode || nzOpen) {
      this.calcMotionState();
    }
  }
}
