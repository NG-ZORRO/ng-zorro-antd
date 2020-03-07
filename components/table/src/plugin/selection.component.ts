/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

@Component({
  selector: 'nz-table-selection',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <label
      *ngIf="nzShowCheckbox"
      nz-checkbox
      [class.ant-table-selection-select-all-custom]="nzShowRowSelection"
      [(ngModel)]="nzChecked"
      [nzDisabled]="nzDisabled"
      [nzIndeterminate]="nzIndeterminate"
      (ngModelChange)="nzCheckedChange.emit($event)"
    >
    </label>
    <div class="ant-table-selection-extra" *ngIf="nzShowRowSelection">
      <span nz-dropdown class="ant-table-selection-down" nzPlacement="bottomLeft" [nzDropdownMenu]="selectionMenu">
        <i nz-icon nzType="down"></i>
      </span>
      <nz-dropdown-menu #selectionMenu="nzDropdownMenu">
        <ul nz-menu class="ant-table-selection-menu">
          <li nz-menu-item *ngFor="let selection of nzSelections" (click)="selection.onSelect()">
            {{ selection.text }}
          </li>
        </ul>
      </nz-dropdown-menu>
    </div>
    <ng-template [ngTemplateOutlet]="contentTemplate"></ng-template>
  `,
  host: {
    '[class.ant-table-selection]': 'true'
  }
})
export class NzTableSelectionComponent {
  @Input() contentTemplate: TemplateRef<NzSafeAny> | null = null;
  @Input() nzSelections: Array<{ text: string; onSelect(...args: NzSafeAny[]): NzSafeAny }> = [];
  @Input() nzChecked = false;
  @Input() nzDisabled = false;
  @Input() nzIndeterminate = false;
  @Input() nzShowCheckbox = false;
  @Input() nzShowRowSelection = false;
  @Output() readonly nzCheckedChange = new EventEmitter<boolean>();
}
