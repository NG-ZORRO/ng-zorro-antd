import { OverlayContainer } from '@angular/cdk/overlay';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { Component, DebugElement, TemplateRef, ViewChild } from '@angular/core';
import { fakeAsync, flush, inject, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import * as isBefore from 'date-fns/is_before';
import { dispatchMouseEvent } from '../core/testing';
import { NzDatePickerModule } from './date-picker.module';
import { CandyDate } from './lib/candy-date';
import { PickerResultSingle } from './standard-types';

registerLocaleData(zh);

describe('NzYearPickerComponent', () => {
  let fixture: ComponentFixture<NzTestYearPickerComponent>;
  let fixtureInstance: NzTestYearPickerComponent;
  let debugElement: DebugElement;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports     : [ FormsModule, NoopAnimationsModule, NzDatePickerModule ],
      providers   : [],
      declarations: [
        NzTestYearPickerComponent
      ]
    });

    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NzTestYearPickerComponent);
    fixtureInstance = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  beforeEach(inject([ OverlayContainer ], (oc: OverlayContainer) => {
    overlayContainer = oc;
    overlayContainerElement = oc.getContainerElement();
  }));

  afterEach(() => {
    // overlayContainer.ngOnDestroy();
  });

  describe('general api testing', () => {
    beforeEach(() => fixtureInstance.useSuite = 1);

    it('should open by click and close by click at outside', fakeAsync(() => {
      fixture.detectChanges();
      dispatchMouseEvent(getPickerTrigger(), 'click');
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

    it('should support nzAllowClear and work properly', fakeAsync(() => {
      const clearBtnSelector = By.css('nz-picker i.ant-calendar-picker-clear');
      const initial = fixtureInstance.nzValue = new Date();
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
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(debugElement.query(By.css('nz-picker .ant-input-disabled'))).toBeNull();
      expect(debugElement.query(By.css('nz-picker i.ant-calendar-picker-clear'))).toBeDefined();
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
        expect(queryFromOverlay('.cdk-overlay-backdrop')).toBeNull();
        // dispatchMouseEvent(queryFromOverlay('.cdk-overlay-backdrop'), 'click');
        // expect(getPickerContainer()).not.toBeNull();

        fixtureInstance.nzOpen = false;
        fixture.detectChanges();
        tick(500);
        fixture.detectChanges();
        expect(getPickerContainer()).toBeNull();
      });
    }));

    it('should support nzClassName', () => {
      const className = fixtureInstance.nzClassName = 'my-test-class';
      fixture.detectChanges();
      const picker = debugElement.query(By.css('.ant-calendar-picker')).nativeElement as HTMLElement;
      expect(picker.classList.contains(className)).toBeTruthy();
    });

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
      dispatchMouseEvent(getPickerTrigger(), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(getPickerContainer().style.color).toBe('red');
    }));

    it('should support nzDropdownClassName', fakeAsync(() => {
      const keyCls = fixtureInstance.nzDropdownClassName = 'my-test-class';
      fixture.detectChanges();
      dispatchMouseEvent(getPickerTrigger(), 'click');
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
      dispatchMouseEvent(getPickerTrigger(), 'click');
      fixture.detectChanges();
      expect(nzOnOpenChange).toHaveBeenCalledWith(true);

      dispatchMouseEvent(queryFromOverlay('.cdk-overlay-backdrop'), 'click');
      fixture.detectChanges();
      expect(nzOnOpenChange).toHaveBeenCalledWith(false);
      expect(nzOnOpenChange).toHaveBeenCalledTimes(2);
    });
    it('should support nzValue', fakeAsync(() => {
      fixtureInstance.nzValue = new Date('2018-11-22');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      dispatchMouseEvent(getPickerTrigger(), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(getSelectedYearCell().textContent).toContain('2018');
    }));

    it('should support nzOnChange', fakeAsync(() => {
      fixtureInstance.nzValue = new Date('2018-11');
      const nzOnChange = spyOn(fixtureInstance, 'nzOnChange');
      fixture.detectChanges();
      dispatchMouseEvent(getPickerTrigger(), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();

      const cell = getSecondYearCell(); // Use the second cell
      const cellText = cell.textContent.trim();
      dispatchMouseEvent(cell, 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(nzOnChange).toHaveBeenCalled();
      const result = nzOnChange.calls.allArgs()[ 0 ][ 0 ];
      expect(result.getFullYear()).toBe(parseInt(cellText, 10));
    }));

  }); // /general api testing

  describe('panel switch and move forward/afterward', () => {
    beforeEach(() => fixtureInstance.useSuite = 1);

    it('should support decade panel changes', fakeAsync(() => {
      fixtureInstance.nzValue = new Date('2018-11');
      fixture.detectChanges();
      openPickerByClickTrigger();
      // Click to show decade panel
      dispatchMouseEvent(queryFromOverlay('.ant-calendar-year-panel-decade-select'), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(queryFromOverlay('.ant-calendar-decade-panel')).toBeDefined();
      // Goto previous decade
      dispatchMouseEvent(queryFromOverlay('.ant-calendar-decade-panel-prev-century-btn'), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(queryFromOverlay('.ant-calendar-decade-panel-century').textContent).toContain('1900');
      expect(queryFromOverlay('.ant-calendar-decade-panel-century').textContent).toContain('1999');
      // Goto next decade * 2
      dispatchMouseEvent(queryFromOverlay('.ant-calendar-decade-panel-next-century-btn'), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      dispatchMouseEvent(queryFromOverlay('.ant-calendar-decade-panel-next-century-btn'), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(queryFromOverlay('.ant-calendar-decade-panel-century').textContent).toContain('2100');
      expect(queryFromOverlay('.ant-calendar-decade-panel-century').textContent).toContain('2199');
    }));

  }); // /panel switch and move forward/afterward

  describe('specified date picker testing', () => {
    beforeEach(() => fixtureInstance.useSuite = 1);

    it('should support nzRenderExtraFooter', fakeAsync(() => {
      fixtureInstance.nzRenderExtraFooter = () => fixtureInstance.tplExtraFooter;
      fixture.detectChanges();

      openPickerByClickTrigger();
      expect(overlayContainerElement.textContent.indexOf('TEST_EXTRA_FOOTER') > -1).toBeTruthy();

      fixtureInstance.nzRenderExtraFooter = 'TEST_EXTRA_FOOTER_STRING';
      fixture.detectChanges();
      expect(overlayContainerElement.textContent.indexOf(fixtureInstance.nzRenderExtraFooter) > -1).toBeTruthy();
    }));

  }); // /specified date picker testing

  describe('ngModel value accesors', () => {
    beforeEach(() => fixtureInstance.useSuite = 3);

    it('should specified date provide by "modelValue" be choosed', fakeAsync(() => {
      fixtureInstance.modelValue = new Date('2018-11');
      fixture.detectChanges();
      flush(); // Wait writeValue() tobe done
      fixture.detectChanges();
      expect(getSelectedYearCell().textContent).toContain('2018');

      // Click the first cell to change ngModel
      const cell = getSecondYearCell();
      const cellText = cell.textContent.trim();
      dispatchMouseEvent(cell, 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(fixtureInstance.modelValue.getFullYear()).toBe(parseInt(cellText, 10));
    }));
  });

  ////////////

  function getPicker(): HTMLElement {
    return debugElement.query(By.css('nz-picker .ant-calendar-picker')).nativeElement as HTMLElement;
  }

  function getPickerTrigger(): HTMLInputElement {
    return debugElement.query(By.css('nz-picker input.ant-calendar-picker-input')).nativeElement as HTMLInputElement;
  }

  function getPickerContainer(): HTMLElement {
    return queryFromOverlay('.ant-calendar-picker-container') as HTMLElement;
  }

  function getSelectedYearCell(): HTMLElement {
    return queryFromOverlay('tbody.ant-calendar-year-panel-tbody td.ant-calendar-year-panel-selected-cell') as HTMLElement;
  }

  function getSecondYearCell(): HTMLElement {
    return queryFromOverlay('tbody.ant-calendar-year-panel-tbody td.ant-calendar-year-panel-cell:nth-child(2)') as HTMLElement;
  }

  function queryFromOverlay(selector: string): HTMLElement {
    return overlayContainerElement.querySelector(selector) as HTMLElement;
  }

  function openPickerByClickTrigger(): void {
    dispatchMouseEvent(getPickerTrigger(), 'click');
    fixture.detectChanges();
    tick(500);
    fixture.detectChanges();
  }

});

@Component({
  template: `
    <ng-container [ngSwitch]="useSuite">
      <!-- Suite 1 -->
      <nz-year-picker *ngSwitchCase="1"
        [nzAllowClear]="nzAllowClear"
        [nzAutoFocus]="nzAutoFocus"
        [nzDisabled]="nzDisabled"
        [nzClassName]="nzClassName"
        [nzLocale]="nzLocale"
        [nzPlaceHolder]="nzPlaceHolder"
        [nzPopupStyle]="nzPopupStyle"
        [nzDropdownClassName]="nzDropdownClassName"
        [nzSize]="nzSize"
        [nzStyle]="nzStyle"
        (nzOnOpenChange)="nzOnOpenChange($event)"

        [nzDefaultValue]="nzDefaultValue"
        [ngModel]="nzValue"
        (ngModelChange)="nzOnChange($event)"

        [nzRenderExtraFooter]="nzRenderExtraFooter"
      ></nz-year-picker>
      <ng-template #tplExtraFooter>
        TEST_EXTRA_FOOTER
      </ng-template>

      <!-- Suite 2 -->
      <!-- use another picker to avoid nzOpen's side-effects beacuse nzOpen act as "true" if used -->
      <nz-year-picker *ngSwitchCase="2" [nzOpen]="nzOpen"></nz-year-picker>

      <!-- Suite 3 -->
      <nz-year-picker *ngSwitchCase="3" nzOpen [(ngModel)]="modelValue"></nz-year-picker>
    </ng-container>
  `
})
class NzTestYearPickerComponent {
  useSuite: 1 | 2 | 3;
  @ViewChild('tplExtraFooter') tplExtraFooter: TemplateRef<void>;

  // --- Suite 1
  nzAllowClear;
  nzAutoFocus;
  nzDisabled;
  nzClassName;
  nzLocale;
  nzPlaceHolder;
  nzPopupStyle;
  nzDropdownClassName;
  nzSize;
  nzStyle;

  nzOnOpenChange(d: CandyDate): void {
  }

  nzOnChange(result: PickerResultSingle): void {
  }

  nzValue;

  nzRenderExtraFooter;

  // --- Suite 2
  nzOpen;

  // --- Suite 3
  modelValue;
}
