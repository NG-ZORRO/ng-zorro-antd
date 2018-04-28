import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, NO_ERRORS_SCHEMA, ViewChild } from '@angular/core';
import { async, inject, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NzI18nModule } from '../i18n/nz-i18n.module';
import { NzTimePickerComponent } from './nz-time-picker.component';
import { NzTimePickerModule } from './nz-time-picker.module';

describe('time-picker', () => {
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;
  let testComponent;
  let fixture;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports     : [ NoopAnimationsModule, FormsModule, NzI18nModule, NzTimePickerModule ],
      schemas     : [ NO_ERRORS_SCHEMA ],
      declarations: [ NzTestTimePickerComponent ]
    });
    TestBed.compileComponents();
    inject([ OverlayContainer ], (oc: OverlayContainer) => {
      overlayContainer = oc;
      overlayContainerElement = oc.getContainerElement();
    })();
  }));
  afterEach(inject([ OverlayContainer ], (currentOverlayContainer: OverlayContainer) => {
    currentOverlayContainer.ngOnDestroy();
    overlayContainer.ngOnDestroy();
  }));
  describe('basic time-picker', () => {
    let timeElement;
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
      expect(timeElement.nativeElement.querySelector('input').attributes.getNamedItem('autofocus').name).toBe('autofocus');
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
  });
});

@Component({
  selector: 'nz-test-time-picker',
  template: `
    <nz-time-picker [nzAutoFocus]="autoFocus" [(ngModel)]="date" [nzAllowEmpty]="false" [(nzOpen)]="open" (nzOpenChange)="openChange($event)" [nzDisabled]="disabled"></nz-time-picker>`
})
export class NzTestTimePickerComponent {
  open = false;
  openChange = jasmine.createSpy('open change');
  autoFocus = false;
  date = new Date();
  disabled = false;
  @ViewChild(NzTimePickerComponent) nzTimePickerComponent: NzTimePickerComponent;
}
