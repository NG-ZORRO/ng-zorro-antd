/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/* eslint-disable @angular-eslint/component-selector */
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChange,
  SimpleChanges,
  ViewEncapsulation,
  booleanAttribute
} from '@angular/core';

import { NzSafeAny } from 'ng-zorro-antd/core/types';

import { NzTableSelectionComponent } from '../addon/selection.component';

@Component({
  selector: 'th[nzSelections],th[nzChecked],th[nzShowCheckbox],th[nzShowRowSelection]',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nz-table-selection
      [checked]="nzChecked"
      [disabled]="nzDisabled"
      [indeterminate]="nzIndeterminate"
      [label]="nzLabel"
      [listOfSelections]="nzSelections"
      [showCheckbox]="nzShowCheckbox"
      [showRowSelection]="nzShowRowSelection"
      (checkedChange)="onCheckedChange($event)"
    ></nz-table-selection>
    <ng-content></ng-content>
  `,
  host: { class: 'ant-table-selection-column' },
  imports: [NzTableSelectionComponent]
})
export class NzThSelectionComponent implements OnChanges {
  @Input() nzSelections: Array<{ text: string; onSelect(...args: NzSafeAny[]): NzSafeAny }> = [];
  @Input({ transform: booleanAttribute }) nzChecked = false;
  @Input({ transform: booleanAttribute }) nzDisabled = false;
  @Input() nzIndeterminate = false;
  @Input() nzLabel: string | null = null;
  @Input({ transform: booleanAttribute }) nzShowCheckbox = false;
  @Input({ transform: booleanAttribute }) nzShowRowSelection = false;
  @Output() readonly nzCheckedChange = new EventEmitter<boolean>();

  private isNzShowExpandChanged = false;
  private isNzShowCheckboxChanged = false;

  onCheckedChange(checked: boolean): void {
    this.nzChecked = checked;
    this.nzCheckedChange.emit(checked);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const isFirstChange = (value: SimpleChange): boolean =>
      value && value.firstChange && value.currentValue !== undefined;
    const { nzChecked, nzSelections, nzShowExpand, nzShowCheckbox } = changes;
    if (nzShowExpand) {
      this.isNzShowExpandChanged = true;
    }
    if (nzShowCheckbox) {
      this.isNzShowCheckboxChanged = true;
    }
    if (isFirstChange(nzSelections) && !this.isNzShowExpandChanged) {
      this.nzShowRowSelection = true;
    }
    if (isFirstChange(nzChecked) && !this.isNzShowCheckboxChanged) {
      this.nzShowCheckbox = true;
    }
  }
}
