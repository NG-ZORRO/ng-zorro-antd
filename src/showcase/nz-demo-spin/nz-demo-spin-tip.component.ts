import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-spin-tip',
  template: `
    <nz-spin [nzTip]="'正在读取数据...'">
      <nz-alert [nzType]="'info'" [nzMessage]="'消息提示的文案'" [nzDescription]="'消息提示的辅助性文字介绍消息提示的辅助性文字介绍消息提示的辅助性文字介绍'">
      </nz-alert>
    </nz-spin>`,
  styles  : []
})
export class NzDemoSpinTipComponent { }
