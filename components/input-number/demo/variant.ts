import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSpaceModule } from 'ng-zorro-antd/space';

@Component({
  selector: 'nz-demo-input-number-variant',
  imports: [FormsModule, NzInputNumberModule, NzSpaceModule],
  template: ` <nz-space nzDirection="vertical" style="width: 100%">
    <nz-input-number *nzSpaceItem [(ngModel)]="value_outlined"></nz-input-number>
    <nz-input-number *nzSpaceItem nzVariant="filled" [(ngModel)]="value_filled"></nz-input-number>
    <nz-input-number *nzSpaceItem nzVariant="borderless" [(ngModel)]="value_borderless"></nz-input-number>
    <nz-input-number *nzSpaceItem nzVariant="underlined" [(ngModel)]="value_underlined"></nz-input-number>
  </nz-space>`
})
export class NzDemoInputNumberVariantComponent {
  value_outlined = 3;
  value_filled = 3;
  value_borderless = 3;
  value_underlined = 3;
}
