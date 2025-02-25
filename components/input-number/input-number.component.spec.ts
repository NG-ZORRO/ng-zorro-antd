/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { DOWN_ARROW, ENTER, UP_ARROW } from '@angular/cdk/keycodes';
import { Component, ElementRef, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { NzSizeLDSType, NzStatus } from 'ng-zorro-antd/core/types';
import { provideNzIconsTesting } from 'ng-zorro-antd/icon/testing';

import { NzInputNumberComponent } from './input-number.component';
import { NzInputNumberModule } from './input-number.module';

describe('Input number', () => {
  let component: InputNumberTestComponent;
  let fixture: ComponentFixture<InputNumberTestComponent>;
  let hostElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideNzIconsTesting()]
    });
    fixture = TestBed.createComponent(InputNumberTestComponent);
    component = fixture.componentInstance;
    hostElement = fixture.nativeElement.querySelector('nz-input-number');
    fixture.autoDetectChanges();
  });

  it('should set id', () => {
    component.id = 'test-id';
    fixture.detectChanges();
    expect(hostElement.querySelector('input')!.id).toBe('test-id');
  });

  it('should be apply size class', () => {
    component.size = 'large';
    fixture.detectChanges();
    expect(hostElement.classList).toContain('ant-input-number-lg');
    component.size = 'small';
    fixture.detectChanges();
    expect(hostElement.classList).toContain('ant-input-number-sm');
  });

  it('should be set placeholder', () => {
    component.placeholder = 'Enter a number';
    fixture.detectChanges();
    expect(hostElement.querySelector('input')!.placeholder).toBe('Enter a number');
  });

  it('should be set status', () => {
    component.status = 'error';
    fixture.detectChanges();
    expect(hostElement.classList).toContain('ant-input-number-status-error');
    component.status = 'warning';
    fixture.detectChanges();
    expect(hostElement.classList).toContain('ant-input-number-status-warning');
  });

  it('should be set step', () => {
    component.step = 5;
    fixture.detectChanges();
    expect(hostElement.querySelector('input')!.step).toBe('5');
    upStepByKeyboard();
    expect(component.value).toBe(5);
    upStepByKeyboard();
    expect(component.value).toBe(10);
    downStepByKeyboard();
    expect(component.value).toBe(5);
  });

  it('should be update value through the handler', () => {
    component.min = 1;
    component.max = 2;
    fixture.detectChanges();
    upStepByHandler();
    expect(component.value).toBe(1);
    upStepByHandler();
    expect(component.value).toBe(2);
    upStepByHandler();
    expect(component.value).toBe(2);
    downStepByHandler();
    expect(component.value).toBe(1);
    downStepByHandler();
    expect(component.value).toBe(1);
  });

  it('should be update value through the handler with floating numbers', () => {
    component.step = 0.1;
    fixture.detectChanges();
    upStepByHandler();
    expect(component.value).toBe(0.1);
    upStepByHandler();
    expect(component.value).toBe(0.2);
    upStepByHandler();
    expect(component.value).toBe(0.3);
    downStepByHandler();
    expect(component.value).toBe(0.2);
    downStepByHandler();
    expect(component.value).toBe(0.1);
    downStepByHandler();
    expect(component.value).toBe(0);
  });

  describe('should be update value through the handler with hold shift key', () => {
    it('normal', () => {
      upStepByHandler({ shiftKey: true });
      expect(component.value).toBe(10);
      upStepByHandler({ shiftKey: true });
      expect(component.value).toBe(20);

      downStepByHandler({ shiftKey: true });
      expect(component.value).toBe(10);
      downStepByHandler({ shiftKey: true });
      expect(component.value).toBe(0);
    });

    it('with min & max', () => {
      component.min = -5;
      component.max = 5;
      fixture.detectChanges();

      for (let index = 0; index < 10; index++) {
        upStepByHandler({ shiftKey: true });
      }
      expect(component.value).toBe(component.max);

      for (let index = 0; index < 10; index++) {
        downStepByHandler({ shiftKey: true });
      }
      expect(component.value).toBe(component.min);
    });
  });

  describe('should be update value through user typing', () => {
    it('normal', () => {
      input('123');
      expect(component.value).toBe(123);
      enter();
      expect(component.value).toBe(123);
      blur();
      expect(component.value).toBe(123);

      input('NonNumber');
      expect(component.value).toBe(123);
      enter();
      expect(component.value).toBe(123);
      blur();
      expect(component.value).toBe(123);

      input('');
      expect(component.value).toBe(null);
      enter();
      expect(component.value).toBe(null);
      blur();
      expect(component.value).toBe(null);
    });

    it('with range', () => {
      component.min = 1;
      component.max = 10;
      fixture.detectChanges();

      input('1');
      expect(component.value).toBe(1);

      input('99');
      expect(component.value).toBe(1);
      blur();
      expect(component.value).toBe(10);

      input('-99');
      expect(component.value).toBe(10);
      blur();
      expect(component.value).toBe(1);

      input('10');
      expect(component.value).toBe(10);
      blur();
      expect(component.value).toBe(10);

      input('');
      expect(component.value).toBe(null);
      blur();
      expect(component.value).toBe(null);
    });

    it('with formatter', () => {
      component.formatter = (value: number): string => `${value}%`;
      component.parser = (value: string): number => parseFloat(value?.replace('%', ''));
      fixture.detectChanges();

      const inputElement = getInputElement();

      input('123');
      fixture.detectChanges();
      expect(component.value).toBe(123);
      expect(inputElement.value).toBe('123%');
      blur();
      fixture.detectChanges();
      expect(component.value).toBe(123);
      expect(inputElement.value).toBe('123%');

      input('NonNumber');
      fixture.detectChanges();
      expect(component.value).toBe(123);
      expect(inputElement.value).toBe('NonNumber');
      blur();
      fixture.detectChanges();
      expect(component.value).toBe(123);
      expect(inputElement.value).toBe('123%');

      input('');
      fixture.detectChanges();
      expect(component.value).toBe(null);
      expect(inputElement.value).toBe('');
      blur();
      fixture.detectChanges();
      expect(component.value).toBe(null);
      expect(inputElement.value).toBe('');
    });
  });

  it('should be apply out-of-range class', async () => {
    component.min = 1;
    component.max = 2;
    component.value = 3;
    fixture.detectChanges();
    await fixture.whenStable();
    expect(hostElement.classList).toContain('ant-input-number-out-of-range');

    component.value = 0;
    fixture.detectChanges();
    await fixture.whenStable();
    expect(hostElement.classList).toContain('ant-input-number-out-of-range');
  });

  describe('should be set min and max with precision', () => {
    beforeEach(() => {
      component.precision = 0;
      component.value = null;
    });

    it('max > 0', () => {
      component.min = Number.MIN_SAFE_INTEGER;
      component.max = 1.5;
      fixture.detectChanges();

      input('1.1');
      expect(component.value).toBe(1.1);
      blur();
      expect(component.value).toBe(1);
      input('1.5');
      expect(component.value).toBe(1.5);
      blur();
      expect(component.value).toBe(1);
    });

    it('max < 0', () => {
      component.min = Number.MIN_SAFE_INTEGER;
      component.max = -1.5;
      fixture.detectChanges();

      input('-1.1');
      expect(component.value).toBe(null);
      blur();
      expect(component.value).toBe(-2);
      input('-1.5');
      expect(component.value).toBe(-1.5);
      blur();
      expect(component.value).toBe(-2);
    });

    it('min > 0', () => {
      component.min = 1.5;
      component.max = Number.MAX_SAFE_INTEGER;
      fixture.detectChanges();

      input('1.1');
      expect(component.value).toBe(null);
      blur();
      expect(component.value).toBe(2);
      input('1.5');
      expect(component.value).toBe(1.5);
      blur();
      expect(component.value).toBe(2);
    });

    it('min < 0', () => {
      component.min = -1.5;
      component.max = Number.MAX_SAFE_INTEGER;
      fixture.detectChanges();

      input('-1.1');
      expect(component.value).toBe(-1.1);
      blur();
      expect(component.value).toBe(-1);
      input('-1.5');
      expect(component.value).toBe(-1.5);
      blur();
      expect(component.value).toBe(-1);
    });
  });

  it('should set value with precision', async () => {
    component.precision = 1;
    fixture.detectChanges();

    input('1.23');
    expect(component.value).toBe(1.23);
    blur();
    expect(component.value).toBe(1.2);

    input('1.25');
    expect(component.value).toBe(1.25);
    blur();
    expect(component.value).toBe(1.3);
  });

  it('should be set disabled', () => {
    component.disabled = true;
    fixture.detectChanges();
    expect(hostElement.querySelector('input')!.disabled).toBeTruthy();
    expect(hostElement.classList).toContain('ant-input-number-disabled');
  });

  it('should be set disabled by ng control', async () => {
    component.controlDisabled = true;
    fixture.detectChanges();
    await fixture.whenStable();
    expect(hostElement.querySelector('input')!.disabled).toBeTruthy();
    expect(hostElement.classList).toContain('ant-input-number-disabled');
  });

  it('should be set readonly', () => {
    component.readonly = true;
    fixture.detectChanges();
    expect(hostElement.querySelector('input')!.readOnly).toBeTruthy();
    expect(hostElement.classList).toContain('ant-input-number-readonly');
  });

  it('should be focus / blur', async () => {
    await fixture.whenStable();
    component.inputNumber().focus();
    expect(document.activeElement).toBe(hostElement.querySelector('input'));
    component.inputNumber().blur();
    expect(document.activeElement).not.toBe(hostElement.querySelector('input'));
  });

  it('should be set bordered', () => {
    component.bordered = false;
    fixture.detectChanges();
    expect(hostElement.classList).toContain('ant-input-number-borderless');
  });

  it('should be set keyboard', () => {
    upStepByKeyboard();
    expect(component.value).toBe(1);
    downStepByKeyboard();
    expect(component.value).toBe(0);

    component.keyboard = false;
    fixture.detectChanges();
    upStepByKeyboard();
    expect(component.value).toBe(0);
  });

  it('should be hide controls', () => {
    component.controls = false;
    fixture.detectChanges();
    expect(hostElement.querySelector('.ant-input-number-handler-wrap')).toBeNull();
  });

  function upStepByHandler(eventInit?: MouseEventInit): void {
    const handler = hostElement.querySelector('.ant-input-number-handler-up')!;
    handler.dispatchEvent(new MouseEvent('mousedown', eventInit));
    handler.dispatchEvent(new MouseEvent('mouseup'));
  }
  function downStepByHandler(eventInit?: MouseEventInit): void {
    const handler = hostElement.querySelector('.ant-input-number-handler-down')!;
    handler.dispatchEvent(new MouseEvent('mousedown', eventInit));
    handler.dispatchEvent(new MouseEvent('mouseup'));
  }

  function upStepByKeyboard(): void {
    hostElement.dispatchEvent(new KeyboardEvent('keydown', { keyCode: UP_ARROW }));
  }
  function downStepByKeyboard(): void {
    hostElement.dispatchEvent(new KeyboardEvent('keydown', { keyCode: DOWN_ARROW }));
  }
  function enter(): void {
    hostElement.dispatchEvent(new KeyboardEvent('keydown', { keyCode: ENTER }));
  }

  function getInputElement(): HTMLInputElement {
    return fixture.nativeElement.querySelector('input')!;
  }
  function input(text: string): void {
    const element = getInputElement();
    element.value = text;
    element.dispatchEvent(new Event('input'));
  }
  function blur(): void {
    getInputElement().dispatchEvent(new Event('blur'));
  }
});

describe('Input number with affixes or addons', () => {
  let component: InputNumberWithAffixesAndAddonsTestComponent;
  let fixture: ComponentFixture<InputNumberWithAffixesAndAddonsTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideNzIconsTesting()]
    });
    fixture = TestBed.createComponent(InputNumberWithAffixesAndAddonsTestComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
  });

  it('should be apply affix classes', () => {
    expect(component.withAffixes().nativeElement.classList).toContain('ant-input-number-affix-wrapper');
  });

  it('should be apply addon classes', () => {
    expect(component.withAddons().nativeElement.classList).toContain('ant-input-number-group-wrapper');
  });

  it('should be apply mix classes', () => {
    expect(component.withMix().nativeElement.classList).toContain('ant-input-number-group-wrapper');
    expect(component.withMix().nativeElement.querySelector('.ant-input-number-affix-wrapper')).toBeTruthy();
  });

  it('should be apply disabled class', () => {
    component.disabled = true;
    fixture.detectChanges();
    expect(component.withAffixes().nativeElement.classList).toContain('ant-input-number-affix-wrapper-disabled');
  });

  it('should be apply readonly class', () => {
    component.readonly = true;
    fixture.detectChanges();
    expect(component.withAffixes().nativeElement.classList).toContain('ant-input-number-affix-wrapper-readonly');
  });

  it('should be apply borderless class', () => {
    component.bordered = false;
    fixture.detectChanges();
    expect(component.withAffixes().nativeElement.classList).toContain('ant-input-number-affix-wrapper-borderless');
  });
});

@Component({
  imports: [NzInputNumberModule, FormsModule],
  template: `
    <nz-input-number
      [nzId]="id"
      [nzSize]="size"
      [nzPlaceHolder]="placeholder"
      [nzStatus]="status"
      [nzStep]="step"
      [nzMin]="min"
      [nzMax]="max"
      [nzPrecision]="precision"
      [nzDisabled]="disabled"
      [nzReadOnly]="readonly"
      [nzBordered]="bordered"
      [nzKeyboard]="keyboard"
      [nzControls]="controls"
      [nzParser]="parser"
      [nzFormatter]="formatter"
      [(ngModel)]="value"
      [disabled]="controlDisabled"
    />
  `
})
class InputNumberTestComponent {
  id: string | null = null;
  size: NzSizeLDSType = 'default';
  placeholder: string | null = null;
  status: NzStatus = '';
  step = 1;
  min = Number.MIN_SAFE_INTEGER;
  max = Number.MAX_SAFE_INTEGER;
  precision: null | number = null;
  disabled = false;
  readonly = false;
  bordered = true;
  keyboard = true;
  controls = true;
  parser: ((value: string) => number) | undefined = undefined;
  formatter: ((value: number) => string) | undefined = undefined;

  value: number | null = null;
  controlDisabled = false;
  inputNumber = viewChild.required(NzInputNumberComponent);
}

@Component({
  imports: [NzInputNumberModule],
  template: `
    <nz-input-number #withAffixes [nzDisabled]="disabled" [nzReadOnly]="readonly" [nzBordered]="bordered">
      <span nzInputPrefix>Prefix</span>
      <span nzInputSuffix>Suffix</span>
    </nz-input-number>

    <nz-input-number #withAddons [nzDisabled]="disabled" [nzReadOnly]="readonly" [nzBordered]="bordered">
      <span nzInputAddonBefore>Before</span>
      <span nzInputAddonAfter>After</span>
    </nz-input-number>

    <nz-input-number #withMix [nzDisabled]="disabled" [nzReadOnly]="readonly" [nzBordered]="bordered">
      <span nzInputPrefix>Prefix</span>
      <span nzInputSuffix>Suffix</span>
      <span nzInputAddonBefore>Before</span>
      <span nzInputAddonAfter>After</span>
    </nz-input-number>
  `
})
class InputNumberWithAffixesAndAddonsTestComponent {
  disabled = false;
  readonly = false;
  bordered = true;

  withAffixes = viewChild.required('withAffixes', { read: ElementRef });
  withAddons = viewChild.required('withAddons', { read: ElementRef });
  withMix = viewChild.required('withMix', { read: ElementRef });
}
