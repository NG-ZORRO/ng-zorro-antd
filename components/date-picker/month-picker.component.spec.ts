/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { OverlayContainer } from '@angular/cdk/overlay';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { Component, DebugElement, signal, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import isBefore from 'date-fns/isBefore';
import { vi } from 'vitest';

import { provideNzNoAnimation } from 'ng-zorro-antd/core/animation';
import { dispatchFakeEvent, dispatchMouseEvent } from 'ng-zorro-antd/core/testing';
import { NgStyleInterface } from 'ng-zorro-antd/core/types';
import { NzDatePickerSizeType } from 'ng-zorro-antd/date-picker/date-picker.component';
import { getPickerAbstract, getPickerInput } from 'ng-zorro-antd/date-picker/testing/util';
import { PREFIX_CLASS } from 'ng-zorro-antd/date-picker/util';
import { NzDatePickerI18nInterface, NzDatePickerLangI18nInterface } from 'ng-zorro-antd/i18n';
import { NzInputModule } from 'ng-zorro-antd/input';

import { NzDatePickerModule } from './date-picker.module';

registerLocaleData(zh);

describe('month-picker', () => {
  let fixture: ComponentFixture<NzTestMonthPickerComponent>;
  let fixtureInstance: NzTestMonthPickerComponent;
  let debugElement: DebugElement;
  let overlayContainerElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideNzNoAnimation()]
    });
  });

  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  beforeEach(() => {
    fixture = TestBed.createComponent(NzTestMonthPickerComponent);
    fixtureInstance = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  beforeEach(inject([OverlayContainer], (oc: OverlayContainer) => {
    overlayContainerElement = oc.getContainerElement();
  }));

  describe('general api testing', () => {
    beforeEach(() => fixtureInstance.useSuite.set(1));

    it('should open by click and close by click at outside', async () => {
      fixture.detectChanges();
      await openPickerByClickTrigger();
      expect(getPickerContainer()).not.toBeNull();

      dispatchFakeEvent(getPickerInput(fixture.debugElement), 'focusout');
      await stabilize(500);
      expect(getPickerContainer()).toBeNull();
    });

    it('should support nzAllowClear and work properly', async () => {
      const clearBtnSelector = By.css(`.${PREFIX_CLASS}-clear`);
      const initial = new Date();
      fixtureInstance.nzValue.set(initial);
      fixtureInstance.nzAllowClear.set(false);
      await stabilize(500);
      expect(debugElement.query(clearBtnSelector)).toBeFalsy();

      fixtureInstance.nzAllowClear.set(true);
      await stabilize(500);
      expect(fixtureInstance.nzValue()).toBe(initial);
      expect(debugElement.query(clearBtnSelector)).toBeDefined();

      const nzOnChange = vi.spyOn(fixtureInstance, 'nzOnChange');
      debugElement.query(clearBtnSelector).nativeElement.click();
      await stabilize(500);
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
      // Make sure picker clear button shown up
      fixtureInstance.nzAllowClear.set(true);
      fixtureInstance.nzValue.set(new Date());

      fixtureInstance.nzDisabled.set(true);
      await stabilize();
      expect(debugElement.query(By.css('.ant-picker-disabled'))).not.toBeNull();
      expect(debugElement.query(By.css('.ant-picker-clear'))).toBeNull();

      fixtureInstance.nzDisabled.set(false);
      await stabilize();
      expect(debugElement.query(By.css('.ant-picker-disabled'))).toBeNull();
      expect(debugElement.query(By.css('.ant-picker-clear'))).not.toBeNull();
    });

    it('should support nzOpen if assigned', async () => {
      fixtureInstance.useSuite.set(2);

      fixture.detectChanges();
      await stabilize(500);
      expect(getPickerContainer()).toBeNull();

      fixtureInstance.nzOpen.set(true);
      await stabilize(500);
      expect(getPickerContainer()).not.toBeNull();

      fixtureInstance.nzOpen.set(false);
      await stabilize(500);
      expect(getPickerContainer()).toBeNull();
    });

    it('should nz-month-picker work', async () => {
      fixtureInstance.useSuite.set(4);
      await stabilize(500);
      expect(getPickerContainer()).not.toBeNull();
      const pickerInput = getPickerInput(fixture.debugElement);
      expect(pickerInput).not.toBeNull();
    });

    it('should support nzDisabledDate', async () => {
      fixture.detectChanges();
      const compareDate = new Date('2018-11-15 00:00:00');
      fixtureInstance.nzValue.set(new Date('2018-11-11 12:12:12'));
      fixtureInstance.nzDisabledDate.set((current: Date) => isBefore(current, compareDate));
      await stabilize();

      await openPickerByClickTrigger();
      const allDisabledCells = overlayContainerElement.querySelectorAll(
        '.ant-picker-month-panel tr td.ant-picker-cell-disabled'
      );
      const disabledCell = allDisabledCells[allDisabledCells.length - 1];
      expect(disabledCell.textContent).toContain('10');
    });

    it('should support nzLocale', () => {
      const featureKey = 'TEST_PLACEHOLDER';
      fixtureInstance.nzLocale.set({
        lang: { monthPlaceholder: featureKey } as unknown as NzDatePickerLangI18nInterface,
        timePickerLocale: {}
      });
      fixture.detectChanges();
      expect(getPickerInput(fixture.debugElement).getAttribute('placeholder')).toBe(featureKey);
    });

    it('should support nzPlaceHolder', () => {
      const featureKey = 'TEST_PLACEHOLDER';
      fixtureInstance.nzPlaceHolder.set(featureKey);
      fixture.detectChanges();
      expect(getPickerInput(fixture.debugElement).getAttribute('placeholder')).toBe(featureKey);
    });

    it('should support nzPopupStyle', async () => {
      fixtureInstance.nzPopupStyle.set({ color: 'red' });
      fixture.detectChanges();
      await openPickerByClickTrigger();
      expect(queryFromOverlay(`.${PREFIX_CLASS}-dropdown`).style.color).toBe('red');
    });

    it('should support nzDropdownClassName', async () => {
      const keyCls = 'my-test-class';
      fixtureInstance.nzDropdownClassName.set(keyCls);
      fixture.detectChanges();
      await openPickerByClickTrigger();
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

    it('should support nzOnOpenChange', async () => {
      const nzOnOpenChange = vi.spyOn(fixtureInstance, 'nzOnOpenChange');
      fixture.detectChanges();
      await openPickerByClickTrigger();
      expect(nzOnOpenChange).toHaveBeenCalledWith(true);

      dispatchFakeEvent(getPickerInput(fixture.debugElement), 'focusout');
      await stabilize();
      expect(nzOnOpenChange).toHaveBeenCalledWith(false);
      expect(nzOnOpenChange).toHaveBeenCalledTimes(2);
    });

    it('should support nzValue', async () => {
      fixtureInstance.nzValue.set(new Date('2018-11-22'));
      await stabilize();
      await openPickerByClickTrigger();
      expect(getSelectedMonthCell().textContent).toContain('11');
    });

    it('should support nzOnChange', async () => {
      fixtureInstance.nzValue.set(new Date('2018-11'));
      const nzOnChange = vi.spyOn(fixtureInstance, 'nzOnChange');
      fixture.detectChanges();
      await openPickerByClickTrigger();

      const cell = getFirstMonthCell(); // Use the first cell
      const cellText = cell.textContent!.trim();
      dispatchMouseEvent(cell, 'click');
      await stabilize(500);
      expect(nzOnChange).toHaveBeenCalled();
      const result = (nzOnChange.mock.calls[0] as Date[])[0];
      expect(result.getMonth() + 1).toBe(parseInt(cellText, 10));
    });
  }); // /general api testing

  describe('panel switch and move forward/afterward', () => {
    beforeEach(() => fixtureInstance.useSuite.set(1));

    it('should support year panel changes', async () => {
      fixtureInstance.nzValue.set(new Date('2018-11'));
      fixture.detectChanges();
      await openPickerByClickTrigger();
      // Click year select to show year panel
      dispatchMouseEvent(queryFromOverlay('.ant-picker-header-month-btn'), 'click');
      await stabilize(500);
      expect(queryFromOverlay('.ant-picker-year-panel')).toBeDefined();
      expect(queryFromOverlay('.ant-picker-header-year-btn').textContent).toContain('2010');
      expect(queryFromOverlay('.ant-picker-header-year-btn').textContent).toContain('2019');
      // Goto previous year
      dispatchMouseEvent(getSuperPreBtn(), 'click');
      await stabilize(500);
      expect(queryFromOverlay('.ant-picker-header-year-btn').textContent).toContain('2000');
      expect(queryFromOverlay('.ant-picker-header-year-btn').textContent).toContain('2009');
      // Goto next year * 2
      dispatchMouseEvent(getSuperNextBtn(), 'click');
      await stabilize(500);
      dispatchMouseEvent(getSuperNextBtn(), 'click');
      await stabilize(500);
      expect(queryFromOverlay('.ant-picker-header-year-btn').textContent).toContain('2020');
      expect(queryFromOverlay('.ant-picker-header-year-btn').textContent).toContain('2029');
    });

    it('should support decade panel changes', async () => {
      fixtureInstance.nzValue.set(new Date('2018-11'));
      fixture.detectChanges();
      await openPickerByClickTrigger();
      // Click to show decade panel
      dispatchMouseEvent(queryFromOverlay('.ant-picker-header-month-btn'), 'click');
      await stabilize(500);
      dispatchMouseEvent(queryFromOverlay('.ant-picker-header-year-btn'), 'click');
      await stabilize(500);
      expect(queryFromOverlay('.ant-picker-decade-panel')).toBeDefined();
      // Goto previous decade
      dispatchMouseEvent(getSuperPreBtn(), 'click');
      await stabilize(500);
      expect(queryFromOverlay('.ant-picker-header-decade-btn').textContent).toContain('1900');
      expect(queryFromOverlay('.ant-picker-header-decade-btn').textContent).toContain('1999');
      // Goto next decade * 2
      dispatchMouseEvent(getSuperNextBtn(), 'click');
      await stabilize(500);
      dispatchMouseEvent(getSuperNextBtn(), 'click');
      await stabilize(500);
      expect(queryFromOverlay('.ant-picker-header-decade-btn').textContent).toContain('2100');
      expect(queryFromOverlay('.ant-picker-header-decade-btn').textContent).toContain('2199');
    });
  }); // /panel switch and move forward/afterward

  describe('specified date picker testing', () => {
    beforeEach(() => fixtureInstance.useSuite.set(1));

    it('should support nzRenderExtraFooter', async () => {
      fixtureInstance.nzRenderExtraFooter.set(() => fixtureInstance.tplExtraFooter);
      fixture.detectChanges();

      await openPickerByClickTrigger();
      expect(overlayContainerElement.textContent!.indexOf('TEST_EXTRA_FOOTER') > -1).toBeTruthy();

      fixtureInstance.nzRenderExtraFooter.set('TEST_EXTRA_FOOTER_STRING');
      fixture.detectChanges();
      expect(
        overlayContainerElement.textContent!.indexOf(fixtureInstance.nzRenderExtraFooter() as string) > -1
      ).toBeTruthy();
    });

    it('should support selected month active', async () => {
      fixtureInstance.nzValue.set(new Date('2019-7-13 15:10:00'));
      await stabilize();

      await openPickerByClickTrigger();
      const activeMonthElement = overlayContainerElement.querySelector(
        '.ant-picker-month-panel tr td.ant-picker-cell-selected .ant-picker-cell-inner'
      );
      expect(activeMonthElement!.textContent).toContain('7月');
    });
  }); // /specified date picker testing

  describe('ngModel value accessors', () => {
    beforeEach(() => fixtureInstance.useSuite.set(3));

    it('should specified date provide by "modelValue" be chosen', async () => {
      fixtureInstance.modelValue.set(new Date('2018-11'));
      await stabilize();
      expect(getSelectedMonthCell().textContent).toContain('11');

      // Click the first cell to change ngModel
      const cell = getFirstMonthCell();
      const cellText = cell.textContent!.trim();
      dispatchMouseEvent(cell, 'click');
      await stabilize(500);
      expect(fixtureInstance.modelValue()!.getMonth() + 1).toBe(parseInt(cellText, 10));
    });
  });

  ////////////

  function getSuperPreBtn(): HTMLElement {
    return queryFromOverlay(`.${PREFIX_CLASS}-header-super-prev-btn`);
  }

  function getSuperNextBtn(): HTMLElement {
    return queryFromOverlay(`.${PREFIX_CLASS}-header-super-next-btn`);
  }

  function getPickerContainer(): HTMLElement {
    return queryFromOverlay('.ant-picker-panel-container') as HTMLElement;
  }

  function getSelectedMonthCell(): HTMLElement {
    return queryFromOverlay('.ant-picker-month-panel td.ant-picker-cell-selected') as HTMLElement;
  }

  function getFirstMonthCell(): HTMLElement {
    return queryFromOverlay(
      '.ant-picker-month-panel td.ant-picker-cell:nth-child(1) .ant-picker-cell-inner'
    ) as HTMLElement;
  }

  function queryFromOverlay(selector: string): HTMLElement {
    return overlayContainerElement.querySelector(selector) as HTMLElement;
  }

  async function openPickerByClickTrigger(): Promise<void> {
    dispatchMouseEvent(getPickerInput(fixture.debugElement), 'click');
    await stabilize(500);
  }

  async function stabilize(ms = 500): Promise<void> {
    fixture.detectChanges();
    vi.advanceTimersByTime(ms);
    await Promise.resolve();
    fixture.detectChanges();
  }
});

@Component({
  imports: [FormsModule, NzDatePickerModule, NzInputModule],
  template: `
    <ng-template #tplExtraFooter>TEST_EXTRA_FOOTER</ng-template>
    @switch (useSuite()) {
      @case (1) {
        <nz-date-picker
          nzMode="month"
          [nzAllowClear]="nzAllowClear()"
          [nzAutoFocus]="nzAutoFocus()"
          [nzDisabled]="nzDisabled()"
          [nzDisabledDate]="nzDisabledDate()"
          [nzLocale]="nzLocale()!"
          [nzPlaceHolder]="nzPlaceHolder()!"
          [nzPopupStyle]="nzPopupStyle() ?? {}"
          [nzDropdownClassName]="nzDropdownClassName()"
          [nzSize]="nzSize()!"
          (nzOnOpenChange)="nzOnOpenChange($event)"
          [ngModel]="nzValue()"
          (ngModelChange)="nzOnChange($event)"
          [nzRenderExtraFooter]="nzRenderExtraFooter()"
        />
      }
      @case (2) {
        <nz-date-picker nzMode="month" [nzOpen]="nzOpen()" />
      }
      @case (3) {
        <nz-date-picker nzMode="month" nzOpen [(ngModel)]="modelValue" />
      }
      @case (4) {
        <nz-month-picker nzOpen [(ngModel)]="modelValue" />
      }
    }
  `
})
class NzTestMonthPickerComponent {
  readonly useSuite = signal<1 | 2 | 3 | 4 | undefined>(undefined);
  @ViewChild('tplExtraFooter', { static: true }) tplExtraFooter!: TemplateRef<void>;

  // --- Suite 1
  readonly nzAllowClear = signal(false);
  readonly nzAutoFocus = signal(false);
  readonly nzDisabled = signal(false);
  readonly nzDisabledDate = signal<((d: Date) => boolean) | undefined>(undefined);
  readonly nzLocale = signal<NzDatePickerI18nInterface | undefined>(undefined);
  readonly nzPlaceHolder = signal<string | undefined>(undefined);
  readonly nzPopupStyle = signal<NgStyleInterface | undefined>(undefined);
  readonly nzDropdownClassName = signal<string | undefined>(undefined);
  readonly nzSize = signal<NzDatePickerSizeType | undefined>(undefined);
  readonly nzValue = signal<Date | null>(null);
  readonly nzRenderExtraFooter = signal<string | (() => TemplateRef<void> | string) | undefined>(undefined);

  nzOnOpenChange(_: boolean): void {}

  nzOnChange(_: Date | null): void {}

  // --- Suite 2
  readonly nzOpen = signal(false);

  // --- Suite 3
  readonly modelValue = signal<Date | undefined>(undefined);
}
