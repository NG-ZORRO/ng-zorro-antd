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
      <nz-input-group *nzSpaceItem [nzPrefix]="prefixTemplateClock" nzStatus="error">
        <input type="text" nz-input placeholder="Error with prefix" />
      </nz-input-group>
      <nz-input-group *nzSpaceItem [nzPrefix]="prefixTemplateClock" nzStatus="warning">
        <input type="text" nz-input placeholder="Warning with prefix" />
      </nz-input-group>
      <ng-template #prefixTemplateClock>
        <nz-icon nzType="clock-circle" nzTheme="outline" />
      </ng-template>
    </nz-space>
  `
})
export class NzDemoInputStatusComponent {
  value?: string;
}
