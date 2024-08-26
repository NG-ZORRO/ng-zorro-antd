import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { NzInputOtpComponent } from './input-otp.component';

describe('NzInputOtpComponent', () => {
  let component: NzInputOtpComponent;
  let fixture: ComponentFixture<NzInputOtpComponent>;
  let inputElements: DebugElement[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, NzInputOtpComponent]
    }).compileComponents();
  });

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
    expect(component.formGroup.controls).toBeTruthy();
    expect(Object.keys(component.formGroup.controls).length).toBe(6);
  });

  it('should format the value on input using nzFormatter', () => {
    component.nzFormatter = value => value.toUpperCase();
    inputElements[0].nativeElement.value = 'a';
    inputElements[0].triggerEventHandler('input', { target: inputElements[0].nativeElement });

    fixture.detectChanges();
    expect(component.formGroup.controls['0'].value).toBe('A');
  });

  it('should apply nzMask if defined', () => {
    component.nzMask = '*';
    inputElements[0].nativeElement.value = '1';
    inputElements[0].triggerEventHandler('input', { target: inputElements[0].nativeElement });

    fixture.detectChanges();
    expect(component.formGroup.controls['0'].value).toBe('*');
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
    const event = new KeyboardEvent('keydown', { key: 'Backspace' });
    inputElements[1].triggerEventHandler('keydown', event);

    fixture.detectChanges();
    expect(inputElements[0].nativeElement.select).toHaveBeenCalled();
    expect(component.formGroup.controls['1'].value).toBe('');
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
    expect(component.formGroup.controls['0'].value).toBe('1');
    expect(component.formGroup.controls['1'].value).toBe('2');
    expect(component.formGroup.controls['2'].value).toBe('3');
    expect(component.formGroup.controls['3'].value).toBe('4');
    expect(component.formGroup.controls['4'].value).toBe('5');
    expect(component.formGroup.controls['5'].value).toBe('6');
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
    expect(component.formGroup.controls['0'].value).toBe('*');
    expect(component['internalValue'][0]).toBe('7');
    expect(component.formGroup.controls['1'].value).toBe('*');
    expect(component['internalValue'][1]).toBe('8');
    expect(component.formGroup.controls['2'].value).toBe('*');
    expect(component['internalValue'][2]).toBe('9');
  });

  it('should disable all inputs when setDisabledState is called with true', () => {
    component.setDisabledState(true);
    fixture.detectChanges();

    inputElements.forEach(input => {
      expect(input.nativeElement.disabled).toBe(true);
    });
  });
});
