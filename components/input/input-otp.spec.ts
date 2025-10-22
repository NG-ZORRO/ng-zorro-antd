/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BACKSPACE } from '@angular/cdk/keycodes';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray, FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzInputOtpComponent } from 'ng-zorro-antd/input/input-otp.component';

describe('NzInputOtpComponent', () => {
  let component: NzInputOtpComponent;
  let fixture: ComponentFixture<NzInputOtpComponent>;
  let inputElements: DebugElement[];

  beforeEach(() => {
    fixture = TestBed.createComponent(NzInputOtpComponent);
    component = fixture.componentInstance;
    component.nzLength = 6;
    fixture.detectChanges();

    inputElements = fixture.debugElement.queryAll(By.css('.ant-otp-input'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form controls based on nzLength', () => {
    expect(component['otpArray'].controls).toBeTruthy();
    expect(component['otpArray'].length).toBe(6);
  });

  it('should format the value on input using nzFormatter', () => {
    component.nzFormatter = value => value.toUpperCase();
    inputElements[0].nativeElement.value = 'a';
    inputElements[0].triggerEventHandler('input', { target: inputElements[0].nativeElement });

    fixture.detectChanges();
    expect(component['otpArray'].at(0).value).toBe('A');
  });

  it('should apply nzMask if defined', () => {
    component.nzMask = '*';
    inputElements[0].nativeElement.value = '1';
    inputElements[0].triggerEventHandler('input', { target: inputElements[0].nativeElement });

    fixture.detectChanges();
    expect(component['otpArray'].at(0).value).toBe('*');
    expect(component['internalValue'][0]).toBe('1');
  });

  it('should focus on the next input after input is entered', () => {
    spyOn(inputElements[1].nativeElement, 'focus');
    inputElements[0].nativeElement.value = '2';
    inputElements[0].triggerEventHandler('input', { target: inputElements[0].nativeElement });

    fixture.detectChanges();
    expect(inputElements[1].nativeElement.focus).toHaveBeenCalled();
  });

  it('should handle Backspace key to delete and select on previous input', () => {
    inputElements[1].nativeElement.value = '3';
    inputElements[1].triggerEventHandler('input', { target: inputElements[1].nativeElement });
    fixture.detectChanges();

    spyOn(inputElements[0].nativeElement, 'select');
    const event = new KeyboardEvent('keydown', { keyCode: BACKSPACE });
    inputElements[1].triggerEventHandler('keydown', event);

    fixture.detectChanges();
    expect(inputElements[0].nativeElement.select).toHaveBeenCalled();
    expect(component['otpArray'].at(1).value).toBe('');
  });

  it('should handle paste event and correctly distribute characters', () => {
    const event = new ClipboardEvent('paste', {
      clipboardData: new DataTransfer()
    });
    event.clipboardData?.setData('text', '123456');
    spyOn(event, 'preventDefault');

    inputElements[0].triggerEventHandler('paste', event);
    fixture.detectChanges();

    expect(event.preventDefault).toHaveBeenCalled();
    expect(component['otpArray'].at(0).value).toBe('1');
    expect(component['otpArray'].at(1).value).toBe('2');
    expect(component['otpArray'].at(2).value).toBe('3');
    expect(component['otpArray'].at(3).value).toBe('4');
    expect(component['otpArray'].at(4).value).toBe('5');
    expect(component['otpArray'].at(5).value).toBe('6');
  });

  it('should update internal value correctly on paste event with nzMask', () => {
    component.nzMask = '*';
    const event = new ClipboardEvent('paste', {
      clipboardData: new DataTransfer()
    });
    event.clipboardData?.setData('text', '789');
    spyOn(event, 'preventDefault');

    inputElements[0].triggerEventHandler('paste', event);
    fixture.detectChanges();

    expect(event.preventDefault).toHaveBeenCalled();
    expect(component['otpArray'].at(0).value).toBe('*');
    expect(component['internalValue'][0]).toBe('7');
    expect(component['otpArray'].at(1).value).toBe('*');
    expect(component['internalValue'][1]).toBe('8');
    expect(component['otpArray'].at(2).value).toBe('*');
    expect(component['internalValue'][2]).toBe('9');
  });

  it('should disable all inputs when setDisabledState is called with true', () => {
    component.setDisabledState(true);
    fixture.detectChanges();

    inputElements.forEach(input => {
      expect(input.nativeElement.disabled).toBe(true);
    });
  });

  it('should recreate form array when nzLength changes', () => {
    component.nzLength = 6;
    component['createFormArray']();
    const initialFormArray = component['otpArray'];

    component.nzLength = 8;
    component.ngOnChanges({
      nzLength: {
        currentValue: 8,
        previousValue: 6,
        firstChange: false,
        isFirstChange: () => false
      }
    });

    expect(component['otpArray']).not.toBe(initialFormArray);
    expect(component['otpArray'].length).toBe(8);
  });

  it('should set disabled state correctly when disabled input changes', () => {
    (component as NzSafeAny)['otpArray'] = new FormArray([]);
    const spy = spyOn(component['otpArray'], 'disable').and.callThrough();
    const enableSpy = spyOn(component['otpArray'], 'enable').and.callThrough();

    component.disabled = true;
    component.ngOnChanges({
      disabled: {
        currentValue: true,
        previousValue: false,
        firstChange: false,
        isFirstChange: () => false
      }
    });

    expect(spy).toHaveBeenCalled();
    expect(enableSpy).not.toHaveBeenCalled();
  });

  it('should reset form array if the provided value is empty', () => {
    const spy = spyOn(component['otpArray'], 'reset');

    component.writeValue('');

    expect(spy).toHaveBeenCalled();
  });

  it('should set formatted values correctly in the form array', () => {
    component.nzFormatter = value => value.toUpperCase();
    component['createFormArray']();

    component.writeValue('abcd');

    expect(component['otpArray'].at(0).value).toBe('A');
    expect(component['otpArray'].at(1).value).toBe('B');
    expect(component['otpArray'].at(2).value).toBe('C');
    expect(component['otpArray'].at(3).value).toBe('D');
  });

  it('should register onChange callback', () => {
    const callback = jasmine.createSpy('onChangeCallback');
    component.registerOnChange(callback);

    component['onChangeCallback']?.('test value');

    expect(callback).toHaveBeenCalledWith('test value');
  });

  it('should register onTouched callback', () => {
    const callback = jasmine.createSpy('onTouched');
    component.registerOnTouched(callback);

    component.onTouched();

    expect(callback).toHaveBeenCalled();
  });

  it('should enable form array when setDisabledState is called with false', () => {
    component['otpArray'] = new FormArray<FormControl<string>>([
      new FormControl<string>('', { nonNullable: true }),
      new FormControl<string>('', { nonNullable: true }),
      new FormControl<string>('', { nonNullable: true }),
      new FormControl<string>('', { nonNullable: true }),
      new FormControl<string>('', { nonNullable: true }),
      new FormControl<string>('', { nonNullable: true })
    ]);

    const spy = spyOn(component['otpArray'], 'enable').and.callThrough();
    const disableSpy = spyOn(component['otpArray'], 'disable').and.callThrough();

    component.setDisabledState(false);

    expect(spy).toHaveBeenCalled();
    expect(disableSpy).not.toHaveBeenCalled();
  });

  it('should call onChangeCallback with the joined internalValue', () => {
    component['internalValue'] = ['1', '2', '3', '4', '5', '6'];
    const callback = jasmine.createSpy('onChangeCallback');
    component['onChangeCallback'] = callback;

    component['emitValue']();

    expect(callback).toHaveBeenCalledWith('123456');
  });
});
