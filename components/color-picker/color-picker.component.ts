/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef
} from '@angular/core';
import { ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { defaultColor, generateColor } from 'ng-antd-color-picker';

import { BooleanInput, NzSafeAny, NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { InputBoolean, isNonEmptyString, isTemplateRef } from 'ng-zorro-antd/core/util';

import { NzColor, NzColorPickerTriggerType, NzColorPickerFormatType } from './typings';

@Component({
  selector: 'nz-color-picker',
  exportAs: 'NzColorPicker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      [class.ant-color-picker-trigger]="!nzFlipFlop"
      [class.ant-color-picker-sm]="nzSize === 'small'"
      [class.ant-color-picker-lg]="nzSize === 'large'"
      nz-popover
      [nzPopoverContent]="colorPicker"
      [nzPopoverTrigger]="!nzDisabled ? nzTrigger : null"
      [nzPopoverVisible]="nzOpen"
      (nzPopoverVisibleChange)="nzOnOpenChange.emit($event)"
    >
      <ng-container *ngIf="!nzFlipFlop">
        <nz-color-block [nzColor]="blockColor" [nzSize]="nzSize"></nz-color-block>
      </ng-container>
      <ng-container *ngIf="nzFlipFlop">
        <ng-template [ngTemplateOutlet]="nzFlipFlop"></ng-template>
      </ng-container>
      <div class="ant-color-picker-trigger-text" *ngIf="nzShowText && !!showText && !nzFlipFlop">
        {{ showText }}
      </div>
    </div>
    <ng-template #colorPicker>
      <ng-antd-color-picker
        [value]="nzValue"
        [defaultValue]="nzDefaultValue"
        [disabled]="nzDisabled"
        [panelRenderHeader]="nzPanelRenderHeader"
        [panelRenderFooter]="nzPanelRenderFooter"
        (nzOnChange)="colorChange($event)"
      ></ng-antd-color-picker>
    </ng-template>
    <ng-template #nzPanelRenderHeader>
      <div class="ant-color-picker-title" *ngIf="nzAllowClear || nzTitle">
        <div class="ant-color-picker-title-content">
          <ng-container [ngSwitch]="true">
            <ng-container *ngSwitchCase="isTemplateRef(nzTitle)">
              <ng-container *ngTemplateOutlet="$any(nzTitle)"></ng-container>
            </ng-container>
            <ng-container *ngSwitchCase="isNonEmptyString(nzTitle)">
              <span [innerHTML]="nzTitle"></span>
            </ng-container>
          </ng-container>
        </div>
        <div class="ant-color-picker-clear" *ngIf="nzAllowClear" (click)="clearColorHandle()"></div>
      </div>
    </ng-template>
    <ng-template #nzPanelRenderFooter>
      <nz-color-format
        [colorValue]="blockColor"
        [clearColor]="clearColor"
        [format]="nzFormat"
        (formatChange)="formatChange($event)"
        (nzOnFormatChange)="nzOnFormatChange.emit($event)"
      ></nz-color-format>
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
export class NzColorPickerComponent implements OnInit, OnChanges, ControlValueAccessor, OnDestroy {
  static ngAcceptInputType_nzShowText: BooleanInput;
  static ngAcceptInputType_nzOpen: BooleanInput;
  static ngAcceptInputType_nzAllowClear: BooleanInput;
  static ngAcceptInputType_nzDisabled: BooleanInput;

  @Input() nzFormat: NzColorPickerFormatType | null = null;
  @Input() nzValue: string | NzColor = '';
  @Input() nzSize: NzSizeLDSType = 'default';
  @Input() nzDefaultValue: string | NzColor = '';
  @Input() nzTrigger: NzColorPickerTriggerType = 'click';
  @Input() nzTitle: TemplateRef<void> | string = '';
  @Input() nzFlipFlop: TemplateRef<void> | null = null;
  @Input() @InputBoolean() nzShowText: boolean = false;
  @Input() @InputBoolean() nzOpen: boolean = false;
  @Input() @InputBoolean() nzAllowClear: boolean = false;
  @Input() @InputBoolean() nzDisabled: boolean = false;
  @Output() readonly nzOnChange = new EventEmitter<{ color: NzColor; format: string }>();
  @Output() readonly nzOnFormatChange = new EventEmitter<NzColorPickerFormatType>();
  @Output() readonly nzOnClear = new EventEmitter<boolean>();
  @Output() readonly nzOnOpenChange = new EventEmitter<boolean>();

  protected readonly isTemplateRef = isTemplateRef;
  protected readonly isNonEmptyString = isNonEmptyString;
  private destroy$ = new Subject<void>();
  private isNzDisableFirstChange: boolean = true;
  blockColor: string = '';
  clearColor: boolean = false;
  showText: string = defaultColor.toHexString();

  constructor(private formBuilder: FormBuilder, private cdr: ChangeDetectorRef) {}

  formControl = this.formBuilder.control('');

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
    this.formControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(value => {
      if (!!value) {
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
    const { nzValue, nzDefaultValue } = changes;
    if (nzValue || nzDefaultValue) {
      this.getBlockColor();
    }
  }

  clearColorHandle(): void {
    this.clearColor = true;
    this.nzOnClear.emit(true);
    this.cdr.markForCheck();
  }

  getBlockColor(): void {
    if (!!this.nzValue) {
      this.blockColor = generateColor(this.nzValue).toRgbString();
    } else if (!!this.nzDefaultValue) {
      this.blockColor = generateColor(this.nzDefaultValue).toRgbString();
    } else {
      this.blockColor = defaultColor.toHexString();
    }
  }

  colorChange(value: { color: NzColor }): void {
    this.blockColor = value.color.getAlpha() < 1 ? value.color.toHex8String() : value.color.toHexString();
    this.clearColor = false;
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
