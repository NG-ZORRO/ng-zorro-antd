import { Component, Injectable, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  getHijriMonthLength,
  hijriToGregorian,
  NZ_HIJRI_MONTH_OVERRIDES,
  NzDatePickerModule,
  NzHijriMonthOverride
} from 'ng-zorro-antd/date-picker';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

/** Stands in for the service that holds your localization settings. */
@Injectable()
class HijriSettings {
  readonly monthOverrides = signal<NzHijriMonthOverride[]>([]);
}

@Component({
  selector: 'nz-demo-date-picker-hijri-overrides',
  imports: [FormsModule, NzDatePickerModule, NzSwitchModule],
  providers: [
    HijriSettings,
    { provide: NZ_HIJRI_MONTH_OVERRIDES, useFactory: () => inject(HijriSettings).monthOverrides }
  ],
  template: `
    <nz-switch [ngModel]="shortened()" (ngModelChange)="setShortened($event)" />
    <span class="hint">Ramadan 1447 lasts {{ ramadanLength() }} days</span>
    <br />
    <nz-hijri-date-picker [nzDefaultPickerValue]="ramadan" [(ngModel)]="date" />
  `,
  styles: `
    .hint {
      margin-inline-start: 8px;
    }

    nz-hijri-date-picker {
      margin-top: 12px;
    }
  `
})
export class NzDemoDatePickerHijriOverridesComponent {
  private readonly settings = inject(HijriSettings);

  readonly ramadan = hijriToGregorian({ year: 1447, month: 9, day: 1 });
  readonly date = signal<Date | null>(null);
  readonly shortened = signal(false);
  readonly ramadanLength = signal(getHijriMonthLength(1447, 9));

  setShortened(shortened: boolean): void {
    // Shortening a month moves every following month back by the same number of days
    this.settings.monthOverrides.set(shortened ? [{ year: 1447, month: 9, days: 29 }] : []);
    this.shortened.set(shortened);
    this.ramadanLength.set(getHijriMonthLength(1447, 9, this.settings.monthOverrides()));
  }
}
