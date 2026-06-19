/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ESCAPE } from '@angular/cdk/keycodes';
import { OverlayContainer } from '@angular/cdk/overlay';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import {
  ApplicationRef,
  Component,
  DebugElement,
  inject,
  signal,
  TemplateRef,
  ViewChild,
  WritableSignal
} from '@angular/core';
import { ComponentFixture, TestBed, inject as testingInject } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { form, FormField } from '@angular/forms/signals';
import { By } from '@angular/platform-browser';

import isSameDay from 'date-fns/isSameDay';
import { enUS } from 'date-fns/locale';
import { vi } from 'vitest';

import { provideNzNoAnimation } from 'ng-zorro-antd/core/animation';
import { NZ_FORM_SIZE, NZ_FORM_VARIANT } from 'ng-zorro-antd/core/form';
import {
  dispatchFakeEvent,
  dispatchKeyboardEvent,
  dispatchMouseEvent,
  typeInElement
} from 'ng-zorro-antd/core/testing';
import {
  NgStyleInterface,
  NzSafeAny,
  NzSizeLDSType,
  NzStatus,
  NzVariant,
  type NzPlacement
} from 'ng-zorro-antd/core/types';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NZ_DATE_LOCALE, NzI18nService } from 'ng-zorro-antd/i18n';
import en_US from 'ng-zorro-antd/i18n/languages/en_US';
import { NZ_SPACE_COMPACT_SIZE } from 'ng-zorro-antd/space';

import { NzDatePickerComponent, NzDatePickerSizeType } from './date-picker.component';
import { NzDatePickerModule } from './date-picker.module';
import { CompatibleDate, NzPanelChangeType } from './standard-types';
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideNzNoAnimation()]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NzTestDatePickerComponent);
    fixtureInstance = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  beforeEach(
    testingInject([OverlayContainer, NzI18nService], (oc: OverlayContainer, i18n: NzI18nService) => {
      overlayContainer = oc;
      overlayContainerElement = oc.getContainerElement();
      i18nService = i18n;
    })
  );

  beforeEach(() => vi.useFakeTimers());

  afterEach(() => vi.useRealTimers());

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

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

    it('should open and close method work', () => {
      fixture.detectChanges();
      fixtureInstance.datePicker.open();
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();
      expect(getPickerContainer()).not.toBeNull();

      fixtureInstance.datePicker.close();
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
      expect(document.activeElement).toEqual(getPickerInput(fixture.debugElement));
    });

    it('should open on enter', () => {
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

    it('should open by click and focus on inner calendar input', () => {
      fixture.detectChanges();
      openPickerByClickTrigger();
      expect(document.activeElement).toEqual(getPickerInput(fixture.debugElement));
    });

    it('should open by click, focus on inner calendar input, and submit on enter', async () => {
      fixtureInstance.nzValue.set(new Date());
      await stabilize();
      openPickerByClickTrigger();
      expect(document.activeElement).toEqual(getPickerInput(fixture.debugElement));
      getPickerInput(fixture.debugElement).dispatchEvent(ENTER_EVENT);
      await stabilize(500);
      expect(getPickerContainer()).toBeNull();
    });

    it('should not submit with invalid input', () => {
      fixture.detectChanges();
      openPickerByClickTrigger();
      const input = getPickerInput(fixture.debugElement) as HTMLInputElement;
      input.value = 'invalid input';
      fixture.detectChanges();
      input.dispatchEvent(ENTER_EVENT);
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();
      expect(getPickerContainer()).not.toBeNull();
    });

    it('should have focus when opened programmatically', () => {
      fixture.detectChanges();
      openPickerByCode();
      expect(document.activeElement).toEqual(getPickerInput(fixture.debugElement));
    });

    it('should open by click and close by tab', () => {
      const nzOnChange = vi.spyOn(fixtureInstance, 'nzOnChange').mockImplementation(() => {});
      fixtureInstance.useSuite.set(5);

      fixture.detectChanges();
      openPickerByClickTrigger();
      expect(getPickerContainer()).not.toBeNull();

      typeInElement('2021-04-12', getPickerInput(fixture.debugElement));
      fixture.detectChanges();

      triggerInputBlur();
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();

      const result = (nzOnChange.mock.calls[0] as Date[])[0];
      expect(isSameDay(new Date('2021-04-12'), result)).toBeTruthy();
      expect(getPickerContainer()).toBeNull();
    });

    it("should not send onChangeEvent if value doesn't change", async () => {
      fixtureInstance.useSuite.set(5);
      fixtureInstance.firstValue.set(new Date('2021-04-12'));
      await stabilize();
      const nzOnChange = vi.spyOn(fixtureInstance, 'nzOnChange').mockImplementation(() => {});

      openPickerByClickTrigger();
      expect(getPickerContainer()).not.toBeNull();
      typeInElement('2021-04-12', getPickerInput(fixture.debugElement));
      fixture.detectChanges();

      triggerInputBlur();
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();

      expect(nzOnChange).not.toHaveBeenCalled();
      expect(getPickerContainer()).toBeNull();
    });

    it('should support changing language at runtime', () => {
      fixture.detectChanges();
      expect(getPickerInput(fixture.debugElement).placeholder).toBe('请选择日期');
      i18nService.setLocale(en_US);
      fixture.detectChanges();
      expect(getPickerInput(fixture.debugElement).placeholder).toBe('Select date');

      openPickerByClickTrigger();
      expect(queryFromOverlay(`.${PREFIX_CLASS}-content th`).textContent).toContain('Su');
    });

    /* Issue https://github.com/NG-ZORRO/ng-zorro-antd/issues/1539 */
    it('should be able to open after closed by "Escape" key', () => {
      fixture.detectChanges();
      openPickerByClickTrigger();
      expect(getPickerContainer()).not.toBeNull();

      dispatchKeyboardEvent(document.body, 'keydown', ESCAPE);
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();
      expect(getPickerContainer()).toBeNull();

      openPickerByClickTrigger();
      expect(getPickerContainer()).not.toBeNull();
    });

    it('should prevent default on the mousedown event when mouse down in date picker', () => {
      fixture.detectChanges();
      openPickerByClickTrigger();

      const event = new MouseEvent('mousedown');
      vi.spyOn(event, 'preventDefault');
      fixture.nativeElement.querySelector(`.${PREFIX_CLASS}`).dispatchEvent(event);

      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should execute default on the mousedown event when mouse down in date picker input', () => {
      fixture.detectChanges();
      openPickerByClickTrigger();

      const event = new MouseEvent('mousedown');
      vi.spyOn(event, 'preventDefault');
      fixture.nativeElement.querySelector(`.${PREFIX_CLASS} input`).dispatchEvent(event);

      expect(event.preventDefault).not.toHaveBeenCalled();
    });

    it('should support nzAllowClear and work properly', async () => {
      const clearBtnSelector = By.css(`.${PREFIX_CLASS}-clear`);
      const initial = new Date();
      fixtureInstance.nzValue.set(initial);
      fixtureInstance.nzAllowClear.set(false);
      await stabilize();
      expect(debugElement.query(clearBtnSelector)).toBeFalsy();

      fixtureInstance.nzAllowClear.set(true);
      await stabilize(500);
      expect(fixtureInstance.nzValue()).toBe(initial);
      expect(debugElement.query(clearBtnSelector)).toBeDefined();

      const nzOnChange = vi.spyOn(fixtureInstance, 'nzOnChange').mockImplementation(() => {});
      debugElement.query(clearBtnSelector).nativeElement.click();
      fixture.detectChanges();
      expect(fixtureInstance.nzValue()).toBe(initial);
      expect(nzOnChange).toHaveBeenCalledWith(null);
      expect(debugElement.query(clearBtnSelector)).toBeFalsy();
    });

    it('should support nzAutoFocus', () => {
      fixtureInstance.nzAutoFocus.set(true);
      fixture.detectChanges();
      expect(getPickerInput(fixture.debugElement) === document.activeElement).toBeTruthy();
    });

    it('should support nzDisabled', async () => {
      fixtureInstance.useSuite.set(4);
      fixtureInstance.nzDisabled.set(true);
      fixtureInstance.nzAllowClear.set(true); // Make sure picker clear button shown up
      fixtureInstance.nzValue.set(new Date());
      fixtureInstance.control.set(new FormControl(new Date()));
      await stabilize(10000);

      const datePickerElement = fixture.debugElement.query(By.directive(NzDatePickerComponent)).nativeElement;
      const inputElement = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;

      expect(datePickerElement.classList).toContain('ant-picker-disabled');
      expect(inputElement.disabled).toBeTruthy();
      openPickerByClickTrigger();
      expect(getPickerContainer()).toBeNull();

      fixtureInstance.control()!.enable();
      await stabilize(10000);
      expect(datePickerElement.classList).not.toContain('ant-picker-disabled');
      expect(inputElement.disabled).toBeFalsy();
      openPickerByClickTrigger();
      expect(getPickerContainer()).not.toBeNull();

      dispatchKeyboardEvent(document.body, 'keydown', ESCAPE);
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();
      fixtureInstance.control()!.disable();
      await stabilize(10000);
      expect(datePickerElement.classList).toContain('ant-picker-disabled');
      expect(inputElement.disabled).toBeTruthy();
      openPickerByClickTrigger();
      expect(getPickerContainer()).toBeNull();
    });

    it('should mark the control touched when user loseFocus of datePicker', () => {
      fixtureInstance.useSuite.set(4);
      fixtureInstance.control.set(new FormControl<Date | null>(null));
      fixture.detectChanges();
      vi.advanceTimersByTime(10000);
      const datePickerElement = fixture.debugElement.query(By.directive(NzDatePickerComponent)).nativeElement;
      openPickerByClickTrigger();
      expect(datePickerElement.classList).toContain('ng-untouched');
      triggerInputBlur();
      fixture.detectChanges();
      vi.advanceTimersByTime(10000);
      expect(datePickerElement.classList).toContain('ng-touched');
      expect(fixtureInstance.control()!.touched).toBeTruthy();
    });

    it('should support nzInputReadOnly', () => {
      fixtureInstance.nzInputReadOnly.set(true);
      fixture.detectChanges();
      expect(getPickerInput(fixture.debugElement).readOnly).toBeTruthy();

      fixtureInstance.nzInputReadOnly.set(false);
      fixture.detectChanges();
      expect(getPickerInput(fixture.debugElement).readOnly).not.toBeTruthy();
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

    it('should support nzFormat', async () => {
      fixtureInstance.nzFormat.set('dd.MM.yyyy');
      fixtureInstance.nzValue.set(new Date('2020-03-04'));
      await stabilize();
      openPickerByClickTrigger();
      const input = getPickerInput(fixture.debugElement);
      expect(input.value).toBe('04.03.2020');
      dispatchMouseEvent(queryFromOverlay('.ant-picker-cell')!, 'click');
      await stabilize(500);
      expect(input.value).toBe('24.02.2020');
    });

    it('should rerender input value when nzFormat changed', async () => {
      fixtureInstance.nzFormat.set('dd.MM.yyyy');
      fixtureInstance.nzValue.set(new Date('2025-05-23'));
      await stabilize(10000);
      const input = getPickerInput(fixture.debugElement);
      expect(input.value).toBe('23.05.2025');
      const nzOnChange = vi.spyOn(fixtureInstance, 'nzOnChange').mockImplementation(() => {});
      fixtureInstance.nzFormat.set('dd/MM/yyyy');
      await stabilize(10000);
      expect(input.value).toBe('23/05/2025');
      expect(nzOnChange).not.toHaveBeenCalled();
    });

    it('should support nzDisabledDate', async () => {
      fixture.detectChanges();
      const compareDate = new Date('2018-11-15 00:00:00');
      fixtureInstance.nzValue.set(new Date('2018-11-11 12:12:12'));
      fixtureInstance.nzDisabledDate.set((current: Date) => isSameDay(current, compareDate));
      await stabilize(10000);
      openPickerByClickTrigger();
      const disabledCell = queryFromOverlay(`tbody tr td.${PREFIX_CLASS}-cell-disabled div`);
      expect(disabledCell.textContent!.trim()).toBe('15');
      const input = getPickerInput(fixture.debugElement);
      const submit = (date: string): void => {
        input.value = date;
        fixture.detectChanges();
        input.dispatchEvent(ENTER_EVENT);
        fixture.detectChanges();
        vi.advanceTimersByTime(500);
        fixture.detectChanges();
      };
      // Should fail to submit a disabled date
      submit('2018-11-15');
      expect(getPickerContainer()).not.toBeNull();
      // But it should be fine to submit an enabled date
      submit('2018-11-11');
      expect(getPickerContainer()).toBeNull();
    });

    // #5633
    it('should support disable year and month right', () => {
      fixture.detectChanges();
      fixtureInstance.nzValue.set(new Date(2020, 0, 1));
      fixtureInstance.nzDisabledDate.set(
        (date: Date): boolean => date >= new Date(2019, 0, 1) && date < new Date(2019, 0, 2)
      );
      fixture.detectChanges();
      vi.advanceTimersByTime(10000);
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
    });

    it('should support nzLocale', () => {
      const featureKey = 'TEST_PLACEHOLDER';
      fixtureInstance.nzLocale.set({ lang: { placeholder: featureKey } });
      fixture.detectChanges();
      expect(getPickerInput(fixture.debugElement).getAttribute('placeholder')).toBe(featureKey);
    });

    it('should support nzPlaceHolder', () => {
      const featureKey = 'TEST_PLACEHOLDER';
      fixtureInstance.nzPlaceHolder.set(featureKey);
      fixture.detectChanges();
      expect(getPickerInput(fixture.debugElement).getAttribute('placeholder')).toBe(featureKey);
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
      expect(getPickerAbstract(fixture.debugElement).classList.contains(`${PREFIX_CLASS}-large`)).toBeTruthy();

      fixtureInstance.nzSize.set('small');
      fixture.detectChanges();
      expect(getPickerAbstract(fixture.debugElement).classList.contains(`${PREFIX_CLASS}-small`)).toBeTruthy();
    });

    it('should support nzOnOpenChange', () => {
      const nzOnOpenChange = vi.spyOn(fixtureInstance, 'nzOnOpenChange').mockImplementation(() => {});
      fixture.detectChanges();
      openPickerByClickTrigger();
      expect(nzOnOpenChange).toHaveBeenCalledWith(true);

      triggerInputBlur();
      fixture.detectChanges();
      vi.advanceTimersByTime(10000);
      expect(nzOnOpenChange).toHaveBeenCalledWith(false);
      expect(nzOnOpenChange).toHaveBeenCalledTimes(2);
    });

    it('should not emit nzOnOpenChange second time when input clicked twice', () => {
      const nzOnOpenChange = vi.spyOn(fixtureInstance, 'nzOnOpenChange').mockImplementation(() => {});

      fixture.detectChanges();
      openPickerByClickTrigger();

      expect(nzOnOpenChange).toHaveBeenCalledWith(true);
      expect(nzOnOpenChange).toHaveBeenCalledTimes(1);
    });

    it('should not emit nzOnOpenChange when nzOpen is false and input is clicked', () => {
      const nzOnOpenChange = vi.spyOn(fixtureInstance, 'nzOnOpenChange').mockImplementation(() => {});
      fixtureInstance.useSuite.set(2);
      fixtureInstance.nzOpen.set(false);

      fixture.detectChanges();
      openPickerByClickTrigger();

      expect(nzOnOpenChange).not.toHaveBeenCalledWith(true);
    });

    it('should support nzValue', async () => {
      fixtureInstance.nzDefaultPickerValue.set(new Date('2015-09-17'));
      fixtureInstance.nzValue.set(new Date('2018-11-11'));
      await stabilize(10000);
      openPickerByClickTrigger();
      expect(getSelectedDayCell().textContent!.trim()).toBe('11');
    });

    it('should support nzOnChange', () => {
      fixtureInstance.nzValue.set(new Date('2018-11-11'));
      const nzOnChange = vi.spyOn(fixtureInstance, 'nzOnChange').mockImplementation(() => {});
      const nzOnCalendarChange = vi.spyOn(fixtureInstance, 'nzOnCalendarChange').mockImplementation(() => {});
      fixture.detectChanges();
      openPickerByClickTrigger();

      const cell = getFirstCell(); // Use the first cell
      const cellText = cell.textContent!.trim();
      dispatchMouseEvent(cell, 'click');
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();
      expect(nzOnChange).toHaveBeenCalled();
      expect(nzOnCalendarChange).not.toHaveBeenCalled();
      const result = (nzOnChange.mock.calls[0] as Date[])[0];
      expect(result.getDate()).toBe(+cellText);
    });

    it('should support nzDefaultPickerValue', () => {
      fixture.detectChanges();
      fixtureInstance.nzDefaultPickerValue.set(new Date('2015-09-17'));
      fixture.detectChanges();
      vi.advanceTimersByTime(10000);
      fixture.detectChanges();
      openPickerByClickTrigger();
      expect(queryFromOverlay('.ant-picker-header-year-btn').textContent!.indexOf('2015') > -1).toBeTruthy();
      expect(queryFromOverlay('.ant-picker-header-month-btn').textContent!.indexOf('9') > -1).toBeTruthy();
    });

    it('should support custom suffixIcon', () => {
      fixtureInstance.nzSuffixIcon.set('clock-circle');
      fixture.detectChanges();
      expect(debugElement.query(By.css(`.anticon-clock-circle`))).toBeDefined();
    });

    describe('should variant work', () => {
      it('outlined', () => {
        fixtureInstance.nzVariant.set('outlined');
        fixture.detectChanges();
        expect(debugElement.query(By.css(`.ant-picker-outlined`))).toBeDefined();
      });

      it('borderless', () => {
        fixture.detectChanges();
        expect(debugElement.query(By.css(`.ant-picker-borderless`))).toBeNull();
        fixtureInstance.nzVariant.set('borderless');
        fixture.detectChanges();
        expect(debugElement.query(By.css(`.ant-picker-borderless`))).toBeDefined();
      });

      it('filled', () => {
        fixture.detectChanges();
        expect(debugElement.query(By.css(`.ant-picker-filled`))).toBeNull();
        fixtureInstance.nzVariant.set('filled');
        fixture.detectChanges();
        expect(debugElement.query(By.css(`.ant-picker-filled`))).toBeDefined();
      });

      it('underlined', () => {
        fixture.detectChanges();
        expect(debugElement.query(By.css(`.ant-picker-underlined`))).toBeNull();
        fixtureInstance.nzVariant.set('underlined');
        fixture.detectChanges();
        expect(debugElement.query(By.css(`.ant-picker-underlined`))).toBeDefined();
      });
    });

    it('should support nzInline', () => {
      const nzOnChange = vi.spyOn(fixtureInstance, 'nzOnChange').mockImplementation(() => {});
      fixtureInstance.nzInline.set(true);
      fixture.detectChanges();
      overlayContainerElement = debugElement.nativeElement as HTMLLIElement;
      const cell = getFirstCell(); // Use the first cell
      const cellText = cell.textContent!.trim();
      dispatchMouseEvent(cell, 'click');
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();
      expect(nzOnChange).toHaveBeenCalled();
      const result = (nzOnChange.mock.calls[0] as Date[])[0];
      expect(result.getDate()).toBe(+cellText);
    });

    it('should not run change detection when inline mode is enabled and the `date-range-popup` is clicked', () => {
      fixtureInstance.nzInline.set(true);
      fixture.detectChanges();

      const appRef = TestBed.inject(ApplicationRef);
      const event = new MouseEvent('mousedown');

      vi.spyOn(appRef, 'tick').mockImplementation(() => {});
      vi.spyOn(event, 'preventDefault');

      debugElement.nativeElement.querySelector('date-range-popup').dispatchEvent(event);

      expect(appRef.tick).not.toHaveBeenCalled();
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should support nzBackdrop', () => {
      fixtureInstance.nzBackdrop.set(true);
      fixture.detectChanges();
      openPickerByClickTrigger();
      const boundingBox = overlayContainerElement.children[0];
      expect(boundingBox.children[0].classList).toContain('cdk-overlay-backdrop');
    });

    // TODO: why this works well locally but fails on CI?
    xit('should support nzPlacement', () => {
      fixtureInstance.nzPlacement.set('bottomLeft');
      fixture.detectChanges();
      openPickerByClickTrigger();
      let element = queryFromOverlay('.ant-picker-dropdown');
      expect(element.classList.contains('ant-picker-dropdown-placement-bottomLeft')).toBe(true);
      expect(element.classList.contains('ant-picker-dropdown-placement-topLeft')).toBe(false);
      expect(element.classList.contains('ant-picker-dropdown-placement-bottomRight')).toBe(false);
      expect(element.classList.contains('ant-picker-dropdown-placement-topRight')).toBe(false);
      triggerInputBlur();
      fixture.detectChanges();
      vi.advanceTimersByTime(500);

      fixtureInstance.nzPlacement.set('bottomRight');
      fixture.detectChanges();
      openPickerByClickTrigger();
      element = queryFromOverlay('.ant-picker-dropdown');
      expect(element.classList.contains('ant-picker-dropdown-placement-bottomLeft')).toBe(false);
      expect(element.classList.contains('ant-picker-dropdown-placement-topLeft')).toBe(false);
      expect(element.classList.contains('ant-picker-dropdown-placement-bottomRight')).toBe(true);
      expect(element.classList.contains('ant-picker-dropdown-placement-topRight')).toBe(false);

      fixtureInstance.nzPlacement.set('topLeft');
      fixture.detectChanges();
      openPickerByClickTrigger();
      element = queryFromOverlay('.ant-picker-dropdown');
      expect(element.classList.contains('ant-picker-dropdown-placement-bottomLeft')).toBe(false);
      expect(element.classList.contains('ant-picker-dropdown-placement-topLeft')).toBe(true);
      expect(element.classList.contains('ant-picker-dropdown-placement-bottomRight')).toBe(false);
      expect(element.classList.contains('ant-picker-dropdown-placement-topRight')).toBe(false);

      fixtureInstance.nzPlacement.set('topRight');
      fixture.detectChanges();
      openPickerByClickTrigger();
      element = queryFromOverlay('.ant-picker-dropdown');
      expect(element.classList.contains('ant-picker-dropdown-placement-bottomLeft')).toBe(false);
      expect(element.classList.contains('ant-picker-dropdown-placement-topLeft')).toBe(false);
      expect(element.classList.contains('ant-picker-dropdown-placement-bottomRight')).toBe(false);
      expect(element.classList.contains('ant-picker-dropdown-placement-topRight')).toBe(true);

      triggerInputBlur();
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();
    });

    it('should support nzShowWeekNumber', () => {
      fixtureInstance.nzShowWeekNumber.set(true);
      fixture.detectChanges();
      openPickerByClickTrigger();
      expect(queryFromOverlay('.ant-picker-week-panel-row .ant-picker-cell-week')).toBeDefined();
      fixtureInstance.nzShowWeekNumber.set(false);
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      openPickerByClickTrigger();
      expect(queryFromOverlay('.ant-picker-week-panel-row .ant-picker-cell-week')).toBeNull();
    });
  });

  describe('panel switch and move forward/afterward', () => {
    beforeEach(() => fixtureInstance.useSuite.set(1));

    it('should support date panel changes on click month', async () => {
      fixtureInstance.nzValue.set(new Date('2018-11-11'));
      await stabilize();
      openPickerByClickTrigger();
      // Click month
      dispatchMouseEvent(queryFromOverlay('.ant-picker-header-month-btn'), 'click');
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();
      dispatchMouseEvent(getFirstCell(), 'click');
      await stabilize(500);
      // click 2018-01-01
      dispatchMouseEvent(getFirstCell(), 'click');
      await stabilize(500);
      expect(getPickerInput(fixture.debugElement).value).toBe('2018-01-01');
    });

    it('should support date panel changes', async () => {
      fixtureInstance.nzValue.set(new Date('2018-11-11'));
      await stabilize(10000);
      openPickerByClickTrigger();
      // Click previous year button
      dispatchMouseEvent(getSuperPreBtn(), 'click');
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();
      expect(queryFromOverlay('.ant-picker-header-year-btn').textContent!.indexOf('2017') > -1).toBeTruthy();
      // Click next year button * 2
      dispatchMouseEvent(getSuperNextBtn(), 'click');
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();
      dispatchMouseEvent(getSuperNextBtn(), 'click');
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();
      expect(queryFromOverlay('.ant-picker-header-year-btn').textContent!.indexOf('2019') > -1).toBeTruthy();
      // Click previous month button
      dispatchMouseEvent(getPreBtn(), 'click');
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();
      expect(queryFromOverlay('.ant-picker-header-month-btn').textContent!.indexOf('10') > -1).toBeTruthy();
      // Click next month button * 2
      dispatchMouseEvent(getNextBtn(), 'click');
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();
      dispatchMouseEvent(getNextBtn(), 'click');
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();
      expect(queryFromOverlay('.ant-picker-header-month-btn').textContent!.indexOf('12') > -1).toBeTruthy();
    });

    it('should support month panel changes', async () => {
      fixtureInstance.nzValue.set(new Date('2018-11-11'));
      await stabilize(10000);
      openPickerByClickTrigger();
      // Click month select to show month panel
      dispatchMouseEvent(queryFromOverlay('.ant-picker-header-month-btn'), 'click');
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();
      expect(queryFromOverlay('.ant-picker-month-panel')).toBeDefined();
      expect(queryFromOverlay('.ant-picker-header-month-btn').textContent!.indexOf('2018') > -1).toBeTruthy();
      // Goto previous year
      dispatchMouseEvent(getSuperPreBtn(), 'click');
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();
      expect(queryFromOverlay('.ant-picker-header-month-btn').textContent!.indexOf('2017') > -1).toBeTruthy();
      // Goto next year * 2
      dispatchMouseEvent(getSuperNextBtn(), 'click');
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();
      dispatchMouseEvent(getSuperNextBtn(), 'click');
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();
      expect(queryFromOverlay('.ant-picker-header-month-btn').textContent!.indexOf('2019') > -1).toBeTruthy();
      // Click to choose a year to change panel
      dispatchMouseEvent(queryFromOverlay('td.ant-picker-cell'), 'click');
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();
      expect(queryFromOverlay('.ant-picker-date-panel')).toBeTruthy();
    });

    it('should support year panel changes', async () => {
      fixtureInstance.nzValue.set(new Date('2018-11-11'));
      await stabilize(10000);
      openPickerByClickTrigger();
      // Click year select to show year panel
      dispatchMouseEvent(queryFromOverlay('.ant-picker-header-year-btn'), 'click');
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();
      expect(queryFromOverlay('.ant-picker-year-panel')).toBeDefined();
      expect(queryFromOverlay('.ant-picker-header-year-btn').textContent!.indexOf('2010') > -1).toBeTruthy();
      expect(queryFromOverlay('.ant-picker-header-year-btn').textContent!.indexOf('2019') > -1).toBeTruthy();
      // Coverage for last/next cell
      dispatchMouseEvent(getSuperPreBtn(), 'click');
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();
      dispatchMouseEvent(getSuperNextBtn(), 'click');
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();
      // Goto previous decade
      dispatchMouseEvent(getSuperPreBtn(), 'click');
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();
      expect(queryFromOverlay('.ant-picker-header-year-btn').textContent!.indexOf('2000') > -1).toBeTruthy();
      expect(queryFromOverlay('.ant-picker-header-year-btn').textContent!.indexOf('2009') > -1).toBeTruthy();
      // Goto next decade * 2
      dispatchMouseEvent(getSuperNextBtn(), 'click');
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();
      dispatchMouseEvent(getSuperNextBtn(), 'click');
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();
      expect(queryFromOverlay('.ant-picker-header-year-btn').textContent!.indexOf('2020') > -1).toBeTruthy();
      expect(queryFromOverlay('.ant-picker-header-year-btn').textContent!.indexOf('2029') > -1).toBeTruthy();
      // Click to choose a year to change panel
      dispatchMouseEvent(queryFromOverlay('td.ant-picker-cell'), 'click');
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();
      expect(queryFromOverlay('.ant-picker-header .ant-picker-year-panel')).toBeFalsy();
    });

    it('should support decade panel changes', () => {
      fixtureInstance.nzValue.set(new Date('2018-11-11'));
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();
      openPickerByClickTrigger();
      // Click to show decade panel
      dispatchMouseEvent(queryFromOverlay('.ant-picker-header-year-btn'), 'click');
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();
      dispatchMouseEvent(queryFromOverlay('.ant-picker-header-year-btn'), 'click');
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();
      expect(queryFromOverlay('.ant-picker-decade-panel')).toBeDefined();
      // Coverage for last/next cell
      dispatchMouseEvent(getSuperNextBtn(), 'click');
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();
      dispatchMouseEvent(getSuperPreBtn(), 'click');
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();
      // Goto previous century
      dispatchMouseEvent(getSuperPreBtn(), 'click');
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();
      expect(queryFromOverlay('.ant-picker-header-decade-btn').textContent!.indexOf('1900') > -1).toBeTruthy();
      expect(queryFromOverlay('.ant-picker-header-decade-btn').textContent!.indexOf('1999') > -1).toBeTruthy();
      // Goto next century * 2
      dispatchMouseEvent(getSuperNextBtn(), 'click');
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();
      dispatchMouseEvent(getSuperNextBtn(), 'click');
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();
      expect(queryFromOverlay('.ant-picker-header-decade-btn').textContent!.indexOf('2100') > -1).toBeTruthy();
      expect(queryFromOverlay('.ant-picker-header-decade-btn').textContent!.indexOf('2199') > -1).toBeTruthy();
      // Click to choose a decade to change panel
      dispatchMouseEvent(queryFromOverlay('td.ant-picker-cell'), 'click');
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();
      expect(queryFromOverlay('.ant-picker-year-panel')).toBeDefined();
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
      fixtureInstance.nzDateRender.set((d: Date) => (d.getDate() === 1 ? featureKey : d.getDate()));
      fixture.detectChanges();
      openPickerByClickTrigger();
      expect(overlayContainerElement.textContent!.indexOf(featureKey) > -1).toBeTruthy();
    });

    it('should support nzShowTime', async () => {
      fixtureInstance.nzValue.set(new Date('2018-11-11 11:22:33'));
      fixtureInstance.nzShowTime.set('' as NzSafeAny);
      await stabilize();
      openPickerByClickTrigger();
      await stabilize(10000);
      expect(queryFromOverlay('.ant-picker-ok')).toBeDefined();
      expect(queryFromOverlay('.ant-picker-time-panel')).toBeDefined();
      expect(
        queryFromOverlay('.ant-picker-time-panel-cell-selected .ant-picker-time-panel-cell-inner').textContent!.trim()
      ).toBe('11');

      // Click to choose an hour
      dispatchMouseEvent(queryFromOverlay('.ant-picker-time-panel-cell:first-child'), 'click');
      await stabilize(10000);
      expect(getPickerInput(fixture.debugElement).value).toBe('2018-11-11 00:22:33');
    });

    it('should support nzShowTime.nzDefaultOpenValue', async () => {
      fixtureInstance.nzValue.set(null);
      fixtureInstance.nzShowTime.set({ nzDefaultOpenValue: new Date(0, 0, 0, 0, 1, 2) });
      await stabilize();
      openPickerByClickTrigger();

      dispatchMouseEvent(getFirstCell(), 'click');
      await stabilize(500);
      expect(getPickerInput(fixture.debugElement).value).toContain('00:01:02');

      const listOfSelectedLi = overlayContainerElement.querySelectorAll(
        '.ant-picker-time-panel-cell-selected .ant-picker-time-panel-cell-inner'
      );
      expect(listOfSelectedLi[0].textContent!.trim()).toBe('00');
      expect(listOfSelectedLi[1].textContent!.trim()).toBe('01');
      expect(listOfSelectedLi[2].textContent!.trim()).toBe('02');
    });

    it('should not reset time', async () => {
      fixtureInstance.nzValue.set(new Date('2019-08-02 13:03:33'));
      fixtureInstance.nzShowTime.set(true);
      await stabilize(10000);
      openPickerByClickTrigger();
      dispatchMouseEvent(getFirstCell(), 'click');
      await stabilize(10000);
      expect(getPickerInput(fixture.debugElement).value).toBe('2019-07-29 13:03:33');
    });

    it('should support nzShowTime.nzFormat', () => {
      fixtureInstance.nzShowTime.set({ nzFormat: 'HH:mm' });
      fixture.detectChanges();
      openPickerByClickTrigger();
      expect(overlayContainerElement.querySelectorAll('.ant-picker-time-panel-column').length).toBe(2);
    });

    it('should support nzDisabledTime and nzShowTime.nzHideDisabledOptions', () => {
      fixtureInstance.nzShowTime.set(true);
      fixtureInstance.nzDisabledTime.set(() => ({
        nzDisabledHours: () => [0, 1, 2],
        nzDisabledMinutes: () => [0, 1],
        nzDisabledSeconds: () => [0]
      }));
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
      fixtureInstance.nzShowTime.set({ nzHideDisabledOptions: true });
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
    });

    it('should nzDisabledTime invalid input not emit', async () => {
      fixtureInstance.nzShowTime.set(true);
      fixtureInstance.nzDisabledTime.set(() => ({
        nzDisabledHours: () => [0, 1, 2],
        nzDisabledMinutes: () => [0, 1],
        nzDisabledSeconds: () => [0]
      }));
      fixture.detectChanges();
      openPickerByClickTrigger();

      // input disabled value
      const input = getPickerInput(fixture.debugElement);
      typeInElement('2020-03-14 00:00:00', input);
      fixture.detectChanges();
      input.dispatchEvent(ENTER_EVENT);
      await stabilize(500);
      expect(getPickerContainer()).not.toBeNull();

      triggerInputBlur();
      await stabilize(500);
      expect(getPickerInput(fixture.debugElement).value).toBe('');
    });

    it('should support updating the nzDisabledTime state when the current time changes', () => {
      fixtureInstance.nzShowTime.set(true);
      fixtureInstance.nzDisabledTime.set((current: Date) => ({
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
      }));
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
    });

    it('should support nzRenderExtraFooter', () => {
      fixtureInstance.nzRenderExtraFooter.set(() => fixtureInstance.tplExtraFooter);
      fixture.detectChanges();

      openPickerByClickTrigger();
      expect(overlayContainerElement.textContent!.indexOf('TEST_EXTRA_FOOTER') > -1).toBeTruthy();

      fixtureInstance.nzRenderExtraFooter.set('TEST_EXTRA_FOOTER_STRING');
      fixture.detectChanges();
      expect(overlayContainerElement.textContent!.indexOf('TEST_EXTRA_FOOTER_STRING') > -1).toBeTruthy();
    });

    it('should support nzShowToday', () => {
      fixture.detectChanges();
      openPickerByClickTrigger();
      expect(overlayContainerElement.querySelector('.ant-picker-footer')).toBeDefined();

      fixtureInstance.nzShowToday.set(true);
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-picker-today-btn')).toBeDefined();

      // Click today button
      const nzOnChange = vi.spyOn(fixtureInstance, 'nzOnChange').mockImplementation(() => {});
      dispatchMouseEvent(queryFromOverlay('.ant-picker-today-btn'), 'click');
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();
      const result = (nzOnChange.mock.calls[0] as Date[])[0];
      expect(isSameDay(new Date(), result)).toBeTruthy();
      expect(queryFromOverlay('.ant-picker-container')).toBeFalsy(); // Should be closed
    });

    it('should support nzShowNow', async () => {
      await stabilize();
      openPickerByClickTrigger();
      expect(overlayContainerElement.querySelector('.ant-picker-footer')).toBeDefined();

      fixtureInstance.nzShowTime.set(true);

      fixtureInstance.nzShowNow.set(false);
      await stabilize();
      expect(overlayContainerElement.querySelector('.ant-picker-now-btn')).toBeNull();

      fixtureInstance.nzShowNow.set(true);
      await stabilize();
      expect(overlayContainerElement.querySelector('.ant-picker-now-btn')).toBeDefined();

      // Click now button
      const nzOnChange = vi.spyOn(fixtureInstance, 'nzOnChange').mockImplementation(() => {});
      dispatchMouseEvent(queryFromOverlay('.ant-picker-now-btn'), 'click');
      await stabilize();

      // Click ok button
      dispatchMouseEvent(overlayContainerElement.querySelector('.ant-picker-ok > button')!, 'click');
      await stabilize();
      const result = (nzOnChange.mock.calls[0] as Date[])[0];
      expect(Math.abs(new Date().getTime() - result.getTime())).toBeLessThan(1000);
      await stabilize(500);
      expect(queryFromOverlay('.ant-picker-container')).toBeFalsy(); // Should be closed
    });

    it('should support nzMode', async () => {
      fixtureInstance.nzValue.set(new Date('2020-12-01'));
      await stabilize(10000);
      expect(getPickerInput(fixture.debugElement).placeholder).toEqual('请选择日期');

      fixtureInstance.nzMode.set('month');
      await stabilize(10000);
      expect(getPickerInput(fixture.debugElement).placeholder).toEqual('请选择月份');
      expect(getPickerInput(fixture.debugElement).value).toEqual('2020-12');

      openPickerByClickTrigger();
      expect(overlayContainerElement.querySelector('.ant-picker-month-panel')).toBeDefined();
    });

    it('should support nzOnPanelChange', async () => {
      fixtureInstance.nzValue.set(new Date('2020-12-01'));
      vi.spyOn(fixtureInstance, 'nzOnPanelChange').mockImplementation(() => {});
      await stabilize();
      openPickerByClickTrigger();

      // Click header to month panel
      dispatchMouseEvent(overlayContainerElement.querySelector('.ant-picker-header-month-btn')!, 'click');
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();
      expect(fixtureInstance.nzOnPanelChange).toHaveBeenCalledWith({ mode: 'month', date: new Date('2020-12-01') });
    });

    it('should support nzOnPanelChange when next button is clicked', async () => {
      fixtureInstance.nzValue.set(new Date('2020-11-01'));
      vi.spyOn(fixtureInstance, 'nzOnPanelChange').mockImplementation(() => {});
      await stabilize();
      openPickerByClickTrigger();
      dispatchMouseEvent(getNextBtn(), 'click');
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();
      expect(fixtureInstance.nzOnPanelChange).toHaveBeenCalledWith({ mode: 'date', date: new Date('2020-12-01') });
    });

    it('should support nzOnPanelChange when super next button is clicked', async () => {
      fixtureInstance.nzValue.set(new Date('2020-11-01'));
      vi.spyOn(fixtureInstance, 'nzOnPanelChange').mockImplementation(() => {});
      await stabilize();
      openPickerByClickTrigger();
      dispatchMouseEvent(getSuperNextBtn(), 'click');
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();
      expect(fixtureInstance.nzOnPanelChange).toHaveBeenCalledWith({ mode: 'date', date: new Date('2021-11-01') });
    });

    it('should support nzOnPanelChange when previous button is clicked', async () => {
      fixtureInstance.nzValue.set(new Date('2020-11-01 11:22:33'));
      vi.spyOn(fixtureInstance, 'nzOnPanelChange').mockImplementation(() => {});
      await stabilize();
      openPickerByClickTrigger();
      dispatchMouseEvent(getPreBtn(), 'click');
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();
      expect(fixtureInstance.nzOnPanelChange).toHaveBeenCalledWith({
        mode: 'date',
        date: new Date('2020-10-01 11:22:33')
      });
    });

    it('should support nzOnPanelChange when super previous button is clicked', async () => {
      fixtureInstance.nzValue.set(new Date('2020-11-01 11:22:33'));
      vi.spyOn(fixtureInstance, 'nzOnPanelChange').mockImplementation(() => {});
      await stabilize();
      openPickerByClickTrigger();
      dispatchMouseEvent(getSuperPreBtn(), 'click');
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();
      expect(fixtureInstance.nzOnPanelChange).toHaveBeenCalledWith({
        mode: 'date',
        date: new Date('2019-11-01 11:22:33')
      });
    });

    it('should support nzOnOk', async () => {
      vi.spyOn(fixtureInstance, 'nzOnOk').mockImplementation(() => {});
      fixtureInstance.nzValue.set(new Date('2018-11-11 11:22:33'));
      fixtureInstance.nzShowTime.set(true);
      await stabilize(10000);
      openPickerByClickTrigger();

      // Click ok button
      dispatchMouseEvent(overlayContainerElement.querySelector('.ant-picker-ok > button')!, 'click');
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();
      expect(fixtureInstance.nzOnOk).toHaveBeenCalledWith(fixtureInstance.nzValue());
    });

    it('should custom input date', () => {
      const nzOnChange = vi.spyOn(fixtureInstance, 'nzOnChange').mockImplementation(() => {});
      fixture.detectChanges();
      openPickerByClickTrigger();
      const input = getPickerInput(fixture.debugElement);

      // Wrong input support
      typeInElement('wrong', input);
      fixture.detectChanges();
      vi.advanceTimersByTime(10000);
      fixture.detectChanges();
      // expect(input.classList.contains('ant-calendar-input-invalid')).toBeTruthy();

      // Correct input
      input.value = '2018-11-22';
      input.dispatchEvent(ENTER_EVENT);
      // dispatchKeyboardEvent(input, 'keyup', ENTER); // Not working?
      fixture.detectChanges();
      vi.advanceTimersByTime(10000);
      fixture.detectChanges();
      expect(nzOnChange).toHaveBeenCalled();
      const result = (nzOnChange.mock.calls[0] as Date[])[0];
      expect(result.getDate()).toBe(22);
    });

    // #6070
    it('should reset after input invalid value and close panel', async () => {
      fixture.detectChanges();
      openPickerByClickTrigger();
      const input = getPickerInput(fixture.debugElement);

      // Wrong input support
      typeInElement('wrong', input);
      await stabilize(10000);

      triggerInputBlur();
      await stabilize(500);
      expect(input.value).toBe('');
    });
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
    beforeEach(() => fixtureInstance.useSuite.set(3));

    it('should specified date provide by "modelValue" be chosen', async () => {
      fixtureInstance.modelValue.set(new Date('2018-11-11'));
      await stabilize(10000);
      expect(getSelectedDayCell().textContent!.trim()).toBe('11');

      // Click the first cell to change ngModel
      const cell = getFirstCell();
      const cellText = cell.textContent!.trim();
      dispatchMouseEvent(cell, 'click');
      fixture.detectChanges();
      expect(fixtureInstance.modelValue()!.getDate()).toBe(+cellText);
    });
  });

  describe('formControl', () => {
    beforeEach(() => fixtureInstance.useSuite.set(4));

    it('should formControl init work', async () => {
      fixtureInstance.control.set(new FormControl(new Date('2020-04-08')));
      await stabilize(10000);
      const datePickerElement = fixture.debugElement.query(By.directive(NzDatePickerComponent)).nativeElement;
      const inputElement = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;

      expect(datePickerElement.classList).not.toContain('ant-picker-disabled');
      expect(inputElement.disabled).toBeFalsy();
      expect(getPickerInput(fixture.debugElement).value!.trim()).toBe('2020-04-08');
    });

    it('should disabled work', async () => {
      fixtureInstance.control.set(new FormControl({ value: new Date('2020-04-24'), disabled: true }));
      await stabilize(10000);
      expect(getPickerInput(fixture.debugElement).getAttribute('disabled')).not.toBeNull();
    });
  });

  function getPickerContainer(): HTMLElement {
    return queryFromOverlay(`.${PREFIX_CLASS}-panel-container`) as HTMLElement;
  }

  async function stabilize(ms = 0): Promise<void> {
    fixture.detectChanges();
    await vi.advanceTimersByTimeAsync(ms);
    await vi.runOnlyPendingTimersAsync();
    fixture.detectChanges();
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
    vi.advanceTimersByTime(500);
    fixture.detectChanges();
  }

  function openPickerByCode(): void {
    fixtureInstance.datePicker.open();
    fixture.detectChanges();
    vi.advanceTimersByTime(500);
    fixture.detectChanges();
  }

  function triggerInputBlur(): void {
    dispatchFakeEvent(getPickerInput(fixture.debugElement), 'focusout');
  }
});

describe('date-fns testing', () => {
  let fixture: ComponentFixture<NzTestDatePickerComponent>;
  let fixtureInstance: NzTestDatePickerComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideNzNoAnimation(), { provide: NZ_DATE_LOCALE, useValue: enUS }]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NzTestDatePickerComponent);
    fixtureInstance = fixture.componentInstance;
    fixtureInstance.useSuite.set(1);
  });

  it('should parse input value with nzFormat', () => {
    vi.useFakeTimers();
    const nzOnChange = vi.spyOn(fixtureInstance, 'nzOnChange').mockImplementation(() => {});
    fixtureInstance.nzFormat.set('dd.MM.yyyy');
    fixture.detectChanges();
    dispatchMouseEvent(getPickerInput(fixture.debugElement), 'click');
    fixture.detectChanges();
    vi.advanceTimersByTime(500);
    fixture.detectChanges();
    const input = getPickerInput(fixture.debugElement);
    expect(input).not.toBeNull();
    typeInElement('25.10.2019', input);
    fixture.detectChanges();
    input.dispatchEvent(ENTER_EVENT);
    fixture.detectChanges();
    vi.advanceTimersByTime(10000);
    expect(nzOnChange).toHaveBeenCalled();
    const result = (nzOnChange.mock.calls[0] as Date[])[0];
    expect(result.getFullYear()).toBe(2019);
    expect(result.getMonth() + 1).toBe(10);
    expect(result.getDate()).toBe(25);
    vi.useRealTimers();
  });
});

describe('date-picker status', () => {
  let fixture: ComponentFixture<NzTestDatePickerStatusComponent>;
  let fixtureInstance: NzTestDatePickerStatusComponent;
  let datePickerElement!: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideNzNoAnimation()]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NzTestDatePickerStatusComponent);
    fixtureInstance = fixture.componentInstance;
    datePickerElement = fixture.debugElement.query(By.directive(NzDatePickerComponent)).nativeElement;
    fixture.detectChanges();
  });

  it('should classname correct', () => {
    expect(datePickerElement.classList).toContain('ant-picker-status-error');

    fixtureInstance.status.set('warning');
    fixture.detectChanges();
    expect(datePickerElement.classList).toContain('ant-picker-status-warning');

    fixtureInstance.status.set('');
    fixture.detectChanges();
    expect(datePickerElement.classList).not.toContain('ant-picker-status-warning');
  });
});

describe('in form', () => {
  let fixture: ComponentFixture<NzTestDatePickerInFormComponent>;
  let datePickerElement!: HTMLElement;
  let formGroup: FormGroup<{
    demo: FormControl<Date | null>;
  }>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideNzNoAnimation()]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NzTestDatePickerInFormComponent);
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

describe('signal forms (formField)', () => {
  let fixture: ComponentFixture<NzTestDatePickerInSignalFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideNzNoAnimation()]
    });
  });

  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('should display the initial value provided via [formField]', async () => {
    fixture = TestBed.createComponent(NzTestDatePickerInSignalFormComponent);
    fixture.componentInstance.model.set({ date: new Date('2020-04-08') });
    fixture.detectChanges();
    await vi.advanceTimersByTimeAsync(10000);
    await vi.runOnlyPendingTimersAsync();
    fixture.detectChanges();
    expect(getPickerInput(fixture.debugElement).value!.trim()).toBe('2020-04-08');
  });

  it('should display a value assigned to the model after creation', async () => {
    fixture = TestBed.createComponent(NzTestDatePickerInSignalFormComponent);
    fixture.detectChanges();
    await vi.advanceTimersByTimeAsync(10000);
    await vi.runOnlyPendingTimersAsync();
    fixture.componentInstance.model.set({ date: new Date('2020-04-08') });
    fixture.detectChanges();
    await vi.advanceTimersByTimeAsync(10000);
    await vi.runOnlyPendingTimersAsync();
    fixture.detectChanges();
    expect(getPickerInput(fixture.debugElement).value!.trim()).toBe('2020-04-08');
  });
});

describe('finalSize', () => {
  let fixture: ComponentFixture<TestDatePickerFinalSizeComponent>;
  let datePickerElement: HTMLElement;
  let compactSizeSignal: WritableSignal<NzSizeLDSType>;
  let formSizeSignal: WritableSignal<NzSizeLDSType | undefined>;

  beforeEach(() => {
    compactSizeSignal = signal<NzSizeLDSType>('large');
    formSizeSignal = signal<NzSizeLDSType>('default');
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should set correctly the size from the formSize signal', () => {
    TestBed.configureTestingModule({
      providers: [
        { provide: NZ_FORM_SIZE, useValue: formSizeSignal },
        { provide: NZ_SPACE_COMPACT_SIZE, useValue: compactSizeSignal }
      ]
    });
    fixture = TestBed.createComponent(TestDatePickerFinalSizeComponent);
    datePickerElement = fixture.debugElement.query(By.directive(NzDatePickerComponent)).nativeElement;
    fixture.detectChanges();
    formSizeSignal.set('large');
    fixture.detectChanges();
    expect(datePickerElement.classList).toContain('ant-picker-large');
  });

  it('should set correctly the size from the compactSize signal', () => {
    TestBed.configureTestingModule({
      providers: [{ provide: NZ_SPACE_COMPACT_SIZE, useValue: compactSizeSignal }]
    });
    fixture = TestBed.createComponent(TestDatePickerFinalSizeComponent);
    datePickerElement = fixture.debugElement.query(By.directive(NzDatePickerComponent)).nativeElement;
    fixture.detectChanges();
    expect(datePickerElement.classList).toContain('ant-picker-large');
  });

  it('should set correctly the size from the component input', () => {
    fixture = TestBed.createComponent(TestDatePickerFinalSizeComponent);
    datePickerElement = fixture.debugElement.query(By.directive(NzDatePickerComponent)).nativeElement;
    fixture.componentInstance.size.set('large');
    fixture.detectChanges();
    expect(datePickerElement.classList).toContain('ant-picker-large');
  });
});

describe('finalVariant', () => {
  let fixture: ComponentFixture<TestDatePickerFinalVariantComponent>;
  let datePickerElement: HTMLElement;
  let formVariantSignal: WritableSignal<NzVariant>;

  beforeEach(() => {
    formVariantSignal = signal<NzVariant>('outlined');
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should use formVariant when nzVariant is not set (undefined by default)', () => {
    TestBed.configureTestingModule({
      providers: [{ provide: NZ_FORM_VARIANT, useValue: formVariantSignal }]
    });
    fixture = TestBed.createComponent(TestDatePickerFinalVariantComponent);
    datePickerElement = fixture.debugElement.query(By.directive(NzDatePickerComponent)).nativeElement;
    fixture.detectChanges();
    formVariantSignal.set('filled');
    fixture.detectChanges();
    expect(datePickerElement.classList).toContain('ant-picker-filled');
  });

  it('should use nzVariant over formVariant when nzVariant is explicitly set', () => {
    TestBed.configureTestingModule({
      providers: [{ provide: NZ_FORM_VARIANT, useValue: formVariantSignal }]
    });
    fixture = TestBed.createComponent(TestDatePickerFinalVariantComponent);
    datePickerElement = fixture.debugElement.query(By.directive(NzDatePickerComponent)).nativeElement;
    fixture.componentInstance.variant.set('borderless');
    fixture.detectChanges();
    formVariantSignal.set('filled');
    fixture.detectChanges();
    expect(datePickerElement.classList).toContain('ant-picker-borderless');
    expect(datePickerElement.classList).not.toContain('ant-picker-filled');
  });

  it('should use nzVariant outlined over formVariant when explicitly set', () => {
    TestBed.configureTestingModule({
      providers: [{ provide: NZ_FORM_VARIANT, useValue: formVariantSignal }]
    });
    fixture = TestBed.createComponent(TestDatePickerFinalVariantComponent);
    datePickerElement = fixture.debugElement.query(By.directive(NzDatePickerComponent)).nativeElement;
    fixture.componentInstance.variant.set('outlined');
    fixture.detectChanges();
    formVariantSignal.set('filled');
    fixture.detectChanges();
    expect(datePickerElement.classList).not.toContain('ant-picker-filled');
  });

  it('should use nzVariant when no formVariant is provided', () => {
    fixture = TestBed.createComponent(TestDatePickerFinalVariantComponent);
    datePickerElement = fixture.debugElement.query(By.directive(NzDatePickerComponent)).nativeElement;
    fixture.componentInstance.variant.set('filled');
    fixture.detectChanges();
    expect(datePickerElement.classList).toContain('ant-picker-filled');
  });

  it('should default to outlined when neither nzVariant nor formVariant is set', () => {
    fixture = TestBed.createComponent(TestDatePickerFinalVariantComponent);
    datePickerElement = fixture.debugElement.query(By.directive(NzDatePickerComponent)).nativeElement;
    fixture.detectChanges();
    expect(datePickerElement.classList).not.toContain('ant-picker-filled');
    expect(datePickerElement.classList).not.toContain('ant-picker-borderless');
    expect(datePickerElement.classList).not.toContain('ant-picker-underlined');
  });
});

@Component({
  imports: [ReactiveFormsModule, FormsModule, NzDatePickerModule],
  template: `
    @switch (useSuite()) {
      @case (1) {
        <nz-date-picker
          [nzAllowClear]="nzAllowClear()"
          [nzAutoFocus]="nzAutoFocus()"
          [nzDisabled]="nzDisabled()"
          [nzInputReadOnly]="nzInputReadOnly()"
          [nzDisabledDate]="$any(nzDisabledDate())"
          [nzFormat]="$any(nzFormat())"
          [nzLocale]="nzLocale()"
          [nzPlaceHolder]="$any(nzPlaceHolder())"
          [nzPopupStyle]="$any(nzPopupStyle())"
          [nzDropdownClassName]="nzDropdownClassName()"
          [nzSize]="$any(nzSize())"
          (nzOnOpenChange)="nzOnOpenChange($event)"
          [ngModel]="nzValue()"
          (ngModelChange)="nzOnChange($event)"
          [nzDefaultPickerValue]="$any(nzDefaultPickerValue())"
          [nzDateRender]="nzDateRender()"
          [nzDisabledTime]="nzDisabledTime()"
          [nzRenderExtraFooter]="nzRenderExtraFooter()"
          [nzShowToday]="nzShowToday()"
          [nzShowNow]="nzShowNow()"
          [nzMode]="nzMode()"
          (nzOnPanelChange)="nzOnPanelChange($event)"
          (nzOnCalendarChange)="nzOnCalendarChange($event)"
          [nzShowTime]="nzShowTime()"
          (nzOnOk)="nzOnOk($event)"
          [nzSuffixIcon]="$any(nzSuffixIcon())"
          [nzVariant]="nzVariant()"
          [nzInline]="nzInline()"
          [nzBackdrop]="nzBackdrop()"
          [nzPlacement]="nzPlacement()"
          [nzShowWeekNumber]="nzShowWeekNumber()"
        />
      }
      @case (2) {
        <nz-date-picker [nzOpen]="nzOpen()" (nzOnOpenChange)="nzOnOpenChange($event)" />
      }
      @case (3) {
        <nz-date-picker nzOpen [(ngModel)]="modelValue" />
      }
      @case (4) {
        <nz-date-picker [formControl]="$any(control())" [nzDisabled]="nzDisabled()" />
      }
      @case (5) {
        <ng-container>
          <nz-date-picker [ngModel]="firstValue()" (ngModelChange)="nzOnChange($event)" />
          <nz-date-picker [ngModel]="secondValue" />
        </ng-container>
      }
    }
    <ng-template #tplDateRender let-current>
      <div [class.test-first-day]="current.getDate() === 1">{{ current.getDate() }}</div>
    </ng-template>
    <ng-template #tplExtraFooter>TEST_EXTRA_FOOTER</ng-template>
  `
})
class NzTestDatePickerComponent {
  readonly useSuite = signal<1 | 2 | 3 | 4 | 5 | undefined>(undefined);
  @ViewChild('tplDateRender', { static: true }) tplDateRender!: TemplateRef<Date>;
  @ViewChild('tplExtraFooter', { static: true }) tplExtraFooter!: TemplateRef<void>;
  @ViewChild(NzDatePickerComponent, { static: false }) datePicker!: NzDatePickerComponent;
  // --- Suite 1
  readonly nzAllowClear = signal<boolean>(false);
  readonly nzAutoFocus = signal<boolean>(false);
  readonly nzDisabled = signal<boolean>(false);
  readonly nzInputReadOnly = signal<boolean>(false);
  readonly nzFormat = signal<string | undefined>(undefined);
  readonly nzDisabledDate = signal<((d: Date) => boolean) | undefined>(undefined);
  readonly nzLocale = signal<NzSafeAny>(undefined);
  readonly nzPlaceHolder = signal<string | undefined>(undefined);
  readonly nzPopupStyle = signal<NgStyleInterface | undefined>(undefined);
  readonly nzDropdownClassName = signal<string | undefined>(undefined);
  readonly nzSize = signal<NzDatePickerSizeType | undefined>(undefined);

  nzOnChange(_: Date | null): void {}

  nzOnCalendarChange(_: Array<Date | null>): void {}

  nzOnOpenChange(_: boolean): void {}

  readonly nzValue = signal<Date | null>(null);
  readonly nzDefaultPickerValue = signal<Date | null>(null);
  readonly nzDateRender = signal<NzSafeAny>(undefined);
  readonly nzShowTime = signal<boolean | object>(false);
  readonly nzDisabledTime = signal<NzSafeAny>(undefined);
  readonly nzRenderExtraFooter = signal<string | (() => TemplateRef<void> | string) | undefined>(undefined);
  readonly nzShowToday = signal(false);
  readonly nzShowNow = signal(false);
  readonly nzMode = signal<string>('date');
  readonly nzSuffixIcon = signal<string | undefined>(undefined);
  readonly nzVariant = signal<NzVariant>('outlined');
  readonly nzInline = signal(false);
  readonly nzBackdrop = signal(false);
  readonly nzPlacement = signal<NzPlacement>('bottomLeft');
  readonly nzShowWeekNumber = signal(false);

  // nzRanges;
  nzOnPanelChange(_: NzPanelChangeType): void {}

  nzOnOk(_: CompatibleDate | null): void {}

  // --- Suite 2
  readonly nzOpen = signal<boolean>(false);

  // --- Suite 3
  readonly modelValue = signal<Date | null>(null);

  // --- Suite 4
  readonly control = signal<FormControl<Date | null> | undefined>(undefined);

  // --- Suite 5
  readonly firstValue = signal<Date | undefined>(undefined);
  secondValue!: Date;
}

@Component({
  selector: 'nz-test-date-picker-status',
  imports: [NzDatePickerModule],
  template: `<nz-date-picker [nzStatus]="status()" />`
})
class NzTestDatePickerStatusComponent {
  readonly status = signal<NzStatus>('error');
}

@Component({
  imports: [ReactiveFormsModule, NzFormModule, NzDatePickerModule],
  template: `
    <form nz-form [formGroup]="validateForm">
      <nz-form-item>
        <nz-form-control nzHasFeedback>
          <nz-date-picker formControlName="demo" />
        </nz-form-control>
      </nz-form-item>
    </form>
  `
})
class NzTestDatePickerInFormComponent {
  private fb = inject(FormBuilder);
  validateForm = this.fb.group({
    demo: this.fb.control<Date | null>(null, Validators.required)
  });
}

@Component({
  imports: [NzDatePickerModule],
  template: `<nz-date-picker [nzSize]="size()" />`
})
export class TestDatePickerFinalSizeComponent {
  readonly size = signal<NzDatePickerSizeType>('default');
}

@Component({
  imports: [NzDatePickerModule],
  template: `<nz-date-picker [nzVariant]="variant()" />`
})
export class TestDatePickerFinalVariantComponent {
  readonly variant = signal<NzVariant | undefined>(undefined);
}

@Component({
  imports: [FormField, NzDatePickerModule],
  template: `<nz-date-picker [formField]="myForm.date" />`
})
class NzTestDatePickerInSignalFormComponent {
  readonly model = signal<{ date: Date | null }>({ date: null });
  readonly myForm = form(this.model);
}
