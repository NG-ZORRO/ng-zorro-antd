/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { OverlayContainer } from '@angular/cdk/overlay';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { Component, DebugElement, signal, viewChild, ViewChild, WritableSignal } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { vi } from 'vitest';

import { provideNzNoAnimation } from 'ng-zorro-antd/core/animation';
import { NZ_FORM_SIZE, NZ_FORM_VARIANT } from 'ng-zorro-antd/core/form';
import { dispatchFakeEvent, dispatchMouseEvent, testDirectionality, typeInElement } from 'ng-zorro-antd/core/testing';
import { NzPlacement, NzStatus, NzVariant, type NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { PREFIX_CLASS } from 'ng-zorro-antd/date-picker';
import { getPickerInput, getPickerOkButton } from 'ng-zorro-antd/date-picker/testing/util';
import { NzFormControlStatusType, NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NZ_SPACE_COMPACT_SIZE } from 'ng-zorro-antd/space';

import { en_GB, NzI18nService } from '../i18n';
import { NzTimePickerComponent } from './time-picker.component';

registerLocaleData(zh);

describe('time-picker', () => {
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideNzNoAnimation()]
    });
  });

  beforeEach(inject([OverlayContainer], (oc: OverlayContainer) => {
    overlayContainer = oc;
    overlayContainerElement = oc.getContainerElement();
  }));

  afterEach(inject([OverlayContainer], (oc: OverlayContainer) => {
    oc.ngOnDestroy();
    overlayContainer.ngOnDestroy();
  }));

  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  async function stabilize<T>(fixture: ComponentFixture<T>, ms = 500): Promise<void> {
    fixture.detectChanges();
    vi.advanceTimersByTime(ms);
    await Promise.resolve();
    fixture.detectChanges();
  }

  describe('basic', () => {
    let testComponent: NzTestTimePickerComponent;
    let fixture: ComponentFixture<NzTestTimePickerComponent>;
    let timeElement: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestTimePickerComponent);
      testComponent = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      timeElement = fixture.debugElement.query(By.directive(NzTimePickerComponent));
    });

    it('should init work', () => {
      fixture.detectChanges();
      expect(timeElement.nativeElement.classList).toContain('ant-picker');
      expect(timeElement.nativeElement.classList).not.toContain('ant-picker-disabled');
    });

    it('should autofocus work', () => {
      fixture.detectChanges();
      testComponent.autoFocus.set(true);
      fixture.detectChanges();
      const input = timeElement.nativeElement.querySelector('input');
      expect(input.attributes.getNamedItem('autofocus').name).toBe('autofocus');
      testComponent.autoFocus.set(false);
      fixture.detectChanges();
      expect(input.attributes.getNamedItem('autofocus')).toBe(null);
    });

    it('should focus and blur function work', () => {
      fixture.detectChanges();
      const input = timeElement.nativeElement.querySelector('input');

      expect(input === document.activeElement).toBe(false);
      testComponent.nzTimePickerComponent.focus();
      fixture.detectChanges();
      expect(input === document.activeElement).toBe(true);
      testComponent.nzTimePickerComponent.blur();
      fixture.detectChanges();
      expect(input === document.activeElement).toBe(false);
    });

    it('should disabled work', async () => {
      testComponent.disabled.set(true);
      fixture.detectChanges();

      const inputElement = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;
      expect(inputElement.disabled).toBe(true);
      expect(timeElement.nativeElement.classList).toContain('ant-picker-disabled');
      expect(timeElement.componentInstance.nzDisabled).toBeTruthy();
      testComponent.nzTimePickerComponent.focus();
      fixture.detectChanges();

      const input = timeElement.nativeElement.querySelector('input');
      expect(input === document.activeElement).toBe(false);

      testComponent.nzTimePickerComponent.setDisabledState(false);
      await stabilize(fixture);
      expect(inputElement.disabled).toBe(false);
      expect(timeElement.nativeElement.classList).not.toContain('ant-picker-disabled');
      expect(timeElement.componentInstance.nzDisabled).toBeFalsy();
      testComponent.nzTimePickerComponent.focus();
      fixture.detectChanges();
      expect(input === document.activeElement).toBe(true);

      testComponent.nzTimePickerComponent.setDisabledState(true);
      await stabilize(fixture);
      expect(inputElement.disabled).toBe(true);
      expect(timeElement.nativeElement.classList).toContain('ant-picker-disabled');
      expect(timeElement.componentInstance.nzDisabled).toBeTruthy();
      testComponent.nzTimePickerComponent.focus();
      fixture.detectChanges();
      expect(input === document.activeElement).toBe(false);
    });

    it('should readOnly work', () => {
      testComponent.nzInputReadOnly.set(true);
      fixture.detectChanges();
      expect(getPickerInput(fixture.debugElement).readOnly).toBeTruthy();

      testComponent.nzInputReadOnly.set(false);
      fixture.detectChanges();
      expect(getPickerInput(fixture.debugElement).readOnly).not.toBeTruthy();
    });

    it('should open and close work', () => {
      testComponent.open.set(true);
      fixture.detectChanges();
      expect(testComponent.openChange).toHaveBeenCalledTimes(0);
      testComponent.nzTimePickerComponent.close();
      fixture.detectChanges();
      expect(testComponent.openChange).toHaveBeenCalledTimes(2);
      expect(testComponent.open()).toBe(false);
      testComponent.nzTimePickerComponent.open();
      fixture.detectChanges();
      expect(testComponent.openChange).toHaveBeenCalledTimes(3);
      expect(testComponent.open()).toBe(true);
    });

    it('should clear work', async () => {
      testComponent.date.set(new Date('2018-11-11 11:11:11'));
      await stabilize(fixture);
      timeElement.nativeElement.querySelector('.ant-picker-clear').click();
      await stabilize(fixture);
      expect(testComponent.date()).toBeNull();
    });

    it('should support default nzfomat in 12-hours', () => {
      testComponent.use12Hours.set(true);
      fixture.detectChanges();
      expect(testComponent.nzTimePickerComponent.nzFormat).toBe('h:mm:ss a');
    });

    it('should support ngModelChange', async () => {
      testComponent.date.set(new Date('2020-03-26 11:33:00'));
      await stabilize(fixture);
      const nzOnChange = vi.spyOn(testComponent, 'onChange');
      testComponent.open.set(true);
      await stabilize(fixture);
      expect(overlayContainerElement.querySelector('.ant-picker-time-panel-cell-selected > div')!.textContent).toBe(
        '11'
      );

      dispatchMouseEvent(overlayContainerElement.querySelector('.ant-picker-time-panel-cell')!, 'click');
      fixture.detectChanges();
      getPickerInput(fixture.debugElement).dispatchEvent(new KeyboardEvent('keyup', { key: 'enter' }));
      await stabilize(fixture);
      expect(nzOnChange).toHaveBeenCalled();
      const result = (nzOnChange.mock.calls[0] as Date[])[0];
      expect(result.getHours()).toBe(0);
      expect(testComponent.nzTimePickerComponent.inputRef.nativeElement.value).toBe('00:33:00');
    });

    it('should support ISO string', async () => {
      testComponent.date.set(new Date('2020-03-27T13:49:54.917Z'));
      await stabilize(fixture);
      testComponent.open.set(true);
      await stabilize(fixture);
      const date = new Date(testComponent.date()!);
      expect(
        queryFromOverlay('.ant-picker-time-panel-column:nth-child(1) .ant-picker-time-panel-cell-selected > div')!
          .textContent
      ).toBe(date.getHours().toString());
      expect(
        queryFromOverlay('.ant-picker-time-panel-column:nth-child(2) .ant-picker-time-panel-cell-selected > div')!
          .textContent
      ).toBe(date.getMinutes().toString());
    });

    it('should support custom suffixIcon', () => {
      testComponent.nzSuffixIcon.set('calendar');
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css(`.anticon-calendar`))).toBeDefined();
    });

    it('should display string prefix as text content', () => {
      testComponent.nzPrefix.set('Time');
      fixture.detectChanges();
      const prefixElement = fixture.debugElement.query(By.css('.ant-picker-prefix'));
      expect(prefixElement).not.toBeNull();
      expect(prefixElement.nativeElement.textContent.trim()).toBe('Time');
    });

    it('should not display prefix element when nzPrefix is not set', () => {
      testComponent.nzPrefix.set(undefined);
      fixture.detectChanges();
      const prefixElement = fixture.debugElement.query(By.css('.ant-picker-prefix'));
      expect(prefixElement).toBeNull();
    });

    it('should update prefix when nzPrefix changes', () => {
      testComponent.nzPrefix.set('Start');
      fixture.detectChanges();
      let prefixElement = fixture.debugElement.query(By.css('.ant-picker-prefix'));
      expect(prefixElement.nativeElement.textContent.trim()).toBe('Start');

      testComponent.nzPrefix.set('End');
      fixture.detectChanges();
      prefixElement = fixture.debugElement.query(By.css('.ant-picker-prefix'));
      expect(prefixElement.nativeElement.textContent.trim()).toBe('End');
    });

    it('should backdrop work', async () => {
      testComponent.nzBackdrop.set(true);
      testComponent.open.set(true);
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();
      const boundingBox = overlayContainerElement.children[0];
      expect(boundingBox.children[0].classList).toContain('cdk-overlay-backdrop');
    });

    it('should open with click and close with tab', () => {
      dispatchMouseEvent(getPickerInput(fixture.debugElement), 'click');
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();
      expect(getPickerContainer()).not.toBeNull();

      triggerInputBlur(fixture.debugElement);
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();

      expect(getPickerContainer()).toBeNull();
    });

    it('should set default opening time when clicking ok', async () => {
      const onChange = vi.spyOn(testComponent, 'onChange');
      testComponent.date.set(null);
      fixture.detectChanges();
      dispatchMouseEvent(getPickerInput(fixture.debugElement), 'click');
      await stabilize(fixture);
      expect(getPickerContainer()).not.toBeNull();

      const okButton = getPickerOkButton(fixture.debugElement);
      expect(okButton).not.toBeNull();
      dispatchFakeEvent(okButton, 'click');
      await stabilize(fixture);
      const result = (onChange.mock.calls[0] as Date[])[0];
      expect(result.getHours()).toEqual(0);
      expect(result.getMinutes()).toEqual(0);
      expect(result.getSeconds()).toEqual(0);
    });

    it('should not set time when clicking ok without default opening time', async () => {
      const onChange = vi.spyOn(testComponent, 'onChange');
      testComponent.date.set(null);
      testComponent.defaultOpenValue.set(null!);
      fixture.detectChanges();
      dispatchMouseEvent(getPickerInput(fixture.debugElement), 'click');
      await stabilize(fixture);
      expect(getPickerContainer()).not.toBeNull();

      const okButton = getPickerOkButton(fixture.debugElement);
      expect(okButton).not.toBeNull();
      dispatchFakeEvent(okButton, 'click');
      await stabilize(fixture);

      const result = (onChange.mock.calls[0] as Date[])[0];
      expect(result).toBeNull();
    });

    it('should set previous value when tabbing out with invalid input', async () => {
      testComponent.date.set(new Date('2020-03-27T13:49:54.917'));

      fixture.detectChanges();
      dispatchMouseEvent(getPickerInput(fixture.debugElement), 'click');
      await stabilize(fixture);

      const input = getPickerInput(fixture.debugElement);
      typeInElement('invalid', input);
      fixture.detectChanges();

      triggerInputBlur(fixture.debugElement);
      await stabilize(fixture, 500);

      expect(input.value).not.toEqual('invalid');
    });

    it('should set new value when tabbing out with valid input', () => {
      const onChange = vi.spyOn(testComponent, 'onChange');
      testComponent.date.set(new Date('2020-03-27T13:49:54.917'));

      fixture.detectChanges();
      dispatchMouseEvent(getPickerInput(fixture.debugElement), 'click');
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();
      const input = getPickerInput(fixture.debugElement);
      typeInElement('20:10:30', input);
      fixture.detectChanges();

      triggerInputBlur(fixture.debugElement);
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();

      const result = (onChange.mock.calls[0] as Date[])[0];
      expect(result.getHours()).toEqual(20);
      expect(result.getMinutes()).toEqual(10);
      expect(result.getSeconds()).toEqual(30);
    });

    describe('should variant works', () => {
      it('outlined', () => {
        fixture.componentInstance.nzVariant.set('outlined');
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(`.ant-picker-outlined`))).toBeDefined();
      });

      ['fill', 'borderless', 'underlined'].forEach(variant => {
        it(variant, () => {
          fixture.detectChanges();
          expect(fixture.debugElement.query(By.css(`.ant-picker-${variant}`))).toBeNull();
          fixture.componentInstance.nzVariant.set(variant as NzVariant);
          fixture.detectChanges();
          expect(fixture.debugElement.query(By.css(`.ant-picker-${variant}`))).toBeDefined();
        });
      });
    });

    it('should not trigger blur after close panel', () => {
      dispatchMouseEvent(getPickerInput(fixture.debugElement), 'click');
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();
      expect(getPickerContainer()).not.toBeNull();

      const okButton = getPickerOkButton(fixture.debugElement);
      expect(okButton).not.toBeNull();
      dispatchFakeEvent(okButton, 'click');
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();

      expect(timeElement.nativeElement.querySelector('input') === document.activeElement).toBe(false);
    });

    describe('setup I18n service', () => {
      let srv: NzI18nService;

      beforeEach(() => {
        srv = TestBed.inject(NzI18nService);
      });

      it('should detect the language changes', () => {
        let placeHolderValue: string | undefined;
        placeHolderValue = timeElement.nativeElement.querySelector('input').placeholder;

        expect(placeHolderValue).toBe('请选择时间');

        srv.setLocale(en_GB);
        vi.advanceTimersByTime(400);
        fixture.detectChanges();

        placeHolderValue = timeElement.nativeElement.querySelector('input').placeholder;
        expect(placeHolderValue).toBe('Select time');
      });
    });
  });

  describe('placement', () => {
    let fixture: ComponentFixture<NzTestTimePickerPlacementComponent>;
    let fixtureInstance: NzTestTimePickerPlacementComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestTimePickerPlacementComponent);
      fixtureInstance = fixture.componentInstance;
      fixture.detectChanges();
    });

    function openTimePicker(): void {
      dispatchMouseEvent(getPickerInput(fixture.debugElement), 'click');
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();
    }

    function closeTimePicker(): void {
      triggerInputBlur(fixture.debugElement);
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();
    }

    async function openTimePickerStable(): Promise<void> {
      dispatchMouseEvent(getPickerInput(fixture.debugElement), 'click');
      await stabilize(fixture, 500);
    }

    async function closeTimePickerStable(): Promise<void> {
      triggerInputBlur(fixture.debugElement);
      await stabilize(fixture, 500);
    }

    it('should default to bottomLeft placement', () => {
      expect(fixtureInstance.nzTimePickerComponent().nzPlacement()).toBe('bottomLeft');
    });

    it('should support bottomLeft placement', () => {
      fixtureInstance.nzPlacement.set('bottomLeft');
      fixture.detectChanges();
      openTimePicker();

      const dropdown = queryFromOverlay('.ant-picker-dropdown');
      expect(dropdown).toBeTruthy();
      expect(fixtureInstance.nzTimePickerComponent().nzPlacement()).toBe('bottomLeft');

      closeTimePicker();
    });

    it('should support bottomRight placement', () => {
      fixtureInstance.nzPlacement.set('bottomRight');
      fixture.detectChanges();
      openTimePicker();

      const dropdown = queryFromOverlay('.ant-picker-dropdown');
      expect(dropdown).toBeTruthy();
      expect(fixtureInstance.nzTimePickerComponent().nzPlacement()).toBe('bottomRight');

      closeTimePicker();
    });

    it('should support topLeft placement', async () => {
      fixtureInstance.nzPlacement.set('topLeft');
      await stabilize(fixture);
      await openTimePickerStable();

      const dropdown = queryFromOverlay('.ant-picker-dropdown');
      expect(dropdown).toBeTruthy();
      expect(fixtureInstance.nzTimePickerComponent().nzPlacement()).toBe('topLeft');

      await closeTimePickerStable();
    });

    it('should support topRight placement', async () => {
      fixtureInstance.nzPlacement.set('topRight');
      await stabilize(fixture);
      await openTimePickerStable();

      const dropdown = queryFromOverlay('.ant-picker-dropdown');
      expect(dropdown).toBeTruthy();
      expect(fixtureInstance.nzTimePickerComponent().nzPlacement()).toBe('topRight');

      await closeTimePickerStable();
    });

    it('should dynamically change placement', async () => {
      // Start with bottomLeft
      fixtureInstance.nzPlacement.set('bottomLeft');
      await stabilize(fixture);
      await openTimePickerStable();

      let dropdown = queryFromOverlay('.ant-picker-dropdown');
      expect(dropdown).toBeTruthy();
      expect(fixtureInstance.nzTimePickerComponent().nzPlacement()).toBe('bottomLeft');

      await closeTimePickerStable();

      // Change to topRight
      fixtureInstance.nzPlacement.set('topRight');
      await stabilize(fixture);
      await openTimePickerStable();

      dropdown = queryFromOverlay('.ant-picker-dropdown');
      expect(dropdown).toBeTruthy();
      expect(fixtureInstance.nzTimePickerComponent().nzPlacement()).toBe('topRight');

      await closeTimePickerStable();
    });

    it('should update placement when input changes without reopening', async () => {
      // Start with bottomLeft
      fixtureInstance.nzPlacement.set('bottomLeft');
      await stabilize(fixture);
      expect(fixtureInstance.nzTimePickerComponent()?.nzPlacement()).toBe('bottomLeft');

      // Change to topRight
      fixtureInstance.nzPlacement.set('topRight');
      await stabilize(fixture);
      expect(fixtureInstance.nzTimePickerComponent().nzPlacement()).toBe('topRight');

      // Open and verify the correct class is applied
      await openTimePickerStable();
      const dropdown = queryFromOverlay('.ant-picker-dropdown');
      expect(dropdown).toBeTruthy();
      expect(fixtureInstance.nzTimePickerComponent().nzPlacement()).toBe('topRight');

      await closeTimePickerStable();
    });

    it('should change placement while picker is open', async () => {
      fixtureInstance.nzPlacement.set('bottomLeft');
      await stabilize(fixture);
      await openTimePickerStable();

      let dropdown = queryFromOverlay('.ant-picker-dropdown');
      expect(dropdown).toBeTruthy();
      expect(fixtureInstance.nzTimePickerComponent().nzPlacement()).toBe('bottomLeft');

      // Change placement while open
      fixtureInstance.nzPlacement.set('topLeft');
      await stabilize(fixture, 100);

      dropdown = queryFromOverlay('.ant-picker-dropdown');
      expect(dropdown).toBeTruthy();
      expect(fixtureInstance.nzTimePickerComponent().nzPlacement()).toBe('topLeft');

      await closeTimePickerStable();
    });

    it('should maintain placement when selecting a time', async () => {
      fixtureInstance.nzPlacement.set('topLeft');
      await stabilize(fixture);
      await openTimePickerStable();

      const dropdown = queryFromOverlay('.ant-picker-dropdown');
      expect(dropdown).toBeTruthy();
      expect(fixtureInstance.nzTimePickerComponent().nzPlacement()).toBe('topLeft');

      // Select a time
      dispatchMouseEvent(overlayContainerElement.querySelector('.ant-picker-time-panel-cell')!, 'click');
      await stabilize(fixture);

      // Dropdown should still have the correct placement class
      const dropdownAfterSelect = queryFromOverlay('.ant-picker-dropdown');
      expect(dropdownAfterSelect).toBeTruthy();
      expect(fixtureInstance.nzTimePickerComponent().nzPlacement()).toBe('topLeft');

      await closeTimePickerStable();
    });

    it('should work with disabled state', async () => {
      fixtureInstance.nzPlacement.set('topRight');
      await stabilize(fixture);

      // Open and verify placement
      await openTimePickerStable();
      const dropdown = queryFromOverlay('.ant-picker-dropdown');
      expect(dropdown).toBeTruthy();
      expect(fixtureInstance.nzTimePickerComponent().nzPlacement()).toBe('topRight');

      await closeTimePickerStable();
    });
  });

  describe('status', () => {
    let testComponent: NzTestTimePickerStatusComponent;
    let fixture: ComponentFixture<NzTestTimePickerStatusComponent>;
    let timeElement: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestTimePickerStatusComponent);
      testComponent = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      timeElement = fixture.debugElement.query(By.directive(NzTimePickerComponent));
    });

    it('should className correct with nzStatus', () => {
      fixture.detectChanges();
      expect(timeElement.nativeElement.classList).toContain('ant-picker-status-error');

      testComponent.status.set('warning');
      fixture.detectChanges();
      expect(timeElement.nativeElement.className).toContain('ant-picker-status-warning');

      testComponent.status.set('');
      fixture.detectChanges();
      expect(timeElement.nativeElement.className).not.toContain('ant-picker-status-warning');
    });
  });

  describe('prefix with template', () => {
    let fixture: ComponentFixture<NzTestTimePickerPrefixTemplateComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestTimePickerPrefixTemplateComponent);
      fixture.detectChanges();
    });

    it('should render prefix template with icon', () => {
      const prefixElement = fixture.debugElement.query(By.css('.ant-picker-prefix'));
      expect(prefixElement).not.toBeNull();
      expect(prefixElement.query(By.css('.anticon-clock-circle'))).not.toBeNull();
    });
  });

  describe('in form', () => {
    let testComponent: NzTestTimePickerInFormComponent;
    let fixture: ComponentFixture<NzTestTimePickerInFormComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestTimePickerInFormComponent);
      testComponent = fixture.debugElement.componentInstance;
    });

    it('should disable if the form is disabled initially and nzDisabled set to false', async () => {
      testComponent.disable();
      await stabilize(fixture);
      const timeElement = fixture.debugElement.query(By.directive(NzTimePickerComponent));
      const inputElement = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;

      expect(timeElement.componentInstance.nzDisabled).toBe(true);
      expect(timeElement.nativeElement.classList).toContain('ant-picker-disabled');
      expect(inputElement.disabled).toBe(true);
    });

    it('should className correct', () => {
      fixture.detectChanges();
      const timeElement = fixture.debugElement.query(By.directive(NzTimePickerComponent)).nativeElement;
      expect(timeElement.classList).toContain('ant-picker-status-error');
      expect(timeElement.querySelector('nz-form-item-feedback-icon')).toBeTruthy();

      testComponent.status.set('warning');
      fixture.detectChanges();
      expect(timeElement.classList).toContain('ant-picker-status-warning');

      testComponent.status.set('success');
      fixture.detectChanges();
      expect(timeElement.classList).toContain('ant-picker-status-success');

      testComponent.feedback.set(false);
      fixture.detectChanges();
      expect(timeElement.querySelector('nz-form-item-feedback-icon')).toBeNull();
    });
  });

  describe('confirmation', () => {
    let testComponent: NzTestTimePickerConfirmationComponent;
    let fixture: ComponentFixture<NzTestTimePickerConfirmationComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestTimePickerConfirmationComponent);
      testComponent = fixture.debugElement.componentInstance;
      fixture.detectChanges();
    });

    it('should emit value when OK button is clicked with nzNeedConfirm enabled', () => {
      const onChange = vi.spyOn(testComponent, 'onChange');
      testComponent.needConfirm.set(true);
      testComponent.date.set(new Date('2020-03-27T10:30:00'));
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();

      dispatchMouseEvent(getPickerInput(fixture.debugElement), 'click');
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();

      expect(getPickerContainer()).not.toBeNull();

      // Select a different time
      const timeCell = overlayContainerElement.querySelector('.ant-picker-time-panel-cell:nth-child(3)');
      dispatchMouseEvent(timeCell!, 'click');
      fixture.detectChanges();

      // Click OK button
      const okButton = getPickerOkButton(fixture.debugElement);
      expect(okButton).not.toBeNull();
      dispatchFakeEvent(okButton, 'click');
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();

      expect(onChange).toHaveBeenCalled();
      expect(getPickerContainer()).toBeNull();
    });

    it('should revert to previous value when tabbing out without OK click with nzNeedConfirm enabled', async () => {
      const onChange = vi.spyOn(testComponent, 'onChange');
      testComponent.needConfirm.set(true);
      testComponent.date.set(new Date('2020-03-27T10:30:00'));
      await stabilize(fixture);

      const originalValue = testComponent.date();

      dispatchMouseEvent(getPickerInput(fixture.debugElement), 'click');
      await stabilize(fixture);

      expect(getPickerContainer()).not.toBeNull();

      // Select a different time
      const timeCell = overlayContainerElement.querySelector('.ant-picker-time-panel-cell:nth-child(5)');
      dispatchMouseEvent(timeCell!, 'click');
      fixture.detectChanges();

      // Tab out without clicking OK
      triggerInputBlur(fixture.debugElement);
      await stabilize(fixture, 500);

      expect(onChange).not.toHaveBeenCalled();
      expect(getPickerContainer()).toBeNull();
      // Value should revert to original
      expect(testComponent.nzTimePickerComponent.value?.getTime()).toBe((originalValue as Date).getTime());
    });

    it('should revert to previous value when pressing Enter without OK click with nzNeedConfirm enabled', async () => {
      const onChange = vi.spyOn(testComponent, 'onChange');
      testComponent.needConfirm.set(true);
      testComponent.date.set(new Date('2020-03-27T10:30:00'));
      await stabilize(fixture);

      const originalValue = testComponent.date();

      dispatchMouseEvent(getPickerInput(fixture.debugElement), 'click');
      await stabilize(fixture);

      expect(getPickerContainer()).not.toBeNull();

      // Select a different time
      const timeCell = overlayContainerElement.querySelector('.ant-picker-time-panel-cell:nth-child(8)');
      dispatchMouseEvent(timeCell!, 'click');
      fixture.detectChanges();

      // Press Enter without clicking OK
      getPickerInput(fixture.debugElement).dispatchEvent(new KeyboardEvent('keyup', { key: 'enter' }));
      await stabilize(fixture, 500);

      expect(onChange).not.toHaveBeenCalled();
      expect(getPickerContainer()).toBeNull();
      // Value should revert to original
      expect(testComponent.nzTimePickerComponent.value?.getTime()).toBe((originalValue as Date).getTime());
    });

    it('should emit value when tabbing out without nzNeedConfirm (default behavior)', () => {
      const onChange = vi.spyOn(testComponent, 'onChange');
      testComponent.needConfirm.set(false);
      testComponent.date.set(new Date('2020-03-27T10:30:00'));
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();

      dispatchMouseEvent(getPickerInput(fixture.debugElement), 'click');
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();

      expect(getPickerContainer()).not.toBeNull();

      // Select a different time
      const timeCell = overlayContainerElement.querySelector('.ant-picker-time-panel-cell:nth-child(10)');
      dispatchMouseEvent(timeCell!, 'click');
      fixture.detectChanges();

      // Tab out
      triggerInputBlur(fixture.debugElement);
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();

      expect(onChange).toHaveBeenCalled();
      expect(getPickerContainer()).toBeNull();
    });

    it('should emit value when OK button is clicked without nzNeedConfirm', () => {
      const onChange = vi.spyOn(testComponent, 'onChange');
      testComponent.needConfirm.set(false);
      fixture.detectChanges();

      dispatchMouseEvent(getPickerInput(fixture.debugElement), 'click');
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();

      expect(getPickerContainer()).not.toBeNull();

      const okButton = getPickerOkButton(fixture.debugElement);
      expect(okButton).not.toBeNull();
      dispatchFakeEvent(okButton, 'click');
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();

      expect(onChange).toHaveBeenCalled();
      expect(getPickerContainer()).toBeNull();
    });

    it('should handle multiple open/close cycles correctly with nzNeedConfirm', () => {
      const onChange = vi.spyOn(testComponent, 'onChange');
      testComponent.needConfirm.set(true);
      testComponent.date.set(new Date('2020-03-27T10:30:00'));
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();

      // First cycle: select and confirm
      dispatchMouseEvent(getPickerInput(fixture.debugElement), 'click');
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();

      const timeCell1 = overlayContainerElement.querySelector('.ant-picker-time-panel-cell:nth-child(5)');
      dispatchMouseEvent(timeCell1!, 'click');
      fixture.detectChanges();

      const okButton1 = getPickerOkButton(fixture.debugElement);
      dispatchFakeEvent(okButton1, 'click');
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();

      expect(onChange).toHaveBeenCalledTimes(1);
      onChange.mockClear();

      // Second cycle: select but don't confirm
      dispatchMouseEvent(getPickerInput(fixture.debugElement), 'click');
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();

      const timeCell2 = overlayContainerElement.querySelector('.ant-picker-time-panel-cell:nth-child(10)');
      dispatchMouseEvent(timeCell2!, 'click');
      fixture.detectChanges();

      triggerInputBlur(fixture.debugElement);
      fixture.detectChanges();
      vi.advanceTimersByTime(500);
      fixture.detectChanges();

      expect(onChange).not.toHaveBeenCalled();
    });
  });

  function queryFromOverlay(selector: string): HTMLElement {
    return overlayContainerElement.querySelector(selector) as HTMLElement;
  }

  function getPickerContainer(): HTMLElement {
    return queryFromOverlay(`.${PREFIX_CLASS}-panel-container`) as HTMLElement;
  }

  function triggerInputBlur(debugElement: DebugElement): void {
    dispatchFakeEvent(getPickerInput(debugElement), 'blur');
  }
});

testDirectionality(() => NzTestTimePickerComponent, By.directive(NzTimePickerComponent), 'ant-picker', {
  providers: [provideNzNoAnimation()]
});

describe('time-picker size', () => {
  let fixture: ComponentFixture<NzTestTimePickerSizeComponent>;
  let timePickerElement: HTMLElement;
  let compactSizeSignal: WritableSignal<NzSizeLDSType>;
  let formSizeSignal: WritableSignal<NzSizeLDSType>;

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
    fixture = TestBed.createComponent(NzTestTimePickerSizeComponent);
    timePickerElement = fixture.debugElement.query(By.directive(NzTimePickerComponent)).nativeElement;
    fixture.detectChanges();
    formSizeSignal.set('large');
    fixture.detectChanges();
    expect(timePickerElement.classList).toContain('ant-picker-large');
  });
  it('should set correctly the size from the compactSize signal', () => {
    TestBed.configureTestingModule({
      providers: [{ provide: NZ_SPACE_COMPACT_SIZE, useValue: compactSizeSignal }]
    });
    fixture = TestBed.createComponent(NzTestTimePickerSizeComponent);
    timePickerElement = fixture.debugElement.query(By.directive(NzTimePickerComponent)).nativeElement;
    fixture.detectChanges();
    expect(timePickerElement.classList).toContain('ant-picker-large');
  });
  it('should set correctly the size from the component input', () => {
    fixture = TestBed.createComponent(NzTestTimePickerSizeComponent);
    timePickerElement = fixture.debugElement.query(By.directive(NzTimePickerComponent)).nativeElement;
    fixture.componentInstance.size.set('large');
    fixture.detectChanges();
    expect(timePickerElement.classList).toContain('ant-picker-large');
  });
});

describe('finalVariant', () => {
  let fixture: ComponentFixture<NzTestTimePickerVariantComponent>;
  let timePickerElement: HTMLElement;
  let formVariantSignal: WritableSignal<NzVariant>;
  beforeEach(() => {
    formVariantSignal = signal<NzVariant>('outlined');
  });
  afterEach(() => {
    TestBed.resetTestingModule();
  });
  it('should use the formVariant when nzVariant is not explicitly set', () => {
    TestBed.configureTestingModule({
      providers: [{ provide: NZ_FORM_VARIANT, useValue: formVariantSignal }]
    });
    fixture = TestBed.createComponent(NzTestTimePickerVariantComponent);
    timePickerElement = fixture.debugElement.query(By.directive(NzTimePickerComponent)).nativeElement;
    fixture.detectChanges();
    formVariantSignal.set('filled');
    fixture.detectChanges();
    expect(timePickerElement.classList).toContain('ant-picker-filled');
  });
  it('should use nzVariant over formVariant when nzVariant is explicitly set', () => {
    TestBed.configureTestingModule({
      providers: [{ provide: NZ_FORM_VARIANT, useValue: formVariantSignal }]
    });
    fixture = TestBed.createComponent(NzTestTimePickerVariantComponent);
    timePickerElement = fixture.debugElement.query(By.directive(NzTimePickerComponent)).nativeElement;
    fixture.detectChanges();
    formVariantSignal.set('filled');
    fixture.componentInstance.variant.set('borderless');
    fixture.detectChanges();
    expect(timePickerElement.classList).toContain('ant-picker-borderless');
    expect(timePickerElement.classList).not.toContain('ant-picker-filled');
  });
  it('should not apply formVariant when nzVariant is explicitly set', () => {
    TestBed.configureTestingModule({
      providers: [{ provide: NZ_FORM_VARIANT, useValue: formVariantSignal }]
    });
    fixture = TestBed.createComponent(NzTestTimePickerVariantComponent);
    timePickerElement = fixture.debugElement.query(By.directive(NzTimePickerComponent)).nativeElement;
    fixture.detectChanges();
    fixture.componentInstance.variant.set('outlined');
    fixture.detectChanges();
    formVariantSignal.set('filled');
    fixture.detectChanges();
    expect(timePickerElement.classList).not.toContain('ant-picker-filled');
  });
  it('should use nzVariant when no formVariant is provided', () => {
    fixture = TestBed.createComponent(NzTestTimePickerVariantComponent);
    timePickerElement = fixture.debugElement.query(By.directive(NzTimePickerComponent)).nativeElement;
    fixture.detectChanges();
    fixture.componentInstance.variant.set('filled');
    fixture.detectChanges();
    expect(timePickerElement.classList).toContain('ant-picker-filled');
  });
  it('should default to outlined when neither nzVariant nor formVariant is set', () => {
    fixture = TestBed.createComponent(NzTestTimePickerVariantComponent);
    timePickerElement = fixture.debugElement.query(By.directive(NzTimePickerComponent)).nativeElement;
    fixture.detectChanges();
    expect(timePickerElement.classList).not.toContain('ant-picker-filled');
    expect(timePickerElement.classList).not.toContain('ant-picker-borderless');
    expect(timePickerElement.classList).not.toContain('ant-picker-underlined');
  });
});

@Component({
  imports: [NzTimePickerComponent, FormsModule],
  template: `
    <nz-time-picker
      [nzAutoFocus]="autoFocus()"
      [(ngModel)]="date"
      (ngModelChange)="onChange($event)"
      [(nzOpen)]="open"
      (nzOpenChange)="openChange($event)"
      [nzDisabled]="disabled()"
      [nzInputReadOnly]="nzInputReadOnly()"
      [nzUse12Hours]="use12Hours()"
      [nzSuffixIcon]="nzSuffixIcon()"
      [nzPrefix]="nzPrefix()"
      [nzBackdrop]="nzBackdrop()"
      [nzDefaultOpenValue]="defaultOpenValue()"
      [nzVariant]="nzVariant()"
    />
  `
})
export class NzTestTimePickerComponent {
  readonly open = signal(false);
  openChange = vi.fn();
  readonly autoFocus = signal(false);
  readonly date = signal<Date | string | null>(new Date());
  readonly disabled = signal(false);
  readonly nzInputReadOnly = signal(false);
  readonly use12Hours = signal(false);
  readonly nzSuffixIcon = signal<string>('close-circle');
  readonly nzPrefix = signal<string | undefined>(undefined);
  readonly nzBackdrop = signal(false);
  readonly nzVariant = signal<NzVariant>('outlined');
  readonly defaultOpenValue = signal<Date>(new Date('2020-03-27T00:00:00'));
  onChange(_: Date | null): void {}
  @ViewChild(NzTimePickerComponent, { static: false }) nzTimePickerComponent!: NzTimePickerComponent;
}

@Component({
  imports: [NzTimePickerComponent],
  template: `<nz-time-picker [nzStatus]="status()" />`
})
export class NzTestTimePickerStatusComponent {
  readonly status = signal<NzStatus>('error');
}

@Component({
  imports: [NzFormModule, ReactiveFormsModule, NzTimePickerComponent],
  template: `
    <form nz-form [formGroup]="timePickerForm">
      <nz-form-item>
        <nz-form-control [nzHasFeedback]="feedback()" [nzValidateStatus]="status()">
          <nz-time-picker formControlName="time" [nzDisabled]="disabled()" />
        </nz-form-control>
      </nz-form-item>
    </form>
  `
})
export class NzTestTimePickerInFormComponent {
  timePickerForm = new FormGroup({
    time: new FormControl(new Date())
  });
  readonly status = signal<NzFormControlStatusType>('error');
  readonly feedback = signal(true);
  readonly disabled = signal(false);

  disable(): void {
    this.timePickerForm.disable();
  }
}

@Component({
  imports: [NzTimePickerComponent, NzIconModule],
  template: `
    <nz-time-picker [nzPrefix]="prefixTemplate" />
    <ng-template #prefixTemplate>
      <nz-icon nzType="clock-circle" />
    </ng-template>
  `
})
export class NzTestTimePickerPrefixTemplateComponent {}

@Component({
  imports: [NzTimePickerComponent, FormsModule],
  template: `
    <nz-time-picker
      [(ngModel)]="date"
      (ngModelChange)="onChange($event)"
      [nzNeedConfirm]="needConfirm()"
      [nzDefaultOpenValue]="defaultOpenValue()"
    />
  `
})
export class NzTestTimePickerConfirmationComponent {
  readonly date = signal<Date | null>(null);
  readonly needConfirm = signal(false);
  readonly defaultOpenValue = signal<Date>(new Date('2020-03-27T00:00:00'));
  onChange(_: Date | null): void {}
  @ViewChild(NzTimePickerComponent, { static: false }) nzTimePickerComponent!: NzTimePickerComponent;
}

@Component({
  imports: [NzTimePickerComponent, FormsModule],
  template: ` <nz-time-picker [nzPlacement]="nzPlacement()" [ngModel]="date()" (ngModelChange)="date.set($event)" /> `
})
export class NzTestTimePickerPlacementComponent {
  readonly nzPlacement = signal<NzPlacement>('bottomLeft');
  readonly date = signal<Date | null>(null);
  nzTimePickerComponent = viewChild.required<NzTimePickerComponent>(NzTimePickerComponent);
}

@Component({
  imports: [NzTimePickerComponent],
  template: ` <nz-time-picker [nzSize]="size()" /> `
})
class NzTestTimePickerSizeComponent {
  readonly size = signal<NzSizeLDSType>('default');
}

@Component({
  imports: [NzTimePickerComponent],
  template: `<nz-time-picker [nzVariant]="variant()" />`
})
export class NzTestTimePickerVariantComponent {
  readonly variant = signal<NzVariant | undefined>(undefined);
}
