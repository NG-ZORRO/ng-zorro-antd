import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSpaceModule } from 'ng-zorro-antd/space';

@Component({
  selector: 'nz-demo-input-number-variant',
  imports: [FormsModule, NzInputNumberModule, NzSpaceModule],
  template: ` <nz-space nzDirection="vertical" style="width: 100%">
    <nz-input-number *nzSpaceItem [ngModel]="3" />
    <nz-input-number *nzSpaceItem nzVariant="filled" [ngModel]="3" />
    <nz-input-number *nzSpaceItem nzVariant="borderless" [ngModel]="3" />
    <nz-input-number *nzSpaceItem nzVariant="underlined" [ngModel]="3" />
  </nz-space>`
})
export class NzDemoInputNumberVariantComponent {}
