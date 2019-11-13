/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CdkOverlayOrigin, ConnectionPositionPair } from '@angular/cdk/overlay';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import {
  isNotNil,
  slideMotion,
  InputBoolean,
  NzConfigService,
  NzUpdateHostClassService as UpdateCls,
  WithConfig
} from 'ng-zorro-antd/core';

const NZ_CONFIG_COMPONENT_NAME = 'timePicker';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nz-time-picker',
  exportAs: 'nzTimePicker',
  templateUrl: './nz-time-picker.component.html',
  animations: [slideMotion],
  providers: [UpdateCls, { provide: NG_VALUE_ACCESSOR, useExisting: NzTimePickerComponent, multi: true }]
})
export class NzTimePickerComponent implements ControlValueAccessor, OnInit, AfterViewInit, OnChanges {
  private _value: Date | null = null;
  private _onChange: (value: Date | null) => void;
  private _onTouched: () => void;
  isInit = false;
  origin: CdkOverlayOrigin;
  overlayPositions: ConnectionPositionPair[] = [
    {
      originX: 'start',
      originY: 'top',
      overlayX: 'end',
      overlayY: 'top',
      offsetX: 0,
      offsetY: 0
    }
  ];
  @ViewChild('inputElement', { static: true }) inputRef: ElementRef<HTMLInputElement>;
  @Input() nzSize: string | null = null;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME, 1) nzHourStep: number;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME, 1) nzMinuteStep: number;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME, 1) nzSecondStep: number;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME, 'clear') nzClearText: string;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME) nzPopupClassName: string;
  @Input() nzPlaceHolder = '';
  @Input() nzAddOn: TemplateRef<void>;
  @Input() nzDefaultOpenValue = new Date();
  @Input() nzDisabledHours: () => number[];
  @Input() nzDisabledMinutes: (hour: number) => number[];
  @Input() nzDisabledSeconds: (hour: number, minute: number) => number[];
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME, 'HH:mm:ss') nzFormat: string;
  @Input() nzOpen = false;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME, false) @InputBoolean() nzUse12Hours: boolean;
  @Output() readonly nzOpenChange = new EventEmitter<boolean>();

  @Input() @InputBoolean() nzHideDisabledOptions = false;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME, true) @InputBoolean() nzAllowEmpty: boolean;
  @Input() @InputBoolean() nzDisabled = false;
  @Input() @InputBoolean() nzAutoFocus = false;

  set value(value: Date | null) {
    this._value = value;
    if (this._onChange) {
      this._onChange(this.value);
    }
    if (this._onTouched) {
      this._onTouched();
    }
  }

  get value(): Date | null {
    return this._value;
  }

  open(): void {
    if (this.nzDisabled) {
      return;
    }
    this.nzOpen = true;
    this.nzOpenChange.emit(this.nzOpen);
  }

  close(): void {
    this.nzOpen = false;
    this.cdr.markForCheck();
    this.nzOpenChange.emit(this.nzOpen);
  }

  updateAutoFocus(): void {
    if (this.isInit && !this.nzDisabled) {
      if (this.nzAutoFocus) {
        this.renderer.setAttribute(this.inputRef.nativeElement, 'autofocus', 'autofocus');
      } else {
        this.renderer.removeAttribute(this.inputRef.nativeElement, 'autofocus');
      }
    }
  }

  onClickClearBtn(): void {
    this.value = null;
  }

  private setClassMap(): void {
    this.updateCls.updateHostClass(this.element.nativeElement, {
      [`ant-time-picker`]: true,
      [`ant-time-picker-${this.nzSize}`]: isNotNil(this.nzSize)
    });
  }

  focus(): void {
    if (this.inputRef.nativeElement) {
      this.inputRef.nativeElement.focus();
    }
  }

  blur(): void {
    if (this.inputRef.nativeElement) {
      this.inputRef.nativeElement.blur();
    }
  }

  constructor(
    public nzConfigService: NzConfigService,
    private element: ElementRef,
    private renderer: Renderer2,
    private updateCls: UpdateCls,
    public cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.setClassMap();
    this.origin = new CdkOverlayOrigin(this.element);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzUse12Hours, nzFormat, nzDisabled, nzAutoFocus } = changes;
    if (nzUse12Hours && !nzUse12Hours.previousValue && nzUse12Hours.currentValue && !nzFormat) {
      this.nzFormat = 'h:mm:ss a';
    }
    if (nzDisabled) {
      const value = nzDisabled.currentValue;
      const input = this.inputRef.nativeElement as HTMLInputElement;
      if (value) {
        this.renderer.setAttribute(input, 'disabled', '');
      } else {
        this.renderer.removeAttribute(input, 'disabled');
      }
    }
    if (nzAutoFocus) {
      this.updateAutoFocus();
    }
  }

  ngAfterViewInit(): void {
    this.isInit = true;
    this.updateAutoFocus();
  }

  writeValue(time: Date | null): void {
    this._value = time;
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (time: Date | null) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.nzDisabled = isDisabled;
    this.cdr.markForCheck();
  }
}
