import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-scrolling-virtual',
  template: `
    <nz-scrolling nzVirtual [nzData]="list" [nzItemTemplate]="itemTpl" [nzViewportHeight]="200"></nz-scrolling>
    <ng-template #itemTpl let-item>
      <div style="height: 30px">{{ item }}</div>
    </ng-template>
  `
})
export class NzDemoScrollingVirtualComponent {
  list = new Array(10000).fill('test').map((v, i) => v + i);
}
