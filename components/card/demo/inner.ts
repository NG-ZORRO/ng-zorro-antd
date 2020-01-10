import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-card-inner',
  template: `
    <nz-card nzTitle="Card Title">
      <p style="font-size:14px;color:rgba(0, 0, 0, 0.85);margin-bottom:16px;font-weight: 500;">
        Group title
      </p>
      <nz-card nzType="inner" nzTitle="Inner Card Title" [nzExtra]="extraTemplate">
        <a>Inner Card Content</a>
      </nz-card>
      <nz-card nzType="inner" style="margin-top:16px;" nzTitle="Inner Card Title" [nzExtra]="extraTemplate">
        <a>Inner Card Content</a>
      </nz-card>
    </nz-card>
    <ng-template #extraTemplate>
      <a>More</a>
    </ng-template>
  `
})
export class NzDemoCardInnerComponent {}
