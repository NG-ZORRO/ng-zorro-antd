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
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import isBefore from 'date-fns/isBefore';

import { dispatchFakeEvent, dispatchMouseEvent, updateNonSignalsInput } from 'ng-zorro-antd/core/testing';
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
      providers: [provideNoopAnimations()]
    });
  });

  beforeEach(() => jasmine.clock().install());

  beforeEach(() => {
    fixture = TestBed.createComponent(NzTestMonthPickerComponent);
    fixtureInstance = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  beforeEach(inject([OverlayContainer], (oc: OverlayContainer) => {
    overlayContainerElement = oc.getContainerElement();
  }));

  afterEach(() => jasmine.clock().uninstall());

  describe('general api testing', () => {
    beforeEach(() => (fixtureInstance.useSuite = 1));

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
      const initial = (fixtureInstance.nzValue = new Date());
      fixtureInstance.nzAllowClear = false;
      await stabilize(500);
      expect(debugElement.query(clearBtnSelector)).toBeFalsy();

      fixtureInstance.nzAllowClear = true;
      await stabilize(500);
      expect(fixtureInstance.nzValue).toBe(initial);
      expect(debugElement.query(clearBtnSelector)).toBeDefined();

      const nzOnChange = spyOn(fixtureInstance, 'nzOnChange');
      debugElement.query(clearBtnSelector).nativeElement.click();
      await stabilize(500);
      expect(fixtureInstance.nzValue).toBe(initial);
      expect(nzOnChange).toHaveBeenCalledWith(null);
      expect(debugElement.query(clearBtnSelector)).toBeFalsy();
    });

    it('should support nzAutoFocus', () => {
      fixtureInstance.nzAutoFocus = true;
      fixture.detectChanges();
      expect(getPickerInput(fixture.debugElement) === document.activeElement).toBeTruthy();
    });

    it('should support nzDisabled', async () => {
      // Make sure picker clear button shown up
      fixtureInstance.nzAllowClear = true;
      fixtureInstance.nzValue = new Date();

      fixtureInstance.nzDisabled = true;
      await stabilize();
      expect(debugElement.query(By.css('.ant-picker-disabled'))).not.toBeNull();
      expect(debugElement.query(By.css('.ant-picker-clear'))).toBeNull();

      fixtureInstance.nzDisabled = false;
      await stabilize();
      expect(debugElement.query(By.css('.ant-picker-disabled'))).toBeNull();
      expect(debugElement.query(By.css('.ant-picker-clear'))).not.toBeNull();
    });

    it('should support nzOpen if assigned', async () => {
      fixtureInstance.useSuite = 2;

      fixture.detectChanges();
      await fixture.whenRenderingDone();
      expect(getPickerContainer()).toBeNull();

      fixtureInstance.nzOpen = true;
      await stabilize(500);
      expect(getPickerContainer()).not.toBeNull();

      fixtureInstance.nzOpen = false;
      await stabilize(500);
      expect(getPickerContainer()).toBeNull();
    });

    it('should nz-month-picker work', async () => {
      fixtureInstance.useSuite = 4;
      await fixture.whenRenderingDone();
      await stabilize(500);
      expect(getPickerContainer()).not.toBeNull();
      const pickerInput = getPickerInput(fixture.debugElement);
      expect(pickerInput).not.toBeNull();
    });

    it('should support nzDisabledDate', async () => {
      fixture.detectChanges();
      const compareDate = new Date('2018-11-15 00:00:00');
      fixtureInstance.nzValue = new Date('2018-11-11 12:12:12');
      fixtureInstance.nzDisabledDate = (current: Date) => isBefore(current, compareDate);
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
      fixtureInstance.nzLocale = {
        lang: { monthPlaceholder: featureKey } as unknown as NzDatePickerLangI18nInterface,
        timePickerLocale: {}
      };
      fixture.detectChanges();
      expect(getPickerInput(fixture.debugElement).getAttribute('placeholder')).toBe(featureKey);
    });

    it('should support nzPlaceHolder', () => {
      const featureKey = 'TEST_PLACEHOLDER';
      fixtureInstance.nzPlaceHolder = featureKey;
      fixture.detectChanges();
      expect(getPickerInput(fixture.debugElement).getAttribute('placeholder')).toBe(featureKey);
    });

    it('should support nzPopupStyle', async () => {
      fixtureInstance.nzPopupStyle = { color: 'red' };
      fixture.detectChanges();
      await openPickerByClickTrigger();
      expect(queryFromOverlay(`.${PREFIX_CLASS}-dropdown`).style.color).toBe('red');
    });

    it('should support nzDropdownClassName', async () => {
      const keyCls = (fixtureInstance.nzDropdownClassName = 'my-test-class');
      fixture.detectChanges();
      await openPickerByClickTrigger();
      expect(queryFromOverlay(`.${PREFIX_CLASS}-dropdown`).classList.contains(keyCls)).toBeTruthy();
    });

    it('should support nzSize', () => {
      fixtureInstance.nzSize = 'large';
      fixture.detectChanges();
      expect(getPickerAbstract(fixture.debugElement).classList.contains('ant-picker-large')).toBeTruthy();

      fixtureInstance.nzSize = 'small';
      fixture.detectChanges();
      expect(getPickerAbstract(fixture.debugElement).classList.contains('ant-picker-small')).toBeTruthy();
    });

    it('should support nzOnOpenChange', async () => {
      const nzOnOpenChange = spyOn(fixtureInstance, 'nzOnOpenChange');
      fixture.detectChanges();
      await openPickerByClickTrigger();
      expect(nzOnOpenChange).toHaveBeenCalledWith(true);

      dispatchFakeEvent(getPickerInput(fixture.debugElement), 'focusout');
      await stabilize();
      expect(nzOnOpenChange).toHaveBeenCalledWith(false);
      expect(nzOnOpenChange).toHaveBeenCalledTimes(2);
    });

    it('should support nzValue', async () => {
      fixtureInstance.nzValue = new Date('2018-11-22');
      await stabilize();
      await openPickerByClickTrigger();
      expect(getSelectedMonthCell().textContent).toContain('11');
    });

    it('should support nzOnChange', async () => {
      fixtureInstance.nzValue = new Date('2018-11');
      const nzOnChange = spyOn(fixtureInstance, 'nzOnChange');
      fixture.detectChanges();
      await openPickerByClickTrigger();

      const cell = getFirstMonthCell(); // Use the first cell
      const cellText = cell.textContent!.trim();
      dispatchMouseEvent(cell, 'click');
      await stabilize(500);
      expect(nzOnChange).toHaveBeenCalled();
      const result = (nzOnChange.calls.allArgs()[0] as Date[])[0];
      expect(result.getMonth() + 1).toBe(parseInt(cellText, 10));
    });
  }); // /general api testing

  describe('panel switch and move forward/afterward', () => {
    beforeEach(() => (fixtureInstance.useSuite = 1));

    it('should support year panel changes', async () => {
      fixtureInstance.nzValue = new Date('2018-11');
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
      fixtureInstance.nzValue = new Date('2018-11');
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
    beforeEach(() => (fixtureInstance.useSuite = 1));

    it('should support nzRenderExtraFooter', async () => {
      fixtureInstance.nzRenderExtraFooter = () => fixtureInstance.tplExtraFooter;
      fixture.detectChanges();

      await openPickerByClickTrigger();
      expect(overlayContainerElement.textContent!.indexOf('TEST_EXTRA_FOOTER') > -1).toBeTruthy();

      fixtureInstance.nzRenderExtraFooter = 'TEST_EXTRA_FOOTER_STRING';
      fixture.detectChanges();
      expect(overlayContainerElement.textContent!.indexOf(fixtureInstance.nzRenderExtraFooter) > -1).toBeTruthy();
    });

    it('should support selected month active', async () => {
      fixtureInstance.nzValue = new Date('2019-7-13 15:10:00');
      await stabilize();

      await openPickerByClickTrigger();
      const activeMonthElement = overlayContainerElement.querySelector(
        '.ant-picker-month-panel tr td.ant-picker-cell-selected .ant-picker-cell-inner'
      );
      expect(activeMonthElement!.textContent).toContain('7月');
    });
  }); // /specified date picker testing

  describe('ngModel value accessors', () => {
    beforeEach(() => (fixtureInstance.useSuite = 3));

    it('should specified date provide by "modelValue" be chosen', async () => {
      fixtureInstance.modelValue = new Date('2018-11');
      await stabilize();
      expect(getSelectedMonthCell().textContent).toContain('11');

      // Click the first cell to change ngModel
      const cell = getFirstMonthCell();
      const cellText = cell.textContent!.trim();
      dispatchMouseEvent(cell, 'click');
      await stabilize(500);
      expect(fixtureInstance.modelValue.getMonth() + 1).toBe(parseInt(cellText, 10));
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

  async function stabilize(ms?: number): Promise<void> {
    fixture.detectChanges();
    if (typeof ms === 'number') {
      jasmine.clock().tick(ms);
    }
    await updateNonSignalsInput(fixture);
    fixture.detectChanges();
  }
});

@Component({
  imports: [FormsModule, NzDatePickerModule, NzInputModule],
  template: `
    <ng-template #tplExtraFooter>TEST_EXTRA_FOOTER</ng-template>
    @switch (useSuiteSignal()) {
      @case (1) {
        <nz-date-picker
          nzMode="month"
          [nzAllowClear]="nzAllowClearSignal()"
          [nzAutoFocus]="nzAutoFocusSignal()"
          [nzDisabled]="nzDisabledSignal()"
          [nzDisabledDate]="nzDisabledDateSignal()"
          [nzLocale]="nzLocaleSignal()!"
          [nzPlaceHolder]="nzPlaceHolderSignal()!"
          [nzPopupStyle]="nzPopupStyleSignal() ?? {}"
          [nzDropdownClassName]="nzDropdownClassNameSignal()"
          [nzSize]="nzSizeSignal()!"
          (nzOnOpenChange)="nzOnOpenChange($event)"
          [ngModel]="nzValueSignal()"
          (ngModelChange)="nzOnChange($event)"
          [nzRenderExtraFooter]="nzRenderExtraFooterSignal()"
        />
      }
      @case (2) {
        <nz-date-picker nzMode="month" [nzOpen]="nzOpenSignal()" />
      }
      @case (3) {
        <nz-date-picker nzMode="month" nzOpen [ngModel]="modelValueSignal()" (ngModelChange)="modelValue = $event" />
      }
      @case (4) {
        <nz-month-picker nzOpen [ngModel]="modelValueSignal()" (ngModelChange)="modelValue = $event" />
      }
    }
  `
})
class NzTestMonthPickerComponent {
  readonly useSuiteSignal = signal<1 | 2 | 3 | 4 | undefined>(undefined);
  @ViewChild('tplExtraFooter', { static: true }) tplExtraFooter!: TemplateRef<void>;

  // --- Suite 1
  readonly nzAllowClearSignal = signal(false);
  readonly nzAutoFocusSignal = signal(false);
  readonly nzDisabledSignal = signal(false);
  readonly nzDisabledDateSignal = signal<((d: Date) => boolean) | undefined>(undefined);
  readonly nzLocaleSignal = signal<NzDatePickerI18nInterface | undefined>(undefined);
  readonly nzPlaceHolderSignal = signal<string | undefined>(undefined);
  readonly nzPopupStyleSignal = signal<NgStyleInterface | undefined>(undefined);
  readonly nzDropdownClassNameSignal = signal<string | undefined>(undefined);
  readonly nzSizeSignal = signal<NzDatePickerSizeType | undefined>(undefined);
  readonly nzValueSignal = signal<Date | null>(null);
  readonly nzRenderExtraFooterSignal = signal<string | (() => TemplateRef<void> | string) | undefined>(undefined);

  nzOnOpenChange(_: boolean): void {}

  nzOnChange(_: Date | null): void {}

  // --- Suite 2
  readonly nzOpenSignal = signal(false);

  // --- Suite 3
  readonly modelValueSignal = signal<Date | undefined>(undefined);

  get useSuite(): 1 | 2 | 3 | 4 | undefined {
    return this.useSuiteSignal();
  }

  set useSuite(value: 1 | 2 | 3 | 4 | undefined) {
    this.useSuiteSignal.set(value);
  }

  get nzAllowClear(): boolean {
    return this.nzAllowClearSignal();
  }

  set nzAllowClear(value: boolean) {
    this.nzAllowClearSignal.set(value);
  }

  get nzAutoFocus(): boolean {
    return this.nzAutoFocusSignal();
  }

  set nzAutoFocus(value: boolean) {
    this.nzAutoFocusSignal.set(value);
  }

  get nzDisabled(): boolean {
    return this.nzDisabledSignal();
  }

  set nzDisabled(value: boolean) {
    this.nzDisabledSignal.set(value);
  }

  get nzDisabledDate(): ((d: Date) => boolean) | undefined {
    return this.nzDisabledDateSignal();
  }

  set nzDisabledDate(value: ((d: Date) => boolean) | undefined) {
    this.nzDisabledDateSignal.set(value);
  }

  get nzLocale(): NzDatePickerI18nInterface | undefined {
    return this.nzLocaleSignal();
  }

  set nzLocale(value: NzDatePickerI18nInterface | undefined) {
    this.nzLocaleSignal.set(value);
  }

  get nzPlaceHolder(): string | undefined {
    return this.nzPlaceHolderSignal();
  }

  set nzPlaceHolder(value: string | undefined) {
    this.nzPlaceHolderSignal.set(value);
  }

  get nzPopupStyle(): NgStyleInterface | undefined {
    return this.nzPopupStyleSignal();
  }

  set nzPopupStyle(value: NgStyleInterface | undefined) {
    this.nzPopupStyleSignal.set(value);
  }

  get nzDropdownClassName(): string | undefined {
    return this.nzDropdownClassNameSignal();
  }

  set nzDropdownClassName(value: string | undefined) {
    this.nzDropdownClassNameSignal.set(value);
  }

  get nzSize(): NzDatePickerSizeType | undefined {
    return this.nzSizeSignal();
  }

  set nzSize(value: NzDatePickerSizeType | undefined) {
    this.nzSizeSignal.set(value);
  }

  get nzValue(): Date | null {
    return this.nzValueSignal();
  }

  set nzValue(value: Date | null) {
    this.nzValueSignal.set(value);
  }

  get nzRenderExtraFooter(): string | (() => TemplateRef<void> | string) | undefined {
    return this.nzRenderExtraFooterSignal();
  }

  set nzRenderExtraFooter(value: string | (() => TemplateRef<void> | string) | undefined) {
    this.nzRenderExtraFooterSignal.set(value);
  }

  get nzOpen(): boolean {
    return this.nzOpenSignal();
  }

  set nzOpen(value: boolean) {
    this.nzOpenSignal.set(value);
  }

  get modelValue(): Date {
    return this.modelValueSignal()!;
  }

  set modelValue(value: Date | undefined) {
    this.modelValueSignal.set(value);
  }
}
