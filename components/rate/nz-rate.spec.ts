import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { fakeAsync, flush, TestBed } from '@angular/core/testing';
import { FormsModule, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { dispatchEvent, dispatchFakeEvent } from '../core/testing';

import { NzRateComponent } from './nz-rate.component';
import { NzRateModule } from './nz-rate.module';

describe('rate', () => {
  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [NzRateModule, FormsModule, ReactiveFormsModule],
      declarations: [NzTestRateBasicComponent, NzTestRateFormComponent]
    });
    TestBed.compileComponents();
  }));
  describe('basic rate', () => {
    let fixture;
    let testComponent;
    let rate;
    let cd;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestRateBasicComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      rate = fixture.debugElement.query(By.directive(NzRateComponent));
      cd = fixture.componentRef.injector.get(ChangeDetectorRef);
    });
    it('should className correct', () => {
      cd.detectChanges();
      expect(rate.nativeElement.firstElementChild.classList).toContain('ant-rate');
    });
    it('should set ngModel work', fakeAsync(() => {
      cd.detectChanges();
      const children = Array.prototype.slice.call(rate.nativeElement.firstElementChild.children);
      expect(children.every(item => item.classList.contains('ant-rate-star-zero'))).toBe(true);
      testComponent.value = 5;
      cd.detectChanges();
      flush();
      cd.detectChanges();
      expect(children.every(item => item.classList.contains('ant-rate-star-full'))).toBe(true);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(0);
    }));
    it('should click work', fakeAsync(() => {
      cd.detectChanges();
      expect(testComponent.value).toBe(0);
      rate.nativeElement.firstElementChild.children[3].firstElementChild.click();
      cd.detectChanges();
      flush();
      cd.detectChanges();
      expect(testComponent.value).toBe(4);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(1);
    }));
    it('should allow half work', fakeAsync(() => {
      testComponent.allowHalf = true;
      cd.detectChanges();
      expect(testComponent.value).toBe(0);
      rate.nativeElement.firstElementChild.children[3].firstElementChild.click();
      cd.detectChanges();
      flush();
      cd.detectChanges();
      expect(testComponent.value).toBe(3.5);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(1);
    }));
    it('should allow clear work', fakeAsync(() => {
      testComponent.allowClear = false;
      cd.detectChanges();
      expect(testComponent.value).toBe(0);
      rate.nativeElement.firstElementChild.children[3].firstElementChild.click();
      cd.detectChanges();
      flush();
      cd.detectChanges();
      expect(testComponent.value).toBe(4);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(1);
      rate.nativeElement.firstElementChild.children[3].firstElementChild.click();
      cd.detectChanges();
      flush();
      cd.detectChanges();
      expect(testComponent.value).toBe(4);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(1);
      testComponent.allowClear = true;
      cd.detectChanges();
      rate.nativeElement.firstElementChild.children[3].firstElementChild.click();
      cd.detectChanges();
      flush();
      cd.detectChanges();
      expect(testComponent.value).toBe(0);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(2);
    }));
    it('should disable work', fakeAsync(() => {
      testComponent.disabled = true;
      cd.detectChanges();
      expect(testComponent.value).toBe(0);
      rate.nativeElement.firstElementChild.children[3].firstElementChild.click();
      cd.detectChanges();
      flush();
      cd.detectChanges();
      expect(testComponent.value).toBe(0);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(0);
    }));
    it('should count work', fakeAsync(() => {
      cd.detectChanges();
      expect(rate.nativeElement.firstElementChild.children.length).toBe(5);
      expect(testComponent.value).toBe(0);
      rate.nativeElement.firstElementChild.children[3].firstElementChild.click();
      cd.detectChanges();
      flush();
      cd.detectChanges();
      expect(testComponent.value).toBe(4);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(1);
      testComponent.count = 10;
      cd.detectChanges();
      flush();
      cd.detectChanges();
      expect(rate.nativeElement.firstElementChild.children.length).toBe(10);
      expect(testComponent.value).toBe(4);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(1);
    }));
    it('should autofocus work', () => {
      cd.detectChanges();
      testComponent.autoFocus = true;
      cd.detectChanges();
      expect(rate.nativeElement.querySelector('ul').attributes.getNamedItem('autofocus').name).toBe('autofocus');
      testComponent.autoFocus = false;
      cd.detectChanges();
      expect(rate.nativeElement.querySelector('ul').attributes.getNamedItem('autofocus')).toBe(null);
    });
    it('should focus and blur function work', () => {
      cd.detectChanges();
      expect(rate.nativeElement.querySelector('ul') === document.activeElement).toBe(false);
      testComponent.nzRateComponent.focus();
      cd.detectChanges();
      expect(rate.nativeElement.querySelector('ul') === document.activeElement).toBe(true);
      testComponent.nzRateComponent.blur();
      cd.detectChanges();
      expect(rate.nativeElement.querySelector('ul') === document.activeElement).toBe(false);
    });
    it('should hover rate work', () => {
      cd.detectChanges();
      dispatchFakeEvent(rate.nativeElement.firstElementChild.children[3].firstElementChild, 'mouseover');
      cd.detectChanges();
      expect(rate.nativeElement.firstElementChild.children[3].classList).toContain('ant-rate-star-full');
      expect(testComponent.onHoverChange).toHaveBeenCalledWith(4);
      expect(testComponent.onHoverChange).toHaveBeenCalledTimes(1);
      dispatchFakeEvent(rate.nativeElement.firstElementChild.children[3].firstElementChild, 'mouseover');
      cd.detectChanges();
      expect(testComponent.onHoverChange).toHaveBeenCalledTimes(1);
      dispatchFakeEvent(rate.nativeElement.firstElementChild, 'mouseleave');
      cd.detectChanges();
      expect(rate.nativeElement.firstElementChild.children[3].classList).toContain('ant-rate-star-zero');
      testComponent.disabled = true;
      cd.detectChanges();
      dispatchFakeEvent(rate.nativeElement.firstElementChild.children[2].firstElementChild, 'mouseover');
      expect(testComponent.onHoverChange).toHaveBeenCalledTimes(1);
    });
    it('should keydown work', () => {
      const leftArrowEvent = new KeyboardEvent('keydown', {
        code: 'ArrowLeft'
      });
      const rightArrowEvent = new KeyboardEvent('keydown', {
        code: 'ArrowRight'
      });
      cd.detectChanges();
      expect(testComponent.value).toBe(0);
      dispatchEvent(rate.nativeElement.firstElementChild, leftArrowEvent);
      cd.detectChanges();
      expect(testComponent.value).toBe(0);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(0);
      dispatchEvent(rate.nativeElement.firstElementChild, rightArrowEvent);
      cd.detectChanges();
      expect(testComponent.value).toBe(1);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(1);
      dispatchEvent(rate.nativeElement.firstElementChild, leftArrowEvent);
      cd.detectChanges();
      expect(testComponent.value).toBe(0);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(2);
      testComponent.allowHalf = true;
      cd.detectChanges();
      dispatchEvent(rate.nativeElement.firstElementChild, rightArrowEvent);
      cd.detectChanges();
      expect(testComponent.value).toBe(0.5);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(3);
      dispatchEvent(rate.nativeElement.firstElementChild, leftArrowEvent);
      cd.detectChanges();
      expect(testComponent.value).toBe(0);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(4);
    });
    it('should right keydown work', fakeAsync(() => {
      const rightArrowEvent = new KeyboardEvent('keydown', {
        code: 'ArrowRight'
      });
      testComponent.value = 5;
      cd.detectChanges();
      flush();
      cd.detectChanges();
      dispatchEvent(rate.nativeElement.firstElementChild, rightArrowEvent);
      cd.detectChanges();
      expect(testComponent.value).toBe(5);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(0);
    }));
  });
  describe('rate form', () => {
    let fixture;
    let testComponent;
    let rate;
    let cd;
    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(NzTestRateFormComponent);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      rate = fixture.debugElement.query(By.directive(NzRateComponent));
      cd = fixture.componentRef.injector.get(ChangeDetectorRef);
    }));
    it('should be in pristine, untouched, and valid states initially', fakeAsync(() => {
      flush();
      expect(testComponent.formGroup.valid).toBe(true);
      expect(testComponent.formGroup.pristine).toBe(true);
      expect(testComponent.formGroup.touched).toBe(false);
    }));
    it('should set disabled work', fakeAsync(() => {
      flush();
      expect(testComponent.formGroup.get('rate').value).toBe(1);
      rate.nativeElement.firstElementChild.children[3].firstElementChild.click();
      cd.detectChanges();
      expect(testComponent.formGroup.get('rate').value).toBe(4);
      cd.detectChanges();
      flush();
      cd.detectChanges();
      testComponent.formGroup.get('rate').setValue(2);
      testComponent.disable();
      cd.detectChanges();
      flush();
      cd.detectChanges();
      rate.nativeElement.firstElementChild.children[3].firstElementChild.click();
      cd.detectChanges();
      expect(testComponent.formGroup.get('rate').value).toBe(2);
    }));
  });
});

@Component({
  selector: 'nz-test-rate-basic',
  template: `
    <nz-rate
      [(ngModel)]="value"
      (ngModelChange)="modelChange($event)"
      (nzOnBlur)="onBlur($event)"
      (nzOnFocus)="onFocus($event)"
      (nzOnHoverChange)="onHoverChange($event)"
      (nzOnKeyDown)="onKeyDown($event)"
      [nzCount]="count"
      [nzAllowHalf]="allowHalf"
      [nzAllowClear]="allowClear"
      [nzDisabled]="disabled"
      [nzAutoFocus]="autoFocus">
    </nz-rate>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NzTestRateBasicComponent {
  @ViewChild(NzRateComponent) nzRateComponent: NzRateComponent;
  count = 5;
  autoFocus = false;
  allowHalf = false;
  allowClear = false;
  disabled = false;
  value = 0;
  modelChange = jasmine.createSpy('model change callback');
  onBlur = jasmine.createSpy('blur callback');
  onFocus = jasmine.createSpy('focus callback');
  onHoverChange = jasmine.createSpy('hover change callback');
  onKeyDown = jasmine.createSpy('keydown callback');
}

@Component({
  selector: 'nz-test-rate-form',
  template: `
    <form [formGroup]="formGroup">
      <nz-rate formControlName="rate"></nz-rate>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NzTestRateFormComponent {
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      rate: [1]
    });
  }

  disable(): void {
    this.formGroup.disable();
  }
}
