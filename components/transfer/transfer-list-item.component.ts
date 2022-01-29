/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  NgZone,
  Output,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import type { TransferItem } from './interface';

@Component({
  selector: '[nz-transfer-list-item]',
  exportAs: 'nzTransferListItem',
  preserveWhitespaces: false,
  template: `
    <ng-template #renderContainer>
      <div class="ant-transfer-list-content-item-text">
        <ng-template [ngTemplateOutlet]="render" [ngTemplateOutletContext]="{ $implicit: item }"> </ng-template>
      </div>
    </ng-template>
    <ng-template #renderDefault>
      <label
        nz-checkbox
        [nzChecked]="item.checked"
        (click)="clickEvt($event)"
        (nzCheckedChange)="handleItemSelect()"
        [nzDisabled]="_disabled"
      >
        <ng-container *ngIf="!render; else renderContainer">
          <div class="ant-transfer-list-content-item-text">{{ item.title }}</div>
        </ng-container>
      </label>
    </ng-template>
    <ng-container *ngIf="showRemove; else renderDefault">
      <div class="ant-transfer-list-content-item-text">{{ item.title }}</div>
      <div
        class="ant-transfer-list-content-item-remove"
        [style.pointer-events]="_disabled ? 'none' : null"
        (click)="remove.emit()"
      >
        <i nz-icon nzType="delete"></i>
      </div>
    </ng-container>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ant-transfer-list-content-item',
    '[class.ant-transfer-list-content-item-disabled]': '_disabled',
    '[class.ant-transfer-list-content-item-checked]': 'item.checked',
    '(click)': 'handleItemSelect()'
  }
})
export class NzTransferListItemComponent {
  @Input() item!: TransferItem;
  @Input() disabled?: boolean = false;
  @Input() render: TemplateRef<void> | null = null;
  @Input() showRemove: boolean = false;
  @Output() readonly itemSelect = new EventEmitter<void>();
  @Output() readonly remove = new EventEmitter<void>();

  get _disabled(): boolean {
    return this.disabled || this.item.disabled || false;
  }

  constructor(private ngZone: NgZone) {}

  clickEvt(ev: Event): void {
    this.ngZone.runOutsideAngular(() => ev.stopPropagation());
  }

  handleItemSelect(): void {
    if (this.showRemove) {
      return;
    }
    this.itemSelect.emit();
  }
}
