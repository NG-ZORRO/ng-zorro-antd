/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgTemplateOutlet } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  DestroyRef,
  EventEmitter,
  forwardRef,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  signal,
  SimpleChanges,
  TemplateRef
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';

import { NZ_FORM_SIZE } from 'ng-zorro-antd/core/form';
import { NzStringTemplateOutletDirective } from 'ng-zorro-antd/core/outlet';
import { NzSafeAny, NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { NzPopoverDirective } from 'ng-zorro-antd/popover';

import { NzColorBlockComponent } from './color-block.component';
import { NzColorFormatComponent } from './color-format.component';
import { NgAntdColorPickerModule } from './src/ng-antd-color-picker.module';
import { defaultColor, generateColor } from './src/util/util';
import { NzColor, NzColorPickerFormatType, NzColorPickerTriggerType, NzPresetColor } from './typings';

@Component({
  selector: 'nz-color-picker',
  exportAs: 'nzColorPicker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgAntdColorPickerModule,
    NzPopoverDirective,
    NzColorBlockComponent,
    NzColorFormatComponent,
    NgTemplateOutlet,
    NzStringTemplateOutletDirective
  ],
  template: `
    <div
      [class.ant-color-picker-trigger]="!nzFlipFlop"
      [class.ant-color-picker-sm]="finalSize() === 'small'"
      [class.ant-color-picker-lg]="finalSize() === 'large'"
      nz-popover
      [nzPopoverContent]="colorPicker"
      [nzPopoverTrigger]="!nzDisabled ? nzTrigger : null"
      [nzPopoverVisible]="nzOpen"
      (nzPopoverVisibleChange)="nzOnOpenChange.emit($event)"
    >
      @if (!nzFlipFlop) {
        <nz-color-block [nzColor]="blockColor" [nzSize]="finalSize()" />
      } @else {
        <ng-template [ngTemplateOutlet]="nzFlipFlop" />
      }
      @if (nzShowText && !!showText && !nzFlipFlop) {
        <div class="ant-color-picker-trigger-text">
          {{ showText }}
        </div>
      }
    </div>
    <ng-template #colorPicker>
      <ng-antd-color-picker
        [value]="blockColor"
        [defaultValue]="nzDefaultValue"
        [disabled]="nzDisabled"
        [panelRenderHeader]="nzPanelRenderHeader"
        [panelRenderFooter]="nzPanelRenderFooter"
        [disabledAlpha]="nzDisabledAlpha"
        [presets]="nzPresets"
        (nzOnChange)="colorChange($event)"
      />
    </ng-template>
    <ng-template #nzPanelRenderHeader>
      @if (nzTitle || nzAllowClear) {
        <div class="ant-color-picker-title">
          <div class="ant-color-picker-title-content">
            <ng-template [nzStringTemplateOutlet]="nzTitle">{{ nzTitle }}</ng-template>
          </div>
          @if (nzAllowClear) {
            <div class="ant-color-picker-clear" (click)="clearColorHandle()"></div>
          }
        </div>
      }
    </ng-template>
    <ng-template #nzPanelRenderFooter>
      <nz-color-format
        [colorValue]="blockColor"
        [clearColor]="clearColor"
        [format]="nzFormat"
        [nzDisabledAlpha]="nzDisabledAlpha"
        (formatChange)="formatChange($event)"
        (nzOnFormatChange)="nzOnFormatChange.emit($event)"
      />
    </ng-template>
  `,
  host: {
    class: 'ant-color-picker-inline',
    '[class.ant-color-picker-disabled]': `nzDisabled`
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NzColorPickerComponent),
      multi: true
    }
  ]
})
export class NzColorPickerComponent implements OnInit, OnChanges, ControlValueAccessor {
  private cdr = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);
  private formBuilder = inject(FormBuilder);

  private readonly formSize = inject(NZ_FORM_SIZE, { optional: true });

  @Input() nzFormat: NzColorPickerFormatType | null = null;
  @Input() nzValue: string | NzColor = '';
  @Input() nzSize: NzSizeLDSType = 'default';
  @Input() nzDefaultValue: string | NzColor = '';
  @Input() nzTrigger: NzColorPickerTriggerType = 'click';
  @Input() nzTitle: TemplateRef<void> | string = '';
  @Input() nzFlipFlop: TemplateRef<void> | null = null;
  @Input({ transform: booleanAttribute }) nzShowText: boolean = false;
  @Input({ transform: booleanAttribute }) nzOpen: boolean = false;
  @Input({ transform: booleanAttribute }) nzAllowClear: boolean = false;
  @Input({ transform: booleanAttribute }) nzDisabled: boolean = false;
  @Input({ transform: booleanAttribute }) nzDisabledAlpha: boolean = false;
  @Input() nzPresets: NzPresetColor[] | null = null;
  @Output() readonly nzOnChange = new EventEmitter<{ color: NzColor; format: string }>();
  @Output() readonly nzOnFormatChange = new EventEmitter<NzColorPickerFormatType>();
  @Output() readonly nzOnClear = new EventEmitter<boolean>();
  @Output() readonly nzOnOpenChange = new EventEmitter<boolean>();

  private isNzDisableFirstChange: boolean = true;
  blockColor: string = '';
  clearColor: boolean = false;
  showText: string = defaultColor.toHexString();
  formControl = this.formBuilder.control('');
  private readonly size = signal(this.nzSize);

  protected readonly finalSize = computed(() => this.formSize?.() || this.size());

  onChange: (value: string) => void = () => {};

  writeValue(value: string): void {
    this.nzValue = value;
    this.getBlockColor();
    this.formControl.patchValue(value);
  }

  registerOnChange(fn: NzSafeAny): void {
    this.onChange = fn;
  }

  registerOnTouched(): void {}

  setDisabledState(isDisabled: boolean): void {
    this.nzDisabled = (this.isNzDisableFirstChange && this.nzDisabled) || isDisabled;
    this.isNzDisableFirstChange = false;
    this.cdr.markForCheck();
  }

  ngOnInit(): void {
    this.getBlockColor();
    this.formControl.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(value => {
      if (value) {
        let color = value;
        if (this.nzFormat === 'hex') {
          color =
            generateColor(value).getAlpha() < 1
              ? generateColor(value).toHex8String()
              : generateColor(value).toHexString();
        } else if (this.nzFormat === 'hsb') {
          color = generateColor(value).toHsbString();
        } else if (this.nzFormat === 'rgb') {
          color = generateColor(value).toRgbString();
        }
        this.showText = color;
        this.onChange(color);
        this.cdr.markForCheck();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzValue, nzDefaultValue, nzSize } = changes;
    if (nzValue || nzDefaultValue) {
      this.getBlockColor();
    }
    if (nzSize) {
      this.size.set(nzSize.currentValue);
    }
  }

  clearColorHandle(): void {
    this.clearColor = true;
    this.nzOnClear.emit(true);
    this.cdr.markForCheck();
  }

  getBlockColor(): void {
    if (this.nzValue) {
      this.blockColor = generateColor(this.nzValue).toRgbString();
    } else if (this.nzDefaultValue) {
      this.blockColor = generateColor(this.nzDefaultValue).toRgbString();
    } else {
      this.blockColor = defaultColor.toHexString();
    }
  }

  colorChange(value: { color: NzColor }): void {
    this.blockColor = value.color.getAlpha() < 1 ? value.color.toHex8String() : value.color.toHexString();
    this.clearColor = false;
    this.nzOnChange.emit({ color: value.color, format: this.nzFormat ?? 'hex' });
    this.cdr.markForCheck();
  }

  formatChange(value: { color: string; format: NzColorPickerFormatType }): void {
    this.nzValue = value.color;
    this.clearColor = false;
    this.getBlockColor();
    this.nzOnChange.emit({ color: generateColor(value.color), format: value.format });
    this.formControl.patchValue(value.color);
    this.cdr.markForCheck();
  }
}
