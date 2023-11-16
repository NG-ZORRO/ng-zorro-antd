/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import { NzSafeAny } from 'ng-zorro-antd/core/types';

@Component({
  selector: 'nz-select-item',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container *nzStringTemplateOutlet="contentTemplateOutlet; context: { $implicit: contentTemplateOutletContext }">
      @if (deletable) {
        <div class="ant-select-selection-item-content">{{ label }}</div>
      } @else {
        {{ label }}
      }
    </ng-container>
    @if (deletable && !disabled) {
      <span class="ant-select-selection-item-remove" (click)="onDelete($event)">
        @if (!removeIcon) {
          <span nz-icon nzType="close"></span>
        } @else {
          #removeIcon|
        }
      </span>
    }
  `,
  host: {
    class: 'ant-select-selection-item',
    '[attr.title]': 'label',
    '[class.ant-select-selection-item-disabled]': 'disabled'
  }
})
export class NzSelectItemComponent {
  @Input() disabled = false;
  @Input() label: string | number | null | undefined = null;
  @Input() deletable = false;
  @Input() removeIcon: TemplateRef<NzSafeAny> | null = null;
  @Input() contentTemplateOutletContext: NzSafeAny | null = null;
  @Input() contentTemplateOutlet: string | TemplateRef<NzSafeAny> | null = null;
  @Output() readonly delete = new EventEmitter<MouseEvent>();

  constructor() {}

  onDelete(e: MouseEvent): void {
    e.preventDefault();
    e.stopPropagation();
    if (!this.disabled) {
      this.delete.next(e);
    }
  }
}
