import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSpaceModule } from 'ng-zorro-antd/space';

@Component({
  selector: 'nz-demo-input-status',
  imports: [FormsModule, NzIconModule, NzInputModule, NzSpaceModule],
  template: `
    <nz-space nzDirection="vertical" style="width: 100%">
      <input *nzSpaceItem nz-input placeholder="Error" [(ngModel)]="value" nzStatus="error" />
      <input *nzSpaceItem nz-input placeholder="Warning" [(ngModel)]="value" nzStatus="warning" />
      <nz-input-wrapper *nzSpaceItem>
        <nz-icon nzInputPrefix nzType="clock-circle" nzTheme="outline" />
        <input type="text" nz-input placeholder="Error with prefix" nzStatus="error" />
      </nz-input-wrapper>
      <nz-input-wrapper *nzSpaceItem>
        <nz-icon nzInputPrefix nzType="clock-circle" nzTheme="outline" />
        <input type="text" nz-input placeholder="Warning with prefix" nzStatus="warning" />
      </nz-input-wrapper>
    </nz-space>
  `
})
export class NzDemoInputStatusComponent {
  value?: string;
}
