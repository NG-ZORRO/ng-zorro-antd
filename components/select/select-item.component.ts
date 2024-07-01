/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'nz-select-item',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container *nzStringTemplateOutlet="contentTemplateOutlet; context: { $implicit: contentTemplateOutletContext }">
      <div class="ant-select-selection-item-content" *ngIf="deletable; else labelTemplate">{{ label }}</div>
      <ng-template #labelTemplate>{{ label }}</ng-template>
    </ng-container>
    <span *ngIf="deletable && !disabled" class="ant-select-selection-item-remove" (click)="onDelete($event)">
      <span nz-icon nzType="close" *ngIf="!removeIcon; else removeIcon"></span>
    </span>
  `,
  host: {
    class: 'ant-select-selection-item',
    '[attr.title]': 'label',
    '[class.ant-select-selection-item-disabled]': 'disabled'
  },
  imports: [NzOutletModule, NgIf, NzIconModule],
  standalone: true
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
