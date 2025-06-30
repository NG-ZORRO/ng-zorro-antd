/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  ViewEncapsulation,
  booleanAttribute,
  inject
} from '@angular/core';

import { nzInjectDirectionality } from 'ng-zorro-antd/cdk/bidi';
import { NzConfigKey, onConfigChangeEventForComponent, WithConfig } from 'ng-zorro-antd/core/config';

import { NzCollapsePanelComponent } from './collapse-panel.component';

const NZ_CONFIG_MODULE_NAME: NzConfigKey = 'collapse';

@Component({
  selector: 'nz-collapse',
  exportAs: 'nzCollapse',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `<ng-content></ng-content>`,
  host: {
    class: 'ant-collapse',
    '[class.ant-collapse-icon-position-start]': `nzExpandIconPosition === 'start'`,
    '[class.ant-collapse-icon-position-end]': `nzExpandIconPosition === 'end'`,
    '[class.ant-collapse-ghost]': `nzGhost`,
    '[class.ant-collapse-borderless]': '!nzBordered',
    '[class.ant-collapse-rtl]': 'dir.isRtl()'
  }
})
export class NzCollapseComponent {
  private cdr = inject(ChangeDetectorRef);

  readonly _nzModuleName: NzConfigKey = NZ_CONFIG_MODULE_NAME;

  @Input({ transform: booleanAttribute }) @WithConfig() nzAccordion: boolean = false;
  @Input({ transform: booleanAttribute }) @WithConfig() nzBordered: boolean = true;
  @Input({ transform: booleanAttribute }) @WithConfig() nzGhost: boolean = false;
  @Input() nzExpandIconPosition: 'start' | 'end' = 'start';

  readonly dir = nzInjectDirectionality();

  private listOfNzCollapsePanelComponent: NzCollapsePanelComponent[] = [];

  constructor() {
    onConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME, () => this.cdr.markForCheck());
  }

  addPanel(value: NzCollapsePanelComponent): void {
    this.listOfNzCollapsePanelComponent.push(value);
  }

  removePanel(value: NzCollapsePanelComponent): void {
    this.listOfNzCollapsePanelComponent.splice(this.listOfNzCollapsePanelComponent.indexOf(value), 1);
  }

  click(collapse: NzCollapsePanelComponent): void {
    if (this.nzAccordion && !collapse.nzActive) {
      this.listOfNzCollapsePanelComponent
        .filter(item => item !== collapse)
        .forEach(item => {
          if (item.nzActive) {
            item.nzActive = false;
            item.nzActiveChange.emit(item.nzActive);
            item.markForCheck();
          }
        });
    }
    collapse.nzActive = !collapse.nzActive;
    collapse.nzActiveChange.emit(collapse.nzActive);
  }
}
