/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { OverlayContainer } from '@angular/cdk/overlay';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { Component, DebugElement, signal } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { vi } from 'vitest';

import { provideNzNoAnimation } from 'ng-zorro-antd/core/animation';
import { dispatchMouseEvent } from 'ng-zorro-antd/core/testing';
import { getPickerInput } from 'ng-zorro-antd/date-picker/testing/util';
import { PREFIX_CLASS } from 'ng-zorro-antd/date-picker/util';
import { provideNzI18n } from 'ng-zorro-antd/i18n';
import en_US from 'ng-zorro-antd/i18n/languages/en_US';

import { NzDatePickerModule } from '../date-picker.module';
import { NZ_HIJRI_MONTH_OVERRIDES, NzHijriDateAdapter } from './hijri-date-adapter';
import { getHijriMonthLength, gregorianToHijri, hijriToGregorian, NzHijriMonthOverride } from './hijri-tools';

registerLocaleData(en);

describe('hijri tools', () => {
  it('should convert Gregorian dates to Umm al-Qura Hijri dates', () => {
    expect(gregorianToHijri(new Date(2026, 4, 15))).toEqual({ year: 1447, month: 11, day: 28 });
    // Start of Ramadan 1446
    expect(gregorianToHijri(new Date(2025, 2, 1))).toEqual({ year: 1446, month: 9, day: 1 });
  });

  it('should convert Hijri dates back to Gregorian dates', () => {
    expect(hijriToGregorian({ year: 1447, month: 11, day: 28 })).toEqual(new Date(2026, 4, 15));
    expect(hijriToGregorian({ year: 1446, month: 9, day: 1 })).toEqual(new Date(2025, 2, 1));
  });

  it('should round trip every day of a year', () => {
    for (let i = 0; i < 366; i++) {
      const date = new Date(2026, 0, 1 + i);
      expect(hijriToGregorian(gregorianToHijri(date))).toEqual(date);
    }
  });

  it('should report a month length of 29 or 30 days', () => {
    for (let month = 1; month <= 12; month++) {
      expect([29, 30]).toContain(getHijriMonthLength(1447, month));
    }
  });

  it('should shift the following months when a month length is overridden', () => {
    const overrides = [{ year: 1447, month: 9, days: 29 }];
    const natural = hijriToGregorian({ year: 1447, month: 10, day: 1 });
    const overridden = hijriToGregorian({ year: 1447, month: 10, day: 1 }, overrides);

    expect(getHijriMonthLength(1447, 9)).toBe(30);
    expect(getHijriMonthLength(1447, 9, overrides)).toBe(29);
    expect(natural.getTime() - overridden.getTime()).toBe(24 * 60 * 60 * 1000);
  });
});

describe('NzHijriDateAdapter', () => {
  let adapter: NzHijriDateAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [NzHijriDateAdapter] });
    adapter = TestBed.inject(NzHijriDateAdapter);
  });

  it('should expose Hijri calendar units', () => {
    const date = new Date(2026, 4, 15); // 28 Dhu al-Qi'dah 1447
    expect(adapter.getYear(date)).toBe(1447);
    expect(adapter.getMonth(date)).toBe(10);
    expect(adapter.getDate(date)).toBe(28);
    expect(adapter.getQuarter(date)).toBe(4);
  });

  it('should read the ordinary format tokens as Hijri', () => {
    const date = new Date(2026, 4, 15);
    expect(adapter.format(date, 'yyyy-MM-dd')).toBe('1447-11-28');
    expect(adapter.format(date, 'yyyy/M/d')).toBe('1447/11/28');
    expect(adapter.format(date, 'dd MMMM yyyy')).toBe("28 Dhu al-Qi'dah 1447");
    expect(adapter.format(date, 'dd MMM yy')).toBe('28 Dhu-Q 47');
    expect(adapter.format(date, 'yyyy-[Q]Q')).toBe('1447-Q4');
  });

  it('should keep the time when delegating time tokens to date-fns', () => {
    const date = new Date(2026, 4, 15, 13, 5, 7);
    expect(adapter.format(date, 'yyyy-MM-dd HH:mm:ss')).toBe('1447-11-28 13:05:07');
  });

  it('should parse back what it formats', () => {
    const date = new Date(2026, 4, 15);
    for (const pattern of ['yyyy-MM-dd', 'dd MMMM yyyy', 'yyyy-MM', 'yyyy', 'yyyy-[Q]Q', 'YYYY-ww']) {
      const parsed = adapter.parse(adapter.format(date, pattern), pattern)!;
      expect(adapter.format(parsed, pattern)).toBe(adapter.format(date, pattern));
    }
  });

  it('should count weeks inside the Hijri year', () => {
    expect(adapter.getISOWeek(hijriToGregorian({ year: 1447, month: 1, day: 1 }))).toBe(1);
    expect(adapter.getISOWeek(hijriToGregorian({ year: 1447, month: 1, day: 8 }))).toBe(2);
    // 1447 AH is 355 days long, so its last day falls in the 52nd week
    expect(adapter.getISOWeek(hijriToGregorian({ year: 1447, month: 12, day: 29 }))).toBe(52);
  });

  it('should reject values that are not a Hijri date', () => {
    expect(adapter.isValid(adapter.parse('not a date', 'yyyy-MM-dd')!)).toBe(false);
    expect(adapter.isValid(adapter.parse('1447-13-01', 'yyyy-MM-dd')!)).toBe(false);
    expect(adapter.isValid(adapter.parse('1447-11-31', 'yyyy-MM-dd')!)).toBe(false);
  });

  it('should add Hijri months and years', () => {
    const date = new Date(2026, 4, 15); // 1447-11-28

    const nextMonth = adapter.addCalendarMonths(date, 1);
    expect(adapter.getYear(nextMonth)).toBe(1447);
    expect(adapter.getMonth(nextMonth)).toBe(11);

    const nextYear = adapter.addCalendarYears(date, 1);
    expect(adapter.getYear(nextYear)).toBe(1448);
    expect(adapter.getMonth(nextYear)).toBe(10);

    // A 30th clamps into a 29 day month instead of spilling over
    const endOfMonth = adapter.setDate(date, 30);
    const clamped = adapter.addCalendarMonths(endOfMonth, 1);
    expect(adapter.getDate(clamped)).toBeLessThanOrEqual(30);
    expect(adapter.getMonth(clamped)).toBe(11);
  });

  it('should start a month on the first Hijri day', () => {
    const start = adapter.calendarStartOfMonth(new Date(2026, 4, 15));
    expect(adapter.getDate(start)).toBe(1);
    expect(adapter.getMonth(start)).toBe(10);
  });
});

describe('NzHijriDateAdapter month overrides', () => {
  it('should apply a fixed list of overrides', () => {
    TestBed.configureTestingModule({
      providers: [
        NzHijriDateAdapter,
        { provide: NZ_HIJRI_MONTH_OVERRIDES, useValue: [{ year: 1447, month: 9, days: 29 }] }
      ]
    });
    const adapter = TestBed.inject(NzHijriDateAdapter);

    expect(adapter.getNumDaysInMonth(hijriToGregorian({ year: 1447, month: 9, day: 1 }))).toBe(29);
  });

  it('should re-read overrides backed by a signal', () => {
    const overrides = signal<NzHijriMonthOverride[]>([]);
    TestBed.configureTestingModule({
      providers: [NzHijriDateAdapter, { provide: NZ_HIJRI_MONTH_OVERRIDES, useValue: overrides }]
    });
    const adapter = TestBed.inject(NzHijriDateAdapter);
    const ramadanStart = hijriToGregorian({ year: 1447, month: 9, day: 1 });

    expect(adapter.getNumDaysInMonth(ramadanStart)).toBe(30);

    overrides.set([{ year: 1447, month: 9, days: 29 }]);
    expect(adapter.getNumDaysInMonth(ramadanStart)).toBe(29);
    // The month after a shortened month now starts one day earlier
    expect(adapter.getDate(hijriToGregorian({ year: 1447, month: 10, day: 1 }))).toBe(2);
  });
});

describe('nz-hijri-date-picker', () => {
  let fixture: ComponentFixture<NzTestHijriDatePickerComponent>;
  let fixtureInstance: NzTestHijriDatePickerComponent;
  let debugElement: DebugElement;
  let overlayContainerElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideNzNoAnimation(), provideNzI18n(en_US)] });
  });

  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  beforeEach(() => {
    fixture = TestBed.createComponent(NzTestHijriDatePickerComponent);
    fixtureInstance = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  beforeEach(inject([OverlayContainer], (oc: OverlayContainer) => {
    overlayContainerElement = oc.getContainerElement();
  }));

  it('should show the Hijri value in the input', async () => {
    fixtureInstance.value.set(new Date(2026, 4, 15));
    await stabilize();
    expect(getPickerInput(debugElement).value).toBe('1447-11-28');
  });

  it('should render a Hijri panel and select a Hijri date', async () => {
    fixtureInstance.value.set(new Date(2026, 4, 15));
    await stabilize();
    await openPickerByClickTrigger();

    expect(queryFromOverlay(`.${PREFIX_CLASS}-header-year-btn`).textContent!.trim()).toBe('1447');
    expect(queryFromOverlay(`.${PREFIX_CLASS}-header-month-btn`).textContent!.trim()).toBe('Dhu-Q');

    const cells = overlayContainerElement.querySelectorAll<HTMLElement>(`td.${PREFIX_CLASS}-cell-in-view`);
    // The panel shows every day of the Hijri month, no more and no less
    expect(cells.length).toBe(getHijriMonthLength(1447, 11));
    expect(cells[0].textContent!.trim()).toBe('1');

    dispatchMouseEvent(cells[0], 'click');
    await stabilize();
    expect(fixtureInstance.value()!).toEqual(new Date(2026, 3, 18)); // 1 Dhu al-Qi'dah 1447
  });

  it('should move by one Hijri month with the header buttons', async () => {
    fixtureInstance.value.set(new Date(2026, 4, 15));
    await stabilize();
    await openPickerByClickTrigger();

    dispatchMouseEvent(queryFromOverlay(`.${PREFIX_CLASS}-header-next-btn`), 'click');
    await stabilize();
    expect(queryFromOverlay(`.${PREFIX_CLASS}-header-month-btn`).textContent!.trim()).toBe('Dhu-H');

    dispatchMouseEvent(queryFromOverlay(`.${PREFIX_CLASS}-header-super-next-btn`), 'click');
    await stabilize();
    expect(queryFromOverlay(`.${PREFIX_CLASS}-header-year-btn`).textContent!.trim()).toBe('1448');
  });

  it('should support a custom Hijri format', async () => {
    fixtureInstance.format.set('dd MMM yyyy');
    fixtureInstance.value.set(new Date(2026, 4, 15));
    await stabilize();
    expect(getPickerInput(debugElement).value).toBe('28 Dhu-Q 1447');
  });

  function queryFromOverlay(selector: string): HTMLElement {
    return overlayContainerElement.querySelector(selector) as HTMLElement;
  }

  async function openPickerByClickTrigger(): Promise<void> {
    dispatchMouseEvent(getPickerInput(debugElement), 'click');
    await stabilize();
  }

  async function stabilize(ms = 500): Promise<void> {
    fixture.detectChanges();
    vi.advanceTimersByTime(ms);
    await Promise.resolve();
    fixture.detectChanges();
  }
});

@Component({
  imports: [FormsModule, NzDatePickerModule],
  template: `<nz-hijri-date-picker [nzFormat]="format()" [(ngModel)]="value" />`
})
class NzTestHijriDatePickerComponent {
  readonly value = signal<Date | null>(null);
  readonly format = signal<string>('yyyy-MM-dd');
}
