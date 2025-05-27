import { Component } from '@angular/core';

import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';

@Component({
  selector: 'nz-demo-time-picker-variant',
  imports: [NzTimePickerModule, NzSpaceModule],
  template: ` <nz-space nzDirection="vertical" style="width: 100%">
    <nz-time-picker *nzSpaceItem nzVariant="outlined" />
    <nz-time-picker *nzSpaceItem nzVariant="filled" />
    <nz-time-picker *nzSpaceItem nzVariant="borderless" />
    <nz-time-picker *nzSpaceItem nzVariant="underlined" />
  </nz-space>`
})
export class NzDemoTimePickerVariantComponent {}
