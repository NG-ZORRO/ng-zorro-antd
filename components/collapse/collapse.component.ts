/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, ViewEncapsulation } from '@angular/core';

import { NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { BooleanInput } from 'ng-zorro-antd/core/types';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NzCollapsePanelComponent } from './collapse-panel.component';

const NZ_CONFIG_COMPONENT_NAME = 'collapse';

@Component({
  selector: 'nz-collapse',
  exportAs: 'nzCollapse',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: ` <ng-content></ng-content> `,
  host: {
    '[class.ant-collapse]': 'true',
    '[class.ant-collapse-icon-position-left]': `nzExpandIconPosition === 'left'`,
    '[class.ant-collapse-icon-position-right]': `nzExpandIconPosition === 'right'`,
    '[class.ant-collapse-borderless]': '!nzBordered'
  }
})
export class NzCollapseComponent implements OnDestroy {
  static ngAcceptInputType_nzAccordion: BooleanInput;
  static ngAcceptInputType_nzBordered: BooleanInput;

  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME) @InputBoolean() nzAccordion: boolean = false;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME) @InputBoolean() nzBordered: boolean = true;
  @Input() nzExpandIconPosition: 'left' | 'right' = 'left';
  private listOfNzCollapsePanelComponent: NzCollapsePanelComponent[] = [];
  private destroy$ = new Subject();
  constructor(public nzConfigService: NzConfigService, private cdr: ChangeDetectorRef) {
    this.nzConfigService
      .getConfigChangeEventForComponent(NZ_CONFIG_COMPONENT_NAME)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.cdr.markForCheck();
      });
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
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
