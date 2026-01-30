import { Component } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'nz-demo-button-loading',
  imports: [NzButtonModule, NzIconModule],
  template: `
    <button nz-button nzType="primary" nzLoading>
      <nz-icon nzType="poweroff" />
      Loading
    </button>
    <button nz-button nzType="primary" nzSize="small" nzLoading>Loading</button>
    <br />
    <button nz-button nzType="primary" (click)="loadOne()" [nzLoading]="isLoadingOne">Click me!</button>
    <button nz-button nzType="primary" (click)="loadTwo()" [nzLoading]="isLoadingTwo">
      <nz-icon nzType="poweroff" />
      Click me!
    </button>
    <br />
    <button nz-button nzLoading nzShape="circle"></button>
    <button nz-button nzLoading nzType="primary" nzShape="circle"></button>
  `,
  styles: `
    [nz-button] {
      margin-right: 8px;
      margin-bottom: 12px;
    }
  `
})
export class NzDemoButtonLoadingComponent {
  isLoadingOne = false;
  isLoadingTwo = false;

  loadOne(): void {
    this.isLoadingOne = true;
    setTimeout(() => {
      this.isLoadingOne = false;
    }, 5000);
  }

  loadTwo(): void {
    this.isLoadingTwo = true;
    setTimeout(() => {
      this.isLoadingTwo = false;
    }, 5000);
  }
}
