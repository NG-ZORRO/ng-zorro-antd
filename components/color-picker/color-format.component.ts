/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  booleanAttribute,
  inject
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSelectModule } from 'ng-zorro-antd/select';

import { generateColor } from './src/util/util';
import { NzColorPickerFormatType, ValidFormKey } from './typings';

@Component({
  selector: 'nz-color-format',
  exportAs: 'nzColorFormat',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, NzSelectModule, NzInputModule, NzInputNumberModule],
  template: `
    <div class="ant-color-picker-input-container">
      <div class="ant-color-picker-format-select">
        <nz-select [formControl]="validateForm.controls.isFormat" nzBorderless nzSize="small">
          <nz-option nzValue="hex" nzLabel="HEX" />
          <nz-option nzValue="hsb" nzLabel="HSB" />
          <nz-option nzValue="rgb" nzLabel="RGB" />
        </nz-select>
      </div>

      <div class="ant-color-picker-input">
        @switch (validateForm.controls.isFormat.value) {
          @case ('hex') {
            <div class="ant-color-picker-hex-input">
              <nz-input-wrapper nzPrefix="#">
                <input nz-input nzSize="small" [formControl]="validateForm.controls.hex" />
              </nz-input-wrapper>
            </div>
          }
          @case ('hsb') {
            <div class="ant-color-picker-hsb-input">
              <div class="ant-color-picker-steppers ant-color-picker-hsb-input">
                <nz-input-number
                  [formControl]="validateForm.controls.hsbH"
                  [nzMin]="0"
                  [nzMax]="360"
                  [nzStep]="1"
                  [nzPrecision]="0"
                  nzSize="small"
                />
              </div>
              <div class="ant-color-picker-steppers ant-color-picker-hsb-input">
                <nz-input-number
                  [formControl]="validateForm.controls.hsbS"
                  [nzMin]="0"
                  [nzMax]="100"
                  [nzStep]="1"
                  [nzFormatter]="formatterPercent"
                  [nzParser]="parserPercent"
                  nzSize="small"
                />
              </div>
              <div class="ant-color-picker-steppers ant-color-picker-hsb-input">
                <nz-input-number
                  [formControl]="validateForm.controls.hsbB"
                  [nzMin]="0"
                  [nzMax]="100"
                  [nzStep]="1"
                  [nzFormatter]="formatterPercent"
                  [nzParser]="parserPercent"
                  nzSize="small"
                />
              </div>
            </div>
          }
          @default {
            <div class="ant-color-picker-rgb-input">
              <div class="ant-color-picker-steppers ant-color-picker-rgb-input">
                <nz-input-number
                  [formControl]="validateForm.controls.rgbR"
                  [nzMin]="0"
                  [nzMax]="255"
                  [nzStep]="1"
                  nzSize="small"
                />
              </div>
              <div class="ant-color-picker-steppers ant-color-picker-rgb-input">
                <nz-input-number
                  [formControl]="validateForm.controls.rgbG"
                  [nzMin]="0"
                  [nzMax]="255"
                  [nzStep]="1"
                  nzSize="small"
                />
              </div>
              <div class="ant-color-picker-steppers ant-color-picker-rgb-input">
                <nz-input-number
                  [formControl]="validateForm.controls.rgbB"
                  [nzMin]="0"
                  [nzMax]="255"
                  [nzStep]="1"
                  nzSize="small"
                />
              </div>
            </div>
          }
        }
      </div>

      @if (!nzDisabledAlpha) {
        <div class="ant-color-picker-steppers ant-color-picker-alpha-input">
          <nz-input-number
            [formControl]="validateForm.controls.roundA"
            [nzMin]="0"
            [nzMax]="100"
            [nzStep]="1"
            [nzFormatter]="formatterPercent"
            [nzParser]="parserPercent"
            nzSize="small"
          />
        </div>
      }
    </div>
  `
})
export class NzColorFormatComponent implements OnChanges, OnInit {
  private destroyRef = inject(DestroyRef);
  private formBuilder = inject(FormBuilder);
  @Input() format: NzColorPickerFormatType | null = null;
  @Input() colorValue: string = '';
  @Input({ transform: booleanAttribute }) clearColor: boolean = false;
  @Input({ transform: booleanAttribute }) nzDisabledAlpha: boolean = false;
  @Output() readonly formatChange = new EventEmitter<{ color: string; format: NzColorPickerFormatType }>();
  @Output() readonly nzOnFormatChange = new EventEmitter<NzColorPickerFormatType>();

  validateForm: FormGroup<{
    isFormat: FormControl<NzColorPickerFormatType | null>;
    hex: FormControl<string | null>;
    hsbH: FormControl<number>;
    hsbS: FormControl<number>;
    hsbB: FormControl<number>;
    rgbR: FormControl<number>;
    rgbG: FormControl<number>;
    rgbB: FormControl<number>;
    roundA: FormControl<number>;
  }> = this.formBuilder.nonNullable.group({
    isFormat: this.formBuilder.control<NzColorPickerFormatType>('hex'),
    hex: this.formBuilder.control<string>('1677FF', hexValidator),
    hsbH: 215,
    hsbS: 91,
    hsbB: 100,
    rgbR: 22,
    rgbG: 119,
    rgbB: 255,
    roundA: 100
  });

  formatterPercent = (value: number): string => `${value} %`;
  parserPercent = (value: string): number => +value.replace(' %', '');

  ngOnInit(): void {
    this.validateForm.valueChanges
      .pipe(
        filter(() => this.validateForm.valid),
        debounceTime(200),
        distinctUntilChanged((prev, current) =>
          Object.keys(prev).every(key => prev[key as ValidFormKey] === current[key as ValidFormKey])
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(value => {
        let color = '';
        switch (value.isFormat) {
          case 'hsb':
            color = generateColor({
              h: Number(value.hsbH),
              s: Number(value.hsbS) / 100,
              b: Number(value.hsbB) / 100,
              a: Number(value.roundA) / 100
            }).toHsbString();
            break;
          case 'rgb':
            color = generateColor({
              r: Number(value.rgbR),
              g: Number(value.rgbG),
              b: Number(value.rgbB),
              a: Number(value.roundA) / 100
            }).toRgbString();
            break;
          default: {
            const hex = generateColor(value.hex as NzColorPickerFormatType);
            const hexColor = generateColor({
              r: hex.r,
              g: hex.g,
              b: hex.b,
              a: Number(value.roundA) / 100
            });
            color = hexColor.getAlpha() < 1 ? hexColor.toHex8String() : hexColor.toHexString();
            break;
          }
        }
        this.formatChange.emit({ color, format: value.isFormat || this.format || 'hex' });
      });

    this.validateForm
      .get('isFormat')
      ?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(value => {
        this.nzOnFormatChange.emit(value as NzColorPickerFormatType);
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { colorValue, format, clearColor } = changes;
    if (colorValue) {
      const colorValue = {
        hex: generateColor(this.colorValue).toHex(),
        hsbH: Math.round(generateColor(this.colorValue).toHsb().h),
        hsbS: Math.round(generateColor(this.colorValue).toHsb().s * 100),
        hsbB: Math.round(generateColor(this.colorValue).toHsb().b * 100),
        rgbR: Math.round(generateColor(this.colorValue).r),
        rgbG: Math.round(generateColor(this.colorValue).g),
        rgbB: Math.round(generateColor(this.colorValue).b),
        roundA: Math.round(generateColor(this.colorValue).roundA * 100)
      };
      this.validateForm.patchValue(colorValue);
    }

    if (format && this.format) {
      this.validateForm.get('isFormat')?.patchValue(this.format);
    }

    if (clearColor && this.clearColor) {
      this.validateForm.get('roundA')?.patchValue(0);
    }
  }
}

const hexValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const REGEXP = /^[0-9a-fA-F]{6}$/;
  if (!control.value) {
    return { error: true };
  } else if (!REGEXP.test(control.value)) {
    return { error: true };
  }
  return null;
};
