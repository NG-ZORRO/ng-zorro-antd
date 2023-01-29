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
  selector: 'nz-select-clear',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span
      nz-icon
      nzType="close-circle"
      nzTheme="fill"
      *ngIf="!clearIcon; else clearIcon"
      class="ant-select-close-icon"
    ></span>
  `,
  host: {
    class: 'ant-select-clear',
    '(click)': 'onClick($event)'
  }
})
export class NzSelectClearComponent {
  @Input() clearIcon: TemplateRef<NzSafeAny> | null = null;
  @Output() readonly clear = new EventEmitter<MouseEvent>();

  constructor() {}

  onClick(e: MouseEvent): void {
    e.preventDefault();
    e.stopPropagation();
    this.clear.emit(e);
  }
}
