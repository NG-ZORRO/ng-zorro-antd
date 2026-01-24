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
  ViewEncapsulation,
  booleanAttribute,
  inject
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzIconModule } from 'ng-zorro-antd/icon';

/**
 * @deprecated Will be removed in v22.0.0. Please use `nz-input-wrapper` instead.
 */
@Component({
  selector: '[nz-transfer-search]',
  exportAs: 'nzTransferSearch',
  template: `
    <span class="ant-input-prefix">
      <nz-icon nzType="search" />
    </span>
    <input
      [(ngModel)]="value"
      (ngModelChange)="_handle()"
      [disabled]="disabled"
      [placeholder]="placeholder"
      class="ant-input"
      [class.ant-input-disabled]="disabled"
    />
    @if (value && value.length > 0) {
      <span class="ant-input-suffix" (click)="_clear()">
        <nz-icon nzType="close-circle" nzTheme="fill" class="ant-input-clear-icon" />
      </span>
    }
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, NzIconModule]
})
export class NzTransferSearchComponent implements OnChanges {
  // region: fields
  private cdr = inject(ChangeDetectorRef);

  @Input() placeholder?: string;
  @Input() value?: string;
  @Input({ transform: booleanAttribute }) disabled: boolean = false;

  @Output() readonly valueChanged = new EventEmitter<string>();
  @Output() readonly valueClear = new EventEmitter<void>();

  // endregion

  protected _handle(): void {
    this.valueChanged.emit(this.value);
  }

  protected _clear(): void {
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
