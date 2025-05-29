import { Component } from '@angular/core';

import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSpaceModule } from 'ng-zorro-antd/space';

@Component({
  selector: 'nz-demo-input-variant',
  imports: [NzInputModule, NzSpaceModule],
  template: `
    <nz-space nzDirection="vertical" style="width: 100%">
      <input *nzSpaceItem nz-input placeholder="outlined" nzVariant="outlined" />
      <input *nzSpaceItem nz-input placeholder="filled" nzVariant="filled" />
      <input *nzSpaceItem nz-input placeholder="borderless" nzVariant="borderless" />
      <input *nzSpaceItem nz-input placeholder="underlined" nzVariant="underlined" />
    </nz-space>
  `
})
export class NzDemoInputVariantComponent {}
