import { DOWN_ARROW, ENTER, TAB, UP_ARROW } from '@angular/cdk/keycodes';
import { ApplicationRef, Component, DebugElement, NgZone, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { take } from 'rxjs/operators';

import { createKeyboardEvent, createMouseEvent, dispatchEvent, dispatchFakeEvent } from 'ng-zorro-antd/core/testing';
import { NzStatus } from 'ng-zorro-antd/core/types';

import { NzInputNumberComponent } from './input-number.component';
import { NzInputNumberModule } from './input-number.module';

describe('input number', () => {
  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [NzInputNumberModule, FormsModule, ReactiveFormsModule],
      declarations: [
        NzTestInputNumberBasicComponent,
        NzTestInputNumberFormComponent,
        NzTestReadOnlyInputNumberBasicComponent,
        NzTestInputNumberStatusComponent
      ]
    });
    TestBed.compileComponents();
  }));
  describe('input number basic', () => {
    let fixture: ComponentFixture<NzTestInputNumberBasicComponent>;
    let testComponent: NzTestInputNumberBasicComponent;
    let inputNumber: DebugElement;
    let inputElement: HTMLInputElement;
    let upHandler: HTMLElement;
    let downHandler: HTMLElement;
    let upArrowEvent: KeyboardEvent;
    let downArrowEvent: KeyboardEvent;
    let upArrowCtrlEvent: KeyboardEvent;
    let downArrowCtrlEvent: KeyboardEvent;
    let upArrowMetaEvent: KeyboardEvent;
    let downArrowMetaEvent: KeyboardEvent;
    let upArrowShiftEvent: KeyboardEvent;
    let downArrowShiftEvent: KeyboardEvent;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestInputNumberBasicComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      inputNumber = fixture.debugElement.query(By.directive(NzInputNumberComponent));
      inputElement = inputNumber.nativeElement.querySelector('input');
      upArrowEvent = createKeyboardEvent('keydown', UP_ARROW, inputElement, 'ArrowUp');
      downArrowEvent = createKeyboardEvent('keydown', DOWN_ARROW, inputElement, 'ArrowDown');
      upArrowCtrlEvent = createKeyboardEvent('keydown', UP_ARROW, inputElement, 'ArrowUp', true);
      downArrowCtrlEvent = createKeyboardEvent('keydown', DOWN_ARROW, inputElement, 'ArrowDown', true);
      upArrowMetaEvent = createKeyboardEvent('keydown', UP_ARROW, inputElement, 'ArrowUp', false, true);
      downArrowMetaEvent = createKeyboardEvent('keydown', DOWN_ARROW, inputElement, 'ArrowDown', false, true);
      upArrowShiftEvent = createKeyboardEvent('keydown', UP_ARROW, inputElement, 'ArrowUp', false, false, true);
      downArrowShiftEvent = createKeyboardEvent('keydown', DOWN_ARROW, inputElement, 'ArrowDown', false, false, true);
      upHandler = inputNumber.nativeElement.querySelector('.ant-input-number-handler-up');
      downHandler = inputNumber.nativeElement.querySelector('.ant-input-number-handler-down');
    });
    it('should basic className correct', () => {
      fixture.detectChanges();
      expect(inputNumber.nativeElement.classList).toContain('ant-input-number');
      expect(inputElement.getAttribute('placeholder')).toBe('placeholder');
    });
    it('should focus className correct', fakeAsync(() => {
      fixture.detectChanges();
      expect(inputNumber.nativeElement.classList).toContain('ng-untouched');
      dispatchFakeEvent(inputElement, 'focus');
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(inputNumber.nativeElement.classList).toContain('ng-untouched');
      expect(inputNumber.nativeElement.classList).toContain('ant-input-number-focused');
      dispatchFakeEvent(inputElement, 'blur');
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(inputNumber.nativeElement.classList).not.toContain('ant-input-number-focused');
      expect(inputNumber.nativeElement.classList).toContain('ng-touched');
    }));
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
      testComponent.nzInputNumberComponent.nzAutoFocus = true;
      testComponent.nzInputNumberComponent.ngAfterViewInit();
      fixture.detectChanges();
      expect(inputElement === document.activeElement).toBe(true);
      expect(inputElement.attributes.getNamedItem('autofocus')!.name).toBe('autofocus');
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
      expect(testComponent.value).toBe('');
    });
    it('should NaN value work', () => {
      testComponent.nzInputNumberComponent.onModelChange('NaN');
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
      expect(testComponent.value).toBe(undefined);
      expect(inputElement.value).toBe('1.');
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
      expect(testComponent.value).toBe(1);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(1);
      testComponent.nzInputNumberComponent.onModelChange('0');
      fixture.detectChanges();
      expect(testComponent.value).toBe(0);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(2);
      expect(testComponent.value).toBe(0);
      testComponent.nzInputNumberComponent.onModelChange('-4');
      fixture.detectChanges();
      expect(testComponent.value).toBe(-1);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(3);
    });
    it('should auto precision work', () => {
      testComponent.precision = undefined;
      testComponent.max = 10;
      fixture.detectChanges();
      testComponent.nzInputNumberComponent.onModelChange('0.999999');
      expect(testComponent.value).toBe(0.999999);
      dispatchFakeEvent(upHandler, 'mousedown');
      fixture.detectChanges();
      expect(testComponent.value).toBe(1.999999);
      dispatchFakeEvent(downHandler, 'mousedown');
      fixture.detectChanges();
      expect(testComponent.value).toBe(0.999999);
      testComponent.nzInputNumberComponent.onModelChange('1e-10');
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
      expect(testComponent.value).toBe(0.99);
      testComponent.nzInputNumberComponent.onModelChange('0.993');
      fixture.detectChanges();
      expect(testComponent.value).toBe(0.99);
      testComponent.nzInputNumberComponent.onModelChange('0.999');
      fixture.detectChanges();
      expect(testComponent.value).toBe(1);
    });
    it('should nzPrecisionMode work', () => {
      testComponent.nzInputNumberComponent.onModelChange('0.999');
      fixture.detectChanges();
      expect(testComponent.value).toBe(1);

      testComponent.precisionMode = 'toFixed';
      testComponent.nzInputNumberComponent.onModelChange('0.991');
      fixture.detectChanges();
      expect(testComponent.value).toBe(0.99);
      testComponent.nzInputNumberComponent.onModelChange('0.999');
      fixture.detectChanges();
      expect(testComponent.value).toBe(1);
      testComponent.nzInputNumberComponent.onModelChange('1.0099');
      fixture.detectChanges();
      expect(testComponent.value).toBe(1);

      testComponent.precisionMode = 'cut';
      testComponent.nzInputNumberComponent.onModelChange('0.991');
      fixture.detectChanges();
      expect(testComponent.value).toBe(0.99);
      testComponent.nzInputNumberComponent.onModelChange('0.998');
      fixture.detectChanges();
      expect(testComponent.value).toBe(0.99);

      testComponent.precisionMode = value => +Number(value).toFixed(2);
      testComponent.nzInputNumberComponent.onModelChange('0.991');
      fixture.detectChanges();
      expect(testComponent.value).toBe(0.99);
      testComponent.nzInputNumberComponent.onModelChange('0.998');
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
      fixture.detectChanges();
      expect(testComponent.value).toBe(undefined);
      dispatchEvent(inputElement, upArrowCtrlEvent);
      fixture.detectChanges();
      expect(testComponent.value).toBe(0.1);
      dispatchEvent(inputElement, downArrowCtrlEvent);
      fixture.detectChanges();
      expect(testComponent.value).toBe(0);
      dispatchEvent(inputElement, downArrowCtrlEvent);
      fixture.detectChanges();
      expect(testComponent.value).toBe(-0.1);
    });
    it('should key up and down work with meta key', () => {
      fixture.detectChanges();
      expect(testComponent.value).toBe(undefined);
      dispatchEvent(inputElement, upArrowMetaEvent);
      fixture.detectChanges();
      expect(testComponent.value).toBe(0.1);
      dispatchEvent(inputElement, downArrowMetaEvent);
      fixture.detectChanges();
      expect(testComponent.value).toBe(0);
      dispatchEvent(inputElement, downArrowMetaEvent);
      fixture.detectChanges();
      expect(testComponent.value).toBe(-0.1);
    });
    it('should key up and down work with shift key', () => {
      testComponent.max = 100;
      testComponent.min = -100;
      fixture.detectChanges();
      expect(testComponent.value).toBe(undefined);
      dispatchEvent(inputElement, upArrowShiftEvent);
      dispatchFakeEvent(inputElement, 'keyup');
      fixture.detectChanges();
      expect(testComponent.value).toBe(10);
      dispatchEvent(inputElement, downArrowShiftEvent);
      fixture.detectChanges();
      expect(testComponent.value).toBe(0);
      dispatchEvent(inputElement, downArrowShiftEvent);
      fixture.detectChanges();
      expect(testComponent.value).toBe(-10);
    });
    it('should update value immediately after formatter changed', () => {
      const newFormatter = (v: number): string => `${v} %`;
      const initValue = 1;
      const component = testComponent.nzInputNumberComponent;
      fixture.detectChanges();
      component.onModelChange(`${initValue}`);
      fixture.detectChanges();
      testComponent.formatter = newFormatter;
      fixture.detectChanges();
      expect(inputElement.value).toBe(newFormatter(initValue));
    });
    // #1449
    it('should up and down focus input', () => {
      dispatchFakeEvent(upHandler, 'mousedown');
      fixture.detectChanges();
      expect(inputNumber.nativeElement.classList).toContain('ant-input-number-focused');
      dispatchFakeEvent(inputElement, 'blur');
      fixture.detectChanges();
      expect(inputNumber.nativeElement.classList).not.toContain('ant-input-number-focused');
      dispatchFakeEvent(downHandler, 'mousedown');
      fixture.detectChanges();
      expect(inputNumber.nativeElement.classList).toContain('ant-input-number-focused');
      dispatchFakeEvent(inputElement, 'blur');
      fixture.detectChanges();
      expect(inputNumber.nativeElement.classList).not.toContain('ant-input-number-focused');
    });
    describe('change detection behavior', () => {
      it('should not run change detection on keyup and keydown events', done => {
        const ngZone = TestBed.inject(NgZone);
        const appRef = TestBed.inject(ApplicationRef);
        spyOn(appRef, 'tick');
        spyOn(inputNumber.componentInstance, 'stop').and.callThrough();

        inputElement.dispatchEvent(new KeyboardEvent('keyup'));
        expect(appRef.tick).toHaveBeenCalledTimes(0);
        expect(inputNumber.componentInstance.stop).toHaveBeenCalled();

        inputElement.dispatchEvent(
          new KeyboardEvent('keydown', {
            keyCode: TAB
          })
        );
        expect(appRef.tick).toHaveBeenCalledTimes(0);

        inputElement.dispatchEvent(
          new KeyboardEvent('keydown', {
            keyCode: ENTER
          })
        );

        ngZone.onMicrotaskEmpty.pipe(take(1)).subscribe(() => {
          expect(appRef.tick).toHaveBeenCalledTimes(1);
          done();
        });
      });
      it('should not run change detection when `mouseup` and `mouseleave` events are dispatched on handlers', () => {
        const appRef = TestBed.inject(ApplicationRef);
        spyOn(appRef, 'tick');
        spyOn(inputNumber.componentInstance, 'stop').and.callThrough();

        const mouseupEvent = createMouseEvent('mouseup');
        const mouseleaveEvent = createMouseEvent('mouseleave');

        upHandler.dispatchEvent(mouseupEvent);
        upHandler.dispatchEvent(mouseleaveEvent);

        downHandler.dispatchEvent(mouseupEvent);
        downHandler.dispatchEvent(mouseleaveEvent);

        expect(appRef.tick).not.toHaveBeenCalled();
        // We have dispatched 4 events that are followed by calling `stop()`.
        expect(inputNumber.componentInstance.stop).toHaveBeenCalledTimes(4);
      });
    });
  });

  describe('input number form', () => {
    let fixture: ComponentFixture<NzTestInputNumberFormComponent>;
    let testComponent: NzTestInputNumberFormComponent;
    let inputNumber: DebugElement;
    let upHandler: HTMLElement;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(NzTestInputNumberFormComponent);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      inputNumber = fixture.debugElement.query(By.directive(NzInputNumberComponent));
      upHandler = inputNumber.nativeElement.querySelector('.ant-input-number-handler-up');
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
      expect(testComponent.formGroup.get('inputNumber')!.value).toBe(1);
      dispatchFakeEvent(upHandler, 'mousedown');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(testComponent.formGroup.get('inputNumber')!.value).toBe(10);
      testComponent.disable();
      dispatchFakeEvent(upHandler, 'mousedown');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(testComponent.formGroup.get('inputNumber')!.value).toBe(10);
    }));
  });
  describe('input number readOnly', () => {
    let fixture: ComponentFixture<NzTestReadOnlyInputNumberBasicComponent>;
    let testComponent: NzTestReadOnlyInputNumberBasicComponent;
    let inputNumber: DebugElement;
    let inputElement: HTMLInputElement;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(NzTestReadOnlyInputNumberBasicComponent);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;

      inputNumber = fixture.debugElement.query(By.directive(NzInputNumberComponent));
      inputElement = inputNumber.nativeElement.querySelector('input');
    }));
    it('should readOnly work', () => {
      fixture.detectChanges();
      testComponent.readonly = true;
      testComponent.nzInputNumberComponent.nzReadOnly = true;
      testComponent.nzInputNumberComponent.ngAfterViewInit();
      fixture.detectChanges();
      expect(inputElement.attributes.getNamedItem('readOnly')!.name).toBe('readonly');
      testComponent.readonly = false;
      fixture.detectChanges();
      expect(inputElement.attributes.getNamedItem('readOnly')).toBe(null);
    });
  });

  describe('input number status', () => {
    let fixture: ComponentFixture<NzTestInputNumberStatusComponent>;
    let testComponent: NzTestInputNumberStatusComponent;
    let inputNumber: DebugElement;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(NzTestInputNumberStatusComponent);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;

      inputNumber = fixture.debugElement.query(By.directive(NzInputNumberComponent));
    }));
    it('should status work', () => {
      fixture.detectChanges();
      expect(inputNumber.nativeElement.className).toContain('ant-input-number-status-error');

      testComponent.status = 'warning';
      fixture.detectChanges();
      expect(inputNumber.nativeElement.className).toContain('ant-input-number-status-warning');

      testComponent.status = '';
      fixture.detectChanges();
      expect(inputNumber.nativeElement.className).not.toContain('ant-input-number-status-warning');
    });
  });
});

@Component({
  template: `
    <nz-input-number
      [(ngModel)]="value"
      (ngModelChange)="modelChange($event)"
      [nzDisabled]="disabled"
      [nzAutoFocus]="autofocus"
      [nzSize]="size"
      [nzMin]="min"
      [nzMax]="max"
      [nzPlaceHolder]="placeholder"
      [nzStep]="step"
      [nzFormatter]="formatter"
      [nzParser]="parser"
      [nzPrecision]="precision"
      [nzPrecisionMode]="precisionMode"
    ></nz-input-number>
  `
})
export class NzTestInputNumberBasicComponent {
  @ViewChild(NzInputNumberComponent, { static: false }) nzInputNumberComponent!: NzInputNumberComponent;
  value?: number | string;
  autofocus = false;
  disabled = false;
  min = -1;
  max = 1;
  size = 'default';
  placeholder = 'placeholder';
  step = 1;
  precision?: number = 2;
  precisionMode?: 'cut' | 'toFixed' | ((value: number | string, precision?: number) => number);
  formatter = (value: number): string => (value !== null ? `${value}` : '');
  parser = (value: number): number => value;
  modelChange = jasmine.createSpy('change callback');
}

@Component({
  template: ` <nz-input-number [nzReadOnly]="readonly"></nz-input-number> `
})
export class NzTestReadOnlyInputNumberBasicComponent {
  @ViewChild(NzInputNumberComponent, { static: false }) nzInputNumberComponent!: NzInputNumberComponent;
  readonly = false;
}

@Component({
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
      inputNumber: [1]
    });
  }

  disable(): void {
    this.formGroup.disable();
  }
}

@Component({
  template: ` <nz-input-number [nzStatus]="status"></nz-input-number> `
})
export class NzTestInputNumberStatusComponent {
  status: NzStatus = 'error';
}
