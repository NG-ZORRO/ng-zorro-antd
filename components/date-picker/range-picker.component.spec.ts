/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ESCAPE } from '@angular/cdk/keycodes';
import { OverlayContainer } from '@angular/cdk/overlay';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { Component, DebugElement, TemplateRef, ViewChild, signal } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import differenceInDays from 'date-fns/differenceInDays';
import isSameDay from 'date-fns/isSameDay';
import { vi } from 'vitest';

import { provideNzNoAnimation } from 'ng-zorro-antd/core/animation';
import {
  dispatchFakeEvent,
  dispatchKeyboardEvent,
  dispatchMouseEvent,
  typeInElement
} from 'ng-zorro-antd/core/testing';
import { CandyDate } from 'ng-zorro-antd/core/time';
import { NgStyleInterface, NzSafeAny, NzStatus } from 'ng-zorro-antd/core/types';
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
    TestBed.configureTestingModule({
      providers: [provideNzNoAnimation()]
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

  beforeEach(() => vi.useFakeTimers());

  afterEach(() => vi.useRealTimers());

  describe('general api testing', () => {
    beforeEach(() => fixtureInstance.useSuite.set(1));

    it('should open by click and close by click at outside', () => {
      fixture.detectChanges();
      openPickerByClickTrigger();
      expect(getPickerContainer()).not.toBeNull();

      triggerInputBlur();
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();
      expect(getPickerContainer()).toBeNull();
    });

    it('should nz-range-picker work', () => {
      fixtureInstance.useSuite.set(5);
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();
      expect(getPickerContainer()).not.toBeNull();
      const pickerInput = getPickerInput(fixture.debugElement);
      expect(pickerInput).not.toBeNull();
    });

    it('should open by click and close by tab', () => {
      fixtureInstance.useSuite.set(4);

      fixture.detectChanges();
      expect(getPickerContainer()).toBeNull();
      openPickerByClickTrigger();
      expect(getPickerContainer()).not.toBeNull();

      getRangePickerRightInput(fixture.debugElement).focus();
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();
      expect(getPickerContainer()).not.toBeNull();

      triggerInputBlur();
      getRegularPickerInput(fixture.debugElement).focus();
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();
      expect(getPickerContainer()).toBeNull();
    });

    it('should focus on the trigger after a click outside', () => {
      fixture.detectChanges();
      openPickerByClickTrigger();

      triggerInputBlur();
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();
      expect(getPickerInput(fixture.debugElement).matches(':focus-within')).toBeTruthy();
    });

    it('should open on enter while focusing', () => {
      fixture.detectChanges();
      getPickerInput(fixture.debugElement).dispatchEvent(ENTER_EVENT);
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();
      expect(getPickerContainer()).toBeNull();

      getPickerInput(fixture.debugElement).focus();
      getPickerInput(fixture.debugElement).dispatchEvent(ENTER_EVENT);
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();
      expect(getPickerContainer()).not.toBeNull();
    });

    it('should execute default on the mousedown event when mouse down in date picker input', () => {
      fixture.detectChanges();
      openPickerByClickTrigger();

      const event = new MouseEvent('mousedown');
      vi.spyOn(event, 'preventDefault');
      fixture.nativeElement.querySelector(`.${PREFIX_CLASS}-separator`).dispatchEvent(event);

      expect(event.preventDefault).not.toHaveBeenCalled();
    });

    it('should support nzAllowClear and work properly', async () => {
      const clearBtnSelector = By.css(`.${PREFIX_CLASS}-clear`);
      const initial = [new Date(), new Date()];
      fixtureInstance.modelValue.set(initial);
      fixtureInstance.nzAllowClear.set(false);
      await stabilize();
      expect(debugElement.query(clearBtnSelector)).toBeNull();

      fixtureInstance.nzAllowClear.set(true);
      await stabilize();
      expect(fixtureInstance.modelValue()).toBe(initial);
      expect(debugElement.query(clearBtnSelector)).toBeDefined();

      const nzOnChange = vi.spyOn(fixtureInstance, 'modelValueChange').mockImplementation(() => {});
      debugElement.query(clearBtnSelector).nativeElement.click();
      fixture.detectChanges();
      expect((fixtureInstance.modelValue() as Date[]).length).toBe(0);
      expect(nzOnChange).toHaveBeenCalledWith([]);
      expect(debugElement.query(clearBtnSelector)).toBeFalsy();
    });

    it('should support clear input value when set default value', async () => {
      const clearBtnSelector = By.css(`.${PREFIX_CLASS}-clear`);
      fixtureInstance.modelValue.set([new Date(), new Date()]);
      fixtureInstance.nzAllowClear.set(true);
      await stabilize();

      const leftInput = getPickerInput(fixture.debugElement);
      vi.advanceTimersByTime(500);
      debugElement.query(clearBtnSelector).nativeElement.click();
      expect(leftInput.attributes.getNamedItem('ng-reflect-model')?.value).toBeUndefined();
    });

    it('should support nzAutoFocus', () => {
      fixtureInstance.nzAutoFocus.set(true);
      fixture.detectChanges();
      expect(getPickerInput(fixture.debugElement) === document.activeElement).toBeTruthy();
    });

    it('should support nzDisabled', async () => {
      // Make sure picker clear button shown up
      fixtureInstance.nzAllowClear.set(true);
      fixtureInstance.modelValue.set([new Date(), new Date()]);

      fixtureInstance.nzDisabled.set(true);
      await stabilize();
      expect(debugElement.query(By.css('.ant-picker-disabled'))).not.toBeNull();
      expect(debugElement.query(By.css('.ant-picker-clear'))).toBeNull();

      fixtureInstance.nzDisabled.set(false);
      await stabilize();
      expect(debugElement.query(By.css('.ant-picker-disabled'))).toBeNull();
      expect(debugElement.query(By.css('.ant-picker-clear'))).not.toBeNull();
    });

    it('should support nzOpen if assigned', () => {
      fixtureInstance.useSuite.set(2);

      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();
      expect(getPickerContainer()).toBeNull();

      fixtureInstance.nzOpen.set(true);
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();
      expect(getPickerContainer()).not.toBeNull();

      fixtureInstance.nzOpen.set(false);
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();
      expect(getPickerContainer()).toBeNull();
    });

    it('should support nzDisabledDate', async () => {
      fixture.detectChanges();
      const compareDate = new Date('2018-11-15 00:00:00');
      fixtureInstance.modelValue.set([new Date('2018-11-11 12:12:12'), null!]);
      fixtureInstance.nzDisabledDate.set((current: Date) => isSameDay(current, compareDate));
      await stabilize(10000);
      openPickerByClickTrigger();
      const disabledCell = queryFromOverlay('td.ant-picker-cell-disabled .ant-picker-cell-inner');
      expect(disabledCell.textContent!.trim()).toBe('15');
    });

    it('should support nzLocale', () => {
      const featureKey = 'LEFT_PLACEHOLDER';
      fixtureInstance.nzLocale.set({ lang: { rangePlaceholder: [featureKey, 'End'] } });
      fixture.detectChanges();
      expect(getPickerInput(fixture.debugElement).getAttribute('placeholder')).toBe(featureKey);
    });

    it('should support nzPlaceHolder', () => {
      const featureKey = 'RIGHT_PLACEHOLDER';
      fixtureInstance.nzPlaceHolder.set(['Start', featureKey]);
      fixture.detectChanges();
      expect(getRangePickerRightInput(fixture.debugElement).getAttribute('placeholder')).toBe(featureKey);
    });

    it('should support nzPopupStyle', () => {
      fixtureInstance.nzPopupStyle.set({ color: 'red' });
      fixture.detectChanges();
      openPickerByClickTrigger();
      expect(queryFromOverlay(`.${PREFIX_CLASS}-dropdown`).style.color).toBe('red');
    });

    it('should support nzDropdownClassName', () => {
      const keyCls = 'my-test-class';
      fixtureInstance.nzDropdownClassName.set(keyCls);
      fixture.detectChanges();
      openPickerByClickTrigger();
      expect(queryFromOverlay(`.${PREFIX_CLASS}-dropdown`).classList.contains(keyCls)).toBeTruthy();
    });

    it('should support nzSize', () => {
      fixtureInstance.nzSize.set('large');
      fixture.detectChanges();
      expect(getPickerAbstract(fixture.debugElement).classList.contains('ant-picker-large')).toBeTruthy();

      fixtureInstance.nzSize.set('small');
      fixture.detectChanges();
      expect(getPickerAbstract(fixture.debugElement).classList.contains('ant-picker-small')).toBeTruthy();
    });

    it('should support nzOnOpenChange', () => {
      const nzOnOpenChange = vi.spyOn(fixtureInstance, 'nzOnOpenChange').mockImplementation(() => {});
      fixture.detectChanges();
      openPickerByClickTrigger();
      expect(nzOnOpenChange).toHaveBeenCalledWith(true);

      triggerInputBlur();
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();
      expect(nzOnOpenChange).toHaveBeenCalledWith(false);
      expect(nzOnOpenChange).toHaveBeenCalledTimes(2);
    });

    it('should support nzValue', async () => {
      fixtureInstance.nzDefaultPickerValue.set([new Date('2012-03-18'), new Date('2019-12-12')]);
      fixtureInstance.modelValue.set([new Date('2018-11-11'), new Date('2018-12-11')]);
      await stabilize(10000);
      openPickerByClickTrigger();
      expect(getFirstSelectedDayCell().textContent!.trim()).toBe('11');
    });

    it('should support nzDefaultPickerValue', () => {
      fixtureInstance.nzDefaultPickerValue.set([new Date('2012-01-18'), new Date('2019-11-11')]);
      fixture.detectChanges();
      openPickerByClickTrigger();
      expect(getHeaderMonthBtn().textContent!.indexOf('1') > -1).toBeTruthy();
      expect(queryFromRightPanel('.ant-picker-header-month-btn').textContent!.indexOf('2') > -1).toBeTruthy();
    });

    it('should support string nzSeparator', () => {
      fixtureInstance.nzSeparator.set('→');
      fixture.detectChanges();
      const separator = fixture.debugElement.query(By.css(`.ant-picker-range-separator`)).nativeElement;
      expect(separator.textContent.trim()).toBe('→');
    });

    it('should support ElementRef nzSeparator', () => {
      fixtureInstance.useSuite.set(6);
      fixture.detectChanges();
      const separator = fixture.debugElement.query(By.css(`.ant-picker-range-separator`)).nativeElement;
      expect(separator.textContent.trim()).toBe('TEST_SEPARATOR_REF');
    });

    it('should support nzOnCalendarChange', () => {
      const nzOnCalendarChange = vi.spyOn(fixtureInstance, 'nzOnCalendarChange').mockImplementation(() => {});
      fixture.detectChanges();
      openPickerByClickTrigger();
      const left = getFirstCell('left');
      const leftText = left.textContent!.trim();
      dispatchMouseEvent(left, 'click');
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();
      expect(nzOnCalendarChange).toHaveBeenCalled();
      let result = (nzOnCalendarChange.mock.calls[0] as Date[][])[0];
      expect(result[0].getDate()).toBe(+leftText);
      const right = getFirstCell('right');
      const rightText = right.textContent!.trim();
      dispatchMouseEvent(right, 'click');
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();
      expect(nzOnCalendarChange).toHaveBeenCalled();
      result = (nzOnCalendarChange.mock.calls[1] as Date[][])[0];
      expect(result[0].getDate()).toBe(+leftText);
      expect(result[1].getDate()).toBe(+rightText);
    });

    it('should support nzOnCalendarChange when nzShowTime is true', () => {
      const nzOnCalendarChange = vi.spyOn(fixtureInstance, 'nzOnCalendarChange').mockImplementation(() => {});
      fixtureInstance.nzShowTime.set(true);
      fixture.detectChanges();
      openPickerByClickTrigger();
      const left = getFirstCell('left');
      dispatchMouseEvent(left, 'click');
      fixture.detectChanges();
      dispatchMouseEvent(queryFromOverlay('.ant-picker-ok > button'), 'click');
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();
      expect(nzOnCalendarChange).toHaveBeenCalled();
    });

    it('should support nzOnChange', () => {
      fixtureInstance.modelValue.set([new Date('2018-11-11'), new Date('2018-11-11')]);
      const nzOnChange = vi.spyOn(fixtureInstance, 'modelValueChange').mockImplementation(() => {});
      fixture.detectChanges();
      vi.advanceTimersByTime(10000);
      fixture.detectChanges();
      openPickerByClickTrigger();

      const left = getFirstCell('left'); // Use the first cell
      const leftText = left.textContent!.trim();
      dispatchMouseEvent(left, 'click');
      fixture.detectChanges();
      vi.advanceTimersByTime(10000);
      fixture.detectChanges();
      expect(nzOnChange).not.toHaveBeenCalled();
      // now the cursor focus on right
      const right = getFirstCell('right');
      dispatchMouseEvent(right, 'click');
      fixture.detectChanges();
      vi.advanceTimersByTime(10000);
      fixture.detectChanges();
      const result = (nzOnChange.mock.calls[0] as Date[][])[0];
      expect((result[0] as Date).getDate()).toBe(+leftText);
    });

    it('should not call nzOnChange if values do not change', () => {
      fixtureInstance.modelValue.set([new Date('2018-11-11'), new Date('2018-11-11')]);
      const nzOnChange = vi.spyOn(fixtureInstance, 'modelValueChange').mockImplementation(() => {});
      fixture.detectChanges();
      vi.advanceTimersByTime(10000);
      fixture.detectChanges();
      openPickerByClickTrigger();
      const leftInput = getPickerInput(fixture.debugElement);
      const rightInput = getRangePickerRightInput(fixture.debugElement);
      typeInElement('2018-11-11 00:00:00', leftInput);
      fixture.detectChanges();
      vi.advanceTimersByTime(10000);
      fixture.detectChanges();
      typeInElement('2018-11-11 00:00:00', rightInput);
      fixture.detectChanges();
      vi.advanceTimersByTime(10000);
      fixture.detectChanges();
      triggerInputBlur();
      fixture.detectChanges();
      vi.advanceTimersByTime(10000);
      fixture.detectChanges();
      expect(nzOnChange).not.toHaveBeenCalled();
    });

    it('should support nzInline', () => {
      const nzOnChange = vi.spyOn(fixtureInstance, 'modelValueChange').mockImplementation(() => {});
      fixtureInstance.modelValue.set([new Date('2018-11-11'), new Date('2018-11-11')]);
      fixtureInstance.nzInline.set(true);
      fixture.detectChanges();
      vi.advanceTimersByTime(10000);
      fixture.detectChanges();
      overlayContainerElement = debugElement.nativeElement as HTMLLIElement;

      const left = getFirstCell('left'); // Use the first cell
      dispatchMouseEvent(left, 'click');
      fixture.detectChanges();
      vi.advanceTimersByTime(10000);
      fixture.detectChanges();
      expect(nzOnChange).not.toHaveBeenCalled();
      // now the cursor focus on right
      const right = getFirstCell('right');
      const rightText = right.textContent!.trim();
      dispatchMouseEvent(right, 'click');
      fixture.detectChanges();
      vi.advanceTimersByTime(10000);
      fixture.detectChanges();
      const result = (nzOnChange.mock.calls[0] as Date[][])[0];
      const resultDays = result.map(date => (date as Date).getDate());
      expect(resultDays).toContain(+rightText);
      expect(resultDays).not.toEqual([11, 11]);
    });

    it('should support correct position for top arrow', () => {
      fixture.detectChanges();
      openPickerByClickTrigger();
      fixture.detectChanges();
      vi.advanceTimersByTime(10000);
      fixture.detectChanges();
      const arrow = queryFromOverlay(`.${PREFIX_CLASS}-range-arrow`) as HTMLElement;
      expect(arrow.style.left).not.toBe('');
    });

    it('should support dir rtl for top arrow', () => {
      fixture.debugElement.nativeElement.parentElement.setAttribute('dir', 'rtl');
      fixture.detectChanges();
      openPickerByClickTrigger();
      fixture.detectChanges();
      vi.advanceTimersByTime(10000);
      fixture.detectChanges();
      const arrow = queryFromOverlay(`.${PREFIX_CLASS}-range-arrow`) as HTMLElement;

      expect(arrow.style.right).not.toBe('');
      fixture.debugElement.nativeElement.parentElement.setAttribute('dir', '');
    });
  }); // /general api testing

  describe('panel switch and move forward/afterward', () => {
    beforeEach(() => fixtureInstance.useSuite.set(1));

    it('should support date panel changes', async () => {
      fixtureInstance.modelValue.set([new Date('2018-6-11'), new Date('2018-12-12')]);
      await stabilize();
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
    });

    it('should support keep initValue when reopen panel', async () => {
      fixtureInstance.modelValue.set([new Date('2018-6-11'), new Date('2018-12-12')]);
      await stabilize();
      openPickerByClickTrigger();
      // Click next year button * 2
      dispatchMouseEvent(getSuperNextBtn('left'), 'click');
      fixture.detectChanges();
      dispatchMouseEvent(getSuperNextBtn('left'), 'click');
      fixture.detectChanges();

      triggerInputBlur();
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();

      openPickerByClickTrigger();
      expect(getHeaderYearBtn('left').textContent!.indexOf('2018') > -1).toBeTruthy();
    });
  }); // /panel switch and move forward/afterward

  describe('specified date picker testing', () => {
    beforeEach(() => fixtureInstance.useSuite.set(1));

    it('should support nzDateRender', () => {
      fixtureInstance.nzDateRender.set(fixtureInstance.tplDateRender);
      fixture.detectChanges();
      openPickerByClickTrigger();
      expect(queryFromOverlay('.test-first-day').textContent!.trim()).toBe('1');
    });

    it('should support nzDateRender with typeof function', () => {
      const featureKey = 'TEST_FIRST_DAY';
      fixtureInstance.nzDateRender.set((d: CandyDate) => (d.getDate() === 1 ? featureKey : d.getDate()));
      fixture.detectChanges();
      openPickerByClickTrigger();
      expect(overlayContainerElement.textContent!.indexOf(featureKey) > -1).toBeTruthy();
    });

    it('should support nzShowTime', async () => {
      fixtureInstance.modelValue.set([new Date('2018-11-11 11:22:33'), new Date('2018-12-12 11:22:33')]);
      fixtureInstance.nzShowTime.set(true);
      await stabilize();
      openPickerByClickTrigger();
      await stabilize(10000);
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
      await stabilize(10000);
      expect(getPickerInput(fixture.debugElement).value).toBe('2018-11-11 00:22:33');
    });

    it('should support hover date cell style', () => {
      fixture.detectChanges();
      openPickerByClickTrigger();

      const left = getFirstCell('left'); // Use the first cell
      dispatchMouseEvent(left, 'click');
      fixture.detectChanges();
      const rightInNextMonth = queryFromRightPanel('table tr:nth-child(3) td.ant-picker-cell');
      dispatchMouseEvent(rightInNextMonth, 'mouseenter');
      fixture.detectChanges();
      expect(rightInNextMonth.classList.contains('ant-picker-cell-range-hover-end')).toBeTruthy();
    });

    it('should support active part change when select one', () => {
      fixture.detectChanges();
      openPickerByClickTrigger();
      vi.advanceTimersByTime(10000);
      fixture.detectChanges();
      // Choose left part first
      dispatchMouseEvent(getFirstCell('left'), 'click');
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();
      expect(getRangePickerRightInput(fixture.debugElement) === document.activeElement).toBeTruthy();

      triggerInputBlur();
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();

      // Choose right part first
      openRightPickerByClickTrigger();
      vi.advanceTimersByTime(10000);
      fixture.detectChanges();
      dispatchMouseEvent(getFirstCell('right'), 'click');
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();
      expect(getPickerInput(fixture.debugElement) === document.activeElement).toBeTruthy();
    });

    it('should support select end date first with time panel', () => {
      fixtureInstance.nzShowTime.set(true);
      fixture.detectChanges();
      openRightPickerByClickTrigger();
      vi.advanceTimersByTime(10000);
      fixture.detectChanges();
      const okButton = queryFromOverlay('.ant-picker-ok > button');
      expect(okButton.getAttribute('disabled')).not.toBeNull();

      // Click to choose an hour
      dispatchMouseEvent(
        queryFromRightPanel('.ant-picker-time-panel-column .ant-picker-time-panel-cell:first-child'),
        'click'
      );
      fixture.detectChanges();
      vi.advanceTimersByTime(10000);
      fixture.detectChanges();
      expect(okButton.getAttribute('disabled')).toBeNull();

      dispatchMouseEvent(okButton, 'click');
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();
      expect(getPickerInput(fixture.debugElement) === document.activeElement).toBeTruthy();
    });

    it('should support nzShowTime.nzFormat', () => {
      fixtureInstance.modelValue.set([new Date('2018-11-11'), new Date('2018-12-12')]);
      fixtureInstance.nzShowTime.set({ nzFormat: 'HH:mm' });
      fixture.detectChanges();
      openPickerByClickTrigger();
      expect(
        overlayContainerElement.querySelectorAll('.ant-picker-panel:first-child .ant-picker-time-panel-column').length
      ).toBe(2);
    });

    it('should support nzDisabledTime and nzShowTime.nzHideDisabledOptions', () => {
      fixtureInstance.modelValue.set([new Date('2018-11-11 11:11:11'), new Date('2018-12-12 12:12:12')]);
      fixtureInstance.nzShowTime.set(true);
      fixtureInstance.nzDisabledTime.set((_current: Date, partial: 'start' | 'end') =>
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
            }
      );
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
      vi.advanceTimersByTime(500);
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
      fixtureInstance.nzShowTime.set({ nzHideDisabledOptions: true });
      fixture.detectChanges();

      // Close left panel
      triggerInputBlur('right');
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
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
      vi.advanceTimersByTime(500);
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
    });

    it('should support nzRenderExtraFooter', () => {
      fixtureInstance.nzRenderExtraFooter.set(() => fixtureInstance.tplExtraFooter);
      fixture.detectChanges();

      openPickerByClickTrigger();
      expect(overlayContainerElement.textContent!.indexOf('TEST_EXTRA_FOOTER') > -1).toBeTruthy();

      const extraFooterText = 'TEST_EXTRA_FOOTER_STRING';
      fixtureInstance.nzRenderExtraFooter.set(extraFooterText);
      fixture.detectChanges();
      expect(overlayContainerElement.textContent!.indexOf(extraFooterText) > -1).toBeTruthy();
    });

    it('should support nzOnPanelChange', async () => {
      fixtureInstance.modelValue.set([new Date('2018-10-11 11:22:34'), new Date('2018-11-12 11:22:33')]);
      const spy = vi.spyOn(fixtureInstance, 'nzOnPanelChange').mockImplementation(() => {});
      await stabilize();
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

      spy.mockClear();

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
    });

    it('should support nzOnPanelChange when click on prev button', async () => {
      fixtureInstance.modelValue.set([new Date('2018-10-11 11:22:34'), new Date('2018-11-12 11:22:33')]);
      vi.spyOn(fixtureInstance, 'nzOnPanelChange').mockImplementation(() => {});
      await stabilize();
      openPickerByClickTrigger();
      dispatchMouseEvent(getPreBtn('left'), 'click');
      fixture.detectChanges();
      expect(fixtureInstance.nzOnPanelChange).toHaveBeenCalledWith({
        mode: ['date', 'date'],
        date: [new Date('2018-09-11 11:22:34'), new Date('2018-10-11 11:22:34')]
      });
    });

    it('should support nzOnPanelChange when click on next button', async () => {
      fixtureInstance.modelValue.set([new Date('2018-10-11 11:22:34'), new Date('2018-11-12 11:22:33')]);
      vi.spyOn(fixtureInstance, 'nzOnPanelChange').mockImplementation(() => {});
      await stabilize();
      openPickerByClickTrigger();
      dispatchMouseEvent(getNextBtn('right'), 'click');
      fixture.detectChanges();
      expect(fixtureInstance.nzOnPanelChange).toHaveBeenCalledWith({
        mode: ['date', 'date'],
        date: [new Date('2018-11-11 11:22:34'), new Date('2018-12-11 11:22:34')]
      });
    });

    it('should support nzOnPanelChange when click on super prev button', async () => {
      fixtureInstance.modelValue.set([new Date('2018-10-11 11:22:34'), new Date('2018-11-12 11:22:33')]);
      vi.spyOn(fixtureInstance, 'nzOnPanelChange').mockImplementation(() => {});
      await stabilize();
      openPickerByClickTrigger();
      dispatchMouseEvent(getSuperPreBtn('left'), 'click');
      fixture.detectChanges();
      expect(fixtureInstance.nzOnPanelChange).toHaveBeenCalledWith({
        mode: ['date', 'date'],
        date: [new Date('2017-10-11 11:22:34'), new Date('2017-11-11 11:22:34')]
      });
    });

    it('should support nzOnPanelChange when click on super next button', async () => {
      fixtureInstance.modelValue.set([new Date('2018-10-11 11:22:34'), new Date('2018-11-12 11:22:33')]);
      vi.spyOn(fixtureInstance, 'nzOnPanelChange').mockImplementation(() => {});
      await stabilize();
      openPickerByClickTrigger();
      dispatchMouseEvent(getSuperNextBtn('left'), 'click');
      fixture.detectChanges();
      expect(fixtureInstance.nzOnPanelChange).toHaveBeenCalledWith({
        mode: ['date', 'date'],
        date: [new Date('2019-10-11 11:22:34'), new Date('2019-11-11 11:22:34')]
      });
    });

    it('should support nzOnOk', async () => {
      vi.spyOn(fixtureInstance, 'nzOnOk').mockImplementation(() => {});
      fixtureInstance.modelValue.set([new Date('2018-11-11 11:22:33'), new Date('2018-12-12 11:22:33')]);
      fixtureInstance.nzShowTime.set(true);
      await stabilize();
      openPickerByClickTrigger();

      // Click ok button
      dispatchMouseEvent(overlayContainerElement.querySelector('.ant-picker-ok > button')!, 'click');
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      expect(fixtureInstance.nzOnOk).toHaveBeenCalledWith(fixtureInstance.modelValue());
    });

    it('should select date from start to end with side effects', async () => {
      const initial = [new Date('2018-05-15'), new Date('2018-06-15')];
      fixtureInstance.modelValue.set(initial);
      fixtureInstance.nzDisabledDate.set((current: Date) => differenceInDays(current, initial[0]) < 0);
      fixtureInstance.nzShowTime.set(true);
      await stabilize();
      openPickerByClickTrigger();

      // Click start date
      const startDate = queryFromOverlay('.ant-picker-panel td.ant-picker-cell-selected');
      dispatchMouseEvent(startDate, 'click');
      fixture.detectChanges();
      expect(startDate.classList.contains('ant-picker-cell-selected')).toBeTruthy();
    });

    it('should display expected date when the range values are the same day (include the scenario of timepicker)', async () => {
      fixtureInstance.modelValue.set([new Date('2018-05-15'), new Date('2018-05-15')]);
      fixtureInstance.nzShowTime.set(true);
      await stabilize();
      openPickerByClickTrigger();

      expect(getHeaderMonthBtn().textContent).toContain('5');
    });

    it('should support nzRanges', () => {
      const today = new Date();
      const nzOnChange = vi.spyOn(fixtureInstance, 'modelValueChange').mockImplementation(() => {});
      fixtureInstance.nzRanges.set({ Today: [today, today] });
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
      vi.advanceTimersByTime(500);
      fixture.detectChanges();
      expect(queryFromOverlay('.ant-picker-panel td.ant-picker-cell-selected')).toBeFalsy();

      // selector = queryFromOverlay('.ant-picker-range-quick-selector > a');
      dispatchMouseEvent(selector, 'click');
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();
      expect(nzOnChange).toHaveBeenCalled();
      expect(getPickerContainer()).toBeFalsy();
    });

    it('should custom input date range', () => {
      const nzOnChange = vi.spyOn(fixtureInstance, 'modelValueChange').mockImplementation(() => {});
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
      vi.advanceTimersByTime(500);
      fixture.detectChanges();
      expect(nzOnChange).toHaveBeenCalled();
      const result = (nzOnChange.mock.calls[0] as Date[][])[0];
      expect(result[0].getDate()).toBe(11);
      expect(result[1].getDate()).toBe(12);
    });

    it('should custom input time range', () => {
      const nzOnChange = vi.spyOn(fixtureInstance, 'modelValueChange').mockImplementation(() => {});
      fixtureInstance.modelValue.set([new Date('2019-11-11 11:22:33'), new Date('2019-12-12 11:22:33')]);
      fixtureInstance.nzShowTime.set(true);
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
      vi.advanceTimersByTime(500);
      expect(nzOnChange).toHaveBeenCalledWith([new Date(newDateString[0]), new Date(newDateString[1])]);
    });

    it('if sort order is wrong, output in reverse order', () => {
      const nzOnChange = vi.spyOn(fixtureInstance, 'modelValueChange').mockImplementation(() => {});
      fixtureInstance.modelValue.set([]);
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
      vi.advanceTimersByTime(500);
      expect(nzOnChange).toHaveBeenCalledWith([new Date(newDateString[0]), new Date(newDateString[1])]);
    });

    it('should not change value when click ESC', () => {
      fixtureInstance.modelValue.set([new Date('2018-09-11'), new Date('2020-09-12')]);
      fixture.detectChanges();
      vi.advanceTimersByTime(0); // Wait writeValue() tobe done
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
      vi.advanceTimersByTime(10000);
      fixture.detectChanges();
      // TODO: input value should not be change
      // expect(leftInput.value).toBe('2018-09-11');
    });

    it('should auto sort range value when start is after end', async () => {
      await stabilize();
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
      await stabilize(10000);
      expect(leftInput.value).toBe('2018-02-06');
      expect(rightInput.value).toBe('2019-08-10');
    });

    it('should panel date follows the selected date', () => {
      fixtureInstance.nzShowTime.set(true);
      fixture.detectChanges();
      openPickerByClickTrigger();

      const leftInput = getPickerInput(fixture.debugElement);
      typeInElement('2027-09-17 11:08:22', leftInput);
      fixture.detectChanges();
      leftInput.dispatchEvent(ENTER_EVENT);
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();
      expect(getHeaderYearBtn('left').textContent).toContain('2027');
      // panel month will increase 1
      expect(getHeaderMonthBtn().textContent).toContain('9');
    });
  }); // /specified date picker testing

  describe('ngModel value accessors', () => {
    beforeEach(() => fixtureInstance.useSuite.set(3));

    it('should specified date provide by "modelValue" be chosen', async () => {
      fixtureInstance.modelValue.set([new Date('2018-11-11'), new Date('2018-12-12')]);
      await stabilize();
      expect(getFirstSelectedDayCell().textContent!.trim()).toBe('11');

      // Click the first cell to change ngModel
      const left = getFirstCell('left');
      const right = getFirstCell('right');
      const leftText = left.textContent!.trim();
      dispatchMouseEvent(left, 'click');
      fixture.detectChanges();
      dispatchMouseEvent(right, 'click');
      fixture.detectChanges();
      expect((fixtureInstance.modelValue() as Date[])[0]!.getDate()).toBe(+leftText);
    });
  });

  describe('week mode', () => {
    beforeEach(() => {
      fixtureInstance.useSuite.set(1);
      fixtureInstance.nzMode.set('week');
    });

    it('should support week row style', () => {
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
      vi.advanceTimersByTime(500);
      fixture.detectChanges();
      expect(getPickerContainer()).toBeNull();
    });
  });

  describe('month mode', () => {
    beforeEach(() => {
      fixtureInstance.useSuite.set(1);
      fixtureInstance.nzMode.set('month');
    });

    it('should support month cell style', () => {
      fixture.detectChanges();
      openPickerByClickTrigger();

      const left = getFirstCell('left'); // Use the first cell
      dispatchMouseEvent(left, 'click');
      fixture.detectChanges();
      const rightThirdRowCell = queryFromRightPanel('table tr:nth-child(3) td.ant-picker-cell');
      dispatchMouseEvent(rightThirdRowCell, 'mouseenter');
      fixture.detectChanges();
      expect(rightThirdRowCell.classList.contains('ant-picker-cell-range-hover-end')).toBeTruthy();
    });
  });

  describe('year mode', () => {
    beforeEach(() => {
      fixtureInstance.useSuite.set(1);
      fixtureInstance.nzMode.set('year');
    });

    it('should support year cell style', () => {
      fixture.detectChanges();
      openPickerByClickTrigger();

      const left = getFirstCell('left');
      dispatchMouseEvent(left, 'click');
      fixture.detectChanges();
      const rightThirdRowCell = queryFromRightPanel('table tr:nth-child(3) td.ant-picker-cell');
      dispatchMouseEvent(rightThirdRowCell, 'mouseenter');
      fixture.detectChanges();
      expect(rightThirdRowCell.classList.contains('ant-picker-cell-range-hover-end')).toBeTruthy();
    });
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

    it('should classname correct', () => {
      expect(rangePickerElement.classList).toContain('ant-picker-status-error');

      fixtureStatusInstance.status.set('warning');
      fixtureStatus.detectChanges();
      expect(rangePickerElement.classList).toContain('ant-picker-status-warning');

      fixtureStatusInstance.status.set('');
      fixtureStatus.detectChanges();
      expect(rangePickerElement.classList).not.toContain('ant-picker-status-warning');
    });
  });

  ////////////

  function getCssIndex(part: RangePartType): string {
    return part === 'left' ? 'first-child' : 'last-child';
  }

  function getPickerContainer(): HTMLElement {
    return queryFromOverlay('.ant-picker-panel-container') as HTMLElement;
  }

  async function stabilize(ms = 500): Promise<void> {
    fixture.detectChanges();
    vi.advanceTimersByTime(ms);
    await Promise.resolve();
    fixture.detectChanges();
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
    vi.advanceTimersByTime(500);
    fixture.detectChanges();
    dispatchFakeEvent(getPickerInput(fixture.debugElement), 'focus');
    fixture.detectChanges();
    vi.advanceTimersByTime(500);
    fixture.detectChanges();
  }

  function openRightPickerByClickTrigger(): void {
    dispatchMouseEvent(getRangePickerRightInput(fixture.debugElement), 'click');
    fixture.detectChanges();
    vi.advanceTimersByTime(500);
    fixture.detectChanges();
    dispatchFakeEvent(getRangePickerRightInput(fixture.debugElement), 'focus');
    fixture.detectChanges();
    vi.advanceTimersByTime(500);
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

    @switch (useSuite()) {
      @case (1) {
        <nz-range-picker
          [nzAllowClear]="nzAllowClear()"
          [nzAutoFocus]="nzAutoFocus()"
          [nzDisabled]="nzDisabled()"
          [nzDisabledDate]="$any(nzDisabledDate())"
          [nzLocale]="nzLocale()"
          [nzPlaceHolder]="$any(nzPlaceHolder())"
          [nzPopupStyle]="$any(nzPopupStyle())"
          [nzDropdownClassName]="nzDropdownClassName()"
          [nzSize]="$any(nzSize())"
          [nzSeparator]="nzSeparator()"
          (nzOnOpenChange)="nzOnOpenChange($event)"
          [(ngModel)]="modelValue"
          (ngModelChange)="modelValueChange($event)"
          [nzDateRender]="nzDateRender()"
          [nzDisabledTime]="nzDisabledTime()"
          [nzRenderExtraFooter]="nzRenderExtraFooter()"
          [nzShowToday]="nzShowToday"
          [nzShowNow]="nzShowNow"
          [nzMode]="nzMode()"
          [nzRanges]="nzRanges()"
          [nzDefaultPickerValue]="$any(nzDefaultPickerValue())"
          [nzInline]="nzInline()"
          (nzOnPanelChange)="nzOnPanelChange($event)"
          (nzOnCalendarChange)="nzOnCalendarChange($event)"
          [nzShowTime]="nzShowTime()"
          (nzOnOk)="nzOnOk($event)"
        />
      }
      @case (2) {
        <nz-range-picker [nzOpen]="nzOpen()" />
      }
      @case (3) {
        <nz-range-picker nzOpen [(ngModel)]="modelValue" />
      }
      @case (4) {
        <nz-range-picker [(ngModel)]="modelValue" />
        <nz-date-picker [ngModel]="singleValue" />
      }
      @case (5) {
        <nz-range-picker nzOpen />
      }
      @case (6) {
        <nz-range-picker [nzSeparator]="separatorTemplate" />
      }
    }
  `
})
class NzTestRangePickerComponent {
  readonly useSuite = signal<1 | 2 | 3 | 4 | 5 | 6 | undefined>(undefined);
  @ViewChild('tplDateRender', { static: true }) tplDateRender!: TemplateRef<Date>;
  @ViewChild('tplExtraFooter', { static: true }) tplExtraFooter!: TemplateRef<void>;

  // --- Suite 1
  readonly nzAllowClear = signal<boolean>(false);
  readonly nzAutoFocus = signal<boolean>(false);
  readonly nzDisabled = signal<boolean>(false);
  readonly nzDisabledDate = signal<((d: Date) => boolean) | undefined>(undefined);
  readonly nzLocale = signal<NzSafeAny>(undefined);
  readonly nzPlaceHolder = signal<string[] | undefined>(undefined);
  readonly nzPopupStyle = signal<NgStyleInterface | undefined>(undefined);
  readonly nzDropdownClassName = signal<string | undefined>(undefined);
  readonly nzSize = signal<NzDatePickerSizeType | undefined>(undefined);

  nzOnOpenChange(_: boolean): void {}

  readonly modelValue = signal<CompatibleDate>([]);

  modelValueChange(_: Date[]): void {}

  readonly nzDefaultPickerValue = signal<CompatibleDate | undefined>(undefined);
  readonly nzSeparator = signal<string | undefined>(undefined);
  readonly nzInline = signal<boolean>(false);

  readonly nzDateRender = signal<NzSafeAny>(undefined);
  readonly nzShowTime = signal<boolean | object>(false);
  readonly nzDisabledTime = signal<NzSafeAny>(undefined);
  readonly nzRenderExtraFooter = signal<string | (() => TemplateRef<void> | string) | undefined>(undefined);
  nzShowToday = false;
  nzShowNow = false;
  readonly nzMode = signal('date');

  readonly nzRanges = signal<NzSafeAny>(undefined);
  nzOnPanelChange(_: NzPanelChangeType): void {}

  nzOnCalendarChange(_: Array<Date | null>): void {}

  nzOnOk(_: CompatibleDate | null): void {}

  // --- Suite 2
  readonly nzOpen = signal<boolean>(false);

  // --- Suite 4
  singleValue!: Date;
}

@Component({
  selector: 'nz-test-range-picker-status',
  imports: [NzDatePickerModule],
  template: `<nz-range-picker [nzStatus]="status()" />`
})
class NzTestRangePickerStatusComponent {
  readonly status = signal<NzStatus>('error');
}
