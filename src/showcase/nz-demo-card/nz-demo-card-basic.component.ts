import { Component } from '@angular/core';
@Component({
  selector: 'nz-demo-card-basic',
  template: `
    <nz-card style="width:300px;">
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
  `,
  styles  : []
})
export class NzDemoCardBasicComponent { }
