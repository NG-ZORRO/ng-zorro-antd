/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgTemplateOutlet } from '@angular/common';
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
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'nz-select-clear',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (clearIcon) {
      <ng-template [ngTemplateOutlet]="clearIcon"></ng-template>
    } @else {
      <nz-icon nzType="close-circle" nzTheme="fill" class="ant-select-close-icon" />
    }
  `,
  host: {
    class: 'ant-select-clear',
    '(click)': 'onClick($event)'
  },
  imports: [NgTemplateOutlet, NzIconModule]
})
export class NzSelectClearComponent {
  @Input() clearIcon: TemplateRef<NzSafeAny> | null = null;
  @Output() readonly clear = new EventEmitter<MouseEvent>();

  onClick(e: MouseEvent): void {
    e.preventDefault();
    e.stopPropagation();
    this.clear.emit(e);
  }
}
