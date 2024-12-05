import { Component } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpaceModule } from 'ng-zorro-antd/space';

@Component({
  selector: 'nz-demo-space-compact-button-vertical',
  imports: [NzSpaceModule, NzButtonModule],
  template: `
    <nz-space>
      <nz-space-compact *nzSpaceItem nzDirection="vertical">
        <button nz-button>Button 1</button>
        <button nz-button>Button 2</button>
        <button nz-button>Button 3</button>
      </nz-space-compact>
      <nz-space-compact *nzSpaceItem nzDirection="vertical">
        <button nz-button nzType="dashed">Button 1</button>
        <button nz-button nzType="dashed">Button 2</button>
        <button nz-button nzType="dashed">Button 3</button>
      </nz-space-compact>
      <nz-space-compact *nzSpaceItem nzDirection="vertical">
        <button nz-button nzType="primary">Button 1</button>
        <button nz-button nzType="primary">Button 2</button>
        <button nz-button nzType="primary">Button 3</button>
      </nz-space-compact>
    </nz-space>
  `
})
export class NzDemoSpaceCompactButtonVerticalComponent {}
