import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-badge-animate',
  template: `
    <div>
      <nz-badge [nzCount]="count" nzShowZero>
        <ng-template #content>
          <a class="head-example"></a>
        </ng-template>
      </nz-badge>
      <nz-button-group>
        <button nz-button [nzType]="'ghost'" (click)="minCount()"><i class="anticon anticon-minus"></i></button>
        <button nz-button [nzType]="'ghost'" (click)="addCount()"><i class="anticon anticon-plus"></i></button>
      </nz-button-group>
    </div>

    <div style="margin-top: 10px;">

      <nz-badge [nzDot]="dot">
        <ng-template #content>
          <a class="head-example"></a>
        </ng-template>
      </nz-badge>

      <button nz-button [nzType]="'ghost'" (click)="toggleShow()">切换红点显隐</button>

    </div>
  `,
  styles  : [ `
    :host ::ng-deep .ant-badge {
      margin-right: 16px;
    }

    :host ::ng-deep .ant-badge:not(.ant-badge-status) {
      margin-right: 16px;
    }

    .head-example {
      width: 42px;
      height: 42px;
      border-radius: 6px;
      background: #eee;
      display: inline-block;
    }
  ` ]
})
export class NzDemoBadgeAnimateComponent {

  count = 5;
  dot = true;

  addCount(): void {
    this.count++;
  }

  minCount(): void {
    this.count--;
  }

  toggleShow(): void {
    this.dot = !this.dot;
  }
}
