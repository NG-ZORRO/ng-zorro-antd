import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-progress-circle-dynamic',
  template: `
    <nz-progress [nzPercent]="percent" nzType="circle"></nz-progress>
    <nz-button-group>
      <button nz-button (click)="decline()"><i class="anticon anticon-minus"></i></button>
      <button nz-button (click)="increase()"><i class="anticon anticon-plus"></i></button>
    </nz-button-group>
  `
})
export class NzDemoProgressCircleDynamicComponent {
  percent = 0;

  increase(): void {
    this.percent = this.percent + 10;
    if (this.percent > 100) {
      this.percent = 100;
    }
  }

  decline(): void {
    this.percent = this.percent - 10;
    if (this.percent < 0) {
      this.percent = 0;
    }
  }
}

