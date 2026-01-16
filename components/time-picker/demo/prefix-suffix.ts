import { Component } from '@angular/core';

import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';

@Component({
  selector: 'nz-demo-time-picker-prefix-suffix',
  imports: [NzTimePickerModule, NzIconModule, NzFlexModule],
  template: `
    <nz-flex nzVertical nzGap="small">
      <nz-time-picker nzPrefix="smile" />
      <nz-time-picker [nzPrefix]="smile" />
      <nz-time-picker nzSuffixIcon="smile" />
      <nz-time-picker [nzSuffixIcon]="smile" />
      <ng-template #smile><nz-icon nzType="smile" /></ng-template>
    </nz-flex>
  `
})
export class NzDemoTimePickerPrefixSuffixComponent {}
