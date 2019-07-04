import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, DebugElement, NO_ERRORS_SCHEMA, ViewChild } from '@angular/core';
import { async, fakeAsync, inject, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NzI18nModule } from '../i18n/nz-i18n.module';
import { NzTimePickerComponent } from './nz-time-picker.component';
import { NzTimePickerModule } from './nz-time-picker.module';

import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
registerLocaleData(zh);

describe('time-picker', () => {
  let overlayContainer: OverlayContainer;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, FormsModule, NzI18nModule, NzTimePickerModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [NzTestTimePickerComponent]
    });
    TestBed.compileComponents();
    inject([OverlayContainer], (oc: OverlayContainer) => {
      overlayContainer = oc;
    })();
  }));
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
      expect(timeElement.nativeElement.classList).toContain('ant-time-picker');
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
      testComponent.nzTimePickerComponent.cdr.detectChanges();
      timeElement.nativeElement.querySelector('.ant-time-picker-clear').click();
      fixture.detectChanges();
      expect(testComponent.date).toBeNull();
    }));
    it('should support default nzfomat in 12-hours', () => {
      testComponent.use12Hours = true;
      fixture.detectChanges();
      expect(testComponent.nzTimePickerComponent.nzFormat).toBe('h:mm:ss a');
    });
  });
});

@Component({
  template: `
    <nz-time-picker
      [nzAutoFocus]="autoFocus"
      [(ngModel)]="date"
      [(nzOpen)]="open"
      (nzOpenChange)="openChange($event)"
      [nzDisabled]="disabled"
      [nzUse12Hours]="use12Hours"
    ></nz-time-picker>
  `
})
export class NzTestTimePickerComponent {
  open = false;
  openChange = jasmine.createSpy('open change');
  autoFocus = false;
  date = new Date();
  disabled = false;
  use12Hours = false;
  @ViewChild(NzTimePickerComponent, { static: false }) nzTimePickerComponent: NzTimePickerComponent;
}
