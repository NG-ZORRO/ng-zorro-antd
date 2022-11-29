/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

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
        (focus)="focusInputEffect($event)"
        (blur)="blurInputEffect()"
        (ngModelChange)="setValue()"
      />
    </div>
  `
})
export class NzCronExpressionInputComponent {
  @Input() value: string = '0';
  @Input() label: TimeType = 'second';
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
