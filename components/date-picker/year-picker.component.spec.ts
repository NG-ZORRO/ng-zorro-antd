/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, DebugElement, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, inject, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { dispatchFakeEvent, dispatchMouseEvent } from 'ng-zorro-antd/core/testing';
import { NgStyleInterface } from 'ng-zorro-antd/core/types';
import { NzDatePickerSizeType } from 'ng-zorro-antd/date-picker/date-picker.component';
import { getPickerAbstract, getPickerInput } from 'ng-zorro-antd/date-picker/testing/util';
import { PREFIX_CLASS } from 'ng-zorro-antd/date-picker/util';
import { NzDatePickerI18nInterface, NzDatePickerLangI18nInterface } from 'ng-zorro-antd/i18n';
import { NzInputModule } from 'ng-zorro-antd/input';

import { NzDatePickerModule } from './date-picker.module';

describe('NzYearPickerComponent', () => {
  let fixture: ComponentFixture<NzTestYearPickerComponent>;
  let fixtureInstance: NzTestYearPickerComponent;
  let debugElement: DebugElement;
  let overlayContainerElement: HTMLElement;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      providers: [provideNoopAnimations()]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NzTestYearPickerComponent);
    fixtureInstance = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  beforeEach(inject([OverlayContainer], (oc: OverlayContainer) => {
    overlayContainerElement = oc.getContainerElement();
  }));

  afterEach(() => {
    // overlayContainer.ngOnDestroy();
  });

  describe('general api testing', () => {
    beforeEach(() => (fixtureInstance.useSuite = 1));

    it('should open by click and close by click at outside', fakeAsync(() => {
      fixture.detectChanges();
      openPickerByClickTrigger();
      expect(getPickerContainer()).not.toBeNull();

      dispatchFakeEvent(getPickerInput(fixture.debugElement), 'focusout');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(getPickerContainer()).toBeNull();
    }));

    it('should support nzAllowClear and work properly', fakeAsync(() => {
      const clearBtnSelector = By.css(`.${PREFIX_CLASS}-clear`);
      const initial = (fixtureInstance.nzValue = new Date());
      fixtureInstance.nzAllowClear = false;
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(debugElement.query(clearBtnSelector)).toBeFalsy();

      fixtureInstance.nzAllowClear = true;
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(fixtureInstance.nzValue).toBe(initial);
      expect(debugElement.query(clearBtnSelector)).toBeDefined();

      const nzOnChange = spyOn(fixtureInstance, 'nzOnChange');
      debugElement.query(clearBtnSelector).nativeElement.click();
      fixture.detectChanges();
      tick(500);
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
      // Make sure picker clear button shown up
      fixtureInstance.nzAllowClear = true;
      fixtureInstance.nzValue = new Date();

      fixtureInstance.nzDisabled = true;
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(debugElement.query(By.css('.ant-picker-disabled'))).not.toBeNull();
      expect(debugElement.query(By.css('.ant-picker-clear'))).toBeNull();

      fixtureInstance.nzDisabled = false;
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(debugElement.query(By.css('.ant-picker-disabled'))).toBeNull();
      expect(debugElement.query(By.css('.ant-picker-clear'))).not.toBeNull();
    }));

    it('should support nzOpen if assigned', fakeAsync(() => {
      fixtureInstance.useSuite = 2;

      fixture.detectChanges();
      fixture.whenRenderingDone().then(() => {
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
      });
    }));

    it('should nz-year-picker work', fakeAsync(() => {
      fixtureInstance.useSuite = 4;
      fixture.whenRenderingDone().then(() => {
        tick(500);
        fixture.detectChanges();
        expect(getPickerContainer()).not.toBeNull();
        const pickerInput = getPickerInput(fixture.debugElement);
        expect(pickerInput).not.toBeNull();
      });
    }));

    it('should support nzDisabledDate', fakeAsync(() => {
      fixture.detectChanges();
      fixtureInstance.nzValue = new Date('2018-11-11 12:12:12');
      fixtureInstance.nzDisabledDate = (current: Date) => current.getFullYear() === 2013;
      fixture.detectChanges();
      flush();
      fixture.detectChanges();

      openPickerByClickTrigger();
      const disabledCell = overlayContainerElement.querySelector(
        '.ant-picker-year-panel tr td.ant-picker-cell-disabled'
      )!;
      expect(disabledCell.textContent).toContain('2013');
    }));

    it('should support nzLocale', () => {
      const featureKey = 'TEST_PLACEHOLDER';
      fixtureInstance.nzLocale = {
        lang: { yearPlaceholder: featureKey } as unknown as NzDatePickerLangI18nInterface,
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

      dispatchFakeEvent(getPickerInput(fixture.debugElement), 'focusout');
      fixture.detectChanges();
      flush();
      expect(nzOnOpenChange).toHaveBeenCalledWith(false);
      expect(nzOnOpenChange).toHaveBeenCalledTimes(2);
    }));
    it('should support nzValue', fakeAsync(() => {
      fixtureInstance.nzValue = new Date('2018-11-22');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      openPickerByClickTrigger();
      expect(getSelectedYearCell().textContent).toContain('2018');
    }));

    it('should support nzOnChange', fakeAsync(() => {
      fixtureInstance.nzValue = new Date('2018-11');
      const nzOnChange = spyOn(fixtureInstance, 'nzOnChange');
      fixture.detectChanges();
      openPickerByClickTrigger();

      const cell = getSecondYearCell(); // Use the second cell
      const cellText = cell.textContent!.trim();
      dispatchMouseEvent(cell, 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(nzOnChange).toHaveBeenCalled();
      const result = (nzOnChange.calls.allArgs()[0] as Date[])[0];
      expect(result.getFullYear()).toBe(parseInt(cellText, 10));
    }));
  }); // /general api testing

  describe('panel switch and move forward/afterward', () => {
    beforeEach(() => (fixtureInstance.useSuite = 1));

    it('should support decade panel changes', fakeAsync(() => {
      fixtureInstance.nzValue = new Date('2018-11');
      fixture.detectChanges();
      openPickerByClickTrigger();
      // Click to show decade panel
      dispatchMouseEvent(queryFromOverlay('.ant-picker-header-year-btn'), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(queryFromOverlay('.ant-picker-decade-panel')).toBeDefined();
      // Goto previous decade
      dispatchMouseEvent(getSuperPreBtn(), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(queryFromOverlay('.ant-picker-header-decade-btn').textContent).toContain('1900');
      expect(queryFromOverlay('.ant-picker-header-decade-btn').textContent).toContain('1999');
      // Goto next decade * 2
      dispatchMouseEvent(getSuperNextBtn(), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      dispatchMouseEvent(getSuperNextBtn(), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(queryFromOverlay('.ant-picker-header-decade-btn').textContent).toContain('2100');
      expect(queryFromOverlay('.ant-picker-header-decade-btn').textContent).toContain('2199');
    }));
  }); // /panel switch and move forward/afterward

  describe('specified date picker testing', () => {
    beforeEach(() => (fixtureInstance.useSuite = 1));

    it('should support nzRenderExtraFooter', fakeAsync(() => {
      fixtureInstance.nzRenderExtraFooter = () => fixtureInstance.tplExtraFooter;
      fixture.detectChanges();

      openPickerByClickTrigger();
      expect(overlayContainerElement.textContent!.indexOf('TEST_EXTRA_FOOTER') > -1).toBeTruthy();

      fixtureInstance.nzRenderExtraFooter = 'TEST_EXTRA_FOOTER_STRING';
      fixture.detectChanges();
      expect(overlayContainerElement.textContent!.indexOf(fixtureInstance.nzRenderExtraFooter) > -1).toBeTruthy();
    }));
  }); // /specified date picker testing

  describe('ngModel value accessors', () => {
    beforeEach(() => (fixtureInstance.useSuite = 3));

    it('should specified date provide by "modelValue" be chosen', fakeAsync(() => {
      fixtureInstance.modelValue = new Date('2018-11');
      fixture.detectChanges();
      flush(); // Wait writeValue() tobe done
      fixture.detectChanges();
      expect(getSelectedYearCell().textContent).toContain('2018');
      // Click the first cell to change ngModel
      const cell = getSecondYearCell();
      const cellText = cell.textContent!.trim();
      dispatchMouseEvent(cell, 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(fixtureInstance.modelValue.getFullYear()).toBe(parseInt(cellText, 10));
    }));
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

  function getSelectedYearCell(): HTMLElement {
    return queryFromOverlay('.ant-picker-year-panel td.ant-picker-cell-selected') as HTMLElement;
  }

  function getSecondYearCell(): HTMLElement {
    return queryFromOverlay(
      '.ant-picker-year-panel td.ant-picker-cell:nth-child(2) .ant-picker-cell-inner'
    ) as HTMLElement;
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
});

@Component({
  imports: [FormsModule, NzDatePickerModule, NzInputModule],
  template: `
    <ng-template #tplExtraFooter>TEST_EXTRA_FOOTER</ng-template>
    @switch (useSuite) {
      @case (1) {
        <nz-date-picker
          nzMode="year"
          [nzAllowClear]="nzAllowClear"
          [nzAutoFocus]="nzAutoFocus"
          [nzDisabled]="nzDisabled"
          [nzDisabledDate]="nzDisabledDate"
          [nzLocale]="nzLocale"
          [nzPlaceHolder]="nzPlaceHolder"
          [nzPopupStyle]="nzPopupStyle ?? {}"
          [nzDropdownClassName]="nzDropdownClassName"
          [nzSize]="nzSize"
          (nzOnOpenChange)="nzOnOpenChange($event)"
          [ngModel]="nzValue"
          (ngModelChange)="nzOnChange($event)"
          [nzRenderExtraFooter]="nzRenderExtraFooter"
        />
      }
      @case (2) {
        <nz-date-picker nzMode="year" [nzOpen]="nzOpen" />
      }
      @case (3) {
        <nz-date-picker nzMode="year" nzOpen [(ngModel)]="modelValue" />
      }
      @case (4) {
        <nz-year-picker nzOpen [(ngModel)]="modelValue" />
      }
    }
  `
})
class NzTestYearPickerComponent {
  useSuite?: 1 | 2 | 3 | 4;
  @ViewChild('tplExtraFooter', { static: true }) tplExtraFooter!: TemplateRef<void>;

  // --- Suite 1
  nzAllowClear: boolean = false;
  nzAutoFocus: boolean = false;
  nzDisabled: boolean = false;
  nzDisabledDate?: (d: Date) => boolean;
  nzLocale!: NzDatePickerI18nInterface;
  nzPlaceHolder!: string;
  nzPopupStyle?: NgStyleInterface;
  nzDropdownClassName?: string;
  nzSize!: NzDatePickerSizeType;

  nzOnOpenChange(_: boolean): void {}

  nzOnChange(_: Date | null): void {}

  nzValue: Date | null = null;

  nzRenderExtraFooter?: string | (() => TemplateRef<void> | string);

  // --- Suite 2
  nzOpen: boolean = false;

  // --- Suite 3
  modelValue?: Date;
}
