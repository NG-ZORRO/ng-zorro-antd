/*
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-select-automatic-tokenization',
  template: `
    <nz-select
      nzMode="tags"
      [nzTokenSeparators]="[',']"
      style="width: 100%;"
      [(ngModel)]="listOfTagOptions"
      nzPlaceHolder="automatic tokenization"
    >
      <nz-option *ngFor="let option of listOfOption" [nzLabel]="option.label" [nzValue]="option.value"> </nz-option>
    </nz-select>
  `
})
export class NzDemoSelectAutomaticTokenizationComponent implements OnInit {
  listOfOption: Array<{ label: string; value: string }> = [];
  listOfTagOptions = [];

  ngOnInit(): void {
    const children: Array<{ label: string; value: string }> = [];
    for (let i = 10; i < 36; i++) {
      children.push({ label: i.toString(36) + i, value: i.toString(36) + i });
    }
    this.listOfOption = children;
  }
}
