/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/* tslint:disable:component-selector */

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { InputBoolean } from 'ng-zorro-antd/core';

@Component({
  selector: 'td:not(.nz-disable-td):not([mat-cell])',
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-container *ngIf="nzIndentSize !== null">
      <nz-row-indent [indentSize]="nzIndentSize"></nz-row-indent>
      <button nz-row-expand-button [expand]="nzExpand" (expandChange)="onExpandChange($event)" [spaceMode]="!nzShowExpand"></button>
    </ng-container>
    <label
      *ngIf="nzShowCheckbox"
      nz-checkbox
      [nzDisabled]="nzDisabled"
      [ngModel]="nzChecked"
      [nzIndeterminate]="nzIndeterminate"
      (ngModelChange)="onCheckedChange($event)"
    >
    </label>
    <ng-content></ng-content>
  `,
  host: {
    '[class.ant-table-cell-with-append]': `nzIndentSize === null`,
    '[class.ant-table-selection-column]': `nzShowCheckbox`,
    '[class.ant-table-cell]': 'true'
  }
})
export class NzTdComponent {
  @Input() nzChecked = false;
  @Input() nzDisabled = false;
  @Input() nzIndeterminate = false;
  @Input() nzIndentSize: number | null = null;
  @Input() @InputBoolean() nzExpand = false;
  @Input() @InputBoolean() nzShowExpand = false;
  @Input() @InputBoolean() nzShowCheckbox = false;
  @Output() readonly nzCheckedChange = new EventEmitter<boolean>();
  @Output() readonly nzExpandChange = new EventEmitter<boolean>();

  onCheckedChange(checked: boolean): void {
    this.nzChecked = checked;
    this.nzCheckedChange.emit(checked);
  }

  onExpandChange(expand: boolean): void {
    this.nzExpand = expand;
    this.nzExpandChange.emit(expand);
  }
}
