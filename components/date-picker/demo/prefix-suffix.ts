import { Component } from '@angular/core';

import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

@Component({
  selector: 'nz-demo-date-picker-prefix-suffix',
  imports: [NzDatePickerModule, NzFlexModule, NzIconModule, NzTypographyModule],
  template: `
    <div nz-flex nzVertical nzAlign="flex-start" nzGap="12px">
      <nz-date-picker [nzSuffixIcon]="smileIcon" />
      <nz-date-picker [nzSuffixIcon]="smileIcon" nzMode="month" />
      <nz-range-picker [nzSuffixIcon]="smileIcon" />
      <nz-date-picker [nzSuffixIcon]="smileIcon" nzMode="week" />
      <nz-date-picker [nzSuffixIcon]="suffixText" />
      <nz-date-picker [nzSuffixIcon]="suffixText" nzMode="month" />
      <nz-range-picker [nzSuffixIcon]="suffixText" />
      <nz-date-picker [nzSuffixIcon]="suffixText" nzMode="week" />
      <nz-date-picker [nzPrefix]="smileIcon" nzMode="week" />
      <nz-date-picker [nzPrefix]="prefixText" nzMode="week" />
      <nz-range-picker [nzPrefix]="smileIcon" nzMode="week" />
      <nz-range-picker [nzPrefix]="prefixText" nzMode="week" />
    </div>

    <ng-template #smileIcon><nz-icon nzType="smile" /></ng-template>
    <ng-template #suffixText><span nz-typography>ab</span></ng-template>
    <ng-template #prefixText>Event Period</ng-template>
  `
})
export class NzDemoDatePickerPrefixSuffixComponent {}
