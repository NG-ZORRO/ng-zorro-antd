import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector     : 'nz-demo-card-basic',
  encapsulation: ViewEncapsulation.None,
  template     : `
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
  styles       : [
      `.code-box-demo p {
      margin: 0;
    }
    `
  ]
})
export class NzDemoCardBasicComponent {
}
