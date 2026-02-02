import { Component } from '@angular/core';

import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';

@Component({
  selector: 'nz-demo-select-status',
  imports: [NzSelectModule, NzSpaceModule],
  template: `
    <nz-select nzStatus="error" />
    <br />
    <br />
    <nz-select nzStatus="warning" />
  `,
  styles: `
    nz-select {
      width: 100%;
    }
  `
})
export class NzDemoSelectStatusComponent {}
