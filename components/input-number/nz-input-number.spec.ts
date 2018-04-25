import { Component, ViewChild } from '@angular/core';
import { fakeAsync, flush, TestBed } from '@angular/core/testing';
import { FormsModule, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { dispatchEvent, dispatchFakeEvent } from '../core/testing';

import { NzInputNumberComponent } from './nz-input-number.component';
import { NzInputNumberModule } from './nz-input-number.module';

describe('input number', () => {
  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports     : [ NzInputNumberModule, FormsModule, ReactiveFormsModule ],
      declarations: [ NzTestInputNumberBasicComponent, NzTestInputNumberFormComponent ]
    });
    TestBed.compileComponents();
  }));
  describe('input number basic', () => {
    let fixture;
    let testComponent;
    let inputNumber;
    let inputElement;
    let upHandler;
    let downHandler;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestInputNumberBasicComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      inputNumber = fixture.debugElement.query(By.directive(NzInputNumberComponent));
      inputElement = inputNumber.nativeElement.querySelector('input');
      upHandler = inputNumber.nativeElement.querySelector('.ant-input-number-handler-up');
      downHandler = inputNumber.nativeElement.querySelector('.ant-input-number-handler-down');
    });
    it('should basic className correct', () => {
      fixture.detectChanges();
      expect(inputNumber.nativeElement.classList).toContain('ant-input-number');
    });
    it('should focus className correct', () => {
      fixture.detectChanges();
      dispatchFakeEvent(inputElement, 'focus');
      fixture.detectChanges();
      expect(inputNumber.nativeElement.classList).toContain('ant-input-number-focused');
      dispatchFakeEvent(inputElement, 'blur');
      fixture.detectChanges();
      expect(inputNumber.nativeElement.classList).not.toContain('ant-input-number-focused');
    });
    it('should nzSize work', () => {
      testComponent.size = 'large';
      fixture.detectChanges();
      expect(inputNumber.nativeElement.classList).toContain('ant-input-number-lg');
      testComponent.size = 'small';
      fixture.detectChanges();
      expect(inputNumber.nativeElement.classList).toContain('ant-input-number-sm');
    });
    it('should autofocus work', () => {
      fixture.detectChanges();
      testComponent.autofocus = true;
      fixture.detectChanges();
      expect(inputElement.attributes.getNamedItem('autofocus').name).toBe('autofocus');
      testComponent.autofocus = false;
      fixture.detectChanges();
      expect(inputElement.attributes.getNamedItem('autofocus')).toBe(null);
    });
    it('should focus method work', () => {
      fixture.detectChanges();
      testComponent.nzInputNumberComponent.focus();
      fixture.detectChanges();
      expect(inputElement === document.activeElement).toBe(true);
      testComponent.nzInputNumberComponent.blur();
      fixture.detectChanges();
      expect(inputElement === document.activeElement).toBe(false);
    });
    it('should ngModel work', fakeAsync(() => {
      testComponent.value = 5;
      fixture.detectChanges();
      flush();
      expect(inputElement.value).toBe('5');
      expect(testComponent.modelChange).toHaveBeenCalledTimes(0);
    }));
    it('should empty value work', () => {
      testComponent.nzInputNumberComponent.onModelChange('');
      fixture.detectChanges();
      testComponent.nzInputNumberComponent.onBlur();
      fixture.detectChanges();
      expect(testComponent.value).toBe('');
    });
    it('should NaN value work', () => {
      testComponent.nzInputNumberComponent.onModelChange('NaN');
      fixture.detectChanges();
      testComponent.nzInputNumberComponent.onBlur();
      fixture.detectChanges();
      expect(testComponent.value).toBe(undefined);
    });
    it('should up and down work', () => {
      dispatchFakeEvent(upHandler, 'mousedown');
      fixture.detectChanges();
      expect(inputElement.value).toBe('1');
      expect(testComponent.modelChange).toHaveBeenCalledTimes(1);
      dispatchFakeEvent(downHandler, 'mousedown');
      fixture.detectChanges();
      expect(inputElement.value).toBe('0');
      expect(testComponent.modelChange).toHaveBeenCalledTimes(2);
      dispatchFakeEvent(downHandler, 'mousedown');
      fixture.detectChanges();
      expect(inputElement.value).toBe('-1');
      expect(testComponent.modelChange).toHaveBeenCalledTimes(3);
      dispatchFakeEvent(downHandler, 'mousedown');
      fixture.detectChanges();
      expect(inputElement.value).toBe('-1');
      expect(testComponent.modelChange).toHaveBeenCalledTimes(3);
    });
    it('should not complete number work', () => {
      testComponent.nzInputNumberComponent.onModelChange('1.');
      fixture.detectChanges();
      testComponent.nzInputNumberComponent.onBlur();
      fixture.detectChanges();
      expect(testComponent.value).toBe(undefined);
      expect(inputElement.value).toBe('');
    });
    it('should not complete number work with up arrow', () => {
      testComponent.nzInputNumberComponent.onModelChange('1.');
      fixture.detectChanges();
      dispatchFakeEvent(upHandler, 'mousedown');
      fixture.detectChanges();
      expect(testComponent.value).toBe(1);
    });
    it('should not complete number work with down arrow', () => {
      testComponent.nzInputNumberComponent.onModelChange('1.');
      fixture.detectChanges();
      dispatchFakeEvent(downHandler, 'mousedown');
      fixture.detectChanges();
      expect(testComponent.value).toBe(-1);
    });
    it('should down step work', () => {
      expect(testComponent.nzInputNumberComponent.downStep('abc', 1)).toBe(-1);
      testComponent.min = -Infinity;
      fixture.detectChanges();
      expect(testComponent.nzInputNumberComponent.downStep('abc', 1)).toBe(-1);
    });
    it('should up step work', () => {
      expect(testComponent.nzInputNumberComponent.upStep('abc', 1)).toBe(-1);
      testComponent.min = -Infinity;
      fixture.detectChanges();
      expect(testComponent.nzInputNumberComponent.upStep('abc', 1)).toBe(1);
    });
    it('should undefined work', () => {
      expect(testComponent.nzInputNumberComponent.getValidValue(undefined)).toBe(undefined);
    });
    it('should up and down work with precision', () => {
      dispatchFakeEvent(upHandler, 'mousedown');
      fixture.detectChanges();
      expect(inputElement.value).toBe('1');
      expect(testComponent.modelChange).toHaveBeenCalledTimes(1);
      dispatchFakeEvent(upHandler, 'mousedown');
      fixture.detectChanges();
      expect(inputElement.value).toBe('1');
      expect(testComponent.modelChange).toHaveBeenCalledTimes(1);
      dispatchFakeEvent(downHandler, 'mousedown');
      fixture.detectChanges();
      expect(inputElement.value).toBe('0');
      expect(testComponent.modelChange).toHaveBeenCalledTimes(2);
      dispatchFakeEvent(downHandler, 'mousedown');
      fixture.detectChanges();
      expect(inputElement.value).toBe('-1');
      expect(testComponent.modelChange).toHaveBeenCalledTimes(3);
      dispatchFakeEvent(downHandler, 'mousedown');
      fixture.detectChanges();
      expect(inputElement.value).toBe('-1');
      expect(testComponent.modelChange).toHaveBeenCalledTimes(3);
    });
    it('should up and down work without precision', () => {
      testComponent.precision = undefined;
      fixture.detectChanges();
      dispatchFakeEvent(upHandler, 'mousedown');
      fixture.detectChanges();
      expect(inputElement.value).toBe('1');
      expect(testComponent.modelChange).toHaveBeenCalledTimes(1);
      dispatchFakeEvent(upHandler, 'mousedown');
      fixture.detectChanges();
      expect(inputElement.value).toBe('1');
      expect(testComponent.modelChange).toHaveBeenCalledTimes(1);
      dispatchFakeEvent(downHandler, 'mousedown');
      fixture.detectChanges();
      expect(inputElement.value).toBe('0');
      expect(testComponent.modelChange).toHaveBeenCalledTimes(2);
      dispatchFakeEvent(downHandler, 'mousedown');
      fixture.detectChanges();
      expect(inputElement.value).toBe('-1');
      expect(testComponent.modelChange).toHaveBeenCalledTimes(3);
      dispatchFakeEvent(downHandler, 'mousedown');
      fixture.detectChanges();
      expect(inputElement.value).toBe('-1');
      expect(testComponent.modelChange).toHaveBeenCalledTimes(3);
    });
    it('should user input work', () => {
      testComponent.nzInputNumberComponent.onModelChange('123');
      fixture.detectChanges();
      expect(testComponent.value).toBe(undefined);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(0);
      testComponent.nzInputNumberComponent.onBlur();
      fixture.detectChanges();
      expect(testComponent.value).toBe(1);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(1);
      testComponent.nzInputNumberComponent.onModelChange('0');
      fixture.detectChanges();
      expect(testComponent.value).toBe(1);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(1);
      testComponent.nzInputNumberComponent.onBlur();
      fixture.detectChanges();
      expect(testComponent.value).toBe(0);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(2);
      testComponent.nzInputNumberComponent.onModelChange('-4');
      fixture.detectChanges();
      expect(testComponent.value).toBe(0);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(2);
      testComponent.nzInputNumberComponent.onBlur();
      fixture.detectChanges();
      expect(testComponent.value).toBe(-1);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(3);
    });
    it('should auto precision work', () => {
      testComponent.precision = undefined;
      testComponent.max = 10;
      testComponent.nzInputNumberComponent.onModelChange('0.999999');
      fixture.detectChanges();
      testComponent.nzInputNumberComponent.onBlur();
      fixture.detectChanges();
      expect(testComponent.value).toBe(0.999999);
      dispatchFakeEvent(upHandler, 'mousedown');
      fixture.detectChanges();
      expect(testComponent.value).toBe(1.999999);
      dispatchFakeEvent(downHandler, 'mousedown');
      fixture.detectChanges();
      expect(testComponent.value).toBe(0.999999);
      testComponent.nzInputNumberComponent.onModelChange('1e-10');
      fixture.detectChanges();
      testComponent.nzInputNumberComponent.onBlur();
      fixture.detectChanges();
      expect(testComponent.value).toBe(1e-10);
      dispatchFakeEvent(upHandler, 'mousedown');
      fixture.detectChanges();
      expect(testComponent.value).toBe(1.0000000001);
      dispatchFakeEvent(downHandler, 'mousedown');
      fixture.detectChanges();
      expect(testComponent.value).toBe(1e-10);
    });
    it('should nzPrecision work', () => {
      testComponent.nzInputNumberComponent.onModelChange('0.99');
      fixture.detectChanges();
      testComponent.nzInputNumberComponent.onBlur();
      fixture.detectChanges();
      expect(testComponent.value).toBe(0.99);
      testComponent.nzInputNumberComponent.onModelChange('0.993');
      fixture.detectChanges();
      testComponent.nzInputNumberComponent.onBlur();
      fixture.detectChanges();
      expect(testComponent.value).toBe(0.99);
      testComponent.nzInputNumberComponent.onModelChange('0.999');
      fixture.detectChanges();
      testComponent.nzInputNumberComponent.onBlur();
      fixture.detectChanges();
      expect(testComponent.value).toBe(1);
    });
    it('should nzStep work', () => {
      testComponent.step = 2;
      testComponent.max = 10;
      fixture.detectChanges();
      dispatchFakeEvent(upHandler, 'mousedown');
      fixture.detectChanges();
      expect(testComponent.value).toBe(2);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(1);
      dispatchFakeEvent(upHandler, 'mousedown');
      fixture.detectChanges();
      expect(testComponent.value).toBe(4);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(2);
      dispatchFakeEvent(downHandler, 'mousedown');
      fixture.detectChanges();
      expect(testComponent.value).toBe(2);
    });
    it('should key up and down work', () => {
      const upArrowEvent = new KeyboardEvent('keydown', {
        code: 'ArrowUp'
      });
      const downArrowEvent = new KeyboardEvent('keydown', {
        code: 'ArrowDown'
      });
      fixture.detectChanges();
      expect(testComponent.value).toBe(undefined);
      dispatchEvent(inputElement, upArrowEvent);
      fixture.detectChanges();
      expect(testComponent.value).toBe(1);
      dispatchEvent(inputElement, downArrowEvent);
      fixture.detectChanges();
      expect(testComponent.value).toBe(0);
      dispatchEvent(inputElement, downArrowEvent);
      fixture.detectChanges();
      expect(testComponent.value).toBe(-1);
      dispatchEvent(inputElement, downArrowEvent);
      fixture.detectChanges();
      expect(testComponent.value).toBe(-1);
    });
    it('should key up and down work with ctrl key', () => {
      const upArrowEvent = new KeyboardEvent('keydown', {
        code   : 'ArrowUp',
        ctrlKey: true
      });
      const downArrowEvent = new KeyboardEvent('keydown', {
        code   : 'ArrowDown',
        ctrlKey: true
      });
      fixture.detectChanges();
      expect(testComponent.value).toBe(undefined);
      dispatchEvent(inputElement, upArrowEvent);
      fixture.detectChanges();
      expect(testComponent.value).toBe(0.1);
      dispatchEvent(inputElement, downArrowEvent);
      fixture.detectChanges();
      expect(testComponent.value).toBe(0);
      dispatchEvent(inputElement, downArrowEvent);
      fixture.detectChanges();
      expect(testComponent.value).toBe(-0.1);
    });
    it('should key up and down work with meta key', () => {
      const upArrowEvent = new KeyboardEvent('keydown', {
        code   : 'ArrowUp',
        metaKey: true
      });
      const downArrowEvent = new KeyboardEvent('keydown', {
        code   : 'ArrowDown',
        metaKey: true
      });
      fixture.detectChanges();
      expect(testComponent.value).toBe(undefined);
      dispatchEvent(inputElement, upArrowEvent);
      fixture.detectChanges();
      expect(testComponent.value).toBe(0.1);
      dispatchEvent(inputElement, downArrowEvent);
      fixture.detectChanges();
      expect(testComponent.value).toBe(0);
      dispatchEvent(inputElement, downArrowEvent);
      fixture.detectChanges();
      expect(testComponent.value).toBe(-0.1);
    });
    it('should key up and down work with shift key', () => {
      testComponent.max = 100;
      testComponent.min = -100;
      const upArrowEvent = new KeyboardEvent('keydown', {
        code    : 'ArrowUp',
        shiftKey: true
      });
      const downArrowEvent = new KeyboardEvent('keydown', {
        code    : 'ArrowDown',
        shiftKey: true
      });
      fixture.detectChanges();
      expect(testComponent.value).toBe(undefined);
      dispatchEvent(inputElement, upArrowEvent);
      dispatchFakeEvent(inputElement, 'keyup');
      fixture.detectChanges();
      expect(testComponent.value).toBe(10);
      dispatchEvent(inputElement, downArrowEvent);
      fixture.detectChanges();
      expect(testComponent.value).toBe(0);
      dispatchEvent(inputElement, downArrowEvent);
      fixture.detectChanges();
      expect(testComponent.value).toBe(-10);
    });
    it('should update value immediatelly after formatter changed', (() => {
      const newFormatter = v => `${v} %`;
      const initValue = '1';
      testComponent.nzInputNumberComponent.onModelChange(initValue);
      fixture.detectChanges();
      testComponent.formatter = newFormatter;
      fixture.detectChanges();
      expect(inputElement.value).toBe(newFormatter(initValue));
    }));
  });
  describe('input number form', () => {
    let fixture;
    let testComponent;
    let inputNumber;
    let inputElement;
    let upHandler;
    let downHandler;
    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(NzTestInputNumberFormComponent);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      inputNumber = fixture.debugElement.query(By.directive(NzInputNumberComponent));
      inputElement = inputNumber.nativeElement.querySelector('input') as HTMLInputElement;
      upHandler = inputNumber.nativeElement.querySelector('.ant-input-number-handler-up');
      downHandler = inputNumber.nativeElement.querySelector('.ant-input-number-handler-down');
    }));
    it('should be in pristine, untouched, and valid states initially', fakeAsync(() => {
      flush();
      expect(testComponent.formGroup.valid).toBe(true);
      expect(testComponent.formGroup.pristine).toBe(true);
      expect(testComponent.formGroup.touched).toBe(false);
    }));
    it('should set disabled work', fakeAsync(() => {
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(testComponent.formGroup.get('inputNumber').value).toBe(1);
      dispatchFakeEvent(upHandler, 'mousedown');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(testComponent.formGroup.get('inputNumber').value).toBe(10);
      testComponent.disable();
      dispatchFakeEvent(upHandler, 'mousedown');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(testComponent.formGroup.get('inputNumber').value).toBe(10);
    }));
  });
});

@Component({
  selector: 'nz-test-input-number-basic',
  template: `
    <nz-input-number
      [(ngModel)]="value"
      (ngModelChange)="modelChange($event)"
      [nzDisabled]="disabled"
      [nzAutoFocus]="autofocus"
      [nzSize]="size"
      [nzMin]="min"
      [nzMax]="max"
      [nzStep]="step"
      [nzFormatter]="formatter"
      [nzParser]="parser"
      [nzPrecision]="precision">
    </nz-input-number>
  `
})
export class NzTestInputNumberBasicComponent {
  @ViewChild(NzInputNumberComponent) nzInputNumberComponent: NzInputNumberComponent;
  value;
  autofocus = false;
  disabled = false;
  min = -1;
  max = 1;
  size = 'default';
  step = 1;
  precision = 2;
  formatter = (value) => value;
  parser = (value) => value;
  modelChange = jasmine.createSpy('change callback');
}

@Component({
  selector: 'nz-test-input-number-form',
  template: `
    <form [formGroup]="formGroup">
      <nz-input-number formControlName="inputNumber" nzMax="10" nzMin="-10"></nz-input-number>
    </form>
  `
})
export class NzTestInputNumberFormComponent {
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      inputNumber: [ 1 ]
    });
  }

  disable(): void {
    this.formGroup.disable();
  }
}
