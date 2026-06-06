/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { OverlayContainer } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { provideNzNoAnimation } from 'ng-zorro-antd/core/animation';
import { dispatchMouseEvent } from 'ng-zorro-antd/core/testing';
import { getPickerInput } from 'ng-zorro-antd/date-picker/testing/util';

import { NzDatePickerModule } from './date-picker.module';

describe('week-picker', () => {
  let fixture: ComponentFixture<NzTestWeekPickerComponent>;
  let fixtureInstance: NzTestWeekPickerComponent;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideNzNoAnimation()]
    });
  });

  beforeEach(inject([OverlayContainer], (oc: OverlayContainer) => {
    overlayContainer = oc;
    overlayContainerElement = oc.getContainerElement();
  }));

  beforeEach(async () => {
    fixture = TestBed.createComponent(NzTestWeekPickerComponent);
    fixtureInstance = fixture.componentInstance;
  });

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  it('should show week num for date-picker with week mode', async () => {
    await fixture.whenStable();
    await openPickerByClickTrigger();

    expect(queryFromOverlay('.ant-picker-week-panel-row .ant-picker-cell-week')).toBeDefined();
  });

  it('should show week num for week-picker component', async () => {
    fixtureInstance.useDatePicker = false;
    await fixture.whenStable();
    await openPickerByClickTrigger();

    expect(queryFromOverlay('.ant-picker-week-panel-row .ant-picker-cell-week')).toBeDefined();
  });

  it('should change input value when click week', async () => {
    fixtureInstance.value = new Date('2020-02-25');
    await fixture.whenStable();
    await openPickerByClickTrigger();

    dispatchMouseEvent(queryFromOverlay('.ant-picker-cell'), 'click');
    await fixture.whenStable();
    expect(getPickerInput(fixture.debugElement).value).toBe('2020-05');
  });

  it('should change panel to week from month', async () => {
    fixtureInstance.value = new Date('2020-02-25');
    await fixture.whenStable();
    await openPickerByClickTrigger();

    dispatchMouseEvent(queryFromOverlay('.ant-picker-header-month-btn'), 'click');
    await fixture.whenStable();
    dispatchMouseEvent(queryFromOverlay('.ant-picker-cell'), 'click');
    await fixture.whenStable();
    expect(queryFromOverlay('.ant-picker-week-panel')).toBeTruthy();
  });

  it('should maintain week highlighting after clicking next month button', async () => {
    await testWeekHighlightingAfterNavigation('.ant-picker-header-next-btn');
  });

  it('should maintain week highlighting after clicking previous month button', async () => {
    await testWeekHighlightingAfterNavigation('.ant-picker-header-prev-btn');
  });

  it('should maintain week highlighting after clicking next year button', async () => {
    await testWeekHighlightingAfterNavigation('.ant-picker-header-super-next-btn');
  });

  it('should maintain week highlighting after clicking previous year button', async () => {
    await testWeekHighlightingAfterNavigation('.ant-picker-header-super-prev-btn');
  });

  function queryFromOverlay(selector: string): HTMLElement {
    return overlayContainerElement.querySelector(selector) as HTMLElement;
  }

  async function openPickerByClickTrigger(): Promise<void> {
    dispatchMouseEvent(getPickerInput(fixture.debugElement), 'click');
    await fixture.whenStable();
  }

  // Test for issue #9650 - week highlighting should persist after step button clicks
  async function testWeekHighlightingAfterNavigation(buttonSelector: string): Promise<void> {
    fixtureInstance.value = new Date('2020-02-25');
    await fixture.whenStable();
    await openPickerByClickTrigger();

    // Verify week highlighting is present initially
    expect(queryFromOverlay('.ant-picker-week-panel-row .ant-picker-cell-week')).toBeDefined();
    expect(queryFromOverlay('.ant-picker-week-panel')).toBeTruthy();

    // Click navigation button
    const navigationButton = queryFromOverlay(buttonSelector);
    expect(navigationButton).toBeTruthy();
    dispatchMouseEvent(navigationButton, 'click');
    await fixture.whenStable();

    // Verify week highlighting still exists after navigation
    expect(queryFromOverlay('.ant-picker-week-panel-row .ant-picker-cell-week')).toBeDefined();
    expect(queryFromOverlay('.ant-picker-week-panel')).toBeTruthy();
  }
});

@Component({
  imports: [NzDatePickerModule, FormsModule],
  template: `
    @if (useDatePicker) {
      <nz-date-picker nzMode="week" [ngModel]="value" />
    } @else {
      <nz-week-picker [ngModel]="value" />
    }
  `,
  changeDetection: ChangeDetectionStrategy.Eager
})
export class NzTestWeekPickerComponent {
  useDatePicker = true;
  value: Date | null = null;
}
