import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'nz-demo-date-picker-prefix-suffix',
  imports: [NzDatePickerModule, NzFlexModule, FormsModule, NzIconModule],
  template: `
    <div nz-flex nzVertical nzGap="1rem">
      <nz-date-picker [(ngModel)]="date" />
      <nz-date-picker [(ngModel)]="date" nzMode="week" nzSuffixIcon="smile" />
      <nz-date-picker [(ngModel)]="date" nzMode="month" [nzSuffixIcon]="suffixIcon" />
      <nz-date-picker [(ngModel)]="date" nzMode="quarter" [nzSuffixIcon]="suffixText" />
      <nz-date-picker [(ngModel)]="date" nzPrefix="star" />
      <nz-date-picker [(ngModel)]="date" [nzPrefix]="prefix" [nzSuffixIcon]="suffixIcon" />
      <nz-date-picker [(ngModel)]="date" [nzPrefix]="prefixText" nzSuffixIcon="smile" />
    </div>

    <ng-template #suffixIcon>
      <nz-icon nzType="star" nzTheme="outline" />
    </ng-template>

    <ng-template #suffixText> abc </ng-template>

    <ng-template #prefix>
      <nz-icon nzType="smile" />
    </ng-template>

    <ng-template #prefixText> Hello </ng-template>
  `
})
export class NzDemoDatePickerPrefixSuffixComponent {
  protected readonly date = signal<Date | undefined>(undefined);
}
