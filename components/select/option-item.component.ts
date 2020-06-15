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
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

@Component({
  selector: 'nz-option-item',
  template: `
    <div class="ant-select-item-option-content">
      <ng-container *ngIf="!customContent">{{ label }}</ng-container>
      <ng-container *ngIf="customContent">
        <ng-template [ngTemplateOutlet]="template"></ng-template>
      </ng-container>
    </div>
    <div *ngIf="showState && selected" class="ant-select-item-option-state" style="user-select: none" unselectable="on">
      <i nz-icon nzType="check" class="ant-select-selected-icon" *ngIf="!icon; else icon"></i>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.ant-select-item]': 'true',
    '[class.ant-select-item-option]': 'true',
    '[class.ant-select-item-option-grouped]': 'grouped',
    '[class.ant-select-item-option-selected]': 'selected && !disabled',
    '[class.ant-select-item-option-disabled]': 'disabled',
    '[class.ant-select-item-option-active]': 'activated && !disabled',
    '(mouseenter)': 'onHostMouseEnter()',
    '(click)': 'onHostClick()'
  }
})
export class NzOptionItemComponent implements OnChanges {
  selected = false;
  activated = false;
  @Input() grouped = false;
  @Input() customContent = false;
  @Input() template: TemplateRef<NzSafeAny> | null = null;
  @Input() disabled = false;
  @Input() showState = false;
  @Input() label: string | null = null;
  @Input() value: NzSafeAny | null = null;
  @Input() activatedValue: NzSafeAny | null = null;
  @Input() listOfSelectedValue: NzSafeAny[] = [];
  @Input() icon: TemplateRef<NzSafeAny> | null = null;
  @Input() compareWith!: (o1: NzSafeAny, o2: NzSafeAny) => boolean;
  @Output() readonly itemClick = new EventEmitter<NzSafeAny>();
  @Output() readonly itemHover = new EventEmitter<NzSafeAny>();
  onHostMouseEnter(): void {
    if (!this.disabled) {
      this.itemHover.next(this.value);
    }
  }
  onHostClick(): void {
    if (!this.disabled) {
      this.itemClick.next(this.value);
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    const { value, activatedValue, listOfSelectedValue } = changes;
    if (value || listOfSelectedValue) {
      this.selected = this.listOfSelectedValue.some(v => this.compareWith(v, this.value));
    }
    if (value || activatedValue) {
      this.activated = this.compareWith(this.activatedValue, this.value);
    }
  }
}
