/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

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
      <i nz-icon nzType="close" *ngIf="!removeIcon; else removeIcon"></i>
    </span>
  `,
  host: {
    '[attr.title]': 'label',
    '[class.ant-select-selection-item-disabled]': 'disabled'
  }
})
export class NzSelectItemComponent {
  @Input() disabled = false;
  @Input() label: string | null | undefined = null;
  @Input() deletable = false;
  @Input() removeIcon: TemplateRef<NzSafeAny> | null = null;
  @Input() contentTemplateOutletContext: NzSafeAny | null = null;
  @Input() contentTemplateOutlet: string | TemplateRef<NzSafeAny> | null = null;
  @Output() readonly delete = new EventEmitter<MouseEvent>();

  constructor(private elementRef: ElementRef) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('ant-select-selection-item');
  }

  onDelete(e: MouseEvent): void {
    e.preventDefault();
    e.stopPropagation();
    if (!this.disabled) {
      this.delete.next(e);
    }
  }
}
