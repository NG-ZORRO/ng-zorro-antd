import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector     : 'nz-demo-badge-change',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <div>
      <nz-badge [nzCount]="count">
        <a class="head-example"></a>
      </nz-badge>
      <nz-button-group>
        <button nz-button (click)="minCount()"><i nz-icon type="minus"></i></button>
        <button nz-button (click)="addCount()"><i nz-icon type="plus"></i></button>
      </nz-button-group>
    </div>

    <div style="margin-top: 10px;">
      <nz-badge [nzDot]="dot">
        <a class="head-example"></a>
      </nz-badge>
      <nz-switch [(ngModel)]="dot"></nz-switch>
    </div>
  `,
  styles       : [ `
    .ant-badge:not(.ant-badge-status) {
      margin-right: 20px;
    }

    .head-example {
      width: 42px;
      height: 42px;
      border-radius: 4px;
      background: #eee;
      display: inline-block;
    }
  ` ]
})
export class NzDemoBadgeChangeComponent {

  count = 5;
  dot = true;

  addCount(): void {
    this.count++;
  }

  minCount(): void {
    this.count--;
    if (this.count < 0) {
      this.count = 0;
    }
  }
}
