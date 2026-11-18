/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgTemplateOutlet } from '@angular/common';
import {
  booleanAttribute,
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
      [attr.id]="nzId"
      [class.ant-color-picker-trigger]="!nzFlipFlop"
      [class.ant-color-picker-sm]="finalSize() === 'small'"
      [class.ant-color-picker-lg]="finalSize() === 'large'"
      nz-popover
      [nzPopoverContent]="colorPicker"
      [nzPopoverPlacement]="popoverPlacements"
      [nzPopoverTrigger]="!nzDisabled ? nzTrigger : null"
      [nzPopoverVisible]="nzOpen"
      (nzPopoverVisibleChange)="nzOnOpenChange.emit($event)"
    >
      @if (nzFlipFlop) {
        <ng-template [ngTemplateOutlet]="nzFlipFlop" />
      } @else if (isCleared) {
        <div class="ant-color-picker-clear"></div>
      } @else {
        <nz-color-block [nzColor]="blockColor" [nzSize]="finalSize()" />
      }
      @if (nzShowText && !!showText && !nzFlipFlop && !isCleared) {
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
        [clearColor]="isCleared"
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

  @Input() nzId: string | null = null;
  @Input() nzFormat: NzColorPickerFormatType | null = null;
  @Input() nzValue: string | NzColor | null | undefined = '';
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
  protected readonly popoverPlacements = ['bottomLeft', 'bottomRight', 'topLeft', 'topRight'];
  blockColor: string = '';
  clearColor: boolean = false;
  showText: string = defaultColor.toHexString();
  formControl = this.formBuilder.control<string | null>('');
  private readonly size = signal(this.nzSize);

  protected readonly finalSize = computed(() => this.formSize?.() || this.size());

  /**
   * Whether the picker is in the cleared state: either the user cleared the color,
   * or the value is `null` or `undefined`.
   */
  get isCleared(): boolean {
    return this.clearColor || this.nzValue == null;
  }

  onChange: (value: string | null) => void = () => {};

  writeValue(value: string | null | undefined): void {
    this.nzValue = value ?? null;
    this.clearColor = false;
    this.getBlockColor();
    this.formControl.patchValue(this.nzValue);
    this.cdr.markForCheck();
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
        const color = this.nzFormat ? this.toFormatString(generateColor(value), this.nzFormat) : value;
        this.showText = color;
        this.onChange(color);
        this.cdr.markForCheck();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzValue, nzDefaultValue, nzSize } = changes;
    if (nzValue || nzDefaultValue) {
      // Keep the cleared state when the parent only echoes back the color emitted on clear
      // (with or without its alpha); any other incoming value ends the cleared state.
      if (
        this.clearColor &&
        nzValue?.currentValue != null &&
        generateColor(nzValue.currentValue).toHexString() !== generateColor(this.blockColor).toHexString()
      ) {
        this.clearColor = false;
      }
      this.getBlockColor();
    }
    if (nzSize) {
      this.size.set(nzSize.currentValue);
    }
  }

  clearColorHandle(): void {
    if (this.isCleared) {
      return;
    }
    const clearedColor = generateColor(this.blockColor).setAlpha(0);
    this.clearColor = true;
    this.blockColor = clearedColor.toHex8String();
    this.formControl.setValue(null, { emitEvent: false });
    this.nzOnClear.emit(true);
    this.nzOnChange.emit({ color: clearedColor, format: this.nzFormat ?? 'hex' });
    this.onChange(null);
    this.cdr.markForCheck();
  }

  /**
   * The color shown in the trigger and used to seed the panel. In the cleared state
   * the panel keeps the hue of the last color (or the default) at 0% alpha.
   */
  getBlockColor(): void {
    const color = generateColor(this.nzValue || this.nzDefaultValue || defaultColor);
    this.blockColor = this.isCleared ? generateColor({ ...color.toHsb(), a: 0 }).toHex8String() : color.toRgbString();
  }

  colorChange(value: { color: NzColor }): void {
    const color = this.restoreAlphaIfCleared(value.color);
    this.blockColor = color.getAlpha() < 1 ? color.toHex8String() : color.toHexString();
    this.nzValue = this.blockColor;
    this.clearColor = false;
    this.nzOnChange.emit({ color, format: this.nzFormat ?? 'hex' });
    this.cdr.markForCheck();
  }

  formatChange(value: { color: string; format: NzColorPickerFormatType }): void {
    const color = this.restoreAlphaIfCleared(generateColor(value.color));
    const colorString = this.toFormatString(color, value.format);
    this.nzValue = colorString;
    this.clearColor = false;
    this.getBlockColor();
    this.nzOnChange.emit({ color, format: value.format });
    this.formControl.patchValue(colorString);
    this.cdr.markForCheck();
  }

  private toFormatString(color: NzColor, format: NzColorPickerFormatType): string {
    switch (format) {
      case 'hsb':
        return color.toHsbString();
      case 'rgb':
        return color.toRgbString();
      default:
        return color.getAlpha() < 1 ? color.toHex8String() : color.toHexString();
    }
  }

  /**
   * The cleared color is fully transparent. When the user picks a color again, restore
   * the alpha to 100% so the selection is visible, as Ant Design does.
   */
  private restoreAlphaIfCleared(color: NzColor): NzColor {
    return this.isCleared ? generateColor({ ...color.toHsb(), a: 1 }) : color;
  }
}
