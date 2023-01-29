/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

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

import { toNumber } from 'ng-zorro-antd/core/util';
import { NzPaginationI18nInterface } from 'ng-zorro-antd/i18n';

@Component({
  selector: 'li[nz-pagination-options]',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nz-select
      class="ant-pagination-options-size-changer"
      *ngIf="showSizeChanger"
      [nzDisabled]="disabled"
      [nzSize]="nzSize"
      [ngModel]="pageSize"
      (ngModelChange)="onPageSizeChange($event)"
    >
      <nz-option
        *ngFor="let option of listOfPageSizeOption; trackBy: trackByOption"
        [nzLabel]="option.label"
        [nzValue]="option.value"
      ></nz-option>
    </nz-select>
    <div class="ant-pagination-options-quick-jumper" *ngIf="showQuickJumper">
      {{ locale.jump_to }}
      <input [disabled]="disabled" (keydown.enter)="jumpToPageViaInput($event)" />
      {{ locale.page }}
    </div>
  `,
  host: { class: 'ant-pagination-options' }
})
export class NzPaginationOptionsComponent implements OnChanges {
  @Input() nzSize: 'default' | 'small' = 'default';
  @Input() disabled = false;
  @Input() showSizeChanger = false;
  @Input() showQuickJumper = false;
  @Input() locale!: NzPaginationI18nInterface;
  @Input() total = 0;
  @Input() pageIndex = 1;
  @Input() pageSize = 10;
  @Input() pageSizeOptions: number[] = [];
  @Output() readonly pageIndexChange = new EventEmitter<number>();
  @Output() readonly pageSizeChange = new EventEmitter<number>();
  listOfPageSizeOption: Array<{ value: number; label: string }> = [];

  constructor() {}

  onPageSizeChange(size: number): void {
    if (this.pageSize !== size) {
      this.pageSizeChange.next(size);
    }
  }

  jumpToPageViaInput($event: Event): void {
    const target = $event.target as HTMLInputElement;
    const index = Math.floor(toNumber(target.value, this.pageIndex));
    this.pageIndexChange.next(index);
    target.value = '';
  }

  trackByOption(_: number, option: { value: number; label: string }): number {
    return option.value;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { pageSize, pageSizeOptions, locale } = changes;
    if (pageSize || pageSizeOptions || locale) {
      this.listOfPageSizeOption = [...new Set([...this.pageSizeOptions, this.pageSize])].map(item => ({
        value: item,
        label: `${item} ${this.locale.items_per_page}`
      }));
    }
  }
}
