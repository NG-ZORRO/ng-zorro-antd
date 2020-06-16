/**
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
import { slideMotion } from 'ng-zorro-antd/core/animation';

import { NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { warn } from 'ng-zorro-antd/core/logger';
import { BooleanInput, NzSafeAny } from 'ng-zorro-antd/core/types';
import { InputBoolean, isNil } from 'ng-zorro-antd/core/util';

const NZ_CONFIG_COMPONENT_NAME = 'timePicker';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nz-time-picker',
  exportAs: 'nzTimePicker',
  template: `
    <div class="ant-picker-input">
      <input
        #inputElement
        type="text"
        [size]="inputSize"
        [nzTime]="nzFormat"
        [placeholder]="nzPlaceHolder || ('TimePicker.placeholder' | nzI18n)"
        [(ngModel)]="value"
        [disabled]="nzDisabled"
        (focus)="onFocus(true)"
        (blur)="onFocus(false)"
      />
      <span class="ant-picker-suffix">
        <ng-container *nzStringTemplateOutlet="nzSuffixIcon; let suffixIcon">
          <i nz-icon [nzType]="suffixIcon"></i>
        </ng-container>
      </span>
      <span *ngIf="nzAllowEmpty && value" class="ant-picker-clear" (click)="onClickClearBtn($event)">
        <i nz-icon nzType="close-circle" nzTheme="fill" [attr.aria-label]="nzClearText" [attr.title]="nzClearText"></i>
      </span>
    </div>

    <ng-template
      cdkConnectedOverlay
      nzConnectedOverlay
      cdkConnectedOverlayHasBackdrop
      [cdkConnectedOverlayPositions]="overlayPositions"
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayOpen]="nzOpen"
      [cdkConnectedOverlayOffsetY]="-2"
      [cdkConnectedOverlayTransformOriginOn]="'.ant-picker-dropdown'"
      (detach)="close()"
      (backdropClick)="close()"
    >
      <div [@slideMotion]="'enter'" class="ant-picker-dropdown">
        <div class="ant-picker-panel-container">
          <div tabindex="-1" class="ant-picker-panel">
            <nz-time-picker-panel
              [ngClass]="nzPopupClassName"
              [format]="nzFormat"
              [nzHourStep]="nzHourStep"
              [nzMinuteStep]="nzMinuteStep"
              [nzSecondStep]="nzSecondStep"
              [nzDisabledHours]="nzDisabledHours"
              [nzDisabledMinutes]="nzDisabledMinutes"
              [nzDisabledSeconds]="nzDisabledSeconds"
              [nzPlaceHolder]="nzPlaceHolder || ('TimePicker.placeholder' | nzI18n)"
              [nzHideDisabledOptions]="nzHideDisabledOptions"
              [nzUse12Hours]="nzUse12Hours"
              [nzDefaultOpenValue]="nzDefaultOpenValue"
              [nzAddOn]="nzAddOn"
              [nzClearText]="nzClearText"
              [nzAllowEmpty]="nzAllowEmpty"
              [(ngModel)]="value"
              (ngModelChange)="setValue($event)"
              (closePanel)="close()"
            >
            </nz-time-picker-panel>
          </div>
        </div>
      </div>
    </ng-template>
  `,
  host: {
    '[class.ant-picker]': `true`,
    '[class.ant-picker-large]': `nzSize === 'large'`,
    '[class.ant-picker-small]': `nzSize === 'small'`,
    '[class.ant-picker-disabled]': `nzDisabled`,
    '[class.ant-picker-focused]': `focused`,
    '(click)': 'open()'
  },
  animations: [slideMotion],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: NzTimePickerComponent, multi: true }]
})
export class NzTimePickerComponent implements ControlValueAccessor, OnInit, AfterViewInit, OnChanges {
  static ngAcceptInputType_nzUse12Hours: BooleanInput;
  static ngAcceptInputType_nzHideDisabledOptions: BooleanInput;
  static ngAcceptInputType_nzAllowEmpty: BooleanInput;
  static ngAcceptInputType_nzDisabled: BooleanInput;
  static ngAcceptInputType_nzAutoFocus: BooleanInput;

  private _onChange?: (value: Date | null) => void;
  private _onTouched?: () => void;
  isInit = false;
  focused = false;
  value: Date | null = null;
  origin!: CdkOverlayOrigin;
  inputSize?: number;
  overlayPositions: ConnectionPositionPair[] = [
    {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'top',
      offsetY: 3
    }
  ];

  @ViewChild('inputElement', { static: true }) inputRef!: ElementRef<HTMLInputElement>;
  @Input() nzSize: string | null = null;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME) nzHourStep: number = 1;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME) nzMinuteStep: number = 1;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME) nzSecondStep: number = 1;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME) nzClearText: string = 'clear';
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME) nzPopupClassName: string = '';
  @Input() nzPlaceHolder = '';
  @Input() nzAddOn?: TemplateRef<void>;
  @Input() nzDefaultOpenValue?: Date;
  @Input() nzDisabledHours?: () => number[];
  @Input() nzDisabledMinutes?: (hour: number) => number[];
  @Input() nzDisabledSeconds?: (hour: number, minute: number) => number[];
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME) nzFormat: string = 'HH:mm:ss';
  @Input() nzOpen = false;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME) @InputBoolean() nzUse12Hours: boolean = false;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME) nzSuffixIcon: string | TemplateRef<NzSafeAny> = 'clock-circle';

  @Output() readonly nzOpenChange = new EventEmitter<boolean>();

  @Input() @InputBoolean() nzHideDisabledOptions = false;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME) @InputBoolean() nzAllowEmpty: boolean = true;
  @Input() @InputBoolean() nzDisabled = false;
  @Input() @InputBoolean() nzAutoFocus = false;

  setValue(value: Date | null): void {
    this.value = value ? new Date(value) : null;
    if (this._onChange) {
      this._onChange(this.value);
    }
    if (this._onTouched) {
      this._onTouched();
    }
  }

  open(): void {
    if (this.nzDisabled) {
      return;
    }
    this.focus();
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

  onClickClearBtn(event: MouseEvent): void {
    event.stopPropagation();
    this.setValue(null);
  }

  onFocus(value: boolean): void {
    this.focused = value;
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
    public cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.inputSize = Math.max(8, this.nzFormat.length) + 2;
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

  writeValue(time: Date | null | undefined): void {
    if (time instanceof Date) {
      this.value = time;
    } else if (isNil(time)) {
      this.value = null;
    } else {
      warn('Non-Date type is not recommended for time-picker, use "Date" type.');
      this.value = new Date(time);
    }
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
