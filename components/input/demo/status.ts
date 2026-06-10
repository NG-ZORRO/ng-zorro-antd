import { Component } from '@angular/core';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSpaceModule } from 'ng-zorro-antd/space';

@Component({
  selector: 'nz-demo-input-status',
  imports: [NzIconModule, NzInputModule, NzSpaceModule],
  template: `
    <nz-space nzDirection="vertical" style="width: 100%">
      <input *nzSpaceItem nz-input placeholder="Error" nzStatus="error" />
      <input *nzSpaceItem nz-input placeholder="Warning" nzStatus="warning" />
      <nz-input-wrapper *nzSpaceItem>
        <nz-icon nzInputPrefix nzType="clock-circle" />
        <input type="text" nz-input placeholder="Error with prefix" nzStatus="error" />
      </nz-input-wrapper>
      <nz-input-wrapper *nzSpaceItem>
        <nz-icon nzInputPrefix nzType="clock-circle" />
        <input type="text" nz-input placeholder="Warning with prefix" nzStatus="warning" />
      </nz-input-wrapper>
    </nz-space>
  `
})
export class NzDemoInputStatusComponent {}
