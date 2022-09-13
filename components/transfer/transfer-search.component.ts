/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: '[nz-transfer-search]',
  exportAs: 'nzTransferSearch',
  preserveWhitespaces: false,
  template: `
    <span class="ant-input-prefix">
      <span nz-icon nzType="search"></span>
    </span>
    <input
      [(ngModel)]="value"
      (ngModelChange)="_handle()"
      [disabled]="disabled"
      [placeholder]="placeholder"
      class="ant-input"
      [ngClass]="{ 'ant-input-disabled': disabled }"
    />
    <span *ngIf="value && value.length > 0" class="ant-input-suffix" (click)="_clear()">
      <span nz-icon nzType="close-circle" class="ant-input-clear-icon"></span>
    </span>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NzTransferSearchComponent implements OnChanges {
  // region: fields

  @Input() placeholder?: string;
  @Input() value?: string;
  @Input() disabled: boolean = false;

  @Output() readonly valueChanged = new EventEmitter<string>();
  @Output() readonly valueClear = new EventEmitter<void>();

  // endregion

  constructor(private cdr: ChangeDetectorRef) {}

  _handle(): void {
    this.valueChanged.emit(this.value);
  }

  _clear(): void {
    if (this.disabled) {
      return;
    }
    this.value = '';
    this.valueClear.emit();
  }

  ngOnChanges(): void {
    this.cdr.detectChanges();
  }
}
