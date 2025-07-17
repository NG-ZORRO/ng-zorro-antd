import { Component } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpaceModule } from 'ng-zorro-antd/space';

@Component({
  selector: 'nz-demo-space-wrap',
  imports: [NzButtonModule, NzSpaceModule],
  template: `
    <nz-space [nzSize]="[8, 16]" nzWrap>
      @for (item of items; track $index) {
        <button *nzSpaceItem nz-button>Button</button>
      }
    </nz-space>
  `
})
export class NzDemoSpaceWrapComponent {
  items = new Array(20).fill(null);
}
