/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directionality } from '@angular/cdk/bidi';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  ViewEncapsulation
} from '@angular/core';

import { NzConfigKey, onConfigChangeEventForComponent, WithConfig } from 'ng-zorro-antd/core/config';
import type { NzSizeLMSType } from 'ng-zorro-antd/core/types';

import { NzCollapsePanelComponent } from './collapse-panel.component';

const NZ_CONFIG_MODULE_NAME: NzConfigKey = 'collapse';

@Component({
  selector: 'nz-collapse',
  exportAs: 'nzCollapse',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `<ng-content />`,
  host: {
    class: 'ant-collapse',
    '[class.ant-collapse-icon-placement-start]': `nzExpandIconPosition === 'start'`,
    '[class.ant-collapse-icon-placement-end]': `nzExpandIconPosition === 'end'`,
    '[class.ant-collapse-ghost]': `nzGhost`,
    '[class.ant-collapse-borderless]': '!nzBordered',
    '[class.ant-collapse-rtl]': `dir() === 'rtl'`,
    '[class.ant-collapse-small]': `nzSize === 'small'`,
    '[class.ant-collapse-large]': `nzSize === 'large'`
  }
})
export class NzCollapseComponent {
  private cdr = inject(ChangeDetectorRef);
  protected readonly dir = inject(Directionality).valueSignal;

  readonly _nzModuleName: NzConfigKey = NZ_CONFIG_MODULE_NAME;

  @Input({ transform: booleanAttribute }) @WithConfig() nzAccordion: boolean = false;
  @Input({ transform: booleanAttribute }) @WithConfig() nzBordered: boolean = true;
  @Input({ transform: booleanAttribute }) @WithConfig() nzGhost: boolean = false;
  @Input() nzExpandIconPosition: 'start' | 'end' = 'start';
  @Input() nzSize: NzSizeLMSType = 'middle';

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
    const active = collapse.active();
    // if accordion mode, close all panels except the clicked one
    if (this.nzAccordion && !active) {
      this.listOfNzCollapsePanelComponent
        .filter(item => item !== collapse && item.active())
        .forEach(item => item.activate(false));
    }
    collapse.activate(!active);
  }
}
