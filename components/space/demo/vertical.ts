import { Component } from '@angular/core';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSpaceModule } from 'ng-zorro-antd/space';

@Component({
  selector: 'nz-demo-space-vertical',
  imports: [NzCardModule, NzSpaceModule],
  template: `
    <nz-space nzDirection="vertical">
      <nz-card *nzSpaceItem nzTitle="Card" style="width: 300px">
        <p>Card content</p>
        <p>Card content</p>
      </nz-card>
      <nz-card *nzSpaceItem nzTitle="Card" style="width: 300px">
        <p>Card content</p>
        <p>Card content</p>
      </nz-card>
    </nz-space>
  `
})
export class NzDemoSpaceVerticalComponent {}
