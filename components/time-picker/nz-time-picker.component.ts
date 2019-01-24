import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { CdkOverlayOrigin, ConnectionPositionPair, Overlay, OverlayPositionBuilder } from '@angular/cdk/overlay';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { slideMotion } from '../core/animation/slide';
import { NzUpdateHostClassService as UpdateCls } from '../core/services/update-host-class.service';
import { isNotNil } from '../core/util/check';
import { toBoolean } from '../core/util/convert';
import { NzI18nService as I18n } from '../i18n/nz-i18n.service';

@Component({
  selector   : 'nz-time-picker',
  templateUrl: './nz-time-picker.component.html',
  animations : [
    trigger('slideMotion', [
      state('void', style({
        opacity: 0,
        display: 'none'
      })),
      state('*', style({
        opacity        : 1,
        transform      : 'scaleY(1)',
        transformOrigin: '0% 0%'
      })),
      transition('void => *', [
        style({
          opacity        : 0,
          transform      : 'scaleY(0.8)',
          transformOrigin: '0% 0%'
        }),
        animate('100ms cubic-bezier(0.755, 0.05, 0.855, 0.06)')
      ]),
      transition('* => void', [
        animate('100ms cubic-bezier(0.755, 0.05, 0.855, 0.06)', style({
          opacity        : 0,
          transform      : 'scaleY(0.8)',
          transformOrigin: '0% 0%'
        }))
      ])
    ])
  ],
  providers  : [
    UpdateCls,
    { provide: NG_VALUE_ACCESSOR, useExisting: NzTimePickerComponent, multi: true }
  ]
})
export class NzTimePickerComponent implements ControlValueAccessor, OnInit, AfterViewInit {
  private _disabled = false;
  private _value: Date | null = null;
  private _allowEmpty = true;
  private _autoFocus = false;
  private _onChange: (value: Date) => void;
  private _onTouched: () => void;
  private _hideDisabledOptions = false;
  isInit = false;
  origin: CdkOverlayOrigin;
  overlayPositions: ConnectionPositionPair[] = [ {
    originX : 'start',
    originY : 'top',
    overlayX: 'end',
    overlayY: 'top',
    offsetX : 0,
    offsetY : 0
  } ];
  @ViewChild('inputElement') inputRef: ElementRef;
  @Input() nzSize: string | null = null;
  @Input() nzHourStep = 1;
  @Input() nzMinuteStep = 1;
  @Input() nzSecondStep = 1;
  @Input() nzClearText = 'clear';
  @Input() nzPopupClassName = '';
  @Input() nzPlaceHolder = '';
  @Input() nzAddOn: TemplateRef<void>;
  @Input() nzDefaultOpenValue = new Date();
  @Input() nzDisabledHours: () => number[];
  @Input() nzDisabledMinutes: (hour: number) => number[];
  @Input() nzDisabledSeconds: (hour: number, minute: number) => number[];
  @Input() nzFormat = 'HH:mm:ss';
  @Input() nzOpen = false;
  @Output() readonly nzOpenChange = new EventEmitter<boolean>();

  @Input()
  set nzHideDisabledOptions(value: boolean) {
    this._hideDisabledOptions = toBoolean(value);
  }

  get nzHideDisabledOptions(): boolean {
    return this._hideDisabledOptions;
  }

  @Input()
  set nzAllowEmpty(value: boolean) {
    this._allowEmpty = toBoolean(value);
  }

  get nzAllowEmpty(): boolean {
    return this._allowEmpty;
  }

  @Input()
  set nzAutoFocus(value: boolean) {
    this._autoFocus = toBoolean(value);
    this.updateAutoFocus();
  }

  get nzAutoFocus(): boolean {
    return this._autoFocus;
  }

  @Input()
  set nzDisabled(value: boolean | string) {
    this._disabled = toBoolean(value);
    const input = this.inputRef.nativeElement as HTMLInputElement;
    if (this._disabled) {
      this.renderer.setAttribute(input, 'disabled', '');
    } else {
      this.renderer.removeAttribute(input, 'disabled');
    }
  }

  get nzDisabled(): boolean | string {
    return this._disabled;
  }

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

  private setClassMap(): void {
    this.updateCls.updateHostClass(this.element.nativeElement, {
      [ `ant-time-picker` ]               : true,
      [ `ant-time-picker-${this.nzSize}` ]: isNotNil(this.nzSize)
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

  constructor(private element: ElementRef,
              private renderer: Renderer2,
              private overlay: Overlay,
              private positionBuilder: OverlayPositionBuilder,
              private i18n: I18n,
              private updateCls: UpdateCls) {
  }

  ngOnInit(): void {
    this.setClassMap();
    this.origin = new CdkOverlayOrigin(this.element);
  }

  ngAfterViewInit(): void {
    this.isInit = true;
    this.updateAutoFocus();
  }

  writeValue(time: Date | null): void {
    this._value = time;
  }

  registerOnChange(fn: (time: Date) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.nzDisabled = isDisabled;
  }
}
