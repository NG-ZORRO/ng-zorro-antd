import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-scrolling-hide-scrollbar',
  template: `
    <nz-scrolling nzHiddenBar [nzData]="list" [nzItemTemplate]="itemTpl" [nzViewportHeight]="200"></nz-scrolling>
    <ng-template #itemTpl let-item>
      <div style="height: 30px">{{ item }}</div>
    </ng-template>
  `
})
export class NzDemoScrollingHideScrollbarComponent {
  list = new Array(100).fill('hide scrollbar');
}
