/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/* eslint-disable @angular-eslint/component-selector */
import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChange,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation,
  booleanAttribute
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

import { NzRowExpandButtonDirective } from '../addon/row-expand-button.directive';
import { NzRowIndentDirective } from '../addon/row-indent.directive';

@Component({
  selector:
    'td[nzChecked], td[nzDisabled], td[nzIndeterminate], td[nzIndentSize], td[nzExpand], td[nzShowExpand], td[nzShowCheckbox]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    @if (nzShowExpand || nzIndentSize > 0) {
      <nz-row-indent [indentSize]="nzIndentSize"></nz-row-indent>
      @if (nzExpandIcon) {
        <ng-template [ngTemplateOutlet]="nzExpandIcon"></ng-template>
      } @else {
        <button
          nz-row-expand-button
          [expand]="nzExpand"
          (expandChange)="onExpandChange($event)"
          [spaceMode]="!nzShowExpand"
        ></button>
      }
    }
    @if (nzShowCheckbox) {
      <label
        nz-checkbox
        [nzDisabled]="nzDisabled"
        [ngModel]="nzChecked"
        [nzIndeterminate]="nzIndeterminate"
        [attr.aria-label]="nzLabel"
        (ngModelChange)="onCheckedChange($event)"
      ></label>
    }
    <ng-content></ng-content>
  `,
  host: {
    '[class.ant-table-cell-with-append]': `nzShowExpand || nzIndentSize > 0`,
    '[class.ant-table-selection-column]': `nzShowCheckbox`
  },
  imports: [NzRowIndentDirective, NzRowExpandButtonDirective, NgTemplateOutlet, NzCheckboxModule, FormsModule]
})
export class NzTdAddOnComponent implements OnChanges {
  @Input() nzChecked = false;
  @Input() nzDisabled = false;
  @Input() nzIndeterminate = false;
  @Input() nzLabel: string | null = null;
  @Input() nzIndentSize = 0;
  @Input({ transform: booleanAttribute }) nzShowExpand = false;
  @Input({ transform: booleanAttribute }) nzShowCheckbox = false;
  @Input({ transform: booleanAttribute }) nzExpand = false;
  @Input() nzExpandIcon: TemplateRef<void> | null = null;
  @Output() readonly nzCheckedChange = new EventEmitter<boolean>();
  @Output() readonly nzExpandChange = new EventEmitter<boolean>();
  private isNzShowExpandChanged = false;
  private isNzShowCheckboxChanged = false;

  onCheckedChange(checked: boolean): void {
    this.nzChecked = checked;
    this.nzCheckedChange.emit(checked);
  }

  onExpandChange(expand: boolean): void {
    this.nzExpand = expand;
    this.nzExpandChange.emit(expand);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const isFirstChange = (value: SimpleChange): boolean =>
      value && value.firstChange && value.currentValue !== undefined;
    const { nzExpand, nzChecked, nzShowExpand, nzShowCheckbox } = changes;
    if (nzShowExpand) {
      this.isNzShowExpandChanged = true;
    }
    if (nzShowCheckbox) {
      this.isNzShowCheckboxChanged = true;
    }
    if (isFirstChange(nzExpand) && !this.isNzShowExpandChanged) {
      this.nzShowExpand = true;
    }
    if (isFirstChange(nzChecked) && !this.isNzShowCheckboxChanged) {
      this.nzShowCheckbox = true;
    }
  }
}
