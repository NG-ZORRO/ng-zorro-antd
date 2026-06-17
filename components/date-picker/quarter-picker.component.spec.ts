/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { OverlayContainer } from '@angular/cdk/overlay';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { Component, signal } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import isBefore from 'date-fns/isBefore';

import { dispatchMouseEvent, updateNonSignalsInput } from 'ng-zorro-antd/core/testing';
import { CandyDate } from 'ng-zorro-antd/core/time';
import { getPickerInput } from 'ng-zorro-antd/date-picker/testing/util';
import { PREFIX_CLASS } from 'ng-zorro-antd/date-picker/util';

import { NzDatePickerModule } from './date-picker.module';

registerLocaleData(zh);

describe('quater-picker', () => {
  let fixture: ComponentFixture<NzTestQuarterPickerComponent>;
  let fixtureInstance: NzTestQuarterPickerComponent;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideNoopAnimations()]
    });
  });

  beforeEach(() => jasmine.clock().install());

  beforeEach(inject([OverlayContainer], (oc: OverlayContainer) => {
    overlayContainer = oc;
    overlayContainerElement = oc.getContainerElement();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NzTestQuarterPickerComponent);
    fixtureInstance = fixture.componentInstance;
    // set initial mode
    fixtureInstance.useSuite = 1;
    fixture.detectChanges();
  });

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  afterEach(() => jasmine.clock().uninstall());

  it('should show quarter panel', async () => {
    fixtureInstance.nzFormat = undefined; // cover branch
    fixture.detectChanges();
    await openPickerByClickTrigger();
    expect(queryFromOverlay('.ant-picker-quarter-panel')).toBeDefined();
  });

  it('should change input value when click quarter', async () => {
    fixtureInstance.nzValue = new Date('2024-04-04');
    await stabilize();
    await openPickerByClickTrigger();
    dispatchMouseEvent(queryFromOverlay('.ant-picker-cell'), 'click');
    await stabilize(500);
    expect(getPickerInput(fixture.debugElement).value).toBe('2024-Q1');
  });

  it('should specified date provide by "value" be chosen', async () => {
    fixtureInstance.useSuite = 3;
    fixtureInstance.nzValue = new Date('2024-04-30');
    await stabilize(500);
    expect(queryFromOverlay('.ant-picker-quarter-panel td.ant-picker-cell-selected').textContent).toContain('Q2');

    // Click the first cell to change ngModel
    const cell = queryFromOverlay('.ant-picker-quarter-panel td.ant-picker-cell:nth-child(1) .ant-picker-cell-inner');
    const cellText = cell.textContent!.trim();
    dispatchMouseEvent(cell, 'click');
    await stabilize(500);
    expect(`Q${new CandyDate(fixtureInstance.nzValue).setMonth(0).getQuarter().toString()}`).toBe(cellText);
  });

  it('should nz-quarter-picker work', async () => {
    fixtureInstance.useSuite = 2;
    await fixture.whenRenderingDone();
    await stabilize(500);
    await openPickerByClickTrigger();
    expect(getPickerContainer()).not.toBeNull();
    dispatchMouseEvent(queryFromOverlay('.ant-picker-cell'), 'click');
    await stabilize(500);
    const pickerInput = getPickerInput(fixture.debugElement);
    expect(pickerInput).not.toBeNull(); //
  });

  it('should nz-range-picker "nzValue" work', async () => {
    fixtureInstance.useSuite = 4;
    fixtureInstance.nzValue = [new Date('2024-04-30'), new Date('2025-12-30')];
    await fixture.whenRenderingDone();
    await stabilize(500);
    const panels = overlayContainerElement.querySelectorAll('.ant-picker-quarter-panel');
    expect(panels).not.toBeNull();
    expect(panels.length).toBe(2);

    await stabilize(500);
    const firstCell = panels[0].querySelector('td.ant-picker-cell-selected')!;
    expect(firstCell).not.toBeNull();
    expect(firstCell.textContent!.trim()).toBe('Q2');

    const secondCell = panels[1].querySelector('td.ant-picker-cell-selected')!;
    expect(secondCell).not.toBeNull();
    expect(secondCell.textContent!.trim()).toBe('Q4');
  });

  it('should support year panel changes', async () => {
    fixtureInstance.useSuite = 3;

    fixtureInstance.nzValue = new Date('2024-04-30');
    await stabilize();
    await openPickerByClickTrigger();
    // Click year select to show year panel
    dispatchMouseEvent(queryFromOverlay('.ant-picker-header-quarter-btn'), 'click');
    await stabilize(500);
    expect(queryFromOverlay('.ant-picker-year-panel')).toBeDefined();
    expect(queryFromOverlay('.ant-picker-header-year-btn').textContent).toContain('2020');
    expect(queryFromOverlay('.ant-picker-header-year-btn').textContent).toContain('2029');
    // Goto previous year
    dispatchMouseEvent(getSuperPreBtn(), 'click');
    await stabilize(500);
    expect(queryFromOverlay('.ant-picker-header-year-btn').textContent).toContain('2010');
    expect(queryFromOverlay('.ant-picker-header-year-btn').textContent).toContain('2019');
    // Goto next year * 2
    dispatchMouseEvent(getSuperNextBtn(), 'click');
    await stabilize(500);
    dispatchMouseEvent(getSuperNextBtn(), 'click');
    await stabilize(500);
    expect(queryFromOverlay('.ant-picker-header-year-btn').textContent).toContain('2030');
    expect(queryFromOverlay('.ant-picker-header-year-btn').textContent).toContain('2039');
  });

  it('should support nzDisabledDate', async () => {
    fixtureInstance.useSuite = 1;
    fixtureInstance.nzValue = null;
    fixture.detectChanges();
    const compareDate = new Date('2024-8-01');
    fixtureInstance.nzValue = new Date('2024-04-01');
    fixtureInstance.nzDisabledDate = (current: Date) => isBefore(current, compareDate);
    await stabilize();

    await openPickerByClickTrigger();
    const allDisabledCells = overlayContainerElement.querySelectorAll(
      '.ant-picker-quarter-panel tr td.ant-picker-cell-disabled'
    );
    const disabledCell = allDisabledCells[allDisabledCells.length - 1];
    expect(disabledCell.textContent).toContain('Q2');
  });

  it('should support hover date cell style', async () => {
    fixtureInstance.useSuite = 4;
    fixture.detectChanges();
    await openPickerByClickTrigger();
    await stabilize(500);

    const left = getFirstCell('left'); // Use the first cell
    dispatchMouseEvent(left, 'click');
    const rightInNextMonth = queryFromRightPanel('table tr td.ant-picker-cell');
    dispatchMouseEvent(rightInNextMonth, 'mouseenter');
    fixture.detectChanges();
    expect(rightInNextMonth.classList.contains('ant-picker-cell-range-hover-end')).toBeTruthy();
  });

  ////////////

  function queryFromRightPanel(selector: string): HTMLElement {
    return overlayContainerElement
      .querySelector('.ant-picker-panel:last-child')!
      .querySelector(selector) as HTMLElement;
  }

  function getFirstCell(partial: 'left' | 'right'): HTMLElement {
    const flg = partial === 'left' ? 'first' : 'last';
    return queryFromOverlay(
      `.ant-picker-quarter-panel:${flg}-child td:first-child .ant-picker-cell-inner`
    ) as HTMLElement;
  }

  function queryFromOverlay(selector: string): HTMLElement {
    return overlayContainerElement.querySelector(selector) as HTMLElement;
  }

  async function openPickerByClickTrigger(): Promise<void> {
    dispatchMouseEvent(getPickerInput(fixture.debugElement), 'click');
    await stabilize(500);
  }

  async function stabilize(ms?: number): Promise<void> {
    fixture.detectChanges();
    if (typeof ms === 'number') {
      jasmine.clock().tick(ms);
    }
    await updateNonSignalsInput(fixture);
    fixture.detectChanges();
  }

  function getPickerContainer(): HTMLElement {
    return queryFromOverlay('.ant-picker-quarter-panel') as HTMLElement;
  }

  function getSuperPreBtn(): HTMLElement {
    return queryFromOverlay(`.${PREFIX_CLASS}-header-super-prev-btn`);
  }

  function getSuperNextBtn(): HTMLElement {
    return queryFromOverlay(`.${PREFIX_CLASS}-header-super-next-btn`);
  }
});

@Component({
  imports: [NzDatePickerModule, FormsModule],
  template: `
    @switch (useSuiteSignal()) {
      @case (1) {
        <nz-date-picker
          nzMode="quarter"
          [nzFormat]="nzFormatSignal()!"
          [ngModel]="nzValueSignal()"
          (ngModelChange)="nzValue = $event"
          [nzDisabled]="nzDisabledSignal()"
          [nzDisabledDate]="nzDisabledDateSignal()"
        />
      }
      @case (2) {
        <nz-quarter-picker [ngModel]="nzValueSignal()" (ngModelChange)="nzValue = $event" />
      }
      @case (3) {
        <nz-quarter-picker [ngModel]="nzValueSignal()" (ngModelChange)="nzValue = $event" nzOpen />
      }
      @case (4) {
        <nz-range-picker nzMode="quarter" [ngModel]="nzValueSignal()" (ngModelChange)="nzValue = $event" nzOpen />
      }
    }
  `
})
export class NzTestQuarterPickerComponent {
  readonly useSuiteSignal = signal<1 | 2 | 3 | 4>(1);
  readonly nzFormatSignal = signal<string | undefined>(undefined);
  readonly nzValueSignal = signal<Date | Date[] | null>(null);
  readonly nzDisabledSignal = signal(false);
  readonly nzDisabledDateSignal = signal<((d: Date) => boolean) | undefined>(undefined);

  get useSuite(): 1 | 2 | 3 | 4 {
    return this.useSuiteSignal();
  }

  set useSuite(value: 1 | 2 | 3 | 4) {
    this.useSuiteSignal.set(value);
  }

  get nzFormat(): string | undefined {
    return this.nzFormatSignal();
  }

  set nzFormat(value: string | undefined) {
    this.nzFormatSignal.set(value);
  }

  get nzValue(): Date | Date[] | null {
    return this.nzValueSignal();
  }

  set nzValue(value: Date | Date[] | null) {
    this.nzValueSignal.set(value);
  }

  get nzDisabled(): boolean {
    return this.nzDisabledSignal();
  }

  set nzDisabled(value: boolean) {
    this.nzDisabledSignal.set(value);
  }

  get nzDisabledDate(): ((d: Date) => boolean) | undefined {
    return this.nzDisabledDateSignal();
  }

  set nzDisabledDate(value: ((d: Date) => boolean) | undefined) {
    this.nzDisabledDateSignal.set(value);
  }
}
