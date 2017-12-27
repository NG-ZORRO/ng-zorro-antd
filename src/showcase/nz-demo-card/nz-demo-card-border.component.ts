import { Component } from '@angular/core';
@Component({
  selector: 'nz-demo-card-border',
  template: `
    <div style="background: #ECECEC;padding:30px;">
      <nz-card style="width:300px;" [nzBordered]="false">
        <ng-template #title>
          Card title
        </ng-template>
        <ng-template #extra>
          <a>More</a>
        </ng-template>
        <ng-template #body>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </ng-template>
      </nz-card>
    </div>

  `,
  styles  : []
})
export class NzDemoCardBorderComponent { }
