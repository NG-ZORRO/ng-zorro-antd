/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/* eslint-disable @angular-eslint/component-selector */
import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChange,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation,
  booleanAttribute,
  inject
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

import { NzCellFixedDirective } from './cell-fixed.directive';
import { NzRowExpandButtonDirective } from '../addon/row-expand-button.directive';
import { NzRowIndentDirective } from '../addon/row-indent.directive';
import { NzCellEllipsisDirective } from '../styled/ellipsis.directive';

@Component({
  selector:
    'td[nzChecked], td[nzDisabled], td[nzIndeterminate], td[nzIndentSize], td[nzExpand], td[nzShowExpand], td[nzShowCheckbox], td[nzEllipsis]',
  encapsulation: ViewEncapsulation.None,
  template: `
    @if (nzShowExpand || nzIndentSize > 0) {
      <nz-row-indent [indentSize]="nzIndentSize" />
      @if (nzExpandIcon) {
        <ng-template [ngTemplateOutlet]="nzExpandIcon" />
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
        [ngModelOptions]="{ standalone: true }"
        [nzIndeterminate]="nzIndeterminate"
        [attr.aria-label]="nzLabel"
        (ngModelChange)="onCheckedChange($event)"
      ></label>
    }
    @if (ellipsisDir?.nzEllipsis && fixedDir) {
      <span class="ant-table-cell-content">
        <ng-template [ngTemplateOutlet]="contentTemplate" />
      </span>
    } @else {
      <ng-template [ngTemplateOutlet]="contentTemplate" />
    }
    <ng-template #contentTemplate>
      <ng-content />
    </ng-template>
  `,
  host: {
    '[class.ant-table-cell-with-append]': `nzShowExpand || nzIndentSize > 0`,
    '[class.ant-table-selection-column]': `nzShowCheckbox`
  },
  imports: [NzRowIndentDirective, NzRowExpandButtonDirective, NzCheckboxModule, NgTemplateOutlet, FormsModule]
})
export class NzTdAddOnComponent implements OnChanges {
  readonly ellipsisDir = inject(NzCellEllipsisDirective, { self: true, optional: true });
  readonly fixedDir = inject(NzCellFixedDirective, { self: true, optional: true });

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
