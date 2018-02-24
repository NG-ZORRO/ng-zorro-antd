import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector     : 'nz-demo-card-basic',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <nz-card style="width:300px;" nzTitle="Card title" [nzExtra]="extraTemplate">
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </nz-card>
    <ng-template #extraTemplate>
      <a>More</a>
    </ng-template>
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
