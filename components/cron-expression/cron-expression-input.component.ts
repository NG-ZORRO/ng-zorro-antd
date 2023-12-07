/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzInputModule } from 'ng-zorro-antd/input';

import { CronChangeType, TimeType } from './typings';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'nz-cron-expression-input',
  exportAs: 'nzCronExpressionInput',
  template: `
    <div class="ant-cron-expression-input">
      <input
        nz-input
        [(ngModel)]="value"
        [name]="label"
        [disabled]="disabled"
        (focus)="focusInputEffect($event)"
        (blur)="blurInputEffect()"
        (ngModelChange)="setValue()"
      />
    </div>
  `,
  imports: [NzInputModule, FormsModule],
  standalone: true
})
export class NzCronExpressionInputComponent {
  @Input() value: string = '0';
  @Input() label: TimeType = 'second';
  @Input() disabled: boolean = false;
  @Output() readonly focusEffect = new EventEmitter<TimeType>();
  @Output() readonly blurEffect = new EventEmitter<void>();
  @Output() readonly getValue = new EventEmitter<CronChangeType>();

  constructor() {}

  focusInputEffect(event: FocusEvent): void {
    this.focusEffect.emit(this.label);
    (event.target as HTMLInputElement).select();
  }

  blurInputEffect(): void {
    this.blurEffect.emit();
  }

  setValue(): void {
    this.getValue.emit({ label: this.label, value: this.value });
  }
}
