import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-badge-change',
  template: `
    <div>
      <nz-badge [nzCount]="count">
        <a class="head-example"></a>
      </nz-badge>
      <nz-button-group>
        <button nz-button (click)="minCount()"><span nz-icon nzType="minus"></span></button>
        <button nz-button (click)="addCount()"><span nz-icon nzType="plus"></span></button>
      </nz-button-group>
    </div>
    <br />
    <div>
      <nz-badge [nzDot]="dot">
        <a class="head-example"></a>
      </nz-badge>
      <nz-switch [(ngModel)]="dot"></nz-switch>
    </div>
  `,
  styles: [
    `
      nz-badge {
        margin-right: 20px;
      }

      nz-badge.ant-badge-rtl {
        margin-right: 0;
        margin-left: 20px;
      }

      .head-example {
        width: 42px;
        height: 42px;
        border-radius: 4px;
        background: #eee;
        display: inline-block;
        vertical-align: middle;
      }
    `
  ]
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
