/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ESCAPE } from '@angular/cdk/keycodes';
import { OverlayContainer } from '@angular/cdk/overlay';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { Component, DebugElement, provideZoneChangeDetection, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, inject, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import differenceInDays from 'date-fns/differenceInDays';
import isSameDay from 'date-fns/isSameDay';

import {
  dispatchFakeEvent,
  dispatchKeyboardEvent,
  dispatchMouseEvent,
  typeInElement
} from 'ng-zorro-antd/core/testing';
import { CandyDate } from 'ng-zorro-antd/core/time';
import { NgStyleInterface, NzStatus } from 'ng-zorro-antd/core/types';
import { NzDatePickerSizeType } from 'ng-zorro-antd/date-picker/date-picker.component';
import { NzRangePickerComponent } from 'ng-zorro-antd/date-picker/range-picker.component';
import { CompatibleDate, NzPanelChangeType, RangePartType } from 'ng-zorro-antd/date-picker/standard-types';
import {
  ENTER_EVENT,
  getPickerAbstract,
  getPickerInput,
  getRangePickerRightInput
} from 'ng-zorro-antd/date-picker/testing/util';
import { PREFIX_CLASS } from 'ng-zorro-antd/date-picker/util';

import { NzDatePickerModule } from './date-picker.module';

registerLocaleData(zh);

describe('range-picker', () => {
  let fixture: ComponentFixture<NzTestRangePickerComponent>;
  let fixtureInstance: NzTestRangePickerComponent;
  let debugElement: DebugElement;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  beforeEach(() => {
    // todo: use zoneless
    TestBed.configureTestingModule({
      providers: [provideNoopAnimations(), provideZoneChangeDetection()]
    });
  });

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

      triggerInputBlur();
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(getPickerContainer()).toBeNull();
    }));

    it('should nz-range-picker work', fakeAsync(() => {
      fixtureInstance.useSuite = 5;
      fixture.whenRenderingDone().then(() => {
        tick(500);
        fixture.detectChanges();
        expect(getPickerContainer()).not.toBeNull();
        const pickerInput = getPickerInput(fixture.debugElement);
        expect(pickerInput).not.toBeNull();
      });
    }));

    it('should open by click and close by tab', fakeAsync(() => {
      fixtureInstance.useSuite = 4;

      fixture.detectChanges();
      expect(getPickerContainer()).toBeNull();
      openPickerByClickTrigger();
      expect(getPickerContainer()).not.toBeNull();

      getRangePickerRightInput(fixture.debugElement).focus();
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(getPickerContainer()).not.toBeNull();

      triggerInputBlur();
      getRegularPickerInput(fixture.debugElement).focus();
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(getPickerContainer()).toBeNull();
    }));

    it('should focus on the trigger after a click outside', fakeAsync(() => {
      fixture.detectChanges();
      openPickerByClickTrigger();

      triggerInputBlur();
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(getPickerInput(fixture.debugElement).matches(':focus-within')).toBeTruthy();
    }));

    it('should open on enter while focusing', fakeAsync(() => {
      fixture.detectChanges();
      getPickerInput(fixture.debugElement).dispatchEvent(ENTER_EVENT);
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(getPickerContainer()).toBeNull();

      getPickerInput(fixture.debugElement).focus();
      getPickerInput(fixture.debugElement).dispatchEvent(ENTER_EVENT);
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(getPickerContainer()).not.toBeNull();
    }));

    it('should execute default on the mousedown event when mouse down in date picker input', fakeAsync(() => {
      fixture.detectChanges();
      openPickerByClickTrigger();

      const event = new MouseEvent('mousedown');
      spyOn(event, 'preventDefault').and.callThrough();
      fixture.nativeElement.querySelector(`.${PREFIX_CLASS}-separator`).dispatchEvent(event);

      expect(event.preventDefault).not.toHaveBeenCalled();
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

    it('should support clear input value when set default value', fakeAsync(() => {
      const clearBtnSelector = By.css(`.${PREFIX_CLASS}-clear`);
      fixtureInstance.modelValue = [new Date(), new Date()];
      fixtureInstance.nzAllowClear = true;
      tick();
      fixture.autoDetectChanges();

      const leftInput = getPickerInput(fixture.debugElement);
      tick(500);
      debugElement.query(clearBtnSelector).nativeElement.click();
      expect(leftInput.attributes.getNamedItem('ng-reflect-model')?.value).toBeUndefined();
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

      fixtureInstance.nzOpen = false;
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(getPickerContainer()).toBeNull();
    }));

    it('should support nzDisabledDate', fakeAsync(() => {
      fixture.detectChanges();
      const compareDate = new Date('2018-11-15 00:00:00');
      fixtureInstance.modelValue = [new Date('2018-11-11 12:12:12'), null!];
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

    it('should support nzOnOpenChange', fakeAsync(() => {
      const nzOnOpenChange = spyOn(fixtureInstance, 'nzOnOpenChange');
      fixture.detectChanges();
      openPickerByClickTrigger();
      expect(nzOnOpenChange).toHaveBeenCalledWith(true);

      triggerInputBlur();
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
      expect(getHeaderMonthBtn().textContent!.indexOf('1') > -1).toBeTruthy();
      expect(queryFromRightPanel('.ant-picker-header-month-btn').textContent!.indexOf('2') > -1).toBeTruthy();
    }));

    it('should support string nzSeparator', fakeAsync(() => {
      fixtureInstance.nzSeparator = '→';
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css(`.ant-picker-range-separator`)).nativeElement.textContent.trim()).toBe(
        '→'
      );
    }));

    it('should support ElementRef nzSeparator', fakeAsync(() => {
      fixtureInstance.useSuite = 6;
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css(`.ant-picker-range-separator`)).nativeElement.textContent.trim()).toBe(
        'TEST_SEPARATOR_REF'
      );
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

    it('should support nzOnCalendarChange when nzShowTime is true', fakeAsync(() => {
      const nzOnCalendarChange = spyOn(fixtureInstance, 'nzOnCalendarChange');
      fixtureInstance.nzShowTime = true;
      fixture.detectChanges();
      openPickerByClickTrigger();
      const left = getFirstCell('left');
      dispatchMouseEvent(left, 'click');
      fixture.detectChanges();
      dispatchMouseEvent(queryFromOverlay('.ant-picker-ok > button'), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(nzOnCalendarChange).toHaveBeenCalled();
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
      expect(nzOnChange).not.toHaveBeenCalled();
      // now the cursor focus on right
      const right = getFirstCell('right');
      dispatchMouseEvent(right, 'click');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      const result = (nzOnChange.calls.allArgs()[0] as Date[][])[0];
      expect((result[0] as Date).getDate()).toBe(+leftText);
    }));
    it('should not call nzOnChange if values do not change', fakeAsync(() => {
      fixtureInstance.modelValue = [new Date('2018-11-11'), new Date('2018-11-11')];
      const nzOnChange = spyOn(fixtureInstance, 'modelValueChange');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      openPickerByClickTrigger();
      const leftInput = getPickerInput(fixture.debugElement);
      const rightInput = getRangePickerRightInput(fixture.debugElement);
      typeInElement('2018-11-11 00:00:00', leftInput);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      typeInElement('2018-11-11 00:00:00', rightInput);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      triggerInputBlur();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(nzOnChange).not.toHaveBeenCalled();
    }));

    it('should support nzInline', fakeAsync(() => {
      const nzOnChange = spyOn(fixtureInstance, 'modelValueChange');
      fixtureInstance.modelValue = [new Date('2018-11-11'), new Date('2018-11-11')];
      fixtureInstance.nzInline = true;
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      overlayContainerElement = debugElement.nativeElement as HTMLLIElement;

      const left = getFirstCell('left'); // Use the first cell
      const leftText = left.textContent!.trim();
      dispatchMouseEvent(left, 'click');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(nzOnChange).not.toHaveBeenCalled();
      // now the cursor focus on right
      const right = getFirstCell('right');
      dispatchMouseEvent(right, 'click');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      const result = (nzOnChange.calls.allArgs()[0] as Date[][])[0];
      expect((result[0] as Date).getDate()).toBe(+leftText);
    }));

    it('should support correct position for top arrow', fakeAsync(() => {
      fixture.detectChanges();
      openPickerByClickTrigger();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      const arrow = queryFromOverlay(`.${PREFIX_CLASS}-range-arrow`) as HTMLElement;

      expect(arrow.style.left).not.toBe('');
    }));

    it('should support dir rtl for top arrow', fakeAsync(() => {
      fixture.debugElement.nativeElement.parentElement.setAttribute('dir', 'rtl');
      fixture.detectChanges();
      openPickerByClickTrigger();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      const arrow = queryFromOverlay(`.${PREFIX_CLASS}-range-arrow`) as HTMLElement;

      expect(arrow.style.right).not.toBe('');
      fixture.debugElement.nativeElement.parentElement.setAttribute('dir', '');
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
      expect(getHeaderMonthBtn().textContent!.indexOf('5') > -1).toBeTruthy();
      // Click next month button * 2
      dispatchMouseEvent(getNextBtn('left'), 'click');
      fixture.detectChanges();
      dispatchMouseEvent(getNextBtn('left'), 'click');
      fixture.detectChanges();
      expect(getHeaderMonthBtn().textContent!.indexOf('7') > -1).toBeTruthy();
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

      triggerInputBlur();
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
      expect(
        queryFromOverlay('.ant-picker-panel .ant-picker-time-picker-inner.ant-picker-time-picker-column-3')
      ).toBeDefined();
      expect(
        queryFromOverlay(
          '.ant-picker-panel .ant-picker-time-panel-cell-selected .ant-picker-time-panel-cell-inner'
        ).textContent!.trim()
      ).toBe('11');

      // Click to choose an hour
      dispatchMouseEvent(
        queryFromOverlay('.ant-picker-time-panel-column .ant-picker-time-panel-cell:first-child'),
        'click'
      );
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
      const rightInNextMonth = queryFromRightPanel('table tr:nth-child(3) td.ant-picker-cell');
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

      triggerInputBlur();
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

      // Click to choose an hour
      dispatchMouseEvent(
        queryFromRightPanel('.ant-picker-time-panel-column .ant-picker-time-panel-cell:first-child'),
        'click'
      );
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
      expect(
        overlayContainerElement.querySelectorAll('.ant-picker-panel:first-child .ant-picker-time-panel-column').length
      ).toBe(2);
    }));

    it('should support nzDisabledTime and nzShowTime.nzHideDisabledOptions', fakeAsync(() => {
      fixtureInstance.modelValue = [new Date('2018-11-11 11:11:11'), new Date('2018-12-12 12:12:12')];
      fixtureInstance.nzShowTime = true;
      fixtureInstance.nzDisabledTime = (_current: Date, partial: 'start' | 'end') =>
        partial === 'start'
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
      fixture.detectChanges();
      openPickerByClickTrigger();
      // Left time picker
      expect(
        queryFromOverlay('.ant-picker-time-panel-column li:nth-child(3)').classList.contains(
          'ant-picker-time-panel-cell-disabled'
        )
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
      triggerInputBlur();
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();

      // Right time picker
      openRightPickerByClickTrigger();
      expect(
        queryFromRightPanel('.ant-picker-time-panel-column li:nth-child(4)').classList.contains(
          'ant-picker-time-panel-cell-disabled'
        )
      ).toBeTruthy();
      expect(
        queryFromRightPanel('.ant-picker-time-panel-column:nth-child(2) li:nth-child(3)').classList.contains(
          'ant-picker-time-panel-cell-disabled'
        )
      ).toBeTruthy();
      expect(
        queryFromRightPanel('.ant-picker-time-panel-column:nth-child(3) li:nth-child(2)').classList.contains(
          'ant-picker-time-panel-cell-disabled'
        )
      ).toBeTruthy();

      // Use nzHideDisabledOptions to hide disabled times
      fixtureInstance.nzShowTime = { nzHideDisabledOptions: true };
      fixture.detectChanges();

      // Close left panel
      triggerInputBlur('right');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      openPickerByClickTrigger();
      // Left time picker
      expect(+queryFromOverlay('.ant-picker-time-panel-column:nth-child(1) li:first-child').textContent!.trim()).toBe(
        3
      );
      expect(+queryFromOverlay('.ant-picker-time-panel-column:nth-child(2) li:first-child').textContent!.trim()).toBe(
        2
      );
      expect(+queryFromOverlay('.ant-picker-time-panel-column:nth-child(3) li:first-child').textContent!.trim()).toBe(
        1
      );

      // Close left panel
      triggerInputBlur();
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      openRightPickerByClickTrigger();
      // Right time picker
      expect(
        +queryFromRightPanel('.ant-picker-time-panel-column:nth-child(1) li:first-child').textContent!.trim()
      ).toBe(4);
      expect(
        +queryFromRightPanel('.ant-picker-time-panel-column:nth-child(2) li:first-child').textContent!.trim()
      ).toBe(3);
      expect(
        +queryFromRightPanel('.ant-picker-time-panel-column:nth-child(3) li:first-child').textContent!.trim()
      ).toBe(2);
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

    it('should support nzOnPanelChange', fakeAsync(() => {
      fixtureInstance.modelValue = [new Date('2018-10-11 11:22:34'), new Date('2018-11-12 11:22:33')];
      const spy = spyOn(fixtureInstance, 'nzOnPanelChange');
      fixture.detectChanges();
      openPickerByClickTrigger();

      // Click header to month panel
      // Left
      dispatchMouseEvent(
        overlayContainerElement.querySelector('.ant-picker-panel .ant-picker-header-month-btn')!,
        'click'
      );
      fixture.detectChanges();

      expect(fixtureInstance.nzOnPanelChange).toHaveBeenCalledWith({
        mode: ['month', 'date'],
        date: [new Date('2018-10-11 11:22:34'), new Date('2018-11-11 11:22:34')]
      });

      spy.calls.reset();

      // Right
      dispatchMouseEvent(
        overlayContainerElement.querySelector('.ant-picker-panel:last-child .ant-picker-header-year-btn')!,
        'click'
      );
      fixture.detectChanges();
      expect(fixtureInstance.nzOnPanelChange).toHaveBeenCalledWith({
        mode: ['month', 'year'],
        date: [new Date('2018-10-11 11:22:34'), new Date('2018-11-11 11:22:34')]
      });
    }));

    it('should support nzOnPanelChange when click on prev button', fakeAsync(() => {
      fixtureInstance.modelValue = [new Date('2018-10-11 11:22:34'), new Date('2018-11-12 11:22:33')];
      spyOn(fixtureInstance, 'nzOnPanelChange');
      fixture.detectChanges();
      openPickerByClickTrigger();
      dispatchMouseEvent(getPreBtn('left'), 'click');
      fixture.detectChanges();
      expect(fixtureInstance.nzOnPanelChange).toHaveBeenCalledWith({
        mode: ['date', 'date'],
        date: [new Date('2018-09-11 11:22:34'), new Date('2018-10-11 11:22:34')]
      });
    }));
    it('should support nzOnPanelChange when click on next button', fakeAsync(() => {
      fixtureInstance.modelValue = [new Date('2018-10-11 11:22:34'), new Date('2018-11-12 11:22:33')];
      spyOn(fixtureInstance, 'nzOnPanelChange');
      fixture.detectChanges();
      openPickerByClickTrigger();
      dispatchMouseEvent(getNextBtn('right'), 'click');
      fixture.detectChanges();
      expect(fixtureInstance.nzOnPanelChange).toHaveBeenCalledWith({
        mode: ['date', 'date'],
        date: [new Date('2018-11-11 11:22:34'), new Date('2018-12-11 11:22:34')]
      });
    }));
    it('should support nzOnPanelChange when click on super prev button', fakeAsync(() => {
      fixtureInstance.modelValue = [new Date('2018-10-11 11:22:34'), new Date('2018-11-12 11:22:33')];
      spyOn(fixtureInstance, 'nzOnPanelChange');
      fixture.detectChanges();
      openPickerByClickTrigger();
      dispatchMouseEvent(getSuperPreBtn('left'), 'click');
      fixture.detectChanges();
      expect(fixtureInstance.nzOnPanelChange).toHaveBeenCalledWith({
        mode: ['date', 'date'],
        date: [new Date('2017-10-11 11:22:34'), new Date('2017-11-11 11:22:34')]
      });
    }));
    it('should support nzOnPanelChange when click on super next button', fakeAsync(() => {
      fixtureInstance.modelValue = [new Date('2018-10-11 11:22:34'), new Date('2018-11-12 11:22:33')];
      spyOn(fixtureInstance, 'nzOnPanelChange');
      fixture.detectChanges();
      openPickerByClickTrigger();
      dispatchMouseEvent(getSuperNextBtn('left'), 'click');
      fixture.detectChanges();
      expect(fixtureInstance.nzOnPanelChange).toHaveBeenCalledWith({
        mode: ['date', 'date'],
        date: [new Date('2019-10-11 11:22:34'), new Date('2019-11-11 11:22:34')]
      });
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
      openPickerByClickTrigger();

      // Click start date
      const startDate = queryFromOverlay('.ant-picker-panel td.ant-picker-cell-selected');
      dispatchMouseEvent(startDate, 'click');
      fixture.detectChanges();
      expect(startDate.classList.contains('ant-picker-cell-selected')).toBeTruthy();
    }));

    it('should display expected date when the range values are the same day (include the scenario of timepicker)', fakeAsync(() => {
      fixtureInstance.modelValue = [new Date('2018-05-15'), new Date('2018-05-15')];
      fixtureInstance.nzShowTime = true;
      fixture.detectChanges();
      openPickerByClickTrigger();

      expect(getHeaderMonthBtn().textContent).toContain('5');
    }));

    it('should support nzRanges', fakeAsync(() => {
      const today = new Date();
      const nzOnChange = spyOn(fixtureInstance, 'modelValueChange');
      fixtureInstance.nzRanges = { Today: [today, today] };
      fixture.detectChanges();
      openPickerByClickTrigger();
      expect(queryFromOverlay('.ant-picker-ranges .ant-picker-preset')).toBeDefined();

      const selector = queryFromOverlay('.ant-picker-ranges li.ant-picker-preset:first-child');
      dispatchMouseEvent(selector, 'mouseenter');
      fixture.detectChanges();
      expect(
        queryFromOverlay('.ant-picker-panel td.ant-picker-cell-range-hover-start .ant-picker-cell-inner').textContent
      ).toContain(`${today.getDate()}`);

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
      leftInput.dispatchEvent(ENTER_EVENT);
      fixture.detectChanges();
      expect(getRangePickerRightInput(fixture.debugElement) === document.activeElement).toBeTruthy();

      typeInElement('2018-12-12', rightInput);
      rightInput.dispatchEvent(ENTER_EVENT);
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
      openPickerByClickTrigger();

      const leftInput = getPickerInput(fixture.debugElement);
      const rightInput = getRangePickerRightInput(fixture.debugElement);
      const newDateString = ['2019-09-15 11:08:22', '2020-10-10 11:08:22'];
      typeInElement(newDateString[0], leftInput);
      fixture.detectChanges();
      // should focus the other input
      leftInput.dispatchEvent(ENTER_EVENT);
      fixture.detectChanges();
      typeInElement(newDateString[1], rightInput);
      fixture.detectChanges();
      rightInput.dispatchEvent(ENTER_EVENT);
      fixture.detectChanges();
      tick(500);
      expect(nzOnChange).toHaveBeenCalledWith([new Date(newDateString[0]), new Date(newDateString[1])]);
    }));

    it('if sort order is wrong, output in reverse order', fakeAsync(() => {
      const nzOnChange = spyOn(fixtureInstance, 'modelValueChange');
      fixtureInstance.modelValue = [];
      fixture.detectChanges();
      openPickerByClickTrigger();

      const leftInput = getPickerInput(fixture.debugElement);
      const rightInput = getRangePickerRightInput(fixture.debugElement);
      const newDateString = ['2019-09-15', '2020-10-10'];

      typeInElement(newDateString[1], leftInput);
      fixture.detectChanges();
      leftInput.dispatchEvent(ENTER_EVENT);
      fixture.detectChanges();

      typeInElement(newDateString[0], rightInput);
      fixture.detectChanges();
      rightInput.dispatchEvent(ENTER_EVENT);
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
      // should focus the other input
      leftInput.dispatchEvent(ENTER_EVENT);
      fixture.detectChanges();
      typeInElement('2018-02-06', rightInput);
      fixture.detectChanges();
      getRangePickerRightInput(fixture.debugElement).dispatchEvent(ENTER_EVENT);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(leftInput.value).toBe('2018-02-06');
      expect(rightInput.value).toBe('2019-08-10');
    }));

    it('should panel date follows the selected date', fakeAsync(() => {
      fixtureInstance.nzShowTime = true;
      fixture.detectChanges();
      openPickerByClickTrigger();

      const leftInput = getPickerInput(fixture.debugElement);
      typeInElement('2027-09-17 11:08:22', leftInput);
      fixture.detectChanges();
      leftInput.dispatchEvent(ENTER_EVENT);
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(getHeaderYearBtn('left').textContent).toContain('2027');
      // panel month will increase 1
      expect(getHeaderMonthBtn().textContent).toContain('9');
    }));
  }); // /specified date picker testing

  describe('ngModel value accessors', () => {
    beforeEach(() => (fixtureInstance.useSuite = 3));

    it('should specified date provide by "modelValue" be chosen', fakeAsync(() => {
      fixtureInstance.modelValue = [new Date('2018-11-11'), new Date('2018-12-12')];
      fixture.detectChanges();
      tick(); // Wait writeValue() tobe done
      fixture.detectChanges();
      expect(getFirstSelectedDayCell().textContent!.trim()).toBe('11');

      // Click the first cell to change ngModel
      const left = getFirstCell('left');
      const right = getFirstCell('right');
      const leftText = left.textContent!.trim();
      dispatchMouseEvent(left, 'click');
      fixture.detectChanges();
      dispatchMouseEvent(right, 'click');
      fixture.detectChanges();
      expect(fixtureInstance.modelValue[0]!.getDate()).toBe(+leftText);
    }));
  });

  describe('week mode', () => {
    beforeEach(() => {
      fixtureInstance.useSuite = 1;
      fixtureInstance.nzMode = 'week';
    });

    it('should support week row style', fakeAsync(() => {
      fixture.detectChanges();
      openPickerByClickTrigger();

      const leftThirdRow = queryFromOverlay('.ant-picker-panel:first-child table tr:nth-child(3)');
      const leftThirdRowCell = leftThirdRow.querySelector('td.ant-picker-cell')!;
      dispatchMouseEvent(leftThirdRowCell, 'click');
      fixture.detectChanges();
      expect(leftThirdRow.classList.contains('ant-picker-week-panel-row-selected')).toBeTruthy();
      const rightThirdRowCell = queryFromRightPanel('table tr:nth-child(3) td.ant-picker-cell');
      dispatchMouseEvent(rightThirdRowCell, 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(getPickerContainer()).toBeNull();
    }));
  });

  describe('month mode', () => {
    beforeEach(() => {
      fixtureInstance.useSuite = 1;
      fixtureInstance.nzMode = 'month';
    });

    it('should support month cell style', fakeAsync(() => {
      fixture.detectChanges();
      openPickerByClickTrigger();

      const left = getFirstCell('left'); // Use the first cell
      dispatchMouseEvent(left, 'click');
      fixture.detectChanges();
      const rightThirdRowCell = queryFromRightPanel('table tr:nth-child(3) td.ant-picker-cell');
      dispatchMouseEvent(rightThirdRowCell, 'mouseenter');
      fixture.detectChanges();
      expect(rightThirdRowCell.classList.contains('ant-picker-cell-range-hover-end')).toBeTruthy();
    }));
  });

  describe('year mode', () => {
    beforeEach(() => {
      fixtureInstance.useSuite = 1;
      fixtureInstance.nzMode = 'year';
    });

    it('should support year cell style', fakeAsync(() => {
      fixture.detectChanges();
      openPickerByClickTrigger();

      const left = getFirstCell('left');
      dispatchMouseEvent(left, 'click');
      fixture.detectChanges();
      const rightThirdRowCell = queryFromRightPanel('table tr:nth-child(3) td.ant-picker-cell');
      dispatchMouseEvent(rightThirdRowCell, 'mouseenter');
      fixture.detectChanges();
      expect(rightThirdRowCell.classList.contains('ant-picker-cell-range-hover-end')).toBeTruthy();
    }));
  });

  describe('status', () => {
    let fixtureStatus: ComponentFixture<NzTestRangePickerStatusComponent>;
    let fixtureStatusInstance: NzTestRangePickerStatusComponent;
    let rangePickerElement!: HTMLElement;
    beforeEach(() => {
      fixtureStatus = TestBed.createComponent(NzTestRangePickerStatusComponent);
      fixtureStatusInstance = fixtureStatus.componentInstance;
      rangePickerElement = fixtureStatus.debugElement.query(By.directive(NzRangePickerComponent)).nativeElement;
      fixtureStatus.detectChanges();
    });

    it('should classname correct', fakeAsync(() => {
      expect(rangePickerElement.classList).toContain('ant-picker-status-error');

      fixtureStatusInstance.status = 'warning';
      fixtureStatus.detectChanges();
      expect(rangePickerElement.classList).toContain('ant-picker-status-warning');

      fixtureStatusInstance.status = '';
      fixtureStatus.detectChanges();
      expect(rangePickerElement.classList).not.toContain('ant-picker-status-warning');
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
    return queryFromOverlay(
      '.ant-picker-panel:first-child td.ant-picker-cell-selected .ant-picker-cell-inner'
    ) as HTMLElement;
  }

  function getRegularPickerInput(fixtureDebugElement: DebugElement): HTMLInputElement {
    return fixtureDebugElement.queryAll(By.css(`.${PREFIX_CLASS}-input input`))[2].nativeElement as HTMLInputElement;
  }

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

  function getHeaderMonthBtn(): HTMLElement {
    return queryFromOverlay(`.ant-picker-panel .ant-picker-header-month-btn`);
  }

  function getFirstCell(partial: 'left' | 'right'): HTMLElement {
    const flg = partial === 'left' ? 'first' : 'last';
    return queryFromOverlay(`.ant-picker-panel:${flg}-child td:first-child .ant-picker-cell-inner`) as HTMLElement;
  }

  function queryFromOverlay(selector: string): HTMLElement {
    return overlayContainerElement.querySelector(selector) as HTMLElement;
  }

  function queryFromRightPanel(selector: string): HTMLElement {
    return overlayContainerElement
      .querySelector('.ant-picker-panel:last-child')!
      .querySelector(selector) as HTMLElement;
  }

  function openPickerByClickTrigger(): void {
    dispatchMouseEvent(getPickerInput(fixture.debugElement), 'click');
    fixture.detectChanges();
    tick(500);
    fixture.detectChanges();
    dispatchFakeEvent(getPickerInput(fixture.debugElement), 'focus');
    fixture.detectChanges();
    tick(500);
    fixture.detectChanges();
  }

  function openRightPickerByClickTrigger(): void {
    dispatchMouseEvent(getRangePickerRightInput(fixture.debugElement), 'click');
    fixture.detectChanges();
    tick(500);
    fixture.detectChanges();
    dispatchFakeEvent(getRangePickerRightInput(fixture.debugElement), 'focus');
    fixture.detectChanges();
    tick(500);
    fixture.detectChanges();
  }

  function triggerInputBlur(part: 'left' | 'right' = 'left'): void {
    if (part === 'left') {
      dispatchFakeEvent(getPickerInput(fixture.debugElement), 'focusout');
    } else {
      dispatchFakeEvent(getRangePickerRightInput(fixture.debugElement), 'focusout');
    }
  }
});

@Component({
  imports: [FormsModule, NzDatePickerModule],
  template: `
    <ng-template #tplDateRender let-current>
      <div [class.test-first-day]="current.getDate() === 1">{{ current.getDate() }}</div>
    </ng-template>
    <ng-template #tplExtraFooter>TEST_EXTRA_FOOTER</ng-template>
    <ng-template #separatorTemplate>TEST_SEPARATOR_REF</ng-template>

    @switch (useSuite) {
      @case (1) {
        <nz-range-picker
          [nzAllowClear]="nzAllowClear"
          [nzAutoFocus]="nzAutoFocus"
          [nzDisabled]="nzDisabled"
          [nzDisabledDate]="nzDisabledDate"
          [nzLocale]="nzLocale"
          [nzPlaceHolder]="nzPlaceHolder"
          [nzPopupStyle]="nzPopupStyle"
          [nzDropdownClassName]="nzDropdownClassName"
          [nzSize]="nzSize"
          [nzSeparator]="nzSeparator"
          (nzOnOpenChange)="nzOnOpenChange($event)"
          [(ngModel)]="modelValue"
          (ngModelChange)="modelValueChange($event)"
          [nzDateRender]="nzDateRender"
          [nzDisabledTime]="nzDisabledTime"
          [nzRenderExtraFooter]="nzRenderExtraFooter"
          [nzShowToday]="nzShowToday"
          [nzShowNow]="nzShowNow"
          [nzMode]="nzMode"
          [nzRanges]="nzRanges"
          [nzDefaultPickerValue]="nzDefaultPickerValue"
          [nzInline]="nzInline"
          (nzOnPanelChange)="nzOnPanelChange($event)"
          (nzOnCalendarChange)="nzOnCalendarChange($event)"
          [nzShowTime]="nzShowTime"
          (nzOnOk)="nzOnOk($event)"
        />
      }
      @case (2) {
        <nz-range-picker [nzOpen]="nzOpen" />
      }
      @case (3) {
        <nz-range-picker nzOpen [(ngModel)]="modelValue" />
      }
      @case (4) {
        <nz-range-picker [(ngModel)]="modelValue" />
        <nz-date-picker [ngModel]="singleValue" />
      }
      @case (5) {
        <nz-range-picker nzOpen></nz-range-picker>
      }
      @case (6) {
        <nz-range-picker [nzSeparator]="separatorTemplate" />
      }
    }
  `
})
class NzTestRangePickerComponent {
  useSuite!: 1 | 2 | 3 | 4 | 5 | 6;
  @ViewChild('tplDateRender', { static: true }) tplDateRender!: TemplateRef<Date>;
  @ViewChild('tplExtraFooter', { static: true }) tplExtraFooter!: TemplateRef<void>;

  // --- Suite 1
  nzAllowClear: boolean = false;
  nzAutoFocus: boolean = false;
  nzDisabled: boolean = false;
  nzDisabledDate!: (d: Date) => boolean;
  nzLocale: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  nzPlaceHolder!: string[];
  nzPopupStyle!: NgStyleInterface;
  nzDropdownClassName!: string;
  nzSize!: NzDatePickerSizeType;

  nzOnOpenChange(_: boolean): void {}

  modelValue: CompatibleDate = [];

  modelValueChange(_: Date[]): void {}

  nzDefaultPickerValue!: CompatibleDate;
  nzSeparator!: string;
  nzInline: boolean = false;

  nzDateRender: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  nzShowTime: boolean | object = false;
  nzDisabledTime: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  nzRenderExtraFooter!: string | (() => TemplateRef<void> | string);
  nzShowToday = false;
  nzShowNow = false;
  nzMode = 'date';

  nzRanges: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  nzOnPanelChange(_: NzPanelChangeType): void {}

  nzOnCalendarChange(_: Array<Date | null>): void {}

  nzOnOk(_: CompatibleDate | null): void {}

  // --- Suite 2
  nzOpen: boolean = false;

  // --- Suite 4
  singleValue!: Date;
}

@Component({
  imports: [NzDatePickerModule],
  template: `<nz-range-picker [nzStatus]="status"></nz-range-picker>`
})
class NzTestRangePickerStatusComponent {
  status: NzStatus = 'error';
}
