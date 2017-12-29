import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-spin-nested',
  template: `
    <nz-spin [nzSpinning]="_isSpinning">
      <nz-alert [nzType]="'info'" [nzMessage]="'消息提示的文案'" [nzDescription]="'消息提示的辅助性文字介绍消息提示的辅助性文字介绍消息提示的辅助性文字介绍'">
      </nz-alert>
    </nz-spin>
    切换加载状态：
    <nz-switch [(ngModel)]="_isSpinning"></nz-switch>`,
  styles  : []
})
export class NzDemoSpinNestedComponent {
  _isSpinning = false;
}
