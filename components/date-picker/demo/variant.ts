import { Component } from '@angular/core';

import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSpaceModule } from 'ng-zorro-antd/space';

@Component({
  selector: 'nz-demo-date-picker-variant',
  imports: [NzDatePickerModule, NzSpaceModule],
  template: `
    <nz-space nzDirection="vertical" style="width: 100%">
      <nz-date-picker *nzSpaceItem nzVariant="outlined" />
      <nz-date-picker *nzSpaceItem nzVariant="filled" />
      <nz-date-picker *nzSpaceItem nzVariant="borderless" />
      <nz-date-picker *nzSpaceItem nzVariant="underlined" />
    </nz-space>
  `,
  styles: `
    nz-date-picker {
      margin: 0 8px 12px 0;
    }
  `
})
export class NzDemoDatePickerVariantComponent {}
