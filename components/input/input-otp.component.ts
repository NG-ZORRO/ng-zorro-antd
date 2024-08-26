/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { KeyValuePipe, NgForOf } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnChanges,
  QueryList,
  SimpleChanges,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { takeUntil, tap } from 'rxjs/operators';

import { NzDestroyService } from 'ng-zorro-antd/core/services';
import { NzSafeAny, NzSizeLDSType, NzStatus, OnTouchedType } from 'ng-zorro-antd/core/types';
import { NzInputDirective } from 'ng-zorro-antd/input/input.directive';

@Component({
  selector: 'nz-input-otp',
  exportAs: 'nzInputOtp',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="ant-otp">
      @for (item of (!nzMask ? formGroup.controls : maskFormGroup.controls) | keyvalue; track $index) {
        <input
          nz-input
          class="ant-otp-input"
          type="text"
          maxlength="1"
          size="1"
          [nzSize]="nzSize"
          [formControl]="$any(item.value)"
          [nzStatus]="nzStatus"
          (input)="onInput($index, $event)"
          (focus)="onFocus($event)"
          (keydown)="onKeyDown($index, $event)"
          (paste)="onPaste($index, $event)"
          #otpInput
        />
      }
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NzInputOtpComponent),
      multi: true
    },
    NzDestroyService
  ],
  imports: [FormsModule, NgForOf, NzInputDirective, KeyValuePipe, ReactiveFormsModule],
  standalone: true
})
export class NzInputOtpComponent implements ControlValueAccessor, OnChanges {
  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;

  log(a: NzSafeAny): void {
    console.log(a);
  }

  @Input() nzLength: number = 6;
  @Input() nzSize: NzSizeLDSType = 'default';
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input() nzStatus: NzStatus = '';
  @Input() nzFormatter: (value: string) => string = value => value;
  @Input() nzMask: string | null = null;
  formGroup!: FormGroup;
  maskFormGroup!: FormGroup;

  private onChangeCallback?: (_: NzSafeAny) => void;
  onTouched: OnTouchedType = () => {};

  public constructor(
    private readonly formBuilder: FormBuilder,
    private readonly nzDestroyService: NzDestroyService
  ) {
    this.createFormGroup();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['nzLength']?.currentValue && changes['nzLength'].currentValue !== changes['nzLength'].previousValue) {
      this.createFormGroup();
    }

    if (changes['nzMask']?.currentValue && changes['nzMask'].currentValue !== changes['nzMask'].previousValue) {
      this.createFormGroup();
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

    if (event.key === 'Backspace' && previousInput) {
      event.preventDefault();
      if (!this.nzMask) this.formGroup.controls[index].patchValue('');
      else this.maskFormGroup.controls[index].patchValue('');
      this.selectInputBox(index - 1);
    }
  }

  writeValue(value: string): void {
    if (!value) return;

    const controlValues = value.split('');
    for (let i = 0; i < controlValues.length; i++) {
      const val = this.nzFormatter(controlValues[i]);
      this.formGroup?.patchValue({ [i.toString()]: val });
      if (this.nzMask) this.maskFormGroup?.patchValue({ [i.toString()]: this.nzMask }, { emitEvent: false });
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.formGroup.disable();
    } else {
      this.formGroup.enable();
    }
  }

  onPaste(index: number, event: ClipboardEvent): void {
    const pastedText = event.clipboardData?.getData('text') || '';
    if (!pastedText) return;

    let currentIndex = index;
    for (const char of pastedText.split('')) {
      if (currentIndex < this.nzLength) {
        const formattedChar = this.nzFormatter(char);
        if (!this.nzMask)
          this.formGroup.controls[currentIndex.toString()].setValue(formattedChar, { emitEvent: false });
        else this.maskFormGroup.controls[currentIndex.toString()].setValue(formattedChar);
        currentIndex++;
      } else {
        break;
      }
    }

    event.preventDefault(); // this line is needed, otherwise the last index that is going to be selected(next line) will also be filled.
    this.selectInputBox(currentIndex);
  }

  private createFormGroup(): void {
    this.formGroup = new FormGroup({});
    this.maskFormGroup = new FormGroup({});

    for (let i = 0; i < this.nzLength; i++) {
      this.formGroup.addControl(i.toString(), this.formBuilder.nonNullable.control('', [Validators.required]));

      if (this.nzMask) {
        const control = this.formBuilder.nonNullable.control('', [Validators.required]);
        this.maskFormGroup.addControl(i.toString(), control);
        control.valueChanges
          .pipe(
            tap(value => {
              this.formGroup.controls[i].patchValue(value);
              control.patchValue(value ? this.nzMask! : '', { emitEvent: false });
            }),
            takeUntil(this.nzDestroyService)
          )
          .subscribe();
      }
    }

    this.formGroup.valueChanges
      .pipe(
        tap(() => {
          let result = '';
          for (const controlName in this.formGroup?.controls) {
            const control = this.formGroup.controls[controlName];
            const formatted = this.nzFormatter(control.value);

            result += formatted;
            control.patchValue(formatted, { emitEvent: false });
          }

          if (this.onChangeCallback) {
            this.onChangeCallback(result);
          }
        }),
        takeUntil(this.nzDestroyService)
      )
      .subscribe();
  }

  private selectInputBox(index: number): void {
    if (index >= this.otpInputs.toArray().length) index = this.otpInputs.toArray().length - 1;

    this.otpInputs.toArray()[index].nativeElement.select();
  }
}
