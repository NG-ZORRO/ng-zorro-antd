import { ESCAPE } from '@angular/cdk/keycodes';
import { OverlayContainer } from '@angular/cdk/overlay';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { Component, DebugElement, TemplateRef, ViewChild } from '@angular/core';
import { fakeAsync, flush, inject, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import isSameDay from 'date-fns/is_same_day';

import { dispatchKeyboardEvent, dispatchMouseEvent } from '../core/testing';
import en_US from '../i18n/languages/en_US';
import { NzI18nModule } from '../i18n/nz-i18n.module';
import { NzI18nService } from '../i18n/nz-i18n.service';
import { NzDatePickerModule } from './date-picker.module';
import { PickerResultSingle } from './standard-types';

registerLocaleData(zh);

describe('NzDatePickerComponent', () => {
  let fixture: ComponentFixture<NzTestDatePickerComponent>;
  let fixtureInstance: NzTestDatePickerComponent;
  let debugElement: DebugElement;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;
  let i18nService: NzI18nService;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports     : [ FormsModule, NoopAnimationsModule, NzDatePickerModule, NzI18nModule ],
      providers   : [],
      declarations: [
        NzTestDatePickerComponent
      ]
    });

    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NzTestDatePickerComponent);
    fixtureInstance = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  beforeEach(inject([ OverlayContainer, NzI18nService ], (oc: OverlayContainer, i18n: NzI18nService) => {
    overlayContainer = oc;
    overlayContainerElement = oc.getContainerElement();
    i18nService = i18n;
  }));

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  describe('general api testing', () => {
    beforeEach(() => fixtureInstance.useSuite = 1);

    it('should open by click and close by click at outside', fakeAsync(() => {
      fixture.detectChanges();
      dispatchMouseEvent(getPickerTriggerWrapper(), 'click');
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

    it('should support changing language at runtime', fakeAsync(() => {
      fixture.detectChanges();
      expect(getPickerTrigger().placeholder).toBe('请选择日期');
      i18nService.setLocale(en_US);
      fixture.detectChanges();
      expect(getPickerTrigger().placeholder).toBe('Select date');

      dispatchMouseEvent(getPickerTriggerWrapper(), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect((queryFromOverlay('.ant-calendar-date-input-wrap input.ant-calendar-input') as HTMLInputElement).placeholder).toBe('Select date');
      expect(queryFromOverlay('.ant-calendar-table .ant-calendar-column-header-inner').textContent).toContain('Su');
    }));

    /* Issue https://github.com/NG-ZORRO/ng-zorro-antd/issues/1539 */
    it('should be openable after closed by "Escape" key', fakeAsync(() => {
      fixture.detectChanges();
      dispatchMouseEvent(getPickerTriggerWrapper(), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(getPickerContainer()).not.toBeNull();

      dispatchKeyboardEvent(document.body, 'keydown', ESCAPE);
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(getPickerContainer()).toBeNull();

      dispatchMouseEvent(getPickerTriggerWrapper(), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(getPickerContainer()).not.toBeNull();
    }));

    it('should support nzAllowClear and work properly', fakeAsync(() => {
      const clearBtnSelector = By.css('nz-picker i.ant-calendar-picker-clear');
      const initial = fixtureInstance.nzValue = new Date();
      fixtureInstance.nzAllowClear = false;
      fixture.detectChanges();
      expect(debugElement.query(clearBtnSelector)).toBeFalsy();

      fixtureInstance.nzAllowClear = true;
      tick(500);
      fixture.detectChanges();
      expect(fixtureInstance.nzValue).toBe(initial);
      expect(debugElement.query(clearBtnSelector)).toBeDefined();

      const nzOnChange = spyOn(fixtureInstance, 'nzOnChange');
      debugElement.query(clearBtnSelector).nativeElement.click();
      fixture.detectChanges();
      expect(fixtureInstance.nzValue).toBe(initial);
      expect(nzOnChange).toHaveBeenCalledWith(null);
      expect(debugElement.query(clearBtnSelector)).toBeFalsy();
    }));

    it('should support nzAutoFocus', () => {
      fixtureInstance.nzAutoFocus = true;
      fixture.detectChanges();
      expect(getPickerTrigger() === document.activeElement).toBeTruthy();
    });

    it('should support nzDisabled', fakeAsync(() => {
      // Make sure picker clear button shown up
      fixtureInstance.nzAllowClear = true;
      fixtureInstance.nzValue = new Date();

      fixtureInstance.nzDisabled = true;
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(debugElement.query(By.css('nz-picker .ant-input-disabled'))).toBeDefined();
      expect(debugElement.query(By.css('nz-picker i.ant-calendar-picker-clear'))).toBeNull();

      fixtureInstance.nzDisabled = false;
      tick(500);
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
      fixtureInstance.nzValue = new Date('2018-11-11 12:12:12');
      fixtureInstance.nzDisabledDate = (current: Date) => isSameDay(current, compareDate);
      fixture.detectChanges();
      dispatchMouseEvent(getPickerTriggerWrapper(), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      const disabledCell = queryFromOverlay('tbody.ant-calendar-tbody td.ant-calendar-disabled-cell');
      expect(disabledCell.textContent.trim()).toBe('15');
    }));

    it('should support nzLocale', () => {
      const featureKey = 'TEST_PLACEHOLDER';
      fixtureInstance.nzLocale = { lang: { placeholder: featureKey } };
      fixture.detectChanges();
      expect(getPickerTrigger().getAttribute('placeholder')).toBe(featureKey);
    });

    it('should support nzPlaceHolder', () => {
      const featureKey = fixtureInstance.nzPlaceHolder = 'TEST_PLACEHOLDER';
      fixture.detectChanges();
      expect(getPickerTrigger().getAttribute('placeholder')).toBe(featureKey);
    });

    it('should support nzPopupStyle', fakeAsync(() => {
      fixtureInstance.nzPopupStyle = { color: 'red' };
      fixture.detectChanges();
      dispatchMouseEvent(getPickerTriggerWrapper(), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(getPickerContainer().style.color).toBe('red');
    }));

    it('should support nzDropdownClassName', fakeAsync(() => {
      const keyCls = fixtureInstance.nzDropdownClassName = 'my-test-class';
      fixture.detectChanges();
      dispatchMouseEvent(getPickerTriggerWrapper(), 'click');
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

    it('should support nzOnOpenChange', () => {
      const nzOnOpenChange = spyOn(fixtureInstance, 'nzOnOpenChange');
      fixture.detectChanges();
      dispatchMouseEvent(getPickerTriggerWrapper(), 'click');
      fixture.detectChanges();
      expect(nzOnOpenChange).toHaveBeenCalledWith(true);

      dispatchMouseEvent(queryFromOverlay('.cdk-overlay-backdrop'), 'click');
      fixture.detectChanges();
      expect(nzOnOpenChange).toHaveBeenCalledWith(false);
      expect(nzOnOpenChange).toHaveBeenCalledTimes(2);
    });

    it('should not emit nzOnOpenChange second time when input clicked twice', () => {
      const nzOnOpenChange = spyOn(fixtureInstance, 'nzOnOpenChange');

      fixture.detectChanges();
      dispatchMouseEvent(getPickerTriggerWrapper(), 'click');
      dispatchMouseEvent(getPickerTriggerWrapper(), 'click');
      fixture.detectChanges();

      expect(nzOnOpenChange).toHaveBeenCalledWith(true);
      expect(nzOnOpenChange).toHaveBeenCalledTimes(1);
    });

    it('should not emit nzOnOpenChange when nzOpen is false and input is clicked', () => {
      const nzOnOpenChange = spyOn(fixtureInstance, 'nzOnOpenChange');
      fixtureInstance.useSuite = 2;
      fixtureInstance.nzOpen = false;

      fixture.detectChanges();
      dispatchMouseEvent(getPickerTriggerWrapper(), 'click');
      fixture.detectChanges();

      expect(nzOnOpenChange).not.toHaveBeenCalledWith(true);
    });

    it('should support nzValue', fakeAsync(() => {
      fixtureInstance.nzValue = new Date('2018-11-11');
      fixture.detectChanges();
      dispatchMouseEvent(getPickerTriggerWrapper(), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(getSelectedDayCell().textContent.trim()).toBe('11');
    }));

    it('should support nzOnChange', fakeAsync(() => {
      fixtureInstance.nzValue = new Date('2018-11-11');
      const nzOnChange = spyOn(fixtureInstance, 'nzOnChange');
      fixture.detectChanges();
      dispatchMouseEvent(getPickerTriggerWrapper(), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();

      const cell = getFirstCell(); // Use the first cell
      const cellText = cell.textContent.trim();
      dispatchMouseEvent(cell, 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(nzOnChange).toHaveBeenCalled();
      const result = nzOnChange.calls.allArgs()[ 0 ][ 0 ];
      expect(result.getDate()).toBe(+cellText);
    }));

  });

  describe('panel switch and move forward/afterward', () => {
    beforeEach(() => fixtureInstance.useSuite = 1);

    it('should support date panel changes', fakeAsync(() => {
      fixtureInstance.nzValue = new Date('2018-11-11');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      openPickerByClickTrigger();
      // Click previous year button
      dispatchMouseEvent(queryFromOverlay('.ant-calendar-prev-year-btn'), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(queryFromOverlay('.ant-calendar-year-select').textContent.indexOf('2017') > -1).toBeTruthy();
      // Click next year button * 2
      dispatchMouseEvent(queryFromOverlay('.ant-calendar-next-year-btn'), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      dispatchMouseEvent(queryFromOverlay('.ant-calendar-next-year-btn'), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(queryFromOverlay('.ant-calendar-year-select').textContent.indexOf('2019') > -1).toBeTruthy();
      // Click previous month button
      dispatchMouseEvent(queryFromOverlay('.ant-calendar-prev-month-btn'), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(queryFromOverlay('.ant-calendar-month-select').textContent.indexOf('10') > -1).toBeTruthy();
      // Click next month button * 2
      dispatchMouseEvent(queryFromOverlay('.ant-calendar-next-month-btn'), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      dispatchMouseEvent(queryFromOverlay('.ant-calendar-next-month-btn'), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(queryFromOverlay('.ant-calendar-month-select').textContent.indexOf('12') > -1).toBeTruthy();
    }));

    it('should support month panel changes', fakeAsync(() => {
      fixtureInstance.nzValue = new Date('2018-11-11');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      openPickerByClickTrigger();
      // Click month select to show month panel
      dispatchMouseEvent(queryFromOverlay('.ant-calendar-header .ant-calendar-month-select'), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(queryFromOverlay('.ant-calendar-header .ant-calendar-month-panel')).toBeDefined();
      expect(queryFromOverlay('.ant-calendar-month-panel-year-select-content').textContent.indexOf('2018') > -1).toBeTruthy();
      // Goto previous year
      dispatchMouseEvent(queryFromOverlay('.ant-calendar-month-panel-prev-year-btn'), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(queryFromOverlay('.ant-calendar-month-panel-year-select-content').textContent.indexOf('2017') > -1).toBeTruthy();
      // Goto next year * 2
      dispatchMouseEvent(queryFromOverlay('.ant-calendar-month-panel-next-year-btn'), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      dispatchMouseEvent(queryFromOverlay('.ant-calendar-month-panel-next-year-btn'), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(queryFromOverlay('.ant-calendar-month-panel-year-select-content').textContent.indexOf('2019') > -1).toBeTruthy();
      // Click to choose a year to change panel
      dispatchMouseEvent(queryFromOverlay('td.ant-calendar-month-panel-selected-cell'), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(queryFromOverlay('.ant-calendar-header .ant-calendar-month-panel')).toBeFalsy();
    }));

    it('should support year panel changes', fakeAsync(() => {
      fixtureInstance.nzValue = new Date('2018-11-11');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      openPickerByClickTrigger();
      // Click year select to show year panel
      dispatchMouseEvent(queryFromOverlay('.ant-calendar-header .ant-calendar-year-select'), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(queryFromOverlay('.ant-calendar-header .ant-calendar-year-panel')).toBeDefined();
      expect(queryFromOverlay('.ant-calendar-year-panel-decade-select-content').textContent.indexOf('2010') > -1).toBeTruthy();
      expect(queryFromOverlay('.ant-calendar-year-panel-decade-select-content').textContent.indexOf('2019') > -1).toBeTruthy();
      // Coverage for last/next cell
      dispatchMouseEvent(queryFromOverlay('.ant-calendar-year-panel-last-decade-cell'), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      dispatchMouseEvent(queryFromOverlay('.ant-calendar-year-panel-next-decade-cell'), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      // Goto previous decade
      dispatchMouseEvent(queryFromOverlay('.ant-calendar-year-panel-prev-decade-btn'), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(queryFromOverlay('.ant-calendar-year-panel-decade-select-content').textContent.indexOf('2000') > -1).toBeTruthy();
      expect(queryFromOverlay('.ant-calendar-year-panel-decade-select-content').textContent.indexOf('2009') > -1).toBeTruthy();
      // Goto next decade * 2
      dispatchMouseEvent(queryFromOverlay('.ant-calendar-year-panel-next-decade-btn'), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      dispatchMouseEvent(queryFromOverlay('.ant-calendar-year-panel-next-decade-btn'), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(queryFromOverlay('.ant-calendar-year-panel-decade-select-content').textContent.indexOf('2020') > -1).toBeTruthy();
      expect(queryFromOverlay('.ant-calendar-year-panel-decade-select-content').textContent.indexOf('2029') > -1).toBeTruthy();
      // Click to choose a year to change panel
      dispatchMouseEvent(queryFromOverlay('td.ant-calendar-year-panel-selected-cell'), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(queryFromOverlay('.ant-calendar-header .ant-calendar-year-panel')).toBeFalsy();
    }));

    it('should support decade panel changes', fakeAsync(() => {
      fixtureInstance.nzValue = new Date('2018-11-11');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      openPickerByClickTrigger();
      // Click to show decade panel
      dispatchMouseEvent(queryFromOverlay('.ant-calendar-header .ant-calendar-year-select'), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      dispatchMouseEvent(queryFromOverlay('.ant-calendar-header .ant-calendar-year-panel-decade-select'), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(queryFromOverlay('.ant-calendar-header .ant-calendar-decade-panel')).toBeDefined();
      // Coverage for last/next cell
      dispatchMouseEvent(queryFromOverlay('.ant-calendar-decade-panel-next-century-cell'), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      dispatchMouseEvent(queryFromOverlay('.ant-calendar-decade-panel-last-century-cell'), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      // Goto previous century
      dispatchMouseEvent(queryFromOverlay('.ant-calendar-decade-panel-prev-century-btn'), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(queryFromOverlay('.ant-calendar-decade-panel-century').textContent.indexOf('1900') > -1).toBeTruthy();
      expect(queryFromOverlay('.ant-calendar-decade-panel-century').textContent.indexOf('1999') > -1).toBeTruthy();
      // Goto next century * 2
      dispatchMouseEvent(queryFromOverlay('.ant-calendar-decade-panel-next-century-btn'), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      dispatchMouseEvent(queryFromOverlay('.ant-calendar-decade-panel-next-century-btn'), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(queryFromOverlay('.ant-calendar-decade-panel-century').textContent.indexOf('2100') > -1).toBeTruthy();
      expect(queryFromOverlay('.ant-calendar-decade-panel-century').textContent.indexOf('2199') > -1).toBeTruthy();
      // Click to choose a decade to change panel
      dispatchMouseEvent(queryFromOverlay('td.ant-calendar-decade-panel-selected-cell'), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(queryFromOverlay('.ant-calendar-header .ant-calendar-year-panel')).toBeDefined();
    }));

  }); // /panel switch and move forward/afterward

  describe('specified date picker testing', () => {
    beforeEach(() => fixtureInstance.useSuite = 1);

    it('should support nzDateRender', fakeAsync(() => {
      fixtureInstance.nzDateRender = fixtureInstance.tplDateRender;
      fixture.detectChanges();
      dispatchMouseEvent(getPickerTriggerWrapper(), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(queryFromOverlay('.test-first-day').textContent.trim()).toBe('1');
    }));

    it('should support nzDateRender with typeof function', fakeAsync(() => {
      const featureKey = 'TEST_FIRST_DAY';
      fixtureInstance.nzDateRender = (d: Date) => d.getDate() === 1 ? featureKey : d.getDate();
      fixture.detectChanges();
      dispatchMouseEvent(getPickerTriggerWrapper(), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(overlayContainerElement.textContent.indexOf(featureKey) > -1).toBeTruthy();
    }));

    it('should support nzShowTime', fakeAsync(() => {
      const nzOnChange = spyOn(fixtureInstance, 'nzOnChange');
      fixtureInstance.nzValue = new Date('2018-11-11 11:22:33');
      fixtureInstance.nzShowTime = true;
      fixture.detectChanges();
      openPickerByClickTrigger();
      expect(queryFromOverlay('.ant-calendar-time-picker-btn')).toBeDefined();
      expect(queryFromOverlay('.ant-calendar-ok-btn')).toBeDefined();

      // Open time picker panel
      dispatchMouseEvent(queryFromOverlay('.ant-calendar-time-picker-btn'), 'click');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(queryFromOverlay('.ant-calendar-time-picker-inner.ant-calendar-time-picker-column-3')).toBeDefined();
      expect(queryFromOverlay('.ant-calendar-time-picker-select:first-child li.ant-calendar-time-picker-select-option-selected').textContent.trim()).toBe('11');

      // Click to choose a hour
      dispatchMouseEvent(queryFromOverlay('.ant-calendar-time-picker-select:first-child li:first-child'), 'click');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect((queryFromOverlay('input.ant-calendar-input') as HTMLInputElement).value).toBe('2018-11-11 00:22:33');
    }));

    it('should support nzShowTime.nzFormat', fakeAsync(() => {
      fixtureInstance.nzShowTime = { nzFormat: 'HH:mm' };
      fixture.detectChanges();
      openPickerByClickTrigger();

      // Open time picker panel
      dispatchMouseEvent(queryFromOverlay('.ant-calendar-time-picker-btn'), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(queryFromOverlay('.ant-calendar-time-picker-inner.ant-calendar-time-picker-column-2')).toBeDefined();
    }));

    it('should support nzDisabledTime and nzShowTime.nzHideDisabledOptions', fakeAsync(() => {
      fixtureInstance.nzShowTime = true;
      fixtureInstance.nzDisabledTime = (current: Date) => {
        return {
          nzDisabledHours  : () => [ 0, 1, 2 ],
          nzDisabledMinutes: () => [ 0, 1 ],
          nzDisabledSeconds: () => [ 0 ]
        };
      };
      fixture.detectChanges();
      openPickerByClickTrigger();

      // Open time picker panel
      dispatchMouseEvent(queryFromOverlay('.ant-calendar-time-picker-btn'), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(queryFromOverlay('.ant-calendar-time-picker-select:nth-child(1) li:nth-child(3)').classList.contains('ant-calendar-time-picker-select-option-disabled')).toBeTruthy();
      expect(queryFromOverlay('.ant-calendar-time-picker-select:nth-child(2) li:nth-child(2)').classList.contains('ant-calendar-time-picker-select-option-disabled')).toBeTruthy();
      expect(queryFromOverlay('.ant-calendar-time-picker-select:nth-child(3) li:nth-child(1)').classList.contains('ant-calendar-time-picker-select-option-disabled')).toBeTruthy();

      // Use nzHideDisabledOptions to hide disabled times
      fixtureInstance.nzShowTime = { nzHideDisabledOptions: true };
      fixture.detectChanges();
      expect(+queryFromOverlay('.ant-calendar-time-picker-select:nth-child(1) li:first-child').textContent.trim()).toBe(3);
      expect(+queryFromOverlay('.ant-calendar-time-picker-select:nth-child(2) li:first-child').textContent.trim()).toBe(2);
      expect(+queryFromOverlay('.ant-calendar-time-picker-select:nth-child(3) li:first-child').textContent.trim()).toBe(1);
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

    it('should support nzShowToday', fakeAsync(() => {
      fixture.detectChanges();
      openPickerByClickTrigger();
      expect(overlayContainerElement.querySelector('.ant-calendar-footer')).toBeDefined();

      fixtureInstance.nzShowToday = true;
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-calendar-today-btn ')).toBeDefined();

      // Click today button
      const nzOnChange = spyOn(fixtureInstance, 'nzOnChange');
      dispatchMouseEvent(queryFromOverlay('.ant-calendar-today-btn'), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      const result = nzOnChange.calls.allArgs()[ 0 ][ 0 ];
      expect(isSameDay(new Date(), result)).toBeTruthy();
      expect(queryFromOverlay('.ant-calendar-picker-container')).toBeFalsy(); // Should closed
    }));

    it('should support nzMode', fakeAsync(() => {
      fixtureInstance.nzMode = 'month';
      fixture.detectChanges();
      openPickerByClickTrigger();
      expect(overlayContainerElement.querySelector('.ant-calendar-header .ant-calendar-month-panel')).toBeDefined();
    }));

    it('should support nzOnPanelChange', fakeAsync(() => {
      spyOn(fixtureInstance, 'nzOnPanelChange');
      fixture.detectChanges();
      openPickerByClickTrigger();

      // Click header to month panel
      dispatchMouseEvent(overlayContainerElement.querySelector('.ant-calendar-header .ant-calendar-month-select'), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(fixtureInstance.nzOnPanelChange).toHaveBeenCalledWith('month');
    }));

    it('should support nzOnOk', fakeAsync(() => {
      spyOn(fixtureInstance, 'nzOnOk');
      fixtureInstance.nzValue = new Date('2018-11-11 11:22:33');
      fixtureInstance.nzShowTime = true;
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      openPickerByClickTrigger();

      // Click ok button
      dispatchMouseEvent(overlayContainerElement.querySelector('.ant-calendar-ok-btn'), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(fixtureInstance.nzOnOk).toHaveBeenCalledWith(fixtureInstance.nzValue);
    }));

    it('should custom input date', fakeAsync(() => {
      const nzOnChange = spyOn(fixtureInstance, 'nzOnChange');
      fixture.detectChanges();
      openPickerByClickTrigger();
      const input = queryFromOverlay('.ant-calendar-date-input-wrap input.ant-calendar-input') as HTMLInputElement;

      // Wrong inputing support
      input.value = 'wrong';
      input.dispatchEvent(new KeyboardEvent('keyup'));
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(input.classList.contains('ant-calendar-input-invalid')).toBeTruthy();

      // Correct inputing
      input.value = '2018-11-22';
      input.dispatchEvent(new KeyboardEvent('keyup'));
      // dispatchKeyboardEvent(input, 'keyup', ENTER); // Not working?
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(nzOnChange).toHaveBeenCalled();
      const result = nzOnChange.calls.allArgs()[ 0 ][ 0 ];
      expect(result.getDate()).toBe(22);
    }));

  }); // /specified date picker testing

  describe('ngModel value accesors', () => {
    beforeEach(() => fixtureInstance.useSuite = 3);

    it('should specified date provide by "modelValue" be choosed', fakeAsync(() => {
      fixtureInstance.modelValue = new Date('2018-11-11');
      fixture.detectChanges();
      flush(); // Wait writeValue() tobe done
      fixture.detectChanges();
      expect(getSelectedDayCell().textContent.trim()).toBe('11');

      // Click the first cell to change ngModel
      const cell = getFirstCell();
      const cellText = cell.textContent.trim();
      dispatchMouseEvent(cell, 'click');
      fixture.detectChanges();
      expect(fixtureInstance.modelValue.getDate()).toBe(+cellText);
    }));
  });

  ////////////

  function getPicker(): HTMLElement {
    return debugElement.query(By.css('nz-picker .ant-calendar-picker')).nativeElement as HTMLElement;
  }

  function getPickerTrigger(): HTMLInputElement {
    return debugElement.query(By.css('nz-picker input.ant-calendar-picker-input')).nativeElement as HTMLInputElement;
  }

  function getPickerTriggerWrapper(): HTMLInputElement {
    return debugElement.query(By.css('nz-picker .ant-calendar-picker')).nativeElement as HTMLInputElement;
  }

  function getPickerContainer(): HTMLElement {
    return queryFromOverlay('.ant-calendar-picker-container') as HTMLElement;
  }

  function getSelectedDayCell(): HTMLElement {
    return queryFromOverlay('tbody.ant-calendar-tbody td.ant-calendar-selected-day') as HTMLElement;
  }

  function getFirstCell(): HTMLElement {
    return queryFromOverlay('tbody.ant-calendar-tbody td.ant-calendar-cell') as HTMLElement;
  }

  function queryFromOverlay(selector: string): HTMLElement {
    return overlayContainerElement.querySelector(selector) as HTMLElement;
  }

  function openPickerByClickTrigger(): void {
    dispatchMouseEvent(getPickerTriggerWrapper(), 'click');
    fixture.detectChanges();
    tick(500);
    fixture.detectChanges();
  }

});

@Component({
  template: `
    <ng-container [ngSwitch]="useSuite">
      <!-- Suite 1 -->
      <nz-date-picker *ngSwitchCase="1"
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

        [ngModel]="nzValue"
        (ngModelChange)="nzOnChange($event)"

        [nzDateRender]="nzDateRender"
        [nzDisabledTime]="nzDisabledTime"
        [nzRenderExtraFooter]="nzRenderExtraFooter"
        [nzShowToday]="nzShowToday"
        [nzMode]="nzMode"
        (nzOnPanelChange)="nzOnPanelChange($event)"
        [nzShowTime]="nzShowTime"
        (nzOnOk)="nzOnOk($event)"
      ></nz-date-picker>
      <ng-template #tplDateRender let-current>
        <div [class.test-first-day]="current.getDate() === 1">{{ current.getDate() }}</div>
      </ng-template>
      <ng-template #tplExtraFooter>
        TEST_EXTRA_FOOTER
      </ng-template>

      <!-- Suite 2 -->
      <!-- use another picker to avoid nzOpen's side-effects beacuse nzOpen act as "true" if used -->
      <nz-date-picker *ngSwitchCase="2"
        [nzOpen]="nzOpen"
        (nzOnOpenChange)="nzOnOpenChange($event)"
      ></nz-date-picker>

      <!-- Suite 3 -->
      <nz-date-picker *ngSwitchCase="3" nzOpen [(ngModel)]="modelValue"></nz-date-picker>
    </ng-container>
  `
})
class NzTestDatePickerComponent {
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

  nzOnOpenChange(d: Date): void {
  }

  nzOnChange(result: PickerResultSingle): void {
  }

  nzValue;

  nzDateRender;
  nzShowTime: boolean | object = false;
  nzDisabledTime;
  nzRenderExtraFooter;
  nzShowToday = false;
  nzMode;

  // nzRanges;
  nzOnPanelChange(): void {
  }

  nzOnOk(): void {
  }

  // --- Suite 2
  nzOpen;

  // --- Suite 3
  modelValue;
}
