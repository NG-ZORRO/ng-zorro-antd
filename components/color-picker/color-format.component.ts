/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, filter, takeUntil } from 'rxjs/operators';

import { InputBoolean } from 'ng-zorro-antd/core/util';
import { NzInputDirective, NzInputGroupComponent } from 'ng-zorro-antd/input';
import { NzInputNumberComponent } from 'ng-zorro-antd/input-number';
import { NzSelectModule } from 'ng-zorro-antd/select';

import { generateColor } from './src/util/util';
import { NzColorPickerFormatType } from './typings';

@Component({
  selector: 'nz-color-format',
  exportAs: 'NzColorFormat',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ReactiveFormsModule, NzSelectModule, NzInputDirective, NzInputGroupComponent, NzInputNumberComponent],
  template: `
    <div [formGroup]="validateForm" class="ant-color-picker-input-container">
      <div class="ant-color-picker-format-select">
        <nz-select formControlName="isFormat" nzBorderless nzSize="small">
          <nz-option nzValue="hex" nzLabel="HEX" />
          <nz-option nzValue="hsb" nzLabel="HSB" />
          <nz-option nzValue="rgb" nzLabel="RGB" />
        </nz-select>
      </div>

      <div class="ant-color-picker-input">
        @switch (validateForm.controls.isFormat.value) {
          @case ('hex') {
            <div class="ant-color-picker-hex-input">
              <nz-input-group nzPrefix="#" nzSize="small">
                <input nz-input nzSize="small" formControlName="hex" />
              </nz-input-group>
            </div>
          }
          @case ('hsb') {
            <div class="ant-color-picker-hsb-input">
              <div class="ant-color-picker-steppers ant-color-picker-hsb-input">
                <nz-input-number
                  formControlName="hsbH"
                  [nzMin]="0"
                  [nzMax]="360"
                  [nzStep]="1"
                  [nzPrecision]="0"
                  nzSize="small"
                />
              </div>
              <div class="ant-color-picker-steppers ant-color-picker-hsb-input">
                <nz-input-number
                  formControlName="hsbS"
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
                  formControlName="hsbB"
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
                <nz-input-number formControlName="rgbR" [nzMin]="0" [nzMax]="255" [nzStep]="1" nzSize="small" />
              </div>
              <div class="ant-color-picker-steppers ant-color-picker-rgb-input">
                <nz-input-number formControlName="rgbG" [nzMin]="0" [nzMax]="255" [nzStep]="1" nzSize="small" />
              </div>
              <div class="ant-color-picker-steppers ant-color-picker-rgb-input">
                <nz-input-number formControlName="rgbB" [nzMin]="0" [nzMax]="255" [nzStep]="1" nzSize="small" />
              </div>
            </div>
          }
        }
      </div>

      @if (!nzDisabledAlpha) {
        <div class="ant-color-picker-steppers ant-color-picker-alpha-input">
          <nz-input-number
            formControlName="roundA"
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
export class NzColorFormatComponent implements OnChanges, OnInit, OnDestroy {
  @Input() format: NzColorPickerFormatType | null = null;
  @Input() colorValue: string = '';
  @Input() clearColor: boolean = false;
  @Input() @InputBoolean() nzDisabledAlpha: boolean = false;
  @Output() readonly formatChange = new EventEmitter<{ color: string; format: NzColorPickerFormatType }>();
  @Output() readonly nzOnFormatChange = new EventEmitter<NzColorPickerFormatType>();

  private destroy$ = new Subject<void>();

  validatorFn(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const REGEXP = /^[0-9a-fA-F]{6}$/;
      if (!control.value) {
        return { error: true };
      } else if (!REGEXP.test(control.value)) {
        return { error: true };
      }
      return null;
    };
  }

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
  }>;

  formatterPercent = (value: number): string => `${value} %`;
  parserPercent = (value: string): string => value.replace(' %', '');

  constructor(private formBuilder: FormBuilder) {
    this.validateForm = this.formBuilder.nonNullable.group({
      isFormat: this.formBuilder.control<NzColorPickerFormatType>('hex'),
      hex: this.formBuilder.control<string>('1677FF', this.validatorFn()),
      hsbH: 215,
      hsbS: 91,
      hsbB: 100,
      rgbR: 22,
      rgbG: 119,
      rgbB: 255,
      roundA: 100
    });
  }

  ngOnInit(): void {
    this.validateForm.valueChanges
      .pipe(
        filter(() => this.validateForm.valid),
        debounceTime(200),
        takeUntil(this.destroy$)
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
          default:
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
        this.formatChange.emit({ color, format: value.isFormat || this.format || 'hex' });
      });

    this.validateForm
      .get('isFormat')
      ?.valueChanges.pipe(takeUntil(this.destroy$))
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
