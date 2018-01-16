import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-card-inner',
  template: `
    <nz-card>
      <ng-template #title>Card Title</ng-template>
      <ng-template #extra></ng-template>
      <ng-template #body>
        <p style="font-size:14px;color:rgba(0, 0, 0, 0.85);margin-bottom:16px;font-weight: 500;">
          Group title
        </p>
        <nz-card nzType="inner">
          <ng-template #title>Inner Card Title</ng-template>
          <ng-template #extra>
            <a>More</a>
          </ng-template>
          <ng-template #body>
            <a>Inner Card Content</a>
          </ng-template>
        </nz-card>
        <nz-card nzType="inner" style="margin-top:16px;">
          <ng-template #title>Inner Card Title</ng-template>
          <ng-template #extra>
            <a>More</a>
          </ng-template>
          <ng-template #body>
            <a>Inner Card Content</a>
          </ng-template>
        </nz-card>
      </ng-template>
    </nz-card>
  `,
  styles  : []
})
export class NzDemoCardInnerComponent {
  gridStyle = {
    width    : '25%',
    textAlign: 'center',
  };
}
