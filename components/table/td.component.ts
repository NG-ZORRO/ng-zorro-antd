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
    <span class="ant-table-row-indent" *ngIf="nzIndentSize && nzIndentSize >= 0" [style.padding-left.px]="nzIndentSize"></span>
    <label
      *ngIf="nzShowCheckbox"
      nz-checkbox
      [nzDisabled]="nzDisabled"
      [(ngModel)]="nzChecked"
      [nzIndeterminate]="nzIndeterminate"
      (ngModelChange)="nzCheckedChange.emit($event)"
    >
    </label>
    <span *ngIf="!nzShowExpand && nzIndentSize && nzIndentSize >= 0" class="ant-table-row-expand-icon ant-table-row-spaced"> </span>
    <button
      *ngIf="nzShowExpand"
      class="ant-table-row-expand-icon"
      [class.ant-table-row-expand-icon-expanded]="nzExpand"
      [class.ant-table-row-expand-icon-collapsed]="!nzExpand"
      (click)="expandChange($event)"
    ></button>
    <ng-content></ng-content>
  `,
  host: {
    '[class.ant-table-row-expand-icon-cell]': `nzShowExpand && nzIndentSize === null`,
    '[class.ant-table-selection-column]': `nzShowCheckbox`,
    '[class.ant-table-cell]': 'true',
    '[style.text-align]': 'nzAlign',
    '[style.word-break]': `nzBreakWord ? 'break-all' : ''`
  }
})
export class NzTdComponent {
  @Input() nzChecked = false;
  @Input() nzDisabled = false;
  @Input() nzIndeterminate = false;
  @Input() nzAlign: 'left' | 'right' | 'center';
  @Input() nzIndentSize: number | null = null;
  @Input() @InputBoolean() nzExpand = false;
  @Input() @InputBoolean() nzShowExpand = false;
  @Input() @InputBoolean() nzShowCheckbox = false;
  @Input() @InputBoolean() nzBreakWord = false;
  @Output() readonly nzCheckedChange = new EventEmitter<boolean>();
  @Output() readonly nzExpandChange = new EventEmitter<boolean>();

  expandChange(e: Event): void {
    e.stopPropagation();
    this.nzExpand = !this.nzExpand;
    this.nzExpandChange.emit(this.nzExpand);
  }
}
