/*
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'nz-demo-auto-complete-custom',
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="example-input">
      <textarea
        placeholder="input here"
        nz-input
        row="4"
        [(ngModel)]="inputValue"
        (input)="onInput($event.target?.value)"
        [nzAutocomplete]="auto"
      ></textarea>
      <nz-autocomplete #auto>
        <nz-auto-option *ngFor="let option of options" [nzValue]="option">{{ option }}</nz-auto-option>
      </nz-autocomplete>
    </div>
  `
})
export class NzDemoAutoCompleteCustomComponent {
  inputValue: string;
  options: string[] = [];

  onInput(value: string): void {
    this.options = value ? [value, value + value, value + value + value] : [];
  }
}
