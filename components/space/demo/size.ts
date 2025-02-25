import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSpaceModule, NzSpaceSize } from 'ng-zorro-antd/space';

@Component({
  selector: 'nz-demo-space-size',
  imports: [FormsModule, NzButtonModule, NzRadioModule, NzSpaceModule],
  template: `
    <nz-radio-group [(ngModel)]="size">
      <label nz-radio nzValue="small">Small</label>
      <label nz-radio nzValue="middle">Middle</label>
      <label nz-radio nzValue="large">Large</label>
    </nz-radio-group>
    <nz-space [nzSize]="size">
      <button *nzSpaceItem nz-button nzType="primary">Button</button>
      <button *nzSpaceItem nz-button nzType="default">Default</button>
      <button *nzSpaceItem nz-button nzType="dashed">Dashed</button>
      <a *nzSpaceItem nz-button nzType="link">Link</a>
    </nz-space>
  `
})
export class NzDemoSpaceSizeComponent {
  size: NzSpaceSize = 'small';
}
