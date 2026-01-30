import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'nz-demo-input-tooltip',
  imports: [FormsModule, NzInputModule, NzTooltipModule],
  template: `
    <input
      #inputElement
      style="width: 120px"
      nz-input
      nz-tooltip
      nzTooltipTrigger="focus"
      nzTooltipPlacement="topLeft"
      nzTooltipOverlayClassName="numeric-input"
      [ngModel]="value"
      [nzTooltipTitle]="title"
      placeholder="Input a number"
      (ngModelChange)="onChange($event)"
      (blur)="onBlur()"
    />
  `,
  styles: `
    .numeric-input .ant-tooltip-inner {
      min-width: 32px;
      min-height: 37px;
    }

    .numeric-input .numeric-input-title {
      font-size: 14px;
    }
  `
})
export class NzDemoInputTooltipComponent {
  value = '';
  title = 'Input a number';

  @ViewChild('inputElement', { static: false }) inputElement?: ElementRef;

  onChange(value: string): void {
    this.updateValue(value);
  }

  // '.' at the end or only '-' in the input box.
  onBlur(): void {
    if (this.value.charAt(this.value.length - 1) === '.' || this.value === '-') {
      this.updateValue(this.value.slice(0, -1));
    }
  }

  updateValue(value: string): void {
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!isNaN(+value) && reg.test(value)) || value === '' || value === '-') {
      this.value = value;
    }
    this.inputElement!.nativeElement.value = this.value;
    this.updateTitle();
  }

  updateTitle(): void {
    this.title = (this.value !== '-' ? this.formatNumber(this.value) : '-') || 'Input a number';
  }

  formatNumber(value: string): string {
    const stringValue = `${value}`;
    const list = stringValue.split('.');
    const prefix = list[0].charAt(0) === '-' ? '-' : '';
    let num = prefix ? list[0].slice(1) : list[0];
    let result = '';
    while (num.length > 3) {
      result = `,${num.slice(-3)}${result}`;
      num = num.slice(0, num.length - 3);
    }
    if (num) {
      result = num + result;
    }
    return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
  }
}
