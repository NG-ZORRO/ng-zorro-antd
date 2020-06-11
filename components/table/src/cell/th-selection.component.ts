/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/* tslint:disable:component-selector */
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { BooleanInput, NzSafeAny } from 'ng-zorro-antd/core/types';
import { InputBoolean } from 'ng-zorro-antd/core/util';

@Component({
  selector: 'th[nzSelections],th[nzChecked],th[nzShowCheckbox],th[nzShowRowSelection]',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nz-table-selection
      [checked]="nzChecked"
      [disabled]="nzDisabled"
      [indeterminate]="nzIndeterminate"
      [listOfSelections]="nzSelections"
      [showCheckbox]="nzShowCheckbox"
      [showRowSelection]="nzShowRowSelection"
      (checkedChange)="onCheckedChange($event)"
    ></nz-table-selection>
    <ng-content></ng-content>
  `,
  host: {
    '[class.ant-table-selection-column]': 'true'
  }
})
export class NzThSelectionComponent implements OnChanges {
  static ngAcceptInputType_nzShowCheckbox: BooleanInput;
  static ngAcceptInputType_nzShowRowSelection: BooleanInput;

  @Input() nzSelections: Array<{ text: string; onSelect(...args: NzSafeAny[]): NzSafeAny }> = [];
  @Input() nzChecked = false;
  @Input() nzDisabled = false;
  @Input() nzIndeterminate = false;
  @Input() @InputBoolean() nzShowCheckbox = false;
  @Input() @InputBoolean() nzShowRowSelection = false;
  @Output() readonly nzCheckedChange = new EventEmitter<boolean>();
  @Output() readonly nzSortChangeWithKey = new EventEmitter<{ key: string; value: string | null }>();

  onCheckedChange(checked: boolean): void {
    this.nzChecked = checked;
    this.nzCheckedChange.emit(checked);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzChecked, nzSelections } = changes;
    const isShowCheckbox = nzChecked && nzChecked.firstChange;
    if (isShowCheckbox) {
      this.nzShowCheckbox = true;
    }
    const isShowSelections = nzSelections && nzSelections.firstChange;
    if (isShowSelections) {
      this.nzShowRowSelection = true;
    }
  }
}
