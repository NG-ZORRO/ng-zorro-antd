import { Directionality } from '@angular/cdk/bidi';
import { ESCAPE } from '@angular/cdk/keycodes';
import { OverlayContainer } from '@angular/cdk/overlay';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { ApplicationRef, Component, DebugElement, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, inject, TestBed, tick } from '@angular/core/testing';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import isEqual from 'date-fns/isEqual';
import isSameDay from 'date-fns/isSameDay';
import { enUS } from 'date-fns/locale';

import {
  dispatchFakeEvent,
  dispatchKeyboardEvent,
  dispatchMouseEvent,
  typeInElement
} from 'ng-zorro-antd/core/testing';
import { ComponentBed, createComponentBed } from 'ng-zorro-antd/core/testing/component-bed';
import { NgStyleInterface, NzStatus } from 'ng-zorro-antd/core/types';
import { NzI18nModule, NzI18nService, NZ_DATE_LOCALE } from 'ng-zorro-antd/i18n';
import { NzIconTestModule } from 'ng-zorro-antd/icon/testing';

import { NzFormModule } from '../form';
import en_US from '../i18n/languages/en_US';
import { NzDatePickerComponent } from './date-picker.component';
import { NzDatePickerModule } from './date-picker.module';
import { ENTER_EVENT, getPickerAbstract, getPickerInput } from './testing/util';
import { PREFIX_CLASS } from './util';

registerLocaleData(zh);

describe('NzDatePickerComponent', () => {
  let fixture: ComponentFixture<NzTestDatePickerComponent>;
  let fixtureInstance: NzTestDatePickerComponent;
  let debugElement: DebugElement;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;
  let i18nService: NzI18nService;

  beforeEach(fakeAsync(() => {
    const dir = 'ltr';
    TestBed.configureTestingModule({
      imports: [FormsModule, NoopAnimationsModule, NzDatePickerModule, NzI18nModule, ReactiveFormsModule],
      providers: [
        { provide: Directionality, useFactory: () => ({ value: dir }) }
        // { provide: NZ_DATE_CONFIG, useValue: { firstDayOfWeek: 1 } }
      ],
      declarations: [NzTestDatePickerComponent]
    });

    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NzTestDatePickerComponent);
    fixtureInstance = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  beforeEach(inject([OverlayContainer, NzI18nService], (oc: OverlayContainer, i18n: NzI18nService) => {
    overlayContainer = oc;
    overlayContainerElement = oc.getContainerElement();
    i18nService = i18n;
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

    it('should open and close method work', fakeAsync(() => {
      fixture.detectChanges();
      fixtureInstance.datePicker.open();
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(getPickerContainer()).not.toBeNull();

      fixtureInstance.datePicker.close();
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
      expect(document.activeElement).toEqual(getPickerInput(fixture.debugElement));
    }));

    it('should open on enter', fakeAsync(() => {
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

    it('should open by click and focus on inner calendar input', fakeAsync(() => {
      fixture.detectChanges();
      openPickerByClickTrigger();
      expect(document.activeElement).toEqual(getPickerInput(fixture.debugElement));
    }));

    it('should open by click, focus on inner calendar input, and submit on enter', fakeAsync(() => {
      fixtureInstance.nzValue = new Date();
      fixture.detectChanges();
      openPickerByClickTrigger();
      expect(document.activeElement).toEqual(getPickerInput(fixture.debugElement));
      getPickerInput(fixture.debugElement).dispatchEvent(ENTER_EVENT);
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(getPickerContainer()).toBeNull();
    }));

    it('should not submit with invalid input', fakeAsync(() => {
      fixture.detectChanges();
      openPickerByClickTrigger();
      const input = getPickerInput(fixture.debugElement) as HTMLInputElement;
      input.value = 'invalid input';
      fixture.detectChanges();
      input.dispatchEvent(ENTER_EVENT);
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(getPickerContainer()).not.toBeNull();
    }));

    it('should have focus when opened progammatically', fakeAsync(() => {
      fixture.detectChanges();
      openPickerByCode();
      expect(document.activeElement).toEqual(getPickerInput(fixture.debugElement));
    }));

    it('should open by click and close by tab', fakeAsync(() => {
      const nzOnChange = spyOn(fixtureInstance, 'nzOnChange');
      fixtureInstance.useSuite = 5;

      fixture.detectChanges();
      openPickerByClickTrigger();
      expect(getPickerContainer()).not.toBeNull();

      typeInElement('2021-04-12', getPickerInput(fixture.debugElement));
      fixture.detectChanges();

      triggerInputBlur();
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();

      const result = (nzOnChange.calls.allArgs()[0] as Date[])[0];
      expect(isSameDay(new Date('2021-04-12'), result)).toBeTruthy();
      expect(getPickerContainer()).toBeNull();
    }));
    it("should not send onChangeEvent if value doesn't change", fakeAsync(() => {
      const nzOnChange = spyOn(fixtureInstance, 'nzOnChange');
      fixtureInstance.useSuite = 5;
      fixtureInstance.firstValue = new Date('2021-04-12');
      fixture.detectChanges();

      openPickerByClickTrigger();
      expect(getPickerContainer()).not.toBeNull();
      typeInElement('2021-04-12', getPickerInput(fixture.debugElement));
      fixture.detectChanges();

      triggerInputBlur();
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();

      expect(nzOnChange).not.toHaveBeenCalled();
      expect(getPickerContainer()).toBeNull();
    }));

    it('should support changing language at runtime', fakeAsync(() => {
      fixture.detectChanges();
      expect(getPickerInput(fixture.debugElement).placeholder).toBe('请选择日期');
      i18nService.setLocale(en_US);
      // i18nService.setDateLocale(en);
      fixture.detectChanges();
      expect(getPickerInput(fixture.debugElement).placeholder).toBe('Select date');

      openPickerByClickTrigger();
      expect(queryFromOverlay(`.${PREFIX_CLASS}-content th`).textContent).toContain('Su');
    }));

    /* Issue https://github.com/NG-ZORRO/ng-zorro-antd/issues/1539 */
    it('should be openable after closed by "Escape" key', fakeAsync(() => {
      fixture.detectChanges();
      openPickerByClickTrigger();
      expect(getPickerContainer()).not.toBeNull();

      dispatchKeyboardEvent(document.body, 'keydown', ESCAPE);
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(getPickerContainer()).toBeNull();

      openPickerByClickTrigger();
      expect(getPickerContainer()).not.toBeNull();
    }));

    it('should prevent default on the mousedown event when mouse down in date picker', fakeAsync(() => {
      fixture.detectChanges();
      openPickerByClickTrigger();

      const event = new MouseEvent('mousedown');
      spyOn(event, 'preventDefault').and.callThrough();
      fixture.nativeElement.querySelector(`.${PREFIX_CLASS}`).dispatchEvent(event);

      expect(event.preventDefault).toHaveBeenCalled();
    }));

    it('should execute default on the mousedown event when mouse down in date picker input', fakeAsync(() => {
      fixture.detectChanges();
      openPickerByClickTrigger();

      const event = new MouseEvent('mousedown');
      spyOn(event, 'preventDefault').and.callThrough();
      fixture.nativeElement.querySelector(`.${PREFIX_CLASS} input`).dispatchEvent(event);

      expect(event.preventDefault).not.toHaveBeenCalled();
    }));

    it('should support nzAllowClear and work properly', fakeAsync(() => {
      const clearBtnSelector = By.css(`.${PREFIX_CLASS}-clear`);
      const initial = (fixtureInstance.nzValue = new Date());
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
      expect(getPickerInput(fixture.debugElement) === document.activeElement).toBeTruthy();
    });

    it('should support nzDisabled', fakeAsync(() => {
      fixtureInstance.useSuite = 4;
      fixtureInstance.nzDisabled = true;
      fixtureInstance.nzAllowClear = true; // Make sure picker clear button shown up
      fixtureInstance.nzValue = new Date();
      fixtureInstance.control = new FormControl(new Date());
      fixture.detectChanges();
      flush();

      const datePickerElement = fixture.debugElement.query(By.directive(NzDatePickerComponent)).nativeElement;
      const inputElement = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;

      expect(datePickerElement.classList).toContain('ant-picker-disabled');
      expect(inputElement.disabled).toBeTruthy();
      openPickerByClickTrigger();
      expect(getPickerContainer()).toBeNull();

      fixtureInstance.control.enable();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(datePickerElement.classList).not.toContain('ant-picker-disabled');
      expect(inputElement.disabled).toBeFalsy();
      openPickerByClickTrigger();
      expect(getPickerContainer()).not.toBeNull();

      dispatchKeyboardEvent(document.body, 'keydown', ESCAPE);
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      fixtureInstance.control.disable();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(datePickerElement.classList).toContain('ant-picker-disabled');
      expect(inputElement.disabled).toBeTruthy();
      openPickerByClickTrigger();
      expect(getPickerContainer()).toBeNull();
    }));

    it('should support nzInputReadOnly', fakeAsync(() => {
      fixtureInstance.nzInputReadOnly = true;
      fixture.detectChanges();
      expect(getPickerInput(fixture.debugElement).readOnly).toBeTruthy();

      fixtureInstance.nzInputReadOnly = false;
      fixture.detectChanges();
      expect(getPickerInput(fixture.debugElement).readOnly).not.toBeTruthy();
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

    it('should support nzFormat', fakeAsync(() => {
      fixtureInstance.nzFormat = 'dd.MM.yyyy';
      fixtureInstance.nzValue = new Date('2020-03-04');
      fixture.detectChanges();
      openPickerByClickTrigger();
      const input = getPickerInput(fixture.debugElement);
      expect(input.value).toBe('04.03.2020');
      dispatchMouseEvent(queryFromOverlay('.ant-picker-cell')!, 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(input.value).toBe('24.02.2020');
    }));

    it('should support nzDisabledDate', fakeAsync(() => {
      fixture.detectChanges();
      const compareDate = new Date('2018-11-15 00:00:00');
      fixtureInstance.nzValue = new Date('2018-11-11 12:12:12');
      fixtureInstance.nzDisabledDate = (current: Date) => isSameDay(current, compareDate);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      openPickerByClickTrigger();
      const disabledCell = queryFromOverlay(`tbody tr td.${PREFIX_CLASS}-cell-disabled div`);
      expect(disabledCell.textContent!.trim()).toBe('15');
      const input = getPickerInput(fixture.debugElement);
      const submit = (date: string): void => {
        input.value = date;
        fixture.detectChanges();
        input.dispatchEvent(ENTER_EVENT);
        fixture.detectChanges();
        tick(500);
        fixture.detectChanges();
      };
      // Should fail to submit a disabled date
      submit('2018-11-15');
      expect(getPickerContainer()).not.toBeNull();
      // But it should be fine to submit an enabled date
      submit('2018-11-11');
      expect(getPickerContainer()).toBeNull();
    }));

    // #5633
    it('should support disable year and month right', fakeAsync(() => {
      fixture.detectChanges();
      fixtureInstance.nzValue = new Date(2020, 0, 1);
      fixtureInstance.nzDisabledDate = (date: Date): boolean =>
        date >= new Date(2019, 0, 1) && date < new Date(2019, 0, 2);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      openPickerByClickTrigger();
      dispatchMouseEvent(queryFromOverlay('.ant-picker-header-year-btn'), 'click');
      fixture.detectChanges();

      const year2019 = getFirstCell();
      expect(year2019.textContent!.trim()).toBe('2019');
      expect(year2019.classList).not.toContain('ant-picker-cell-disabled');

      dispatchMouseEvent(year2019, 'click');
      fixture.detectChanges();
      dispatchMouseEvent(queryFromOverlay('.ant-picker-header-month-btn'), 'click');
      fixture.detectChanges();

      const january = getFirstCell();
      expect(january.textContent!.trim()).toContain('1');
      expect(january.classList).not.toContain('ant-picker-cell-disabled');
    }));

    it('should support nzLocale', () => {
      const featureKey = 'TEST_PLACEHOLDER';
      fixtureInstance.nzLocale = { lang: { placeholder: featureKey } };
      fixture.detectChanges();
      expect(getPickerInput(fixture.debugElement).getAttribute('placeholder')).toBe(featureKey);
    });

    it('should support nzPlaceHolder', () => {
      const featureKey = (fixtureInstance.nzPlaceHolder = 'TEST_PLACEHOLDER');
      fixture.detectChanges();
      expect(getPickerInput(fixture.debugElement).getAttribute('placeholder')).toBe(featureKey);
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
      expect(getPickerAbstract(fixture.debugElement).classList.contains(`${PREFIX_CLASS}-large`)).toBeTruthy();

      fixtureInstance.nzSize = 'small';
      fixture.detectChanges();
      expect(getPickerAbstract(fixture.debugElement).classList.contains(`${PREFIX_CLASS}-small`)).toBeTruthy();
    });

    it('should support nzOnOpenChange', fakeAsync(() => {
      const nzOnOpenChange = spyOn(fixtureInstance, 'nzOnOpenChange');
      fixture.detectChanges();
      openPickerByClickTrigger();
      expect(nzOnOpenChange).toHaveBeenCalledWith(true);

      triggerInputBlur();
      fixture.detectChanges();
      flush();
      expect(nzOnOpenChange).toHaveBeenCalledWith(false);
      expect(nzOnOpenChange).toHaveBeenCalledTimes(2);
    }));

    it('should not emit nzOnOpenChange second time when input clicked twice', fakeAsync(() => {
      const nzOnOpenChange = spyOn(fixtureInstance, 'nzOnOpenChange');

      fixture.detectChanges();
      openPickerByClickTrigger();

      expect(nzOnOpenChange).toHaveBeenCalledWith(true);
      expect(nzOnOpenChange).toHaveBeenCalledTimes(1);
    }));

    it('should not emit nzOnOpenChange when nzOpen is false and input is clicked', fakeAsync(() => {
      const nzOnOpenChange = spyOn(fixtureInstance, 'nzOnOpenChange');
      fixtureInstance.useSuite = 2;
      fixtureInstance.nzOpen = false;

      fixture.detectChanges();
      openPickerByClickTrigger();

      expect(nzOnOpenChange).not.toHaveBeenCalledWith(true);
    }));

    it('should support nzValue', fakeAsync(() => {
      fixtureInstance.nzDefaultPickerValue = new Date('2015-09-17');
      fixtureInstance.nzValue = new Date('2018-11-11');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      openPickerByClickTrigger();
      expect(getSelectedDayCell().textContent!.trim()).toBe('11');
    }));

    it('should support nzOnChange', fakeAsync(() => {
      fixtureInstance.nzValue = new Date('2018-11-11');
      const nzOnChange = spyOn(fixtureInstance, 'nzOnChange');
      const nzOnCalendarChange = spyOn(fixtureInstance, 'nzOnCalendarChange');
      fixture.detectChanges();
      openPickerByClickTrigger();

      const cell = getFirstCell(); // Use the first cell
      const cellText = cell.textContent!.trim();
      dispatchMouseEvent(cell, 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(nzOnChange).toHaveBeenCalled();
      expect(nzOnCalendarChange).not.toHaveBeenCalled();
      const result = (nzOnChange.calls.allArgs()[0] as Date[])[0];
      expect(result.getDate()).toBe(+cellText);
    }));

    it('should support nzDefaultPickerValue', fakeAsync(() => {
      fixture.detectChanges();
      fixtureInstance.nzDefaultPickerValue = new Date('2015-09-17');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      openPickerByClickTrigger();
      expect(queryFromOverlay('.ant-picker-header-year-btn').textContent!.indexOf('2015') > -1).toBeTruthy();
      expect(queryFromOverlay('.ant-picker-header-month-btn').textContent!.indexOf('9') > -1).toBeTruthy();
    }));

    it('should support custom suffixIcon', fakeAsync(() => {
      fixtureInstance.nzSuffixIcon = 'clock-circle';
      fixture.detectChanges();
      expect(debugElement.query(By.css(`.anticon-clock-circle`))).toBeDefined();
    }));

    it('should support nzBorderless', fakeAsync(() => {
      fixtureInstance.nzBorderless = true;
      fixture.detectChanges();
      expect(debugElement.query(By.css(`.ant-picker-borderless`))).toBeDefined();
    }));

    it('should support nzInline', fakeAsync(() => {
      const nzOnChange = spyOn(fixtureInstance, 'nzOnChange');
      fixtureInstance.nzInline = true;
      fixture.detectChanges();
      overlayContainerElement = debugElement.nativeElement as HTMLLIElement;
      const cell = getFirstCell(); // Use the first cell
      const cellText = cell.textContent!.trim();
      dispatchMouseEvent(cell, 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(nzOnChange).toHaveBeenCalled();
      const result = (nzOnChange.calls.allArgs()[0] as Date[])[0];
      expect(result.getDate()).toBe(+cellText);
    }));

    it('should not run change detection when inline mode is enabled and the `date-range-popup` is clicked', () => {
      fixtureInstance.nzInline = true;
      fixture.detectChanges();

      const appRef = TestBed.inject(ApplicationRef);
      const event = new MouseEvent('mousedown');

      spyOn(appRef, 'tick');
      spyOn(event, 'preventDefault').and.callThrough();

      debugElement.nativeElement.querySelector('date-range-popup').dispatchEvent(event);

      expect(appRef.tick).not.toHaveBeenCalled();
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should support nzBackdrop', fakeAsync(() => {
      fixtureInstance.nzBackdrop = true;
      fixture.detectChanges();
      openPickerByClickTrigger();
      expect(overlayContainerElement.children[0].classList).toContain('cdk-overlay-backdrop');
    }));
    it('should support nzPlacement', fakeAsync(() => {
      fixtureInstance.nzPlacement = 'bottomLeft';
      fixture.detectChanges();
      openPickerByClickTrigger();
      let element = queryFromOverlay('.ant-picker-dropdown');
      expect(element.classList.contains('ant-picker-dropdown-placement-bottomLeft')).toBe(true);
      expect(element.classList.contains('ant-picker-dropdown-placement-topLeft')).toBe(false);
      expect(element.classList.contains('ant-picker-dropdown-placement-bottomRight')).toBe(false);
      expect(element.classList.contains('ant-picker-dropdown-placement-topRight')).toBe(false);
      triggerInputBlur();
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      fixtureInstance.nzPlacement = 'topLeft';
      fixture.detectChanges();
      openPickerByClickTrigger();
      element = queryFromOverlay('.ant-picker-dropdown');
      expect(element.classList.contains('ant-picker-dropdown-placement-bottomLeft')).toBe(false);
      expect(element.classList.contains('ant-picker-dropdown-placement-topLeft')).toBe(true);
      expect(element.classList.contains('ant-picker-dropdown-placement-bottomRight')).toBe(false);
      expect(element.classList.contains('ant-picker-dropdown-placement-topRight')).toBe(false);
      triggerInputBlur();
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      fixtureInstance.nzPlacement = 'bottomRight';
      fixture.detectChanges();
      openPickerByClickTrigger();
      element = queryFromOverlay('.ant-picker-dropdown');
      expect(element.classList.contains('ant-picker-dropdown-placement-bottomLeft')).toBe(false);
      expect(element.classList.contains('ant-picker-dropdown-placement-topLeft')).toBe(false);
      expect(element.classList.contains('ant-picker-dropdown-placement-bottomRight')).toBe(true);
      expect(element.classList.contains('ant-picker-dropdown-placement-topRight')).toBe(false);
      triggerInputBlur();
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      fixtureInstance.nzPlacement = 'topRight';
      fixture.detectChanges();
      openPickerByClickTrigger();
      element = queryFromOverlay('.ant-picker-dropdown');
      expect(element.classList.contains('ant-picker-dropdown-placement-bottomLeft')).toBe(false);
      expect(element.classList.contains('ant-picker-dropdown-placement-topLeft')).toBe(false);
      expect(element.classList.contains('ant-picker-dropdown-placement-bottomRight')).toBe(false);
      expect(element.classList.contains('ant-picker-dropdown-placement-topRight')).toBe(true);
    }));

    it('should support nzShowWeekNumber', fakeAsync(() => {
      fixtureInstance.nzShowWeekNumber = true;
      fixture.detectChanges();
      openPickerByClickTrigger();
      expect(queryFromOverlay('.ant-picker-week-panel-row .ant-picker-cell-week')).toBeDefined();
      fixtureInstance.nzShowWeekNumber = false;
      fixture.detectChanges();
      tick(500);
      openPickerByClickTrigger();
      expect(queryFromOverlay('.ant-picker-week-panel-row .ant-picker-cell-week')).toBeNull();
    }));
  });

  describe('panel switch and move forward/afterward', () => {
    beforeEach(() => (fixtureInstance.useSuite = 1));

    it('should support date panel changes on click month', fakeAsync(() => {
      fixtureInstance.nzValue = new Date('2018-11-11');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      openPickerByClickTrigger();
      // Click month
      dispatchMouseEvent(queryFromOverlay('.ant-picker-header-month-btn'), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      dispatchMouseEvent(getFirstCell(), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      // click 2018-01-01
      dispatchMouseEvent(getFirstCell(), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(getPickerInput(fixture.debugElement).value).toBe('2018-01-01');
    }));

    it('should support date panel changes', fakeAsync(() => {
      fixtureInstance.nzValue = new Date('2018-11-11');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      openPickerByClickTrigger();
      // Click previous year button
      dispatchMouseEvent(getSuperPreBtn(), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(queryFromOverlay('.ant-picker-header-year-btn').textContent!.indexOf('2017') > -1).toBeTruthy();
      // Click next year button * 2
      dispatchMouseEvent(getSuperNextBtn(), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      dispatchMouseEvent(getSuperNextBtn(), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(queryFromOverlay('.ant-picker-header-year-btn').textContent!.indexOf('2019') > -1).toBeTruthy();
      // Click previous month button
      dispatchMouseEvent(getPreBtn(), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(queryFromOverlay('.ant-picker-header-month-btn').textContent!.indexOf('10') > -1).toBeTruthy();
      // Click next month button * 2
      dispatchMouseEvent(getNextBtn(), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      dispatchMouseEvent(getNextBtn(), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(queryFromOverlay('.ant-picker-header-month-btn').textContent!.indexOf('12') > -1).toBeTruthy();
    }));

    it('should support month panel changes', fakeAsync(() => {
      fixtureInstance.nzValue = new Date('2018-11-11');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      openPickerByClickTrigger();
      // Click month select to show month panel
      dispatchMouseEvent(queryFromOverlay('.ant-picker-header-month-btn'), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(queryFromOverlay('.ant-picker-month-panel')).toBeDefined();
      expect(queryFromOverlay('.ant-picker-header-month-btn').textContent!.indexOf('2018') > -1).toBeTruthy();
      // Goto previous year
      dispatchMouseEvent(getSuperPreBtn(), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(queryFromOverlay('.ant-picker-header-month-btn').textContent!.indexOf('2017') > -1).toBeTruthy();
      // Goto next year * 2
      dispatchMouseEvent(getSuperNextBtn(), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      dispatchMouseEvent(getSuperNextBtn(), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(queryFromOverlay('.ant-picker-header-month-btn').textContent!.indexOf('2019') > -1).toBeTruthy();
      // Click to choose a year to change panel
      dispatchMouseEvent(queryFromOverlay('td.ant-picker-cell'), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(queryFromOverlay('.ant-picker-date-panel')).toBeTruthy();
    }));

    it('should support year panel changes', fakeAsync(() => {
      fixtureInstance.nzValue = new Date('2018-11-11');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      openPickerByClickTrigger();
      // Click year select to show year panel
      dispatchMouseEvent(queryFromOverlay('.ant-picker-header-year-btn'), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(queryFromOverlay('.ant-picker-year-panel')).toBeDefined();
      expect(queryFromOverlay('.ant-picker-header-year-btn').textContent!.indexOf('2010') > -1).toBeTruthy();
      expect(queryFromOverlay('.ant-picker-header-year-btn').textContent!.indexOf('2019') > -1).toBeTruthy();
      // Coverage for last/next cell
      dispatchMouseEvent(getSuperPreBtn(), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      dispatchMouseEvent(getSuperNextBtn(), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      // Goto previous decade
      dispatchMouseEvent(getSuperPreBtn(), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(queryFromOverlay('.ant-picker-header-year-btn').textContent!.indexOf('2000') > -1).toBeTruthy();
      expect(queryFromOverlay('.ant-picker-header-year-btn').textContent!.indexOf('2009') > -1).toBeTruthy();
      // Goto next decade * 2
      dispatchMouseEvent(getSuperNextBtn(), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      dispatchMouseEvent(getSuperNextBtn(), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(queryFromOverlay('.ant-picker-header-year-btn').textContent!.indexOf('2020') > -1).toBeTruthy();
      expect(queryFromOverlay('.ant-picker-header-year-btn').textContent!.indexOf('2029') > -1).toBeTruthy();
      // Click to choose a year to change panel
      dispatchMouseEvent(queryFromOverlay('td.ant-picker-cell'), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(queryFromOverlay('.ant-picker-header .ant-picker-year-panel')).toBeFalsy();
    }));

    it('should support decade panel changes', fakeAsync(() => {
      fixtureInstance.nzValue = new Date('2018-11-11');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      openPickerByClickTrigger();
      // Click to show decade panel
      dispatchMouseEvent(queryFromOverlay('.ant-picker-header-year-btn'), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      dispatchMouseEvent(queryFromOverlay('.ant-picker-header-year-btn'), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(queryFromOverlay('.ant-picker-decade-panel')).toBeDefined();
      // Coverage for last/next cell
      dispatchMouseEvent(getSuperNextBtn(), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      dispatchMouseEvent(getSuperPreBtn(), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      // Goto previous century
      dispatchMouseEvent(getSuperPreBtn(), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(queryFromOverlay('.ant-picker-header-decade-btn').textContent!.indexOf('1900') > -1).toBeTruthy();
      expect(queryFromOverlay('.ant-picker-header-decade-btn').textContent!.indexOf('1999') > -1).toBeTruthy();
      // Goto next century * 2
      dispatchMouseEvent(getSuperNextBtn(), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      dispatchMouseEvent(getSuperNextBtn(), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(queryFromOverlay('.ant-picker-header-decade-btn').textContent!.indexOf('2100') > -1).toBeTruthy();
      expect(queryFromOverlay('.ant-picker-header-decade-btn').textContent!.indexOf('2199') > -1).toBeTruthy();
      // Click to choose a decade to change panel
      dispatchMouseEvent(queryFromOverlay('td.ant-picker-cell'), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(queryFromOverlay('.ant-picker-year-panel')).toBeDefined();
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
      fixtureInstance.nzDateRender = (d: Date) => (d.getDate() === 1 ? featureKey : d.getDate());
      fixture.detectChanges();
      openPickerByClickTrigger();
      expect(overlayContainerElement.textContent!.indexOf(featureKey) > -1).toBeTruthy();
    }));

    it('should support nzShowTime', fakeAsync(() => {
      fixtureInstance.nzValue = new Date('2018-11-11 11:22:33');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      fixtureInstance.nzShowTime = '' as any;
      fixture.detectChanges();
      openPickerByClickTrigger();
      flush();
      fixture.detectChanges();
      expect(queryFromOverlay('.ant-picker-ok')).toBeDefined();
      expect(queryFromOverlay('.ant-picker-time-panel')).toBeDefined();
      expect(
        queryFromOverlay('.ant-picker-time-panel-cell-selected .ant-picker-time-panel-cell-inner').textContent!.trim()
      ).toBe('11');

      // Click to choose a hour
      dispatchMouseEvent(queryFromOverlay('.ant-picker-time-panel-cell:first-child'), 'click');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(getPickerInput(fixture.debugElement).value).toBe('2018-11-11 00:22:33');
    }));

    it('should support nzShowTime.nzDefaultOpenValue', fakeAsync(() => {
      fixtureInstance.nzValue = null;
      fixtureInstance.nzShowTime = { nzDefaultOpenValue: new Date(0, 0, 0, 0, 1, 2) };
      fixture.detectChanges();
      openPickerByClickTrigger();

      dispatchMouseEvent(getFirstCell(), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(getPickerInput(fixture.debugElement).value).toContain('00:01:02');

      const listOfSelectedLi = overlayContainerElement.querySelectorAll(
        '.ant-picker-time-panel-cell-selected .ant-picker-time-panel-cell-inner'
      );
      expect(listOfSelectedLi[0].textContent!.trim()).toBe('00');
      expect(listOfSelectedLi[1].textContent!.trim()).toBe('01');
      expect(listOfSelectedLi[2].textContent!.trim()).toBe('02');
    }));

    it('should not reset time', fakeAsync(() => {
      fixtureInstance.nzValue = new Date('2019-08-02 13:03:33');
      fixtureInstance.nzShowTime = true;
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      openPickerByClickTrigger();
      dispatchMouseEvent(getFirstCell(), 'click');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(getPickerInput(fixture.debugElement).value).toBe('2019-07-29 13:03:33');
    }));

    it('should support nzShowTime.nzFormat', fakeAsync(() => {
      fixtureInstance.nzShowTime = { nzFormat: 'HH:mm' };
      fixture.detectChanges();
      openPickerByClickTrigger();
      expect(overlayContainerElement.querySelectorAll('.ant-picker-time-panel-column').length).toBe(2);
    }));

    it('should support nzDisabledTime and nzShowTime.nzHideDisabledOptions', fakeAsync(() => {
      fixtureInstance.nzShowTime = true;
      fixtureInstance.nzDisabledTime = () => ({
        nzDisabledHours: () => [0, 1, 2],
        nzDisabledMinutes: () => [0, 1],
        nzDisabledSeconds: () => [0]
      });
      fixture.detectChanges();
      openPickerByClickTrigger();

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

      // Use nzHideDisabledOptions to hide disabled times
      fixtureInstance.nzShowTime = { nzHideDisabledOptions: true };
      fixture.detectChanges();
      expect(+queryFromOverlay('.ant-picker-time-panel-column:nth-child(1) li:first-child').textContent!.trim()).toBe(
        3
      );
      expect(+queryFromOverlay('.ant-picker-time-panel-column:nth-child(2) li:first-child').textContent!.trim()).toBe(
        2
      );
      expect(+queryFromOverlay('.ant-picker-time-panel-column:nth-child(3) li:first-child').textContent!.trim()).toBe(
        1
      );
    }));

    it('should nzDisabledTime invalid input not emit', fakeAsync(() => {
      fixtureInstance.nzShowTime = true;
      fixtureInstance.nzDisabledTime = () => ({
        nzDisabledHours: () => [0, 1, 2],
        nzDisabledMinutes: () => [0, 1],
        nzDisabledSeconds: () => [0]
      });
      fixture.detectChanges();
      openPickerByClickTrigger();

      // input disabled value
      const input = getPickerInput(fixture.debugElement);
      typeInElement('2020-03-14 00:00:00', input);
      fixture.detectChanges();
      input.dispatchEvent(ENTER_EVENT);
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(getPickerContainer()).not.toBeNull();

      triggerInputBlur();
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(getPickerInput(fixture.debugElement).value).toBe('');
    }));

    it('should support updating the disabledtime state when the current time changes', fakeAsync(() => {
      fixtureInstance.nzShowTime = true;
      fixtureInstance.nzDisabledTime = (current: Date) => ({
        nzDisabledHours: () => {
          if (current) {
            if (current.getMonth() === 2) {
              return [0, 1, 2];
            } else {
              return [4, 5, 6];
            }
          } else {
            return [7, 8, 9];
          }
        },
        nzDisabledMinutes: () => [],
        nzDisabledSeconds: () => []
      });
      fixture.detectChanges();
      openPickerByClickTrigger();

      // input disabled value
      const input = getPickerInput(fixture.debugElement);
      typeInElement('2020-03-14 00:00:00', input);
      fixture.detectChanges();
      expect(
        queryFromOverlay('.ant-picker-time-panel-column li:nth-child(3)').classList.contains(
          'ant-picker-time-panel-cell-disabled'
        )
      ).toBeTruthy();

      // input disabled value
      typeInElement('2020-04-14 00:00:00', input);
      fixture.detectChanges();
      expect(
        queryFromOverlay('.ant-picker-time-panel-column li:nth-child(5)').classList.contains(
          'ant-picker-time-panel-cell-disabled'
        )
      ).toBeTruthy();
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

    it('should support nzShowToday', fakeAsync(() => {
      fixture.detectChanges();
      openPickerByClickTrigger();
      expect(overlayContainerElement.querySelector('.ant-picker-footer')).toBeDefined();

      fixtureInstance.nzShowToday = true;
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-picker-today-btn')).toBeDefined();

      // Click today button
      const nzOnChange = spyOn(fixtureInstance, 'nzOnChange');
      dispatchMouseEvent(queryFromOverlay('.ant-picker-today-btn'), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      const result = (nzOnChange.calls.allArgs()[0] as Date[])[0];
      expect(isSameDay(new Date(), result)).toBeTruthy();
      expect(queryFromOverlay('.ant-picker-container')).toBeFalsy(); // Should closed
    }));

    it('should support nzShowNow', fakeAsync(() => {
      fixture.detectChanges();
      openPickerByClickTrigger();
      expect(overlayContainerElement.querySelector('.ant-picker-footer')).toBeDefined();

      fixtureInstance.nzShowTime = true;

      fixtureInstance.nzShowNow = false;
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-picker-now-btn')).toBeNull();

      fixtureInstance.nzShowNow = true;
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-picker-now-btn')).toBeDefined();

      // Click now button
      const nzOnChange = spyOn(fixtureInstance, 'nzOnChange');
      dispatchMouseEvent(queryFromOverlay('.ant-picker-now-btn'), 'click');
      fixture.detectChanges();

      // Click ok button
      dispatchMouseEvent(overlayContainerElement.querySelector('.ant-picker-ok > button')!, 'click');
      const result = (nzOnChange.calls.allArgs()[0] as Date[])[0];
      expect(isEqual(new Date(), result)).toBeTruthy();
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(queryFromOverlay('.ant-picker-container')).toBeFalsy(); // Should closed
    }));

    it('should support nzMode', fakeAsync(() => {
      fixtureInstance.nzValue = new Date('2020-12-01');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(getPickerInput(fixture.debugElement).placeholder).toEqual('请选择日期');

      fixtureInstance.nzMode = 'month';
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(getPickerInput(fixture.debugElement).placeholder).toEqual('请选择月份');
      expect(getPickerInput(fixture.debugElement).value).toEqual('2020-12');

      openPickerByClickTrigger();
      expect(overlayContainerElement.querySelector('.ant-picker-month-panel')).toBeDefined();
    }));

    it('should support nzOnPanelChange', fakeAsync(() => {
      spyOn(fixtureInstance, 'nzOnPanelChange');
      fixture.detectChanges();
      openPickerByClickTrigger();

      // Click header to month panel
      dispatchMouseEvent(overlayContainerElement.querySelector('.ant-picker-header-month-btn')!, 'click');
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
      dispatchMouseEvent(overlayContainerElement.querySelector('.ant-picker-ok > button')!, 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(fixtureInstance.nzOnOk).toHaveBeenCalledWith(fixtureInstance.nzValue);
    }));

    it('should custom input date', fakeAsync(() => {
      const nzOnChange = spyOn(fixtureInstance, 'nzOnChange');
      fixture.detectChanges();
      openPickerByClickTrigger();
      const input = getPickerInput(fixture.debugElement);

      // Wrong inputing support
      typeInElement('wrong', input);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      // expect(input.classList.contains('ant-calendar-input-invalid')).toBeTruthy();

      // Correct inputing
      input.value = '2018-11-22';
      input.dispatchEvent(ENTER_EVENT);
      // dispatchKeyboardEvent(input, 'keyup', ENTER); // Not working?
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(nzOnChange).toHaveBeenCalled();
      const result = (nzOnChange.calls.allArgs()[0] as Date[])[0];
      expect(result.getDate()).toBe(22);
    }));

    // #6070
    it('should reset after inputing invalid value and close panel', fakeAsync(() => {
      fixture.detectChanges();
      openPickerByClickTrigger();
      const input = getPickerInput(fixture.debugElement);

      // Wrong inputing support
      typeInElement('wrong', input);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();

      triggerInputBlur();
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(input.value).toBe('');
    }));
  }); // /specified date picker testing

  function getPreBtn(): HTMLElement {
    return queryFromOverlay(`.${PREFIX_CLASS}-header-prev-btn`);
  }

  function getNextBtn(): HTMLElement {
    return queryFromOverlay(`.${PREFIX_CLASS}-header-next-btn`);
  }

  function getSuperPreBtn(): HTMLElement {
    return queryFromOverlay(`.${PREFIX_CLASS}-header-super-prev-btn`);
  }

  function getSuperNextBtn(): HTMLElement {
    return queryFromOverlay(`.${PREFIX_CLASS}-header-super-next-btn`);
  }

  describe('ngModel value accessors', () => {
    beforeEach(() => (fixtureInstance.useSuite = 3));

    it('should specified date provide by "modelValue" be chosen', fakeAsync(() => {
      fixtureInstance.modelValue = new Date('2018-11-11');
      fixture.detectChanges();
      flush(); // Wait writeValue() tobe done
      fixture.detectChanges();
      expect(getSelectedDayCell().textContent!.trim()).toBe('11');

      // Click the first cell to change ngModel
      const cell = getFirstCell();
      const cellText = cell.textContent!.trim();
      dispatchMouseEvent(cell, 'click');
      fixture.detectChanges();
      expect(fixtureInstance.modelValue.getDate()).toBe(+cellText);
    }));
  });

  describe('formControl', () => {
    beforeEach(() => (fixtureInstance.useSuite = 4));

    it('should formControl init work', fakeAsync(() => {
      fixtureInstance.control = new UntypedFormControl(new Date('2020-04-08'));
      fixture.detectChanges();
      flush(); // Wait writeValue() tobe done
      fixture.detectChanges();
      const datePickerElement = fixture.debugElement.query(By.directive(NzDatePickerComponent)).nativeElement;
      const inputElement = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;

      expect(datePickerElement.classList).not.toContain('ant-picker-disabled');
      expect(inputElement.disabled).toBeFalsy();
      expect(getPickerInput(fixture.debugElement).value!.trim()).toBe('2020-04-08');
    }));

    it('should disabled work', fakeAsync(() => {
      fixtureInstance.control = new UntypedFormControl({ value: new Date('2020-04-24'), disabled: true });
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(getPickerInput(fixture.debugElement).getAttribute('disabled')).not.toBeNull();
    }));
  });

  ////////////

  function getPickerContainer(): HTMLElement {
    return queryFromOverlay(`.${PREFIX_CLASS}-panel-container`) as HTMLElement;
  }

  function getSelectedDayCell(): HTMLElement {
    return queryFromOverlay(`.${PREFIX_CLASS}-body tr td.ant-picker-cell-selected div`) as HTMLElement;
  }

  function getFirstCell(): HTMLElement {
    return queryFromOverlay(`.${PREFIX_CLASS}-body tr td`) as HTMLElement;
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

  function openPickerByCode(): void {
    fixtureInstance.datePicker.open();
    fixture.detectChanges();
    tick(500);
    fixture.detectChanges();
  }

  function triggerInputBlur(): void {
    dispatchFakeEvent(getPickerInput(fixture.debugElement), 'focusout');
  }
});

describe('date-fns testing', () => {
  let fixture: ComponentFixture<NzTestDatePickerComponent>;
  let fixtureInstance: NzTestDatePickerComponent;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, NoopAnimationsModule, NzDatePickerModule, NzI18nModule],
      providers: [{ provide: NZ_DATE_LOCALE, useValue: enUS }],
      declarations: [NzTestDatePickerComponent]
    });
    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NzTestDatePickerComponent);
    fixtureInstance = fixture.componentInstance;
    fixtureInstance.useSuite = 1;
  });

  it('should parse input value with nzFormat', fakeAsync(() => {
    const nzOnChange = spyOn(fixtureInstance, 'nzOnChange');
    fixtureInstance.nzFormat = 'dd.MM.yyyy';
    fixture.detectChanges();
    dispatchMouseEvent(getPickerInput(fixture.debugElement), 'click');
    fixture.detectChanges();
    tick(500);
    fixture.detectChanges();
    const input = getPickerInput(fixture.debugElement);
    typeInElement('25.10.2019', input);
    fixture.detectChanges();
    input.dispatchEvent(ENTER_EVENT);
    fixture.detectChanges();
    flush();
    const result = (nzOnChange.calls.allArgs()[0] as Date[])[0];
    expect(result.getFullYear()).toBe(2019);
    expect(result.getMonth() + 1).toBe(10);
    expect(result.getDate()).toBe(25);
  }));
});

describe('status', () => {
  let testBed: ComponentBed<NzTestDatePickerStatusComponent>;
  let fixture: ComponentFixture<NzTestDatePickerStatusComponent>;
  let fixtureInstance: NzTestDatePickerStatusComponent;
  let datePickerElement!: HTMLElement;
  beforeEach(() => {
    testBed = createComponentBed(NzTestDatePickerStatusComponent, { imports: [NzDatePickerModule, NzIconTestModule] });
    fixture = testBed.fixture;
    fixtureInstance = fixture.componentInstance;
    datePickerElement = fixture.debugElement.query(By.directive(NzDatePickerComponent)).nativeElement;
    fixture.detectChanges();
  });
  it('should classname correct', () => {
    expect(datePickerElement.classList).toContain('ant-picker-status-error');

    fixtureInstance.status = 'warning';
    fixture.detectChanges();
    expect(datePickerElement.classList).toContain('ant-picker-status-warning');

    fixtureInstance.status = '';
    fixture.detectChanges();
    expect(datePickerElement.classList).not.toContain('ant-picker-status-warning');
  });
});

describe('in form', () => {
  let testBed: ComponentBed<NzTestDatePickerInFormComponent>;
  let fixture: ComponentFixture<NzTestDatePickerInFormComponent>;
  let datePickerElement!: HTMLElement;
  let formGroup: UntypedFormGroup;
  beforeEach(() => {
    testBed = createComponentBed(NzTestDatePickerInFormComponent, {
      imports: [NzDatePickerModule, NzIconTestModule, NzFormModule, ReactiveFormsModule, FormsModule]
    });
    fixture = testBed.fixture;
    datePickerElement = fixture.debugElement.query(By.directive(NzDatePickerComponent)).nativeElement;
    formGroup = fixture.componentInstance.validateForm;
    fixture.detectChanges();
  });
  it('should classname correct', () => {
    expect(datePickerElement.classList).not.toContain('ant-picker-status-error');
    expect(datePickerElement.querySelector('nz-form-item-feedback-icon')).toBeNull();

    formGroup.get('demo')!.markAsDirty();
    formGroup.get('demo')!.setValue(null);
    formGroup.get('demo')!.updateValueAndValidity();
    fixture.detectChanges();
    expect(datePickerElement.classList).toContain('ant-picker-status-error');
    expect(datePickerElement.querySelector('nz-form-item-feedback-icon')).toBeTruthy();
    expect(datePickerElement!.querySelector('nz-form-item-feedback-icon')!.className).toContain(
      'ant-form-item-feedback-icon-error'
    );

    formGroup.get('demo')!.markAsDirty();
    formGroup.get('demo')!.setValue(new Date());
    formGroup.get('demo')!.updateValueAndValidity();
    fixture.detectChanges();
    // show success
    expect(datePickerElement.classList).toContain('ant-picker-status-success');
    expect(datePickerElement.querySelector('nz-form-item-feedback-icon')).toBeTruthy();
    expect(datePickerElement.querySelector('nz-form-item-feedback-icon')!.className).toContain(
      'ant-form-item-feedback-icon-success'
    );
  });
});

@Component({
  template: `
    <ng-container [ngSwitch]="useSuite">
      <!-- Suite 1 -->
      <nz-date-picker
        *ngSwitchCase="1"
        [nzAllowClear]="nzAllowClear"
        [nzAutoFocus]="nzAutoFocus"
        [nzDisabled]="nzDisabled"
        [nzInputReadOnly]="nzInputReadOnly"
        [nzDisabledDate]="nzDisabledDate"
        [nzFormat]="nzFormat"
        [nzLocale]="nzLocale"
        [nzPlaceHolder]="nzPlaceHolder"
        [nzPopupStyle]="nzPopupStyle"
        [nzDropdownClassName]="nzDropdownClassName"
        [nzSize]="nzSize"
        (nzOnOpenChange)="nzOnOpenChange($event)"
        [ngModel]="nzValue"
        (ngModelChange)="nzOnChange($event)"
        [nzDefaultPickerValue]="nzDefaultPickerValue"
        [nzDateRender]="nzDateRender"
        [nzDisabledTime]="nzDisabledTime"
        [nzRenderExtraFooter]="nzRenderExtraFooter"
        [nzShowToday]="nzShowToday"
        [nzShowNow]="nzShowNow"
        [nzMode]="nzMode"
        (nzOnPanelChange)="nzOnPanelChange($event)"
        (nzOnCalendarChange)="nzOnCalendarChange($event)"
        [nzShowTime]="nzShowTime"
        (nzOnOk)="nzOnOk($event)"
        [nzSuffixIcon]="nzSuffixIcon"
        [nzBorderless]="nzBorderless"
        [nzInline]="nzInline"
        [nzBackdrop]="nzBackdrop"
        [nzPlacement]="nzPlacement"
        [nzShowWeekNumber]="nzShowWeekNumber"
      ></nz-date-picker>
      <ng-template #tplDateRender let-current>
        <div [class.test-first-day]="current.getDate() === 1">{{ current.getDate() }}</div>
      </ng-template>
      <ng-template #tplExtraFooter>TEST_EXTRA_FOOTER</ng-template>

      <!-- Suite 2 -->
      <!-- use another picker to avoid nzOpen's side-effects because nzOpen acts as "true" if used -->
      <nz-date-picker *ngSwitchCase="2" [nzOpen]="nzOpen" (nzOnOpenChange)="nzOnOpenChange($event)"></nz-date-picker>

      <!-- Suite 3 -->
      <nz-date-picker *ngSwitchCase="3" nzOpen [(ngModel)]="modelValue"></nz-date-picker>

      <!-- Suite 4 -->
      <nz-date-picker *ngSwitchCase="4" [formControl]="control" [nzDisabled]="nzDisabled"></nz-date-picker>

      <!-- Suite 5 -->
      <ng-container *ngSwitchCase="5">
        <nz-date-picker [ngModel]="firstValue" (ngModelChange)="nzOnChange($event)"></nz-date-picker>
        <nz-date-picker [ngModel]="secondValue"></nz-date-picker>
      </ng-container>
    </ng-container>
  `
})
class NzTestDatePickerComponent {
  useSuite!: 1 | 2 | 3 | 4 | 5;
  @ViewChild('tplDateRender', { static: true }) tplDateRender!: TemplateRef<Date>;
  @ViewChild('tplExtraFooter', { static: true }) tplExtraFooter!: TemplateRef<void>;
  @ViewChild(NzDatePickerComponent, { static: false }) datePicker!: NzDatePickerComponent;
  // --- Suite 1
  nzAllowClear: boolean = false;
  nzAutoFocus: boolean = false;
  nzDisabled: boolean = false;
  nzInputReadOnly: boolean = false;
  nzFormat!: string;
  nzDisabledDate!: (d: Date) => boolean;
  nzLocale: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  nzPlaceHolder!: string;
  nzPopupStyle!: NgStyleInterface;
  nzDropdownClassName!: string;
  nzSize!: string;

  nzOnChange(_: Date | null): void {}
  nzOnCalendarChange(): void {}
  nzOnOpenChange(_: boolean): void {}

  nzValue: Date | null = null;
  nzDefaultPickerValue: Date | null = null;
  nzDateRender: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  nzShowTime: boolean | object = false;
  nzDisabledTime: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  nzRenderExtraFooter!: string | (() => TemplateRef<void> | string);
  nzShowToday = false;
  nzShowNow = false;
  nzMode: string = 'date';
  nzSuffixIcon!: string;
  nzBorderless = false;
  nzInline = false;
  nzBackdrop = false;
  nzPlacement = 'bottomLeft';
  nzShowWeekNumber = false;

  // nzRanges;
  nzOnPanelChange(_: string): void {}

  nzOnOk(_: Date): void {}

  // --- Suite 2
  nzOpen: boolean = false;

  // --- Suite 3
  modelValue!: Date;

  // --- Suite 4
  control!: UntypedFormControl;

  // --- Suite 5
  firstValue!: Date;
  secondValue!: Date;
}

@Component({
  template: ` <nz-date-picker [nzStatus]="status"></nz-date-picker> `
})
class NzTestDatePickerStatusComponent {
  status: NzStatus = 'error';
}

@Component({
  template: `
    <form nz-form [formGroup]="validateForm">
      <nz-form-item>
        <nz-form-control nzHasFeedback>
          <nz-date-picker formControlName="demo"></nz-date-picker>
        </nz-form-control>
      </nz-form-item>
    </form>
  `
})
class NzTestDatePickerInFormComponent {
  validateForm: UntypedFormGroup = this.fb.group({
    demo: [null, [Validators.required]]
  });
  constructor(private fb: UntypedFormBuilder) {}
}
