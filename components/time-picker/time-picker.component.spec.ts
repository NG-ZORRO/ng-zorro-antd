import { BidiModule, Direction } from '@angular/cdk/bidi';
import { OverlayContainer } from '@angular/cdk/overlay';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { Component, DebugElement, NO_ERRORS_SCHEMA, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, inject, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { dispatchFakeEvent, dispatchMouseEvent, typeInElement } from 'ng-zorro-antd/core/testing';
import { NzStatus } from 'ng-zorro-antd/core/types';
import { PREFIX_CLASS } from 'ng-zorro-antd/date-picker';
import { getPickerInput, getPickerOkButton } from 'ng-zorro-antd/date-picker/testing/util';

import { en_GB, NzI18nModule, NzI18nService } from '../i18n';
import { NzTimePickerComponent } from './time-picker.component';
import { NzTimePickerModule } from './time-picker.module';

registerLocaleData(zh);

describe('time-picker', () => {
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [BidiModule, NoopAnimationsModule, FormsModule, NzI18nModule, NzTimePickerModule],
        schemas: [NO_ERRORS_SCHEMA],
        declarations: [NzTestTimePickerComponent, NzTestTimePickerStatusComponent, NzTestTimePickerDirComponent]
      });
      TestBed.compileComponents();
      inject([OverlayContainer], (oc: OverlayContainer) => {
        overlayContainer = oc;
        overlayContainerElement = oc.getContainerElement();
      })();
    })
  );

  afterEach(inject([OverlayContainer], (currentOverlayContainer: OverlayContainer) => {
    currentOverlayContainer.ngOnDestroy();
    overlayContainer.ngOnDestroy();
  }));

  describe('basic time-picker', () => {
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
    it('should disabled work', () => {
      fixture.detectChanges();
      expect(timeElement.nativeElement.querySelector('input').attributes.getNamedItem('disabled')).toBeNull();
      testComponent.disabled = true;
      fixture.detectChanges();
      expect(timeElement.nativeElement.querySelector('input').attributes.getNamedItem('disabled')).toBeDefined();
      expect(timeElement.nativeElement.querySelector('.ant-picker-clear')).not.toBeTruthy();
      testComponent.disabled = false;
      testComponent.nzTimePickerComponent.setDisabledState(false);
      fixture.detectChanges();
      expect(timeElement.nativeElement.querySelector('input').attributes.getNamedItem('disabled')).toBeNull();
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
      testComponent.date = '2020-03-27T13:49:54.917Z';
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
      expect(overlayContainerElement.children[0].classList).toContain('cdk-overlay-backdrop');
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
      testComponent.defaultOpenValue = null;
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

  describe('time-picker status', () => {
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

  describe('time-picker RTL', () => {
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
  template: `
    <nz-time-picker
      [nzAutoFocus]="autoFocus"
      [(ngModel)]="date"
      (ngModelChange)="onChange($event)"
      [(nzOpen)]="open"
      (nzOpenChange)="openChange($event)"
      [nzDisabled]="disabled"
      [nzUse12Hours]="use12Hours"
      [nzSuffixIcon]="nzSuffixIcon"
      [nzBackdrop]="nzBackdrop"
      [nzDefaultOpenValue]="defaultOpenValue"
    ></nz-time-picker>
  `
})
export class NzTestTimePickerComponent {
  open = false;
  openChange = jasmine.createSpy('open change');
  autoFocus = false;
  date: Date | string = new Date();
  disabled = false;
  use12Hours = false;
  nzSuffixIcon?: string;
  nzBackdrop = false;
  defaultOpenValue: Date | null = new Date('2020-03-27T00:00:00');
  onChange(_: Date | null): void {}
  @ViewChild(NzTimePickerComponent, { static: false }) nzTimePickerComponent!: NzTimePickerComponent;
}

@Component({
  template: ` <nz-time-picker [nzStatus]="status"></nz-time-picker> `
})
export class NzTestTimePickerStatusComponent {
  status: NzStatus = 'error';
}

@Component({
  template: ` <div [dir]="dir"><nz-time-picker></nz-time-picker></div> `
})
export class NzTestTimePickerDirComponent {
  dir: Direction = 'ltr';
}
