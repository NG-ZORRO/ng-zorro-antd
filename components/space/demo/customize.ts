import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzSpaceModule } from 'ng-zorro-antd/space';

@Component({
  selector: 'nz-demo-space-customize',
  imports: [FormsModule, NzButtonModule, NzSpaceModule, NzSliderModule],
  template: `
    <nz-slider [(ngModel)]="size"></nz-slider>
    <nz-space [nzSize]="size">
      <button *nzSpaceItem nz-button nzType="primary">Button</button>
      <button *nzSpaceItem nz-button nzType="default">Default</button>
      <button *nzSpaceItem nz-button nzType="dashed">Dashed</button>
      <a *nzSpaceItem nz-button nzType="link">Link</a>
    </nz-space>
  `
})
export class NzDemoSpaceCustomizeComponent {
  size = 8;
}
