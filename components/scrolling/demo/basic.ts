import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-scrolling-basic',
  template: `
    <nz-scrolling [nzData]="list" [nzItemTemplate]="itemTpl" [nzViewportHeight]="200"></nz-scrolling>
    <ng-template #itemTpl let-item>
      <div style="height: 30px">{{ item }}</div>
    </ng-template>
  `,
  styles: [
    `
      :host ::ng-deep .nz-scroll-viewport::-webkit-scrollbar {
        width: 10px;
      }
      :host ::ng-deep .nz-scroll-viewport::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px grey;
        border-radius: 10px;
      }
      :host ::ng-deep .nz-scroll-viewport::-webkit-scrollbar-thumb {
        background: #ababab;
        border-radius: 10px;
      }
      :host ::ng-deep .nz-scroll-viewport::-webkit-scrollbar-thumb:hover {
        background: #1890ff;
      }
    `
  ]
})
export class NzDemoScrollingBasicComponent {
  list = new Array(100).fill('test').map((v, i) => v + i);
}
