import { Component, ViewChild } from '@angular/core';
import { async, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { dispatchFakeEvent } from '../core/testing';
import { NzI18nModule } from '../i18n/nz-i18n.module';
import { NzTimeValueAccessorDirective } from './nz-time-value-accessor.directive';

describe('input-time', () => {
  let testComponent;
  let fixture;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports     : [ FormsModule, NzI18nModule ],
      declarations: [ NzTimeValueAccessorDirective, NzTestTimeInputComponent ]
    });
    TestBed.compileComponents();
  }));
  describe('basic input-time', () => {
    let inputElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestTimeInputComponent);
      testComponent = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      inputElement = fixture.debugElement.query(By.directive(NzTimeValueAccessorDirective));
    });
    it('should nzFormat correct', fakeAsync(() => {
      fixture.detectChanges();
      testComponent.value = new Date(0, 0, 0, 0, 0, 0);
      flush();
      fixture.detectChanges();
      flush();
      expect(inputElement.nativeElement.value).toBe('00:00:00');
    }));
    it('should parse correct', fakeAsync(() => {
      inputElement.nativeElement.value = '01:01:01';
      dispatchFakeEvent(inputElement.nativeElement, 'keyup');
      dispatchFakeEvent(inputElement.nativeElement, 'blur');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      flush();
      expect(testComponent.value).toEqual(new Date(1970, 0, 1, 1, 1, 1));
    }));
    it('should focus work', fakeAsync(() => {
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      flush();
      testComponent.nzTimeValueAccessorDirective.setRange();
      expect(inputElement.nativeElement === document.activeElement).toBe(true);
    }));
  });
});

@Component({
  selector: 'nz-test-time-input',
  template: `<input [(ngModel)]="value" [nzTime]="'HH:mm:ss'">`
})
export class NzTestTimeInputComponent {
  @ViewChild(NzTimeValueAccessorDirective) nzTimeValueAccessorDirective: NzTimeValueAccessorDirective;
  value = new Date(0, 0, 0, 0, 0, 0);
}
