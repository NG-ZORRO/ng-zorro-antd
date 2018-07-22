import { OverlayContainer } from '@angular/cdk/overlay';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { Component, DebugElement, TemplateRef, ViewChild } from '@angular/core';
import { fakeAsync, inject, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import differenceInDays from 'date-fns/difference_in_days';
import isSameDay from 'date-fns/is_same_day';

import { dispatchMouseEvent } from '../core/testing';
import { NzDatePickerModule } from './date-picker.module';
import { CandyDate } from './lib/candy-date';

registerLocaleData(zh);

describe('NzRangePickerComponent', () => {
  let fixture: ComponentFixture<NzTestRangePickerComponent>;
  let fixtureInstance: NzTestRangePickerComponent;
  let debugElement: DebugElement;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, NoopAnimationsModule, NzDatePickerModule ],
      providers: [],
      declarations: [
        NzTestRangePickerComponent
      ]
    });

    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NzTestRangePickerComponent);
    fixtureInstance = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  beforeEach(inject([ OverlayContainer ], (oc: OverlayContainer) => {
    overlayContainer = oc;
    overlayContainerElement = oc.getContainerElement();
  }));

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  describe('general api testing', () => {
    beforeEach(() => fixtureInstance.useSuite = 1);

    it('should open by click and close by click at outside', fakeAsync(() => {
      fixture.detectChanges();
      dispatchMouseEvent(getPickerTrigger(), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(getPickerContainer()).not.toBeNull();

      dispatchMouseEvent(queryFromOverlay('.cdk-overlay-backdrop'), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(getPickerContainer()).toBeNull();
    }));

    it('should support nzAllowClear and work properly', fakeAsync(() => {
      const clearBtnSelector = By.css('nz-picker i.ant-calendar-picker-clear');
      const initial = fixtureInstance.modelValue = [ new Date(), new Date() ];
      fixtureInstance.nzAllowClear = false;
      fixture.detectChanges();
      expect(debugElement.query(clearBtnSelector)).toBeNull();

      fixtureInstance.nzAllowClear = true;
      tick();
      fixture.detectChanges();
      expect(fixtureInstance.modelValue).toBe(initial);
      expect(debugElement.query(clearBtnSelector)).toBeDefined();

      const nzOnChange = spyOn(fixtureInstance, 'modelValueChange');
      debugElement.query(clearBtnSelector).nativeElement.click();
      fixture.detectChanges();
      expect(fixtureInstance.modelValue.length).toBe(0);
      expect(nzOnChange).toHaveBeenCalledWith([]);
      expect(debugElement.query(clearBtnSelector)).toBeFalsy();
    }));

    it('should support nzAutoFocus', () => {
      fixtureInstance.nzAutoFocus = true;
      fixture.detectChanges();
      expect(getPickerTrigger().querySelector('input:first-child') === document.activeElement).toBeTruthy();
    });

    it('should support nzDisabled', fakeAsync(() => {
      // Make sure picker clear button shown up
      fixtureInstance.nzAllowClear = true;
      fixtureInstance.modelValue = [ new Date(), new Date() ];

      fixtureInstance.nzDisabled = true;
      fixture.detectChanges();
      expect(debugElement.query(By.css('nz-picker .ant-input-disabled'))).toBeDefined();
      expect(debugElement.query(By.css('nz-picker i.ant-calendar-picker-clear'))).toBeNull();

      fixtureInstance.nzDisabled = false;
      tick();
      fixture.detectChanges();
      expect(debugElement.query(By.css('nz-picker .ant-input-disabled'))).toBeNull();
      expect(debugElement.query(By.css('nz-picker i.ant-calendar-picker-clear'))).toBeDefined();
    }));

    it('should support nzOpen if assigned', fakeAsync(() => {
      fixtureInstance.useSuite = 2;

      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(getPickerContainer()).toBeNull();

      fixtureInstance.nzOpen = true;
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(getPickerContainer()).not.toBeNull();
      expect(queryFromOverlay('.cdk-overlay-backdrop')).toBeNull();

      fixtureInstance.nzOpen = false;
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(getPickerContainer()).toBeNull();
    }));

    it('should support nzClassName', () => {
      const className = fixtureInstance.nzClassName = 'my-test-class';
      fixture.detectChanges();
      const picker = debugElement.queryAll(By.css('.ant-calendar-picker'))[1].nativeElement as HTMLElement;
      expect(picker.classList.contains(className)).toBeTruthy();
    });

    it('should support nzDisabledDate', fakeAsync(() => {
      fixture.detectChanges();
      const compareDate = new Date('2018-11-15 00:00:00');
      fixtureInstance.modelValue = [ new Date('2018-11-11 12:12:12'), null ];
      fixtureInstance.nzDisabledDate = (current: Date) => isSameDay(current, compareDate);
      fixture.detectChanges();

      dispatchMouseEvent(getPickerTrigger(), 'click');
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      const disabledCell = queryFromOverlay('.ant-calendar-range-left tbody.ant-calendar-tbody td.ant-calendar-disabled-cell');
      expect(disabledCell.textContent.trim()).toBe('15');
    }));

    it('should support nzLocale', () => {
      const featureKey = 'LEFT_PLACEHOLDER';
      fixtureInstance.nzLocale = { lang: { rangePlaceholder: [ featureKey, 'End' ] } };
      fixture.detectChanges();
      expect(getPickerTrigger().querySelector('input:nth-of-type(1)').getAttribute('placeholder')).toBe(featureKey);
    });

    it('should support nzPlaceHolder', () => {
      const featureKey = 'RIGHT_PLACEHOLDER';
      fixtureInstance.nzPlaceHolder = [ 'Start', featureKey ];
      fixture.detectChanges();
      expect(getPickerTrigger().querySelector('input:nth-of-type(2)').getAttribute('placeholder')).toBe(featureKey);
    });

    it('should support nzPopupStyle', fakeAsync(() => {
      fixtureInstance.nzPopupStyle = { color: 'red' };
      fixture.detectChanges();
      dispatchMouseEvent(getPickerTrigger(), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(getPickerContainer().style.color).toBe('red');
    }));

    it('should support nzDropdownClassName', fakeAsync(() => {
      const keyCls = fixtureInstance.nzDropdownClassName = 'my-test-class';
      fixture.detectChanges();
      dispatchMouseEvent(getPickerTrigger(), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(getPickerContainer().classList.contains(keyCls)).toBeTruthy();
    }));

    it('should support nzSize', () => {
      fixtureInstance.nzSize = 'large';
      fixture.detectChanges();
      expect(getPicker().classList.contains('ant-calendar-picker-large')).toBeTruthy();

      fixtureInstance.nzSize = 'small';
      fixture.detectChanges();
      expect(getPicker().classList.contains('ant-calendar-picker-small')).toBeTruthy();
    });

    it('should support nzStyle', () => {
      fixtureInstance.nzStyle = { color: 'blue' };
      fixture.detectChanges();
      expect(getPicker().style.color).toBe('blue');
    });

    it('should support nzOnOpenChange', fakeAsync(() => {
      const nzOnOpenChange = spyOn(fixtureInstance, 'nzOnOpenChange');
      fixture.detectChanges();
      dispatchMouseEvent(getPickerTrigger(), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(nzOnOpenChange).toHaveBeenCalledWith(true);

      dispatchMouseEvent(queryFromOverlay('.cdk-overlay-backdrop'), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(nzOnOpenChange).toHaveBeenCalledWith(false);
      expect(nzOnOpenChange).toHaveBeenCalledTimes(2);
    }));

    it('should support nzValue', fakeAsync(() => {
      fixtureInstance.modelValue = [ new Date('2018-11-11'), new Date('2018-12-11') ];
      fixture.detectChanges();
      openPickerByClickTrigger();
      expect(getFirstSelectedDayCell().textContent.trim()).toBe('11');
    }));

    it('should support nzOnChange', fakeAsync(() => {
      fixtureInstance.modelValue = [ new Date('2018-11-11'), new Date('2018-11-11') ];
      const nzOnChange = spyOn(fixtureInstance, 'modelValueChange');
      fixture.detectChanges();
      openPickerByClickTrigger();

      const left = getFirstCell('left'); // Use the first cell
      const leftText = left.textContent.trim();
      dispatchMouseEvent(left, 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      const right = getFirstCell('right'); // NOTE: At the time "left" clicked, the date panel will be re-rendered
      const rightText = right.textContent.trim();
      dispatchMouseEvent(right, 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(nzOnChange).toHaveBeenCalled();
      const result = nzOnChange.calls.allArgs()[0][0];
      expect(result[0].getDate()).toBe(+leftText);
      expect(result[1].getDate()).toBe(+rightText);
    }));

  }); // /general api testing

  describe('panel switch and move forward/afterward', () => {
    beforeEach(() => fixtureInstance.useSuite = 1);

    it('should support date panel changes', fakeAsync(() => {
      fixtureInstance.modelValue = [ new Date('2018-6-11'), new Date('2018-12-12') ];
      fixture.detectChanges();
      openPickerByClickTrigger();
      // Click previous year button
      dispatchMouseEvent(queryFromOverlay('.ant-calendar-range-left .ant-calendar-prev-year-btn'), 'click');
      fixture.detectChanges();
      expect(queryFromOverlay('.ant-calendar-range-left .ant-calendar-year-select').textContent.indexOf('2017') > -1).toBeTruthy();
      // Click next year button * 2
      dispatchMouseEvent(queryFromOverlay('.ant-calendar-range-left .ant-calendar-next-year-btn'), 'click');
      fixture.detectChanges();
      dispatchMouseEvent(queryFromOverlay('.ant-calendar-range-left .ant-calendar-next-year-btn'), 'click');
      fixture.detectChanges();
      expect(queryFromOverlay('.ant-calendar-range-left .ant-calendar-year-select').textContent.indexOf('2019') > -1).toBeTruthy();
      // Click previous month button
      dispatchMouseEvent(queryFromOverlay('.ant-calendar-range-left .ant-calendar-prev-month-btn'), 'click');
      fixture.detectChanges();
      expect(queryFromOverlay('.ant-calendar-range-left .ant-calendar-month-select').textContent.indexOf('5') > -1).toBeTruthy();
      // Click next month button * 2
      dispatchMouseEvent(queryFromOverlay('.ant-calendar-range-left .ant-calendar-next-month-btn'), 'click');
      fixture.detectChanges();
      dispatchMouseEvent(queryFromOverlay('.ant-calendar-range-left .ant-calendar-next-month-btn'), 'click');
      fixture.detectChanges();
      expect(queryFromOverlay('.ant-calendar-range-left .ant-calendar-month-select').textContent.indexOf('7') > -1).toBeTruthy();
    }));

  }); // /panel switch and move forward/afterward

  describe('specified date picker testing', () => {
    beforeEach(() => fixtureInstance.useSuite = 1);

    it('should support nzDateRender', fakeAsync(() => {
      fixtureInstance.nzDateRender = fixtureInstance.tplDateRender;
      fixture.detectChanges();
      openPickerByClickTrigger();
      expect(queryFromOverlay('.test-first-day').textContent.trim()).toBe('1');
    }));

    it('should support nzDateRender with typeof function', fakeAsync(() => {
      const featureKey = 'TEST_FIRST_DAY';
      fixtureInstance.nzDateRender = (d: CandyDate) => d.getDate() === 1 ? featureKey : d.getDate();
      fixture.detectChanges();
      openPickerByClickTrigger();
      expect(overlayContainerElement.textContent.indexOf(featureKey) > -1).toBeTruthy();
    }));

    it('should support nzShowTime', fakeAsync(() => {
      const nzOnChange = spyOn(fixtureInstance, 'modelValueChange');
      fixtureInstance.modelValue = [ new Date('2018-11-11 11:22:33'), new Date('2018-12-12 11:22:33') ];
      fixtureInstance.nzShowTime = true;
      fixture.detectChanges();
      openPickerByClickTrigger();
      expect(queryFromOverlay('.ant-calendar-time-picker-btn')).toBeDefined();
      expect(queryFromOverlay('.ant-calendar-ok-btn')).toBeDefined();

      // Open time picker panel
      dispatchMouseEvent(queryFromOverlay('.ant-calendar-time-picker-btn'), 'click');
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(queryFromOverlay('.ant-calendar-range-left .ant-calendar-time-picker-inner.ant-calendar-time-picker-column-3')).toBeDefined();
      expect(queryFromOverlay('.ant-calendar-range-left .ant-calendar-time-picker-select:first-child li.ant-calendar-time-picker-select-option-selected').textContent.trim()).toBe('11');

      // Click to choose a hour
      dispatchMouseEvent(queryFromOverlay('.ant-calendar-range-left .ant-calendar-time-picker-select:first-child li:first-child'), 'click');
      fixture.detectChanges();
      expect((queryFromOverlay('.ant-calendar-range-left input.ant-calendar-input') as HTMLInputElement).value).toBe('2018-11-11 00:22:33');
    }));

    it('should support nzShowTime.nzFormat', fakeAsync(() => {
      fixtureInstance.modelValue = [ new Date('2018-11-11'), new Date('2018-12-12') ];
      fixtureInstance.nzShowTime = { nzFormat: 'HH:mm' };
      fixture.detectChanges();
      openPickerByClickTrigger();

      // Open time picker panel
      dispatchMouseEvent(queryFromOverlay('.ant-calendar-time-picker-btn'), 'click');
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(queryFromOverlay('.ant-calendar-range-left .ant-calendar-time-picker-inner.ant-calendar-time-picker-column-2')).toBeDefined();
    }));

    it('should support nzDisabledTime and nzShowTime.nzHideDisabledOptions', fakeAsync(() => {
      fixtureInstance.modelValue = [ new Date('2018-11-11 11:11:11'), new Date('2018-12-12 12:12:12') ];
      fixtureInstance.nzShowTime = true;
      fixtureInstance.nzDisabledTime = (current: Date, partial: 'start' | 'end') => {
        return partial === 'start' ? {
          nzDisabledHours: () => [ 0, 1, 2],
          nzDisabledMinutes: () => [ 0, 1 ],
          nzDisabledSeconds: () => [ 0 ]
        } : {
          nzDisabledHours: () => [ 0, 1, 2, 3 ],
          nzDisabledMinutes: () => [ 0, 1, 2 ],
          nzDisabledSeconds: () => [ 0, 1 ]
        };
      };
      fixture.detectChanges();
      openPickerByClickTrigger();

      // Open time picker panel
      dispatchMouseEvent(queryFromOverlay('.ant-calendar-time-picker-btn'), 'click');
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      // Left time picker
      expect(queryFromOverlay('.ant-calendar-range-left .ant-calendar-time-picker-select:nth-child(1) li:nth-child(3)').classList.contains('ant-calendar-time-picker-select-option-disabled')).toBeTruthy();
      expect(queryFromOverlay('.ant-calendar-range-left .ant-calendar-time-picker-select:nth-child(2) li:nth-child(2)').classList.contains('ant-calendar-time-picker-select-option-disabled')).toBeTruthy();
      expect(queryFromOverlay('.ant-calendar-range-left .ant-calendar-time-picker-select:nth-child(3) li:nth-child(1)').classList.contains('ant-calendar-time-picker-select-option-disabled')).toBeTruthy();
      // Right time picker
      expect(queryFromOverlay('.ant-calendar-range-right .ant-calendar-time-picker-select:nth-child(1) li:nth-child(4)').classList.contains('ant-calendar-time-picker-select-option-disabled')).toBeTruthy();
      expect(queryFromOverlay('.ant-calendar-range-right .ant-calendar-time-picker-select:nth-child(2) li:nth-child(3)').classList.contains('ant-calendar-time-picker-select-option-disabled')).toBeTruthy();
      expect(queryFromOverlay('.ant-calendar-range-right .ant-calendar-time-picker-select:nth-child(3) li:nth-child(2)').classList.contains('ant-calendar-time-picker-select-option-disabled')).toBeTruthy();

      // Use nzHideDisabledOptions to hide disabled times
      fixtureInstance.nzShowTime = { nzHideDisabledOptions: true };
      fixture.detectChanges();
      // Left time picker
      expect(+queryFromOverlay('.ant-calendar-range-left .ant-calendar-time-picker-select:nth-child(1) li:first-child').textContent.trim()).toBe(3);
      expect(+queryFromOverlay('.ant-calendar-range-left .ant-calendar-time-picker-select:nth-child(2) li:first-child').textContent.trim()).toBe(2);
      expect(+queryFromOverlay('.ant-calendar-range-left .ant-calendar-time-picker-select:nth-child(3) li:first-child').textContent.trim()).toBe(1);
      // Right time picker
      expect(+queryFromOverlay('.ant-calendar-range-right .ant-calendar-time-picker-select:nth-child(1) li:first-child').textContent.trim()).toBe(4);
      expect(+queryFromOverlay('.ant-calendar-range-right .ant-calendar-time-picker-select:nth-child(2) li:first-child').textContent.trim()).toBe(3);
      expect(+queryFromOverlay('.ant-calendar-range-right .ant-calendar-time-picker-select:nth-child(3) li:first-child').textContent.trim()).toBe(2);
    }));

    it('should support nzRenderExtraFooter', fakeAsync(() => {
      fixtureInstance.nzRenderExtraFooter = () => fixtureInstance.tplExtraFooter;
      fixture.detectChanges();

      openPickerByClickTrigger();
      expect(overlayContainerElement.textContent.indexOf('TEST_EXTRA_FOOTER') > -1).toBeTruthy();

      fixtureInstance.nzRenderExtraFooter = 'TEST_EXTRA_FOOTER_STRING';
      fixture.detectChanges();
      expect(overlayContainerElement.textContent.indexOf(fixtureInstance.nzRenderExtraFooter) > -1).toBeTruthy();
    }));

    it('should support nzMode', fakeAsync(() => {
      fixtureInstance.nzMode = [ 'month', 'year' ];
      fixture.detectChanges();
      openPickerByClickTrigger();
      // Left panel
      expect(overlayContainerElement.querySelector('.ant-calendar-range-left .ant-calendar-header .ant-calendar-month-panel')).toBeDefined();
      // Right panel
      expect(overlayContainerElement.querySelector('.ant-calendar-range-right .ant-calendar-header .ant-calendar-year-panel')).toBeDefined();
    }));

    it('should support nzOnPanelChange', fakeAsync(() => {
      spyOn(fixtureInstance, 'nzOnPanelChange');
      fixture.detectChanges();
      openPickerByClickTrigger();

      // Click header to month panel
      // Left
      dispatchMouseEvent(overlayContainerElement.querySelector('.ant-calendar-range-left .ant-calendar-header .ant-calendar-month-select'), 'click');
      fixture.detectChanges();
      // Right
      dispatchMouseEvent(overlayContainerElement.querySelector('.ant-calendar-range-right .ant-calendar-header .ant-calendar-year-select'), 'click');
      fixture.detectChanges();
      expect(fixtureInstance.nzOnPanelChange).toHaveBeenCalledWith([ 'month', 'year' ]);
    }));

    it('should support nzOnOk', fakeAsync(() => {
      spyOn(fixtureInstance, 'nzOnOk');
      fixtureInstance.modelValue = [ new Date('2018-11-11 11:22:33'), new Date('2018-12-12 11:22:33') ];
      fixtureInstance.nzShowTime = true;
      fixture.detectChanges();
      openPickerByClickTrigger();

      // Click ok button
      dispatchMouseEvent(overlayContainerElement.querySelector('.ant-calendar-ok-btn'), 'click');
      fixture.detectChanges();
      tick(500);
      expect(fixtureInstance.nzOnOk).toHaveBeenCalledWith(fixtureInstance.modelValue);
    }));

    it('should select date from start to end with side effects', fakeAsync(() => {
      const initial = fixtureInstance.modelValue = [ new Date('2018-05-15'), new Date('2018-06-15') ];
      fixtureInstance.nzDisabledDate = (current: Date) => differenceInDays(current, initial[0]) < 0;
      fixtureInstance.nzShowTime = true;
      fixture.detectChanges();
      openPickerByClickTrigger();

      // Click start date
      const startDate = queryFromOverlay('.ant-calendar-range-left td.ant-calendar-selected-day');
      dispatchMouseEvent(startDate, 'click');
      fixture.detectChanges();
      expect(startDate.classList.contains('ant-calendar-selected-day')).toBeTruthy();
      expect(queryFromOverlay('.ant-calendar-range-right td.ant-calendar-selected-day')).toBeFalsy(); // End panel should have no one to be selected

      let endDate: HTMLElement;
      // Hover on to the newest end date (the last date of end panel)
      endDate = getLastCell('right');
      const isNextMonthDay = endDate.classList.contains('ant-calendar-next-month-btn-day'); // Is it the date of next month
      dispatchMouseEvent(endDate, 'mouseenter');
      fixture.detectChanges();
      expect(endDate.classList.contains('ant-calendar-selected-end-date')).toBe(!isNextMonthDay); // Show as selected only at current month
      expect(startDate.nextElementSibling.classList.contains('ant-calendar-in-range-cell')).toBeTruthy(); // In range state

      // Click end date to trigger change
      endDate = getLastCell('right'); // Need to retrive due to re-render
      dispatchMouseEvent(endDate, 'click');
      fixture.detectChanges();
      expect(queryFromOverlay('.ant-calendar-range-right .ant-calendar-selected-end-date')).toBeDefined();
    }));

    it('should display expected date when the range values are the same day (include the scenario of timepicker)', fakeAsync(() => {
      fixtureInstance.modelValue = [ new Date('2018-05-15'), new Date('2018-05-15') ];
      fixtureInstance.nzShowTime = true;
      fixture.detectChanges();
      openPickerByClickTrigger();

      expect(queryFromOverlay('.ant-calendar-range-right .ant-calendar-month-select').textContent).toContain('6');

      // Open time picker panel
      dispatchMouseEvent(queryFromOverlay('.ant-calendar-time-picker-btn'), 'click');
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(queryFromOverlay('.ant-calendar-range-right .ant-calendar-month-select').textContent).toContain('5');
    }));

    it('should support nzRanges', fakeAsync(() => {
      const today = new Date();
      fixtureInstance.nzRanges = { 'Today': [ today, today ] };
      fixture.detectChanges();
      openPickerByClickTrigger();
      expect(queryFromOverlay('.ant-calendar-range-quick-selector')).toBeDefined();

      let selector: HTMLElement;

      selector = queryFromOverlay('.ant-calendar-range-quick-selector > a');
      dispatchMouseEvent(selector, 'mouseenter');
      fixture.detectChanges();
      expect(queryFromOverlay('.ant-calendar-range-left td.ant-calendar-selected-day').textContent).toContain(`${today.getDate()}`);

      selector = queryFromOverlay('.ant-calendar-range-quick-selector > a');
      dispatchMouseEvent(selector, 'mouseleave');
      fixture.detectChanges();
      expect(queryFromOverlay('.ant-calendar-range-left td.ant-calendar-selected-day')).toBeFalsy();

      selector = queryFromOverlay('.ant-calendar-range-quick-selector > a');
      dispatchMouseEvent(selector, 'click');
      fixture.detectChanges();
      tick(500);
      expect(queryFromOverlay('.ant-calendar-picker-container')).toBeFalsy();
    }));

    it('should custom input date range', fakeAsync(() => {
      const nzOnChange = spyOn(fixtureInstance, 'modelValueChange');
      fixture.detectChanges();
      openPickerByClickTrigger();
      const leftInput = queryFromOverlay('.ant-calendar-range-left input.ant-calendar-input') as HTMLInputElement;
      const rightInput = queryFromOverlay('.ant-calendar-range-right input.ant-calendar-input') as HTMLInputElement;

      leftInput.value = '2018-11-11';
      leftInput.dispatchEvent(new KeyboardEvent('keyup'));
      fixture.detectChanges();
      rightInput.value = '2018-12-12';
      rightInput.dispatchEvent(new KeyboardEvent('keyup'));
      fixture.detectChanges();
      tick(500);
      expect(nzOnChange).toHaveBeenCalled();
      const result = nzOnChange.calls.allArgs()[0][0];
      expect(result[0].getDate()).toBe(11);
      expect(result[1].getDate()).toBe(12);
    }));

  }); // /specified date picker testing

  describe('ngModel value accesors', () => {
    beforeEach(() => fixtureInstance.useSuite = 3);

    it('should specified date provide by "modelValue" be choosed', fakeAsync(() => {
      fixtureInstance.modelValue = [ new Date('2018-11-11'), new Date('2018-12-12') ];
      fixture.detectChanges();
      tick(); // Wait writeValue() tobe done
      fixture.detectChanges();
      expect(getFirstSelectedDayCell().textContent.trim()).toBe('11');

      // Click the first cell to change ngModel
      const left = getFirstCell('left');
      const leftText = left.textContent.trim();
      dispatchMouseEvent(left, 'click');
      fixture.detectChanges();
      const right = getFirstCell('right');
      const rightText = right.textContent.trim();
      dispatchMouseEvent(right, 'click');
      fixture.detectChanges();
      expect(fixtureInstance.modelValue[0].getDate()).toBe(+leftText);
      expect(fixtureInstance.modelValue[1].getDate()).toBe(+rightText);
    }));
  });

  ////////////

  function getPicker(): HTMLElement {
    return debugElement.query(By.css('nz-picker .ant-calendar-picker')).nativeElement as HTMLElement;
  }

  function getPickerTrigger(): HTMLElement {
    return debugElement.query(By.css('nz-picker .ant-calendar-picker-input')).nativeElement as HTMLElement;
  }

  function getPickerContainer(): HTMLElement {
    return queryFromOverlay('.ant-calendar-picker-container') as HTMLElement;
  }

  function getFirstSelectedDayCell(): HTMLElement {
    return queryFromOverlay('tbody.ant-calendar-tbody td.ant-calendar-selected-day') as HTMLElement;
  }

  function getFirstCell(partial: 'left' | 'right'): HTMLElement {
    return queryFromOverlay(`.ant-calendar-range-${partial} tbody.ant-calendar-tbody td.ant-calendar-cell`) as HTMLElement;
  }

  function getLastCell(partial: 'left' | 'right'): HTMLElement {
    const allCells = overlayContainerElement.querySelectorAll(`.ant-calendar-range-${partial} td.ant-calendar-cell`);
    return allCells[ allCells.length - 1 ] as HTMLElement;
  }

  function queryFromOverlay(selector: string): HTMLElement {
    return overlayContainerElement.querySelector(selector) as HTMLElement;
  }

  function openPickerByClickTrigger(): void {
    dispatchMouseEvent(getPickerTrigger(), 'click');
    fixture.detectChanges();
    tick(500);
    fixture.detectChanges();
  }
});

@Component({
  template: `
    <ng-container [ngSwitch]="useSuite">
      <!-- Suite 1 -->
      <nz-range-picker *ngSwitchCase="1"
        [nzAllowClear]="nzAllowClear"
        [nzAutoFocus]="nzAutoFocus"
        [nzDisabled]="nzDisabled"
        [nzClassName]="nzClassName"
        [nzDisabledDate]="nzDisabledDate"
        [nzLocale]="nzLocale"
        [nzPlaceHolder]="nzPlaceHolder"
        [nzPopupStyle]="nzPopupStyle"
        [nzDropdownClassName]="nzDropdownClassName"
        [nzSize]="nzSize"
        [nzStyle]="nzStyle"
        (nzOnOpenChange)="nzOnOpenChange($event)"
        [(ngModel)]="modelValue"
        (ngModelChange)="modelValueChange($event)"

        [nzDateRender]="nzDateRender"
        [nzDisabledTime]="nzDisabledTime"
        [nzRenderExtraFooter]="nzRenderExtraFooter"
        [nzShowToday]="nzShowToday"
        [nzMode]="nzMode"
        [nzRanges]="nzRanges"
        (nzOnPanelChange)="nzOnPanelChange($event)"
        [nzShowTime]="nzShowTime"
        (nzOnOk)="nzOnOk($event)"
      ></nz-range-picker>
      <ng-template #tplDateRender let-current>
        <div [class.test-first-day]="current.getDate() === 1">{{ current.getDate() }}</div>
      </ng-template>
      <ng-template #tplExtraFooter>
        TEST_EXTRA_FOOTER
      </ng-template>

      <!-- Suite 2 -->
      <!-- use another picker to avoid nzOpen's side-effects beacuse nzOpen act as "true" if used -->
      <nz-range-picker *ngSwitchCase="2" [nzOpen]="nzOpen"></nz-range-picker>

      <!-- Suite 3 -->
      <nz-range-picker *ngSwitchCase="3" nzOpen [(ngModel)]="modelValue"></nz-range-picker>
    </ng-container>
  `
})
class NzTestRangePickerComponent {
  useSuite: 1 | 2 | 3;
  @ViewChild('tplDateRender') tplDateRender: TemplateRef<Date>;
  @ViewChild('tplExtraFooter') tplExtraFooter: TemplateRef<void>;

  // --- Suite 1
  nzAllowClear;
  nzAutoFocus;
  nzDisabled;
  nzClassName;
  nzDisabledDate;
  nzLocale;
  nzPlaceHolder;
  nzPopupStyle;
  nzDropdownClassName;
  nzSize;
  nzStyle;
  nzOnOpenChange(open: boolean): void { }
  modelValue;
  modelValueChange(d: Date): void { }

  nzDateRender;
  nzShowTime: boolean | object = false;
  nzDisabledTime;
  nzRenderExtraFooter;
  nzShowToday = false;
  nzMode;
  nzRanges;
  nzOnPanelChange(): void {}
  nzOnOk(): void {}

  // --- Suite 2
  nzOpen;
}
