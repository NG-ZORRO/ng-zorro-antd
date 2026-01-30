/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, provideZoneChangeDetection } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, inject, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { dispatchMouseEvent } from 'ng-zorro-antd/core/testing';
import { getPickerInput } from 'ng-zorro-antd/date-picker/testing/util';

import { NzDatePickerModule } from './date-picker.module';

describe('week-picker', () => {
  let fixture: ComponentFixture<NzTestWeekPickerComponent>;
  let fixtureInstance: NzTestWeekPickerComponent;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  beforeEach(() => {
    // todo: use zoneless
    TestBed.configureTestingModule({
      providers: [provideNoopAnimations(), provideZoneChangeDetection()]
    });
  });

  beforeEach(inject([OverlayContainer], (oc: OverlayContainer) => {
    overlayContainer = oc;
    overlayContainerElement = oc.getContainerElement();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NzTestWeekPickerComponent);
    fixtureInstance = fixture.componentInstance;
    // set initial mode
    fixtureInstance.useSuite = 1;
    fixture.detectChanges();
  });

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  it('should show week num', fakeAsync(() => {
    fixtureInstance.nzFormat = undefined; // cover branch
    fixture.detectChanges();
    openPickerByClickTrigger();
    expect(queryFromOverlay('.ant-picker-week-panel-row .ant-picker-cell-week')).toBeDefined();
  }));

  it('should change input value when click week', fakeAsync(() => {
    fixtureInstance.nzValue = new Date('2020-02-25');
    fixture.detectChanges();
    flush();
    fixture.detectChanges();
    openPickerByClickTrigger();
    dispatchMouseEvent(queryFromOverlay('.ant-picker-cell'), 'click');
    fixture.detectChanges();
    tick(500);
    fixture.detectChanges();
    expect(getPickerInput(fixture.debugElement).value).toBe('2020-05');
  }));

  it('should change panel to week from month', fakeAsync(() => {
    fixtureInstance.nzValue = new Date('2020-02-25');
    fixture.detectChanges();
    openPickerByClickTrigger();
    dispatchMouseEvent(queryFromOverlay('.ant-picker-header-month-btn'), 'click');
    fixture.detectChanges();
    dispatchMouseEvent(queryFromOverlay('.ant-picker-cell'), 'click');
    fixture.detectChanges();
    expect(queryFromOverlay('.ant-picker-week-panel')).toBeTruthy();
  }));

  it('should show week num', fakeAsync(() => {
    fixtureInstance.useSuite = 2;
    fixture.whenRenderingDone().then(() => {
      tick(500);
      fixture.detectChanges();
      fixtureInstance.nzFormat = undefined; // cover branch
      fixture.detectChanges();
      openPickerByClickTrigger();
      expect(queryFromOverlay('.ant-picker-week-panel-row .ant-picker-cell-week')).toBeDefined();
    });
  }));

  // Test for issue #9650 - week highlighting should persist after step button clicks
  it('should maintain week highlighting after clicking next month button', fakeAsync(() => {
    fixtureInstance.nzValue = new Date('2020-02-25');
    fixture.detectChanges();
    flush();
    fixture.detectChanges();
    openPickerByClickTrigger();

    // Verify week highlighting is present initially
    expect(queryFromOverlay('.ant-picker-week-panel-row .ant-picker-cell-week')).toBeDefined();
    expect(queryFromOverlay('.ant-picker-week-panel')).toBeTruthy();

    // Click next month button
    const nextButton = queryFromOverlay('.ant-picker-header-next-btn');
    expect(nextButton).toBeTruthy();
    dispatchMouseEvent(nextButton, 'click');
    fixture.detectChanges();
    tick(500);
    fixture.detectChanges();

    // Verify week highlighting still exists after navigation
    expect(queryFromOverlay('.ant-picker-week-panel-row .ant-picker-cell-week')).toBeDefined();
    expect(queryFromOverlay('.ant-picker-week-panel')).toBeTruthy();
  }));

  it('should maintain week highlighting after clicking previous month button', fakeAsync(() => {
    fixtureInstance.nzValue = new Date('2020-02-25');
    fixture.detectChanges();
    flush();
    fixture.detectChanges();
    openPickerByClickTrigger();

    // Verify week highlighting is present initially
    expect(queryFromOverlay('.ant-picker-week-panel-row .ant-picker-cell-week')).toBeDefined();
    expect(queryFromOverlay('.ant-picker-week-panel')).toBeTruthy();

    // Click previous month button
    const prevButton = queryFromOverlay('.ant-picker-header-prev-btn');
    expect(prevButton).toBeTruthy();
    dispatchMouseEvent(prevButton, 'click');
    fixture.detectChanges();
    tick(500);
    fixture.detectChanges();

    // Verify week highlighting still exists after navigation
    expect(queryFromOverlay('.ant-picker-week-panel-row .ant-picker-cell-week')).toBeDefined();
    expect(queryFromOverlay('.ant-picker-week-panel')).toBeTruthy();
  }));

  it('should maintain week highlighting after clicking next year button', fakeAsync(() => {
    fixtureInstance.nzValue = new Date('2020-02-25');
    fixture.detectChanges();
    flush();
    fixture.detectChanges();
    openPickerByClickTrigger();

    // Verify week highlighting is present initially
    expect(queryFromOverlay('.ant-picker-week-panel-row .ant-picker-cell-week')).toBeDefined();
    expect(queryFromOverlay('.ant-picker-week-panel')).toBeTruthy();

    // Click next year button (super next)
    const nextYearButton = queryFromOverlay('.ant-picker-header-super-next-btn');
    expect(nextYearButton).toBeTruthy();
    dispatchMouseEvent(nextYearButton, 'click');
    fixture.detectChanges();
    tick(500);
    fixture.detectChanges();

    // Verify week highlighting still exists after navigation
    expect(queryFromOverlay('.ant-picker-week-panel-row .ant-picker-cell-week')).toBeDefined();
    expect(queryFromOverlay('.ant-picker-week-panel')).toBeTruthy();
  }));

  it('should maintain week highlighting after clicking previous year button', fakeAsync(() => {
    fixtureInstance.nzValue = new Date('2020-02-25');
    fixture.detectChanges();
    flush();
    fixture.detectChanges();
    openPickerByClickTrigger();

    // Verify week highlighting is present initially
    expect(queryFromOverlay('.ant-picker-week-panel-row .ant-picker-cell-week')).toBeDefined();
    expect(queryFromOverlay('.ant-picker-week-panel')).toBeTruthy();

    // Click previous year button (super prev)
    const prevYearButton = queryFromOverlay('.ant-picker-header-super-prev-btn');
    expect(prevYearButton).toBeTruthy();
    dispatchMouseEvent(prevYearButton, 'click');
    fixture.detectChanges();
    tick(500);
    fixture.detectChanges();

    // Verify week highlighting still exists after navigation
    expect(queryFromOverlay('.ant-picker-week-panel-row .ant-picker-cell-week')).toBeDefined();
    expect(queryFromOverlay('.ant-picker-week-panel')).toBeTruthy();
  }));

  ////////////

  function queryFromOverlay(selector: string): HTMLElement {
    return overlayContainerElement.querySelector(selector) as HTMLElement;
  }

  function openPickerByClickTrigger(): void {
    dispatchMouseEvent(getPickerInput(fixture.debugElement), 'click');
    fixture.detectChanges();
    tick(500);
    fixture.detectChanges();
  }
});

@Component({
  imports: [NzDatePickerModule, FormsModule],
  template: `
    @switch (useSuite) {
      @case (1) {
        <nz-date-picker nzMode="week" [nzFormat]="nzFormat!" [ngModel]="nzValue" />
      }
      @case (2) {
        <nz-week-picker [ngModel]="nzValue" />
      }
    }
  `
})
export class NzTestWeekPickerComponent {
  useSuite!: 1 | 2;
  nzFormat?: string;
  nzValue: Date | null = null;
}
