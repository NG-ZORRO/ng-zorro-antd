/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/* eslint-disable @angular-eslint/component-selector */
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChange,
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
  `
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

  private isNzShowExpandChanged = false;
  private isNzShowCheckboxChanged = false;

  constructor(private elementRef: ElementRef) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('ant-table-selection-column');
  }

  onCheckedChange(checked: boolean): void {
    this.nzChecked = checked;
    this.nzCheckedChange.emit(checked);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const isFirstChange = (value: SimpleChange) => value && value.firstChange && value.currentValue !== undefined;
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
