import { ESCAPE } from '@angular/cdk/keycodes';
import { OverlayContainer } from '@angular/cdk/overlay';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { Component, DebugElement, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, inject, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import differenceInDays from 'date-fns/differenceInDays';
import isSameDay from 'date-fns/isSameDay';

import { dispatchKeyboardEvent, dispatchMouseEvent, typeInElement } from 'ng-zorro-antd/core/testing';
import { CandyDate } from 'ng-zorro-antd/core/time';
import { NgStyleInterface } from 'ng-zorro-antd/core/types';
import { RangePartType } from 'ng-zorro-antd/date-picker/standard-types';
import { getPicker, getPickerAbstract, getPickerInput, getRangePickerRightInput } from 'ng-zorro-antd/date-picker/testing/util';
import { PREFIX_CLASS } from 'ng-zorro-antd/date-picker/util';
import { NzDatePickerModule } from './date-picker.module';

registerLocaleData(zh);

describe('NzRangePickerComponent', () => {
  let fixture: ComponentFixture<NzTestRangePickerComponent>;
  let fixtureInstance: NzTestRangePickerComponent;
  let debugElement: DebugElement;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, NoopAnimationsModule, NzDatePickerModule],
      providers: [],
      declarations: [NzTestRangePickerComponent]
    });

    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NzTestRangePickerComponent);
    fixtureInstance = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  beforeEach(inject([OverlayContainer], (oc: OverlayContainer) => {
    overlayContainer = oc;
    overlayContainerElement = oc.getContainerElement();
  }));

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  describe('general api testing', () => {
    beforeEach(() => (fixtureInstance.useSuite = 1));

    it('should open by click and close by click at outside', fakeAsync(() => {
      fixture.detectChanges();
      openPickerByClickTrigger();
      expect(getPickerContainer()).not.toBeNull();

      dispatchMouseEvent(queryFromOverlay('.cdk-overlay-backdrop'), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(getPickerContainer()).toBeNull();
    }));

    it('should focus on the trigger after a click outside', fakeAsync(() => {
      fixture.detectChanges();
      openPickerByClickTrigger();

      dispatchMouseEvent(queryFromOverlay('.cdk-overlay-backdrop'), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(getPickerInput(fixture.debugElement).matches(':focus-within')).toBeTruthy();
    }));

    it('should open on enter', fakeAsync(() => {
      fixture.detectChanges();
      getPickerInput(fixture.debugElement).dispatchEvent(new KeyboardEvent('keyup', { key: 'enter' }));
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(getPickerContainer()).not.toBeNull();
    }));

    it('should support nzAllowClear and work properly', fakeAsync(() => {
      const clearBtnSelector = By.css(`.${PREFIX_CLASS}-clear`);
      const initial = (fixtureInstance.modelValue = [new Date(), new Date()]);
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

    it('should support nzAutoFocus', fakeAsync(() => {
      fixtureInstance.nzAutoFocus = true;
      fixture.detectChanges();
      expect(getPickerInput(fixture.debugElement) === document.activeElement).toBeTruthy();
    }));

    it('should support nzDisabled', fakeAsync(() => {
      // Make sure picker clear button shown up
      fixtureInstance.nzAllowClear = true;
      fixtureInstance.modelValue = [new Date(), new Date()];

      fixtureInstance.nzDisabled = true;
      fixture.detectChanges();
      expect(debugElement.query(By.css('.ant-picker-disabled'))).not.toBeNull();
      expect(debugElement.query(By.css('.ant-picker-clear'))).toBeNull();

      fixtureInstance.nzDisabled = false;
      tick();
      fixture.detectChanges();
      expect(debugElement.query(By.css('.ant-picker-disabled'))).toBeNull();
      expect(debugElement.query(By.css('.ant-picker-clear'))).not.toBeNull();
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
      const className = (fixtureInstance.nzClassName = 'my-test-class');
      fixture.detectChanges();
      expect(getPicker(fixture.debugElement).classList.contains(className)).toBeTruthy();
    });

    it('should support nzDisabledDate', fakeAsync(() => {
      fixture.detectChanges();
      const compareDate = new Date('2018-11-15 00:00:00');
      fixtureInstance.modelValue = [new Date('2018-11-11 12:12:12'), null];
      fixtureInstance.nzDisabledDate = (current: Date) => isSameDay(current, compareDate);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      openPickerByClickTrigger();
      const disabledCell = queryFromOverlay('td.ant-picker-cell-disabled .ant-picker-cell-inner');
      expect(disabledCell.textContent!.trim()).toBe('15');
    }));

    it('should support nzLocale', () => {
      const featureKey = 'LEFT_PLACEHOLDER';
      fixtureInstance.nzLocale = { lang: { rangePlaceholder: [featureKey, 'End'] } };
      fixture.detectChanges();
      expect(getPickerInput(fixture.debugElement).getAttribute('placeholder')).toBe(featureKey);
    });

    it('should support nzPlaceHolder', () => {
      const featureKey = 'RIGHT_PLACEHOLDER';
      fixtureInstance.nzPlaceHolder = ['Start', featureKey];
      fixture.detectChanges();
      expect(getRangePickerRightInput(fixture.debugElement).getAttribute('placeholder')).toBe(featureKey);
    });

    it('should support nzPopupStyle', fakeAsync(() => {
      fixtureInstance.nzPopupStyle = { color: 'red' };
      fixture.detectChanges();
      openPickerByClickTrigger();
      expect(queryFromOverlay(`.${PREFIX_CLASS}-dropdown`).style.color).toBe('red');
    }));

    it('should support nzDropdownClassName', fakeAsync(() => {
      const keyCls = (fixtureInstance.nzDropdownClassName = 'my-test-class');
      fixture.detectChanges();
      openPickerByClickTrigger();
      expect(queryFromOverlay(`.${PREFIX_CLASS}-dropdown`).classList.contains(keyCls)).toBeTruthy();
    }));

    it('should support nzSize', () => {
      fixtureInstance.nzSize = 'large';
      fixture.detectChanges();
      expect(getPickerAbstract(fixture.debugElement).classList.contains('ant-picker-large')).toBeTruthy();

      fixtureInstance.nzSize = 'small';
      fixture.detectChanges();
      expect(getPickerAbstract(fixture.debugElement).classList.contains('ant-picker-small')).toBeTruthy();
    });

    it('should support nzStyle', () => {
      fixtureInstance.nzStyle = { color: 'blue' };
      fixture.detectChanges();
      expect(getPicker(fixture.debugElement).style.color).toBe('blue');
    });

    it('should support nzOnOpenChange', fakeAsync(() => {
      const nzOnOpenChange = spyOn(fixtureInstance, 'nzOnOpenChange');
      fixture.detectChanges();
      openPickerByClickTrigger();
      expect(nzOnOpenChange).toHaveBeenCalledWith(true);

      dispatchMouseEvent(queryFromOverlay('.cdk-overlay-backdrop'), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(nzOnOpenChange).toHaveBeenCalledWith(false);
      expect(nzOnOpenChange).toHaveBeenCalledTimes(2);
    }));

    it('should support nzValue', fakeAsync(() => {
      fixtureInstance.nzDefaultPickerValue = [new Date('2012-03-18'), new Date('2019-12-12')];
      fixtureInstance.modelValue = [new Date('2018-11-11'), new Date('2018-12-11')];
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      openPickerByClickTrigger();
      expect(getFirstSelectedDayCell().textContent!.trim()).toBe('11');
    }));

    it('should support nzDefaultPickerValue', fakeAsync(() => {
      fixtureInstance.nzDefaultPickerValue = [new Date('2012-01-18'), new Date('2019-11-11')];
      fixture.detectChanges();
      openPickerByClickTrigger();
      expect(queryFromOverlay('.ant-picker-panel .ant-picker-header-month-btn').textContent!.indexOf('1') > -1).toBeTruthy();
      expect(queryFromOverlay('.ant-picker-panel:last-child .ant-picker-header-month-btn').textContent!.indexOf('11') > -1).toBeTruthy();
    }));

    it('should support nzSeparator', fakeAsync(() => {
      fixtureInstance.nzSeparator = '→';
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css(`.ant-picker-range-separator`)).nativeElement.textContent.trim()).toBe('→');
    }));

    it('should support nzOnCalendarChange', fakeAsync(() => {
      const nzOnCalendarChange = spyOn(fixtureInstance, 'nzOnCalendarChange');
      fixture.detectChanges();
      openPickerByClickTrigger();
      const left = getFirstCell('left');
      const leftText = left.textContent!.trim();
      dispatchMouseEvent(left, 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(nzOnCalendarChange).toHaveBeenCalled();
      let result = (nzOnCalendarChange.calls.allArgs()[0] as Date[][])[0];
      expect((result[0] as Date).getDate()).toBe(+leftText);
      const right = getFirstCell('right');
      const rightText = right.textContent!.trim();
      dispatchMouseEvent(right, 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(nzOnCalendarChange).toHaveBeenCalled();
      result = (nzOnCalendarChange.calls.allArgs()[1] as Date[][])[0];
      expect((result[0] as Date).getDate()).toBe(+leftText);
      expect((result[1] as Date).getDate()).toBe(+rightText);
    }));

    it('should support nzOnChange', fakeAsync(() => {
      fixtureInstance.modelValue = [new Date('2018-11-11'), new Date('2018-11-11')];
      const nzOnChange = spyOn(fixtureInstance, 'modelValueChange');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      openPickerByClickTrigger();

      const left = getFirstCell('left'); // Use the first cell
      const leftText = left.textContent!.trim();
      dispatchMouseEvent(left, 'click');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(nzOnChange).toHaveBeenCalled();
      const result = (nzOnChange.calls.allArgs()[0] as Date[][])[0];
      expect((result[0] as Date).getDate()).toBe(+leftText);
    }));
  }); // /general api testing

  describe('panel switch and move forward/afterward', () => {
    beforeEach(() => (fixtureInstance.useSuite = 1));

    it('should support date panel changes', fakeAsync(() => {
      fixtureInstance.modelValue = [new Date('2018-6-11'), new Date('2018-12-12')];
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      openPickerByClickTrigger();
      // Click previous year button
      dispatchMouseEvent(getSuperPreBtn('left'), 'click');
      fixture.detectChanges();
      expect(getHeaderYearBtn('left').textContent!.indexOf('2017') > -1).toBeTruthy();
      // Click next year button * 2
      dispatchMouseEvent(getSuperNextBtn('left'), 'click');
      fixture.detectChanges();
      dispatchMouseEvent(getSuperNextBtn('left'), 'click');
      fixture.detectChanges();
      expect(getHeaderYearBtn('left').textContent!.indexOf('2019') > -1).toBeTruthy();
      // Click previous month button
      dispatchMouseEvent(getPreBtn('left'), 'click');
      fixture.detectChanges();
      expect(queryFromOverlay('.ant-picker-panel .ant-picker-header-month-btn').textContent!.indexOf('5') > -1).toBeTruthy();
      // Click next month button * 2
      dispatchMouseEvent(getNextBtn('left'), 'click');
      fixture.detectChanges();
      dispatchMouseEvent(getNextBtn('left'), 'click');
      fixture.detectChanges();
      expect(queryFromOverlay('.ant-picker-panel .ant-picker-header-month-btn').textContent!.indexOf('7') > -1).toBeTruthy();
    }));

    it('should support keep initValue when reopen panel', fakeAsync(() => {
      fixtureInstance.modelValue = [new Date('2018-6-11'), new Date('2018-12-12')];
      fixture.detectChanges();
      openPickerByClickTrigger();
      // Click next year button * 2
      dispatchMouseEvent(getSuperNextBtn('left'), 'click');
      fixture.detectChanges();
      dispatchMouseEvent(getSuperNextBtn('left'), 'click');
      fixture.detectChanges();

      dispatchMouseEvent(queryFromOverlay('.cdk-overlay-backdrop'), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();

      openPickerByClickTrigger();
      expect(getHeaderYearBtn('left').textContent!.indexOf('2018') > -1).toBeTruthy();
    }));
  }); // /panel switch and move forward/afterward

  describe('specified date picker testing', () => {
    beforeEach(() => (fixtureInstance.useSuite = 1));

    it('should support nzDateRender', fakeAsync(() => {
      fixtureInstance.nzDateRender = fixtureInstance.tplDateRender;
      fixture.detectChanges();
      openPickerByClickTrigger();
      expect(queryFromOverlay('.test-first-day').textContent!.trim()).toBe('1');
    }));

    it('should support nzDateRender with typeof function', fakeAsync(() => {
      const featureKey = 'TEST_FIRST_DAY';
      fixtureInstance.nzDateRender = (d: CandyDate) => (d.getDate() === 1 ? featureKey : d.getDate());
      fixture.detectChanges();
      openPickerByClickTrigger();
      expect(overlayContainerElement.textContent!.indexOf(featureKey) > -1).toBeTruthy();
    }));

    it('should support nzShowTime', fakeAsync(() => {
      fixtureInstance.modelValue = [new Date('2018-11-11 11:22:33'), new Date('2018-12-12 11:22:33')];
      fixtureInstance.nzShowTime = true;
      fixture.detectChanges();
      openPickerByClickTrigger();
      flush();
      fixture.detectChanges();
      expect(queryFromOverlay('.ant-picker-ok')).toBeDefined();
      expect(queryFromOverlay('.ant-picker-panel .ant-picker-time-picker-inner.ant-picker-time-picker-column-3')).toBeDefined();
      expect(
        queryFromOverlay('.ant-picker-panel .ant-picker-time-panel-cell-selected .ant-picker-time-panel-cell-inner').textContent!.trim()
      ).toBe('11');

      // Click to choose a hour
      dispatchMouseEvent(queryFromOverlay('.ant-picker-time-panel-column .ant-picker-time-panel-cell:first-child'), 'click');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(getPickerInput(fixture.debugElement).value).toBe('2018-11-11 00:22:33');
    }));

    it('should support hover date cell style', fakeAsync(() => {
      fixture.detectChanges();
      openPickerByClickTrigger();

      const left = getFirstCell('left'); // Use the first cell
      dispatchMouseEvent(left, 'click');
      fixture.detectChanges();
      const rightInNextMonth = queryFromOverlay('.ant-picker-panel:last-child table tr:nth-child(3) td.ant-picker-cell');
      dispatchMouseEvent(rightInNextMonth, 'mouseenter');
      fixture.detectChanges();
      expect(rightInNextMonth.classList.contains('ant-picker-cell-range-hover-end')).toBeTruthy();
    }));

    it('should support active part change when select one', fakeAsync(() => {
      fixture.detectChanges();
      openPickerByClickTrigger();
      flush();
      fixture.detectChanges();
      // Choose left part first
      dispatchMouseEvent(getFirstCell('left'), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(getRangePickerRightInput(fixture.debugElement) === document.activeElement).toBeTruthy();

      dispatchMouseEvent(queryFromOverlay('.cdk-overlay-backdrop'), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();

      // Choose right part first
      openRightPickerByClickTrigger();
      flush();
      fixture.detectChanges();
      dispatchMouseEvent(getFirstCell('right'), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(getPickerInput(fixture.debugElement) === document.activeElement).toBeTruthy();
    }));

    it('should support select end date first with time panel', fakeAsync(() => {
      fixtureInstance.nzShowTime = true;
      fixture.detectChanges();
      openRightPickerByClickTrigger();
      flush();
      fixture.detectChanges();
      const okButton = queryFromOverlay('.ant-picker-ok > button');
      expect(okButton.getAttribute('disabled')).not.toBeNull();

      // Click to choose a hour
      dispatchMouseEvent(queryFromOverlay('.ant-picker-time-panel-column .ant-picker-time-panel-cell:first-child'), 'click');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(okButton.getAttribute('disabled')).toBeNull();

      dispatchMouseEvent(okButton, 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(getPickerInput(fixture.debugElement) === document.activeElement).toBeTruthy();
    }));

    it('should support nzShowTime.nzFormat', fakeAsync(() => {
      fixtureInstance.modelValue = [new Date('2018-11-11'), new Date('2018-12-12')];
      fixtureInstance.nzShowTime = { nzFormat: 'HH:mm' };
      fixture.detectChanges();
      openPickerByClickTrigger();
      expect(overlayContainerElement.querySelectorAll('.ant-picker-time-panel-column').length).toBe(2);
    }));

    it('should support nzDisabledTime and nzShowTime.nzHideDisabledOptions', fakeAsync(() => {
      fixtureInstance.modelValue = [new Date('2018-11-11 11:11:11'), new Date('2018-12-12 12:12:12')];
      fixtureInstance.nzShowTime = true;
      fixtureInstance.nzDisabledTime = (_current: Date, partial: 'start' | 'end') => {
        return partial === 'start'
          ? {
              nzDisabledHours: () => [0, 1, 2],
              nzDisabledMinutes: () => [0, 1],
              nzDisabledSeconds: () => [0]
            }
          : {
              nzDisabledHours: () => [0, 1, 2, 3],
              nzDisabledMinutes: () => [0, 1, 2],
              nzDisabledSeconds: () => [0, 1]
            };
      };
      fixture.detectChanges();
      openPickerByClickTrigger();
      // Left time picker
      expect(
        queryFromOverlay('.ant-picker-time-panel-column li:nth-child(3)').classList.contains('ant-picker-time-panel-cell-disabled')
      ).toBeTruthy();
      expect(
        queryFromOverlay('.ant-picker-time-panel-column:nth-child(2) li:nth-child(2)').classList.contains(
          'ant-picker-time-panel-cell-disabled'
        )
      ).toBeTruthy();
      expect(
        queryFromOverlay('.ant-picker-time-panel-column:nth-child(3) li:nth-child(1)').classList.contains(
          'ant-picker-time-panel-cell-disabled'
        )
      ).toBeTruthy();

      // Close left panel
      dispatchMouseEvent(queryFromOverlay('.cdk-overlay-backdrop'), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();

      // Right time picker
      openRightPickerByClickTrigger();
      expect(
        queryFromOverlay('.ant-picker-time-panel-column li:nth-child(4)').classList.contains('ant-picker-time-panel-cell-disabled')
      ).toBeTruthy();
      expect(
        queryFromOverlay('.ant-picker-time-panel-column:nth-child(2) li:nth-child(3)').classList.contains(
          'ant-picker-time-panel-cell-disabled'
        )
      ).toBeTruthy();
      expect(
        queryFromOverlay('.ant-picker-time-panel-column:nth-child(3) li:nth-child(2)').classList.contains(
          'ant-picker-time-panel-cell-disabled'
        )
      ).toBeTruthy();

      // Use nzHideDisabledOptions to hide disabled times
      fixtureInstance.nzShowTime = { nzHideDisabledOptions: true };
      fixture.detectChanges();

      // Close left panel
      dispatchMouseEvent(queryFromOverlay('.cdk-overlay-backdrop'), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      openPickerByClickTrigger();
      // Left time picker
      expect(+queryFromOverlay('.ant-picker-time-panel-column:nth-child(1) li:first-child').textContent!.trim()).toBe(3);
      expect(+queryFromOverlay('.ant-picker-time-panel-column:nth-child(2) li:first-child').textContent!.trim()).toBe(2);
      expect(+queryFromOverlay('.ant-picker-time-panel-column:nth-child(3) li:first-child').textContent!.trim()).toBe(1);

      // Close left panel
      dispatchMouseEvent(queryFromOverlay('.cdk-overlay-backdrop'), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      openRightPickerByClickTrigger();
      // Right time picker
      expect(+queryFromOverlay('.ant-picker-time-panel-column:nth-child(1) li:first-child').textContent!.trim()).toBe(4);
      expect(+queryFromOverlay('.ant-picker-time-panel-column:nth-child(2) li:first-child').textContent!.trim()).toBe(3);
      expect(+queryFromOverlay('.ant-picker-time-panel-column:nth-child(3) li:first-child').textContent!.trim()).toBe(2);
    }));

    it('should focus to invalid input when sorted', fakeAsync(() => {
      const nzOnChange = spyOn(fixtureInstance, 'modelValueChange');
      fixtureInstance.modelValue = [new Date('2018-11-11 01:00:00'), new Date('2018-12-12 00:00:00')];
      fixtureInstance.nzShowTime = true;
      fixtureInstance.nzDisabledTime = (_current: Date, partial: 'start' | 'end') => {
        return partial === 'start'
          ? {
              nzDisabledHours: () => [0]
            }
          : {
              nzDisabledHours: () => [1]
            };
      };
      fixture.detectChanges();
      openPickerByClickTrigger();

      const leftInput = getPickerInput(fixture.debugElement);
      const rightInput = getRangePickerRightInput(fixture.debugElement);
      const okButton = queryFromOverlay('.ant-picker-ok > button');
      // will sort value
      typeInElement('2019-11-11 01:00:00', leftInput);
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(leftInput.value.trim()).toBe('2018-12-12 00:00:00');
      expect(okButton.getAttribute('disabled')).not.toBe(null);

      const newValidDateString = ['2018-12-12 01:00:00', '2019-11-11 00:00:00'];
      typeInElement(newValidDateString[0], leftInput);
      fixture.detectChanges();
      dispatchMouseEvent(okButton, 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(rightInput === document.activeElement).toBe(true);

      typeInElement(newValidDateString[1], rightInput);
      fixture.detectChanges();
      dispatchMouseEvent(okButton, 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(nzOnChange).toHaveBeenCalledWith([new Date(newValidDateString[0]), new Date(newValidDateString[1])]);
    }));

    it('should support nzRenderExtraFooter', fakeAsync(() => {
      fixtureInstance.nzRenderExtraFooter = () => fixtureInstance.tplExtraFooter;
      fixture.detectChanges();

      openPickerByClickTrigger();
      expect(overlayContainerElement.textContent!.indexOf('TEST_EXTRA_FOOTER') > -1).toBeTruthy();

      fixtureInstance.nzRenderExtraFooter = 'TEST_EXTRA_FOOTER_STRING';
      fixture.detectChanges();
      expect(overlayContainerElement.textContent!.indexOf(fixtureInstance.nzRenderExtraFooter) > -1).toBeTruthy();
    }));

    it('should support nzMode', fakeAsync(() => {
      fixtureInstance.nzMode = ['month', 'year'];
      fixture.detectChanges();
      openPickerByClickTrigger();
      // Left panel
      expect(overlayContainerElement.querySelector('.ant-picker-panel .ant-picker-header .ant-picker-month-panel')).toBeDefined();
      // Right panel
      expect(overlayContainerElement.querySelector('.ant-picker-panel:last-child .ant-picker-header .ant-picker-year-panel')).toBeDefined();
    }));

    it('should support nzOnPanelChange', fakeAsync(() => {
      spyOn(fixtureInstance, 'nzOnPanelChange');
      fixture.detectChanges();
      openPickerByClickTrigger();

      // Click header to month panel
      // Left
      dispatchMouseEvent(overlayContainerElement.querySelector('.ant-picker-panel .ant-picker-header-month-btn')!, 'click');
      fixture.detectChanges();
      // Right
      dispatchMouseEvent(overlayContainerElement.querySelector('.ant-picker-panel:last-child .ant-picker-header-year-btn')!, 'click');
      fixture.detectChanges();
      expect(fixtureInstance.nzOnPanelChange).toHaveBeenCalledWith(['month', 'year']);
    }));

    it('should support nzOnOk', fakeAsync(() => {
      spyOn(fixtureInstance, 'nzOnOk');
      fixtureInstance.modelValue = [new Date('2018-11-11 11:22:33'), new Date('2018-12-12 11:22:33')];
      fixtureInstance.nzShowTime = true;
      fixture.detectChanges();
      openPickerByClickTrigger();

      // Click ok button
      dispatchMouseEvent(overlayContainerElement.querySelector('.ant-picker-ok > button')!, 'click');
      fixture.detectChanges();
      tick(500);
      expect(fixtureInstance.nzOnOk).toHaveBeenCalledWith(fixtureInstance.modelValue);
    }));

    it('should select date from start to end with side effects', fakeAsync(() => {
      const initial = (fixtureInstance.modelValue = [new Date('2018-05-15'), new Date('2018-06-15')]);
      fixtureInstance.nzDisabledDate = (current: Date) => differenceInDays(current, initial[0]) < 0;
      fixtureInstance.nzShowTime = true;
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      openPickerByClickTrigger();

      // Click start date
      const startDate = queryFromOverlay('.ant-picker-panel td.ant-picker-cell-selected');
      dispatchMouseEvent(startDate, 'click');
      fixture.detectChanges();
      expect(startDate.classList.contains('ant-picker-cell-selected')).toBeTruthy();
      expect(queryFromOverlay('.ant-picker-panel:last-child td.ant-picker-cell-selected')).toBeFalsy(); // End panel should have no one to be selected
    }));

    it('should display expected date when the range values are the same day (include the scenario of timepicker)', fakeAsync(() => {
      fixtureInstance.modelValue = [new Date('2018-05-15'), new Date('2018-05-15')];
      fixtureInstance.nzShowTime = true;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      openPickerByClickTrigger();

      expect(queryFromOverlay('.ant-picker-panel .ant-picker-header-month-btn').textContent).toContain('5');
    }));

    it('should support nzRanges', fakeAsync(() => {
      const today = new Date();
      const nzOnChange = spyOn(fixtureInstance, 'modelValueChange');
      fixtureInstance.nzRanges = { Today: [today, today] };
      fixture.detectChanges();
      openPickerByClickTrigger();
      expect(queryFromOverlay('.ant-picker-ranges .ant-picker-preset')).toBeDefined();

      let selector: HTMLElement;

      selector = queryFromOverlay('.ant-picker-ranges li.ant-picker-preset:first-child');
      dispatchMouseEvent(selector, 'mouseenter');
      fixture.detectChanges();
      expect(queryFromOverlay('.ant-picker-panel td.ant-picker-cell-range-hover-start .ant-picker-cell-inner').textContent).toContain(
        `${today.getDate()}`
      );

      // selector = queryFromOverlay('.ant-picker-ranges li.ant-picker-preset:first-child');
      dispatchMouseEvent(selector, 'mouseleave');
      tick(500);
      fixture.detectChanges();
      expect(queryFromOverlay('.ant-picker-panel td.ant-picker-cell-selected')).toBeFalsy();

      // selector = queryFromOverlay('.ant-picker-range-quick-selector > a');
      dispatchMouseEvent(selector, 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(nzOnChange).toHaveBeenCalled();
      expect(getPickerContainer()).toBeFalsy();
    }));

    it('should custom input date range', fakeAsync(() => {
      const nzOnChange = spyOn(fixtureInstance, 'modelValueChange');
      fixture.detectChanges();
      openPickerByClickTrigger();
      const leftInput = getPickerInput(fixture.debugElement);
      const rightInput = getRangePickerRightInput(fixture.debugElement);

      typeInElement('2018-11-11', leftInput);
      fixture.detectChanges();

      // should focus the other input
      leftInput.dispatchEvent(new KeyboardEvent('keyup', { key: 'enter' }));
      fixture.detectChanges();
      expect(getRangePickerRightInput(fixture.debugElement) === document.activeElement).toBeTruthy();

      typeInElement('2018-12-12', rightInput);
      rightInput.dispatchEvent(new KeyboardEvent('keyup', { key: 'enter' }));
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(nzOnChange).toHaveBeenCalled();
      const result = (nzOnChange.calls.allArgs()[0] as Date[][])[0];
      expect(result[0].getDate()).toBe(11);
      expect(result[1].getDate()).toBe(12);
    }));

    it('should custom input time range', fakeAsync(() => {
      const nzOnChange = spyOn(fixtureInstance, 'modelValueChange');
      fixtureInstance.modelValue = [new Date('2019-11-11 11:22:33'), new Date('2019-12-12 11:22:33')];
      fixtureInstance.nzShowTime = true;
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      openPickerByClickTrigger();

      const leftInput = getPickerInput(fixture.debugElement);
      const rightInput = getRangePickerRightInput(fixture.debugElement);
      const newDateString = ['2019-09-15 11:08:22', '2020-10-10 11:08:22'];
      typeInElement(newDateString[0], leftInput);
      fixture.detectChanges();
      typeInElement(newDateString[1], rightInput);
      fixture.detectChanges();
      rightInput.dispatchEvent(new KeyboardEvent('keyup', { key: 'enter' }));
      fixture.detectChanges();
      tick(500);
      expect(nzOnChange).toHaveBeenCalledWith([new Date(newDateString[0]), new Date(newDateString[1])]);
    }));

    it('should not change value when click ESC', fakeAsync(() => {
      fixtureInstance.modelValue = [new Date('2018-09-11'), new Date('2020-09-12')];
      fixture.detectChanges();
      tick(); // Wait writeValue() tobe done
      fixture.detectChanges();
      openPickerByClickTrigger();
      const leftInput = getPickerInput(fixture.debugElement);
      const rightInput = getRangePickerRightInput(fixture.debugElement);

      typeInElement('2019-11-05', leftInput);
      fixture.detectChanges();
      // TODO: value should be change
      // expect(getFirstSelectedDayCell().textContent!.trim()).toBe('5');
      typeInElement('2019-12-08', rightInput);
      fixture.detectChanges();
      // expect(getSecondSelectedDayCell().textContent!.trim()).toBe('8');
      dispatchKeyboardEvent(document.body, 'keydown', ESCAPE);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.cdk-overlay-backdrop')).toBeNull();
      // TODO: input value should not be change
      // expect(leftInput.value).toBe('2018-09-11');
    }));

    it('should auto sort range value when start is after end', fakeAsync(() => {
      fixture.detectChanges();
      openPickerByClickTrigger();
      const leftInput = getPickerInput(fixture.debugElement);
      const rightInput = getRangePickerRightInput(fixture.debugElement);
      typeInElement('2019-08-10', leftInput);
      fixture.detectChanges();
      typeInElement('2018-02-06', rightInput);
      fixture.detectChanges();
      getPickerInput(fixture.debugElement).dispatchEvent(new KeyboardEvent('keyup', { key: 'enter' }));
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(leftInput.value).toBe('2018-02-06');
      expect(rightInput.value).toBe('2019-08-10');
    }));
  }); // /specified date picker testing

  describe('ngModel value accesors', () => {
    beforeEach(() => (fixtureInstance.useSuite = 3));

    it('should specified date provide by "modelValue" be choosed', fakeAsync(() => {
      fixtureInstance.modelValue = [new Date('2018-11-11'), new Date('2018-12-12')];
      fixture.detectChanges();
      tick(); // Wait writeValue() tobe done
      fixture.detectChanges();
      expect(getFirstSelectedDayCell().textContent!.trim()).toBe('11');

      // Click the first cell to change ngModel
      const left = getFirstCell('left');
      const leftText = left.textContent!.trim();
      dispatchMouseEvent(left, 'click');
      fixture.detectChanges();
      expect(fixtureInstance.modelValue[0]!.getDate()).toBe(+leftText);
    }));
  });

  ////////////

  function getCssIndex(part: RangePartType): string {
    return part === 'left' ? 'first-child' : 'last-child';
  }

  function getPickerContainer(): HTMLElement {
    return queryFromOverlay('.ant-picker-panel-container') as HTMLElement;
  }

  function getFirstSelectedDayCell(): HTMLElement {
    return queryFromOverlay('.ant-picker-panel:first-child td.ant-picker-cell-selected .ant-picker-cell-inner') as HTMLElement;
  }

  // function getSecondSelectedDayCell(): HTMLElement {
  //   return queryFromOverlay('.ant-picker-panel:last-child td.ant-picker-cell-selected .ant-picker-cell-inner') as HTMLElement;
  // }

  function getPreBtn(part: RangePartType): HTMLElement {
    return queryFromOverlay(`.ant-picker-panel:${getCssIndex(part)} .${PREFIX_CLASS}-header-prev-btn`);
  }

  function getNextBtn(part: RangePartType): HTMLElement {
    return queryFromOverlay(`.ant-picker-panel:${getCssIndex(part)} .${PREFIX_CLASS}-header-next-btn`);
  }

  function getSuperPreBtn(part: RangePartType): HTMLElement {
    return queryFromOverlay(`.ant-picker-panel:${getCssIndex(part)} .${PREFIX_CLASS}-header-super-prev-btn`);
  }

  function getSuperNextBtn(part: RangePartType): HTMLElement {
    return queryFromOverlay(`.ant-picker-panel:${getCssIndex(part)} .${PREFIX_CLASS}-header-super-next-btn`);
  }

  function getHeaderYearBtn(part: RangePartType): HTMLElement {
    return queryFromOverlay(`.ant-picker-panel .ant-picker-header-year-btn:${getCssIndex(part)}`);
  }

  function getFirstCell(partial: 'left' | 'right'): HTMLElement {
    const flg = partial === 'left' ? 'first' : 'last';
    return queryFromOverlay(`.ant-picker-panel:${flg}-child td:first-child .ant-picker-cell-inner`) as HTMLElement;
  }

  function queryFromOverlay(selector: string): HTMLElement {
    return overlayContainerElement.querySelector(selector) as HTMLElement;
  }

  function openPickerByClickTrigger(): void {
    dispatchMouseEvent(getPickerInput(fixture.debugElement), 'click');
    fixture.detectChanges();
    tick(500);
    fixture.detectChanges();
  }

  function openRightPickerByClickTrigger(): void {
    dispatchMouseEvent(getRangePickerRightInput(fixture.debugElement), 'click');
    fixture.detectChanges();
    tick(500);
    fixture.detectChanges();
  }
});

@Component({
  template: `
    <ng-container [ngSwitch]="useSuite">
      <!-- Suite 1 -->
      <nz-range-picker
        *ngSwitchCase="1"
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
        [nzSeparator]="nzSeparator"
        (nzOnOpenChange)="nzOnOpenChange($event)"
        [(ngModel)]="modelValue"
        (ngModelChange)="modelValueChange($event)"
        [nzDateRender]="nzDateRender"
        [nzDisabledTime]="nzDisabledTime"
        [nzRenderExtraFooter]="nzRenderExtraFooter"
        [nzShowToday]="nzShowToday"
        [nzMode]="nzMode"
        [nzRanges]="nzRanges"
        [nzDefaultPickerValue]="nzDefaultPickerValue"
        (nzOnPanelChange)="nzOnPanelChange($event)"
        (nzOnCalendarChange)="nzOnCalendarChange($event)"
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
  useSuite!: 1 | 2 | 3;
  @ViewChild('tplDateRender', { static: true }) tplDateRender!: TemplateRef<Date>;
  @ViewChild('tplExtraFooter', { static: true }) tplExtraFooter!: TemplateRef<void>;

  // --- Suite 1
  nzAllowClear: boolean = false;
  nzAutoFocus: boolean = false;
  nzDisabled: boolean = false;
  nzClassName!: string;
  nzDisabledDate!: (d: Date) => boolean;
  nzLocale: any; // tslint:disable-line:no-any
  nzPlaceHolder!: string[];
  nzPopupStyle!: NgStyleInterface;
  nzDropdownClassName!: string;
  nzSize!: string;
  nzStyle!: NgStyleInterface;
  nzOnOpenChange(): void {}
  modelValue: Array<Date | null> = [];
  modelValueChange(): void {}
  nzDefaultPickerValue!: Array<Date | null>;
  nzSeparator!: string;

  nzDateRender: any; // tslint:disable-line:no-any
  nzShowTime: boolean | object = false;
  nzDisabledTime: any; // tslint:disable-line:no-any
  nzRenderExtraFooter!: string | (() => TemplateRef<void> | string);
  nzShowToday = false;
  nzMode?: string[];

  nzRanges: any; // tslint:disable-line:no-any
  nzOnPanelChange(): void {}
  nzOnCalendarChange(): void {}
  nzOnOk(): void {}

  // --- Suite 2
  nzOpen: boolean = false;
}
