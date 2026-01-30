import { Component } from '@angular/core';

import { NzCardModule } from 'ng-zorro-antd/card';

@Component({
  selector: 'nz-demo-card-simple',
  imports: [NzCardModule],
  template: `
    <nz-card style="width:300px;">
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </nz-card>
  `,
  styles: `
    p {
      margin: 0;
    }
  `
})
export class NzDemoCardSimpleComponent {}
