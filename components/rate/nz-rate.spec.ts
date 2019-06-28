import { Component, DebugElement, ViewChild } from '@angular/core';
import { fakeAsync, flush, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { dispatchFakeEvent, dispatchKeyboardEvent } from 'ng-zorro-antd/core';

import { LEFT_ARROW, RIGHT_ARROW } from '@angular/cdk/keycodes';
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
    let fixture: ComponentFixture<NzTestRateBasicComponent>;
    let testComponent: NzTestRateBasicComponent;
    let rate: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestRateBasicComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      rate = fixture.debugElement.query(By.directive(NzRateComponent));
    });
    it('should className correct', () => {
      fixture.detectChanges();
      expect(rate.nativeElement.firstElementChild!.classList).toContain('ant-rate');
    });
    it('should set ngModel work', fakeAsync(() => {
      fixture.detectChanges();
      const children = Array.prototype.slice.call(rate.nativeElement.firstElementChild.children);
      expect(children.every((item: HTMLElement) => item.classList.contains('ant-rate-star-zero'))).toBe(true);
      testComponent.value = 5;
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(children.every((item: HTMLElement) => item.classList.contains('ant-rate-star-full'))).toBe(true);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(0);
    }));
    it('should click work', fakeAsync(() => {
      fixture.detectChanges();
      expect(testComponent.value).toBe(0);
      rate.nativeElement.firstElementChild.children[3].firstElementChild.firstElementChild.click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(testComponent.value).toBe(4);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(1);
    }));
    it('should allow half work', fakeAsync(() => {
      testComponent.allowHalf = true;
      fixture.detectChanges();
      expect(testComponent.value).toBe(0);
      rate.nativeElement.firstElementChild.children[3].firstElementChild.children[1].click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(testComponent.value).toBe(3.5);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(1);
    }));
    it('should allow clear work', fakeAsync(() => {
      testComponent.allowClear = false;
      fixture.detectChanges();
      expect(testComponent.value).toBe(0);
      rate.nativeElement.firstElementChild.children[3].firstElementChild.firstElementChild.click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(testComponent.value).toBe(4);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(1);
      rate.nativeElement.firstElementChild.children[3].firstElementChild.firstElementChild.click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(testComponent.value).toBe(4);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(1);
      testComponent.allowClear = true;
      fixture.detectChanges();
      rate.nativeElement.firstElementChild.children[3].firstElementChild.firstElementChild.click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(testComponent.value).toBe(0);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(2);
    }));
    it('should disable work', fakeAsync(() => {
      testComponent.disabled = true;
      fixture.detectChanges();
      expect(testComponent.value).toBe(0);
      rate.nativeElement.firstElementChild.children[3].firstElementChild.firstElementChild.click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(testComponent.value).toBe(0);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(0);
    }));
    it('should count work', fakeAsync(() => {
      fixture.detectChanges();
      expect(rate.nativeElement.firstElementChild.children.length).toBe(5);
      expect(testComponent.value).toBe(0);
      rate.nativeElement.firstElementChild.children[3].firstElementChild.firstElementChild.click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(testComponent.value).toBe(4);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(1);
      testComponent.count = 10;
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(rate.nativeElement.firstElementChild.children.length).toBe(10);
      expect(testComponent.value).toBe(4);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(1);
    }));
    it('should autofocus work', () => {
      fixture.detectChanges();
      testComponent.autoFocus = true;
      fixture.detectChanges();
      expect(rate.nativeElement.querySelector('ul').attributes.getNamedItem('autofocus').name).toBe('autofocus');
      testComponent.autoFocus = false;
      fixture.detectChanges();
      expect(rate.nativeElement.querySelector('ul').attributes.getNamedItem('autofocus')).toBe(null);
    });
    it('should focus and blur function work', () => {
      fixture.detectChanges();
      expect(rate.nativeElement.querySelector('ul') === document.activeElement).toBe(false);
      testComponent.nzRateComponent.focus();
      fixture.detectChanges();
      expect(rate.nativeElement.querySelector('ul') === document.activeElement).toBe(true);
      testComponent.nzRateComponent.blur();
      fixture.detectChanges();
      expect(rate.nativeElement.querySelector('ul') === document.activeElement).toBe(false);
    });
    it('should hover rate work', () => {
      fixture.detectChanges();
      dispatchFakeEvent(
        rate.nativeElement.firstElementChild.children[3].firstElementChild.firstElementChild,
        'mouseover'
      );
      fixture.detectChanges();
      expect(rate.nativeElement.firstElementChild.children[3].classList).toContain('ant-rate-star-full');
      expect(testComponent.onHoverChange).toHaveBeenCalledWith(4);
      expect(testComponent.onHoverChange).toHaveBeenCalledTimes(1);
      dispatchFakeEvent(rate.nativeElement.firstElementChild.children[3].firstElementChild, 'mouseover');
      fixture.detectChanges();
      expect(testComponent.onHoverChange).toHaveBeenCalledTimes(1);
      dispatchFakeEvent(rate.nativeElement.firstElementChild, 'mouseleave');
      fixture.detectChanges();
      expect(rate.nativeElement.firstElementChild.children[3].classList).toContain('ant-rate-star-zero');
      testComponent.disabled = true;
      fixture.detectChanges();
      dispatchFakeEvent(rate.nativeElement.firstElementChild.children[2].firstElementChild, 'mouseover');
      expect(testComponent.onHoverChange).toHaveBeenCalledTimes(1);
    });
    it('should keydown work', () => {
      fixture.detectChanges();
      expect(testComponent.value).toBe(0);
      dispatchKeyboardEvent(rate.nativeElement.firstElementChild, 'keydown', LEFT_ARROW);
      fixture.detectChanges();
      expect(testComponent.value).toBe(0);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(0);
      dispatchKeyboardEvent(rate.nativeElement.firstElementChild, 'keydown', RIGHT_ARROW);
      fixture.detectChanges();
      expect(testComponent.value).toBe(1);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(1);
      dispatchKeyboardEvent(rate.nativeElement.firstElementChild, 'keydown', LEFT_ARROW);
      fixture.detectChanges();
      expect(testComponent.value).toBe(0);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(2);
      testComponent.allowHalf = true;
      fixture.detectChanges();
      dispatchKeyboardEvent(rate.nativeElement.firstElementChild, 'keydown', RIGHT_ARROW);
      fixture.detectChanges();
      expect(testComponent.value).toBe(0.5);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(3);
      dispatchKeyboardEvent(rate.nativeElement.firstElementChild, 'keydown', LEFT_ARROW);
      fixture.detectChanges();
      expect(testComponent.value).toBe(0);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(4);
    });
    it('should right keydown not dispatch change reached limit', fakeAsync(() => {
      testComponent.value = 5;
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      dispatchKeyboardEvent(rate.nativeElement.firstElementChild, 'keydown', RIGHT_ARROW);
      fixture.detectChanges();
      expect(testComponent.value).toBe(5);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(0);
    }));
  });
  describe('rate form', () => {
    let fixture: ComponentFixture<NzTestRateFormComponent>;
    let testComponent: NzTestRateFormComponent;
    let rate: DebugElement;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(NzTestRateFormComponent);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      rate = fixture.debugElement.query(By.directive(NzRateComponent));
    }));
    it('should be in pristine, untouched, and valid states initially', fakeAsync(() => {
      flush();
      expect(testComponent.formGroup.valid).toBe(true);
      expect(testComponent.formGroup.pristine).toBe(true);
      expect(testComponent.formGroup.touched).toBe(false);
    }));
    it('should set disabled work', fakeAsync(() => {
      flush();
      expect(testComponent.formGroup.get('rate')!.value).toBe(1);
      rate.nativeElement.firstElementChild.children[3].firstElementChild.firstElementChild.click();
      fixture.detectChanges();
      expect(testComponent.formGroup.get('rate')!.value).toBe(4);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      testComponent.formGroup.get('rate')!.setValue(2);
      testComponent.disable();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      rate.nativeElement.firstElementChild.children[3].firstElementChild.firstElementChild.click();
      fixture.detectChanges();
      expect(testComponent.formGroup.get('rate')!.value).toBe(2);
    }));
  });
});

@Component({
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
      [nzAutoFocus]="autoFocus"
    >
    </nz-rate>
  `
})
export class NzTestRateBasicComponent {
  @ViewChild(NzRateComponent, { static: false }) nzRateComponent: NzRateComponent;
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
  template: `
    <form [formGroup]="formGroup">
      <nz-rate formControlName="rate"></nz-rate>
    </form>
  `
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
