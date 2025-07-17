/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BACKSPACE, LEFT_ARROW, RIGHT_ARROW } from '@angular/cdk/keycodes';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  forwardRef,
  inject,
  Input,
  numberAttribute,
  OnChanges,
  QueryList,
  SimpleChanges,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  ControlValueAccessor,
  FormArray,
  FormBuilder,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { tap } from 'rxjs/operators';

import { NzSafeAny, NzSizeLDSType, NzStatus, OnTouchedType } from 'ng-zorro-antd/core/types';

import { NzInputDirective } from './input.directive';

@Component({
  selector: 'nz-input-otp',
  exportAs: 'nzInputOtp',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @for (item of otpArray.controls; track $index) {
      <input
        nz-input
        class="ant-otp-input"
        type="text"
        maxlength="1"
        size="1"
        [nzSize]="nzSize"
        [formControl]="item"
        [nzStatus]="nzStatus"
        (input)="onInput($index, $event)"
        (focus)="onFocus($event)"
        (keydown)="onKeyDown($index, $event)"
        (paste)="onPaste($index, $event)"
        #otpInput
      />
    }
  `,
  host: {
    class: 'ant-otp'
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NzInputOtpComponent),
      multi: true
    }
  ],
  imports: [NzInputDirective, ReactiveFormsModule]
})
export class NzInputOtpComponent implements ControlValueAccessor, OnChanges {
  private formBuilder = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);

  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;

  @Input({ transform: numberAttribute }) nzLength: number = 6;
  @Input() nzSize: NzSizeLDSType = 'default';
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input() nzStatus: NzStatus = '';
  @Input() nzFormatter: (value: string) => string = value => value;
  @Input() nzMask: string | null = null;

  protected otpArray!: FormArray<FormControl<string>>;
  private internalValue: string[] = [];
  private onChangeCallback?: (_: NzSafeAny) => void;
  onTouched: OnTouchedType = () => {};

  constructor() {
    this.createFormArray();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['nzLength']?.currentValue) {
      this.createFormArray();
    }

    if (changes['disabled']) {
      this.setDisabledState(this.disabled);
    }
  }

  onInput(index: number, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const nextInput = this.otpInputs.toArray()[index + 1];

    if (inputElement.value && nextInput) {
      nextInput.nativeElement.focus();
    } else if (!nextInput) {
      this.selectInputBox(index);
    }
  }

  onFocus(event: FocusEvent): void {
    const inputElement = event.target as HTMLInputElement;
    inputElement.select();
  }

  onKeyDown(index: number, event: KeyboardEvent): void {
    const previousInput = this.otpInputs.toArray()[index - 1];

    if (event.keyCode === BACKSPACE) {
      event.preventDefault();

      this.internalValue[index] = '';
      this.otpArray.at(index).setValue('', { emitEvent: false });

      if (previousInput) {
        this.selectInputBox(index - 1);
      }

      this.emitValue();
    } else if (event.keyCode === LEFT_ARROW) {
      event.preventDefault();
      this.selectInputBox(index - 1);
    } else if (event.keyCode === RIGHT_ARROW) {
      event.preventDefault();
      this.selectInputBox(index + 1);
    }
  }

  writeValue(value: string): void {
    if (!value) {
      this.otpArray.reset();
      return;
    }

    const controlValues = value.split('');
    this.internalValue = controlValues;

    controlValues.forEach((val, i) => {
      const formattedValue = this.nzFormatter(val);
      const value = this.nzMask ? this.nzMask : formattedValue;
      this.otpArray.at(i).setValue(value, { emitEvent: false });
    });
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.otpArray.disable();
    } else {
      this.otpArray.enable();
    }
  }

  onPaste(index: number, event: ClipboardEvent): void {
    const pastedText = event.clipboardData?.getData('text') || '';
    if (!pastedText) return;

    let currentIndex = index;
    for (const char of pastedText.split('')) {
      if (currentIndex < this.nzLength) {
        const formattedChar = this.nzFormatter(char);
        this.internalValue[currentIndex] = char;
        const maskedValue = this.nzMask ? this.nzMask : formattedChar;
        this.otpArray.at(currentIndex).setValue(maskedValue, { emitEvent: false });
        currentIndex++;
      } else {
        break;
      }
    }

    event.preventDefault(); // this line is needed, otherwise the last index that is going to be selected will also be filled (in the next line).
    this.selectInputBox(currentIndex);
    this.emitValue();
  }

  private createFormArray(): void {
    this.otpArray = this.formBuilder.array<FormControl<string>>([]);
    this.internalValue = new Array(this.nzLength).fill('');

    for (let i = 0; i < this.nzLength; i++) {
      const control = this.formBuilder.nonNullable.control('', [Validators.required]);

      control.valueChanges
        .pipe(
          tap(value => {
            const unmaskedValue = this.nzFormatter(value);
            this.internalValue[i] = unmaskedValue;

            control.setValue(this.nzMask ?? unmaskedValue, { emitEvent: false });

            this.emitValue();
          }),
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe();

      this.otpArray.push(control);
    }
  }

  private emitValue(): void {
    const result = this.internalValue.join('');
    if (this.onChangeCallback) {
      this.onChangeCallback(result);
    }
  }

  private selectInputBox(index: number): void {
    const otpInputArray = this.otpInputs.toArray();
    if (index <= 0) index = 0;
    if (index >= otpInputArray.length) index = otpInputArray.length - 1;

    otpInputArray[index].nativeElement.select();
  }
}
