/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

@Component({
  selector: 'nz-table-selection',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <label
      *ngIf="showCheckbox"
      nz-checkbox
      [class.ant-table-selection-select-all-custom]="showRowSelection"
      [ngModel]="checked"
      [nzDisabled]="disabled"
      [nzIndeterminate]="indeterminate"
      (ngModelChange)="onCheckedChange($event)"
    ></label>
    <div class="ant-table-selection-extra" *ngIf="showRowSelection">
      <span nz-dropdown class="ant-table-selection-down" nzPlacement="bottomLeft" [nzDropdownMenu]="selectionMenu">
        <i nz-icon nzType="down"></i>
      </span>
      <nz-dropdown-menu #selectionMenu="nzDropdownMenu">
        <ul nz-menu class="ant-table-selection-menu">
          <li nz-menu-item *ngFor="let selection of listOfSelections" (click)="selection.onSelect()">
            {{ selection.text }}
          </li>
        </ul>
      </nz-dropdown-menu>
    </div>
  `
})
export class NzTableSelectionComponent {
  @Input() listOfSelections: Array<{ text: string; onSelect(...args: NzSafeAny[]): NzSafeAny }> = [];
  @Input() checked = false;
  @Input() disabled = false;
  @Input() indeterminate = false;
  @Input() showCheckbox = false;
  @Input() showRowSelection = false;
  @Output() readonly checkedChange = new EventEmitter<boolean>();

  constructor(private elementRef: ElementRef) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('ant-table-selection');
  }

  onCheckedChange(checked: boolean): void {
    this.checked = checked;
    this.checkedChange.emit(checked);
  }
}
