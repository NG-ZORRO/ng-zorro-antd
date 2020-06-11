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
    <input
      [(ngModel)]="value"
      (ngModelChange)="_handle()"
      [disabled]="disabled"
      [placeholder]="placeholder"
      class="ant-input ant-transfer-list-search"
      [ngClass]="{ 'ant-input-disabled': disabled }"
    />
    <a *ngIf="value && value.length > 0; else def" class="ant-transfer-list-search-action" (click)="_clear()">
      <i nz-icon nzType="close-circle"></i>
    </a>
    <ng-template #def>
      <span class="ant-transfer-list-search-action"><i nz-icon nzType="search"></i></span>
    </ng-template>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NzTransferSearchComponent implements OnChanges {
  // region: fields

  @Input() placeholder?: string;
  @Input() value?: string;
  @Input() disabled?: boolean;

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
