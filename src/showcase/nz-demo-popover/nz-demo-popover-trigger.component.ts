import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-popover-trigger',
  template: `
    <nz-popover [nzTitle]="'标题'" [nzTrigger]="'click'">
      <button nz-button nz-popover>点击</button>
      <ng-template #nzTemplate>
        <div><p>内容</p>
          <p>内容</p></div>
      </ng-template>
    </nz-popover>
    <nz-popover [nzTitle]="'标题'" [nzTrigger]="'hover'">
      <button nz-button nz-popover>移入</button>
      <ng-template #nzTemplate>
        <div><p>内容</p>
          <p>内容</p></div>
      </ng-template>
    </nz-popover>
    <nz-popover [nzTitle]="'标题'" [nzTrigger]="'focus'">
      <button nz-button nz-popover>聚焦</button>
      <ng-template #nzTemplate>
        <div><p>内容</p>
          <p>内容</p></div>
      </ng-template>
    </nz-popover>
  `
})
export class NzDemoPopoverTriggerComponent { }
