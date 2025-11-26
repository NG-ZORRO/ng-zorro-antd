/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule, Direction } from '@angular/cdk/bidi';
import { OverlayContainer } from '@angular/cdk/overlay';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { Component, DebugElement, provideZoneChangeDetection, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, inject, TestBed, tick } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { dispatchFakeEvent, dispatchMouseEvent, typeInElement } from 'ng-zorro-antd/core/testing';
import { NzStatus, NzVariant } from 'ng-zorro-antd/core/types';
import { PREFIX_CLASS } from 'ng-zorro-antd/date-picker';
import { getPickerInput, getPickerOkButton } from 'ng-zorro-antd/date-picker/testing/util';
import { NzFormControlStatusType, NzFormModule } from 'ng-zorro-antd/form';

import { en_GB, NzI18nService } from '../i18n';
import { NzTimePickerComponent } from './time-picker.component';

registerLocaleData(zh);

describe('time-picker', () => {
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  beforeEach(() => {
    // todo: use zoneless
    TestBed.configureTestingModule({
      providers: [provideNoopAnimations(), provideZoneChangeDetection()]
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
      testComponent.autoFocus = true;
      fixture.detectChanges();
      expect(timeElement.nativeElement.querySelector('input').attributes.getNamedItem('autofocus').name).toBe(
        'autofocus'
      );
      testComponent.autoFocus = false;
      fixture.detectChanges();
      expect(timeElement.nativeElement.querySelector('input').attributes.getNamedItem('autofocus')).toBe(null);
    });

    it('should focus and blur function work', () => {
      fixture.detectChanges();
      expect(timeElement.nativeElement.querySelector('input') === document.activeElement).toBe(false);
      testComponent.nzTimePickerComponent.focus();
      fixture.detectChanges();
      expect(timeElement.nativeElement.querySelector('input') === document.activeElement).toBe(true);
      testComponent.nzTimePickerComponent.blur();
      fixture.detectChanges();
      expect(timeElement.nativeElement.querySelector('input') === document.activeElement).toBe(false);
    });

    it('should disabled work', fakeAsync(() => {
      testComponent.disabled = true;
      fixture.detectChanges();

      const inputElement = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;
      expect(inputElement.disabled).toBe(true);
      expect(timeElement.nativeElement.classList).toContain('ant-picker-disabled');
      expect(timeElement.componentInstance.nzDisabled).toBeTruthy();
      testComponent.nzTimePickerComponent.focus();
      fixture.detectChanges();
      expect(timeElement.nativeElement.querySelector('input') === document.activeElement).toBe(false);

      testComponent.nzTimePickerComponent.setDisabledState(false);
      fixture.detectChanges();
      flush();
      expect(inputElement.disabled).toBe(false);
      expect(timeElement.nativeElement.classList).not.toContain('ant-picker-disabled');
      expect(timeElement.componentInstance.nzDisabled).toBeFalsy();
      testComponent.nzTimePickerComponent.focus();
      fixture.detectChanges();
      expect(timeElement.nativeElement.querySelector('input') === document.activeElement).toBe(true);

      testComponent.nzTimePickerComponent.setDisabledState(true);
      fixture.detectChanges();
      flush();
      expect(inputElement.disabled).toBe(true);
      expect(timeElement.nativeElement.classList).toContain('ant-picker-disabled');
      expect(timeElement.componentInstance.nzDisabled).toBeTruthy();
      testComponent.nzTimePickerComponent.focus();
      fixture.detectChanges();
      expect(timeElement.nativeElement.querySelector('input') === document.activeElement).toBe(false);
    }));

    it('should readOnly work', () => {
      testComponent.nzInputReadOnly = true;
      fixture.detectChanges();
      expect(getPickerInput(fixture.debugElement).readOnly).toBeTruthy();

      testComponent.nzInputReadOnly = false;
      fixture.detectChanges();
      expect(getPickerInput(fixture.debugElement).readOnly).not.toBeTruthy();
    });

    it('should open and close work', () => {
      testComponent.open = true;
      fixture.detectChanges();
      expect(testComponent.openChange).toHaveBeenCalledTimes(0);
      testComponent.nzTimePickerComponent.close();
      fixture.detectChanges();
      expect(testComponent.openChange).toHaveBeenCalledTimes(2);
      expect(testComponent.open).toBe(false);
      testComponent.nzTimePickerComponent.open();
      fixture.detectChanges();
      expect(testComponent.openChange).toHaveBeenCalledTimes(3);
      expect(testComponent.open).toBe(true);
    });

    it('should clear work', fakeAsync(() => {
      fixture.detectChanges();
      testComponent.date = new Date('2018-11-11 11:11:11');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      timeElement.nativeElement.querySelector('.ant-picker-clear').click();
      fixture.detectChanges();
      expect(testComponent.date).toBeNull();
    }));

    it('should support default nzfomat in 12-hours', () => {
      testComponent.use12Hours = true;
      fixture.detectChanges();
      expect(testComponent.nzTimePickerComponent.nzFormat).toBe('h:mm:ss a');
    });

    it('should support ngModelChange', fakeAsync(() => {
      testComponent.date = new Date('2020-03-26 11:33:00');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      const nzOnChange = spyOn(testComponent, 'onChange');
      testComponent.open = true;
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-picker-time-panel-cell-selected > div')!.textContent).toBe(
        '11'
      );

      dispatchMouseEvent(overlayContainerElement.querySelector('.ant-picker-time-panel-cell')!, 'click');
      fixture.detectChanges();
      getPickerInput(fixture.debugElement).dispatchEvent(new KeyboardEvent('keyup', { key: 'enter' }));
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(nzOnChange).toHaveBeenCalled();
      const result = (nzOnChange.calls.allArgs()[0] as Date[])[0];
      expect(result.getHours()).toBe(0);
      expect(testComponent.nzTimePickerComponent.inputRef.nativeElement.value).toBe('00:33:00');
    }));

    it('should support ISO string', fakeAsync(() => {
      testComponent.date = new Date('2020-03-27T13:49:54.917Z');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      testComponent.open = true;
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      const date = new Date(testComponent.date);
      expect(
        queryFromOverlay('.ant-picker-time-panel-column:nth-child(1) .ant-picker-time-panel-cell-selected > div')!
          .textContent
      ).toBe(date.getHours().toString());
      expect(
        queryFromOverlay('.ant-picker-time-panel-column:nth-child(2) .ant-picker-time-panel-cell-selected > div')!
          .textContent
      ).toBe(date.getMinutes().toString());
    }));

    it('should support custom suffixIcon', fakeAsync(() => {
      testComponent.nzSuffixIcon = 'calendar';
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css(`.anticon-calendar`))).toBeDefined();
    }));

    it('should backdrop work', fakeAsync(() => {
      testComponent.nzBackdrop = true;
      testComponent.open = true;
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      const boundingBox = overlayContainerElement.children[0];
      expect(boundingBox.children[0].classList).toContain('cdk-overlay-backdrop');
    }));

    it('should open with click and close with tab', fakeAsync(() => {
      dispatchMouseEvent(getPickerInput(fixture.debugElement), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(getPickerContainer()).not.toBeNull();

      triggerInputBlur(fixture.debugElement);
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();

      expect(getPickerContainer()).toBeNull();
    }));

    it('should set default opening time when clicking ok', fakeAsync(() => {
      const onChange = spyOn(testComponent, 'onChange');
      dispatchMouseEvent(getPickerInput(fixture.debugElement), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(getPickerContainer()).not.toBeNull();

      const okButton = getPickerOkButton(fixture.debugElement);
      expect(okButton).not.toBeNull();
      dispatchFakeEvent(okButton, 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      const result = (onChange.calls.allArgs()[0] as Date[])[0];
      expect(result.getHours()).toEqual(0);
      expect(result.getMinutes()).toEqual(0);
      expect(result.getSeconds()).toEqual(0);
    }));

    it('should not set time when clicking ok without default opening time', fakeAsync(() => {
      const onChange = spyOn(testComponent, 'onChange');
      testComponent.defaultOpenValue = null!;
      dispatchMouseEvent(getPickerInput(fixture.debugElement), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(getPickerContainer()).not.toBeNull();

      const okButton = getPickerOkButton(fixture.debugElement);
      expect(okButton).not.toBeNull();
      dispatchFakeEvent(okButton, 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();

      const result = (onChange.calls.allArgs()[0] as Date[])[0];
      expect(result).toBeNull();
    }));

    it('should set previous value when tabbing out with invalid input', fakeAsync(() => {
      testComponent.date = new Date('2020-03-27T13:49:54.917');

      fixture.detectChanges();
      dispatchMouseEvent(getPickerInput(fixture.debugElement), 'click');
      fixture.detectChanges();
      tick(500);

      fixture.detectChanges();
      const input = getPickerInput(fixture.debugElement);
      typeInElement('invalid', input);
      fixture.detectChanges();

      triggerInputBlur(fixture.debugElement);
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();

      expect(input.value).not.toEqual('invalid');
    }));

    it('should set new value when tabbing out with valid input', fakeAsync(() => {
      const onChange = spyOn(testComponent, 'onChange');
      testComponent.date = new Date('2020-03-27T13:49:54.917');

      fixture.detectChanges();
      dispatchMouseEvent(getPickerInput(fixture.debugElement), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      const input = getPickerInput(fixture.debugElement);
      typeInElement('20:10:30', input);
      fixture.detectChanges();

      triggerInputBlur(fixture.debugElement);
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();

      const result = (onChange.calls.allArgs()[0] as Date[])[0];
      expect(result.getHours()).toEqual(20);
      expect(result.getMinutes()).toEqual(10);
      expect(result.getSeconds()).toEqual(30);
    }));

    describe('should nzVariant works', () => {
      it('filled', () => {
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(`.ant-picker-filled`))).toBeNull();
        fixture.componentInstance.nzVariant = 'filled';
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(`.ant-picker-filled`))).toBeDefined();
      });
      it('borderless', () => {
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(`.ant-picker-borderless`))).toBeNull();
        fixture.componentInstance.nzVariant = 'borderless';
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(`.ant-picker-borderless`))).toBeDefined();
      });
      it('underlined', () => {
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(`.ant-picker-underlined`))).toBeNull();
        fixture.componentInstance.nzVariant = 'underlined';
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(`.ant-picker-underlined`))).toBeDefined();
      });
    });

    it('should not trigger blur after close panel', fakeAsync(() => {
      dispatchMouseEvent(getPickerInput(fixture.debugElement), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(getPickerContainer()).not.toBeNull();

      const okButton = getPickerOkButton(fixture.debugElement);
      expect(okButton).not.toBeNull();
      dispatchFakeEvent(okButton, 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();

      expect(timeElement.nativeElement.querySelector('input') === document.activeElement).toBe(false);
    }));

    describe('setup I18n service', () => {
      let srv: NzI18nService;

      beforeEach(inject([NzI18nService], (s: NzI18nService) => {
        srv = s;
      }));

      it('should detect the language changes', fakeAsync(() => {
        let placeHolderValue: string | undefined;
        placeHolderValue = timeElement.nativeElement.querySelector('input').placeholder;

        expect(placeHolderValue).toBe('请选择时间');

        srv.setLocale(en_GB);
        tick(400);
        fixture.detectChanges();

        placeHolderValue = timeElement.nativeElement.querySelector('input').placeholder;
        expect(placeHolderValue).toBe('Select time');
      }));
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

      testComponent.status = 'warning';
      fixture.detectChanges();
      expect(timeElement.nativeElement.className).toContain('ant-picker-status-warning');

      testComponent.status = '';
      fixture.detectChanges();
      expect(timeElement.nativeElement.className).not.toContain('ant-picker-status-warning');
    });
  });

  describe('RTL', () => {
    let testComponent: NzTestTimePickerDirComponent;
    let fixture: ComponentFixture<NzTestTimePickerDirComponent>;
    let timeElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestTimePickerDirComponent);
      testComponent = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      timeElement = fixture.debugElement.query(By.directive(NzTimePickerComponent));
    });

    it('should className correct on dir change', () => {
      expect(timeElement.nativeElement.classList).not.toContain('ant-picker-rtl');
      testComponent.dir = 'rtl';
      fixture.detectChanges();
      expect(timeElement.nativeElement.classList).toContain('ant-picker-rtl');
    });
  });

  describe('in form', () => {
    let testComponent: NzTestTimePickerInFormComponent;
    let fixture: ComponentFixture<NzTestTimePickerInFormComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestTimePickerInFormComponent);
      testComponent = fixture.debugElement.componentInstance;
    });

    it('should disable if the form is disabled initially and nzDisabled set to false', fakeAsync(() => {
      testComponent.disable();
      fixture.detectChanges();
      flush();
      const timeElement = fixture.debugElement.query(By.directive(NzTimePickerComponent));
      const inputElement = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;

      expect(timeElement.componentInstance.nzDisabled).toBe(true);
      expect(timeElement.nativeElement.classList).toContain('ant-picker-disabled');
      expect(inputElement.disabled).toBe(true);
    }));

    it('should className correct', () => {
      fixture.detectChanges();
      const timeElement = fixture.debugElement.query(By.directive(NzTimePickerComponent)).nativeElement;
      expect(timeElement.classList).toContain('ant-picker-status-error');
      expect(timeElement.querySelector('nz-form-item-feedback-icon')).toBeTruthy();

      testComponent.status = 'warning';
      fixture.detectChanges();
      expect(timeElement.classList).toContain('ant-picker-status-warning');

      testComponent.status = 'success';
      fixture.detectChanges();
      expect(timeElement.classList).toContain('ant-picker-status-success');

      testComponent.feedback = false;
      fixture.detectChanges();
      expect(timeElement.querySelector('nz-form-item-feedback-icon')).toBeNull();
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

@Component({
  imports: [NzTimePickerComponent, FormsModule],
  template: `
    <nz-time-picker
      [nzAutoFocus]="autoFocus"
      [(ngModel)]="date"
      (ngModelChange)="onChange($event)"
      [(nzOpen)]="open"
      (nzOpenChange)="openChange($event)"
      [nzDisabled]="disabled"
      [nzInputReadOnly]="nzInputReadOnly"
      [nzUse12Hours]="use12Hours"
      [nzSuffixIcon]="nzSuffixIcon"
      [nzBackdrop]="nzBackdrop"
      [nzDefaultOpenValue]="defaultOpenValue"
      [nzVariant]="nzVariant"
    />
  `
})
export class NzTestTimePickerComponent {
  open = false;
  openChange = jasmine.createSpy('open change');
  autoFocus = false;
  date: Date | string = new Date();
  disabled = false;
  nzInputReadOnly = false;
  use12Hours = false;
  nzSuffixIcon: string = 'close-circle';
  nzBackdrop = false;
  nzVariant: NzVariant = 'outlined';
  defaultOpenValue: Date = new Date('2020-03-27T00:00:00');
  onChange(_: Date | null): void {}
  @ViewChild(NzTimePickerComponent, { static: false }) nzTimePickerComponent!: NzTimePickerComponent;
}

@Component({
  imports: [NzTimePickerComponent],
  template: `<nz-time-picker [nzStatus]="status" />`
})
export class NzTestTimePickerStatusComponent {
  status: NzStatus = 'error';
}

@Component({
  imports: [NzTimePickerComponent, BidiModule],
  template: `
    <div [dir]="dir">
      <nz-time-picker />
    </div>
  `
})
export class NzTestTimePickerDirComponent {
  dir: Direction = 'ltr';
}

@Component({
  imports: [NzFormModule, ReactiveFormsModule, NzTimePickerComponent],
  template: `
    <form nz-form [formGroup]="timePickerForm">
      <nz-form-item>
        <nz-form-control [nzHasFeedback]="feedback" [nzValidateStatus]="status">
          <nz-time-picker formControlName="time" [nzDisabled]="disabled" />
        </nz-form-control>
      </nz-form-item>
    </form>
  `
})
export class NzTestTimePickerInFormComponent {
  timePickerForm = new FormGroup({
    time: new FormControl(new Date())
  });
  status: NzFormControlStatusType = 'error';
  feedback = true;
  disabled = false;

  disable(): void {
    this.timePickerForm.disable();
  }
}
