/*
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'nz-demo-mention-multilines',
  encapsulation: ViewEncapsulation.None,
  template: `
    <nz-mention [nzSuggestions]="suggestions">
      <textarea nz-input [nzAutosize]="{ minRows: 4, maxRows: 4 }" [(ngModel)]="inputValue" nzMentionTrigger>
      </textarea>
    </nz-mention>
  `
})
export class NzDemoMentionMultilinesComponent {
  inputValue: string;
  suggestions = ['afc163', 'benjycui', 'yiminghe', 'RaoHai', '中文', 'にほんご'];
}
