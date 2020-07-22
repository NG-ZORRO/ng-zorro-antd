/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'nz-card-loading',
  exportAs: 'nzCardLoading',
  template: `
    <div class="ant-card-loading-content">
      <div class="ant-row" style="margin-left: -4px; margin-right: -4px;" *ngFor="let listOfClassName of listOfLoading">
        <div *ngFor="let className of listOfClassName" [ngClass]="className" style="padding-left: 4px; padding-right: 4px;">
          <div class="ant-card-loading-block"></div>
        </div>
      </div>
    </div>
  `,
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.ant-card-loading-content]': 'true'
  }
})
export class NzCardLoadingComponent {
  listOfLoading: string[][] = [
    ['ant-col-22'],
    ['ant-col-8', 'ant-col-15'],
    ['ant-col-6', 'ant-col-18'],
    ['ant-col-13', 'ant-col-9'],
    ['ant-col-4', 'ant-col-3', 'ant-col-16'],
    ['ant-col-8', 'ant-col-6', 'ant-col-8']
  ];
  constructor() {}
}
