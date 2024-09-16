import { Component } from '@angular/core';

import { NzCardModule } from 'ng-zorro-antd/card';

@Component({
  selector: 'nz-demo-card-basic',
  standalone: true,
  imports: [NzCardModule],
  template: `
    <nz-card style="width:300px;" nzTitle="Card title" [nzExtra]="extraTemplate">
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </nz-card>
    <ng-template #extraTemplate>
      <a>More</a>
    </ng-template>
  `,
  styles: [
    `
      p {
        margin: 0;
      }
    `
  ]
})
export class NzDemoCardBasicComponent {}
