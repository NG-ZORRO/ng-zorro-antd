/* tslint:disable:no-conditional-assignment */
import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { NzUpdateHostClassService as UpdateCls } from '../core/services/update-host-class.service';
import { NzI18nService } from '../i18n';
import { TimeHolder } from './time-holder';

function makeRange(length: number, step: number = 1): ReadonlyArray<number> {
  return Object.freeze(new Array(Math.ceil(length / step)).fill(0).map((_, i) => i * step));
}

@Component({
  selector: 'nz-time-picker-panel',
  templateUrl: './nz-time-picker-panel.component.html',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: NzTimePickerPanelComponent, multi: true }
  ]
})
export class NzTimePickerPanelComponent implements ControlValueAccessor, OnInit, OnDestroy {
  @Output() timeClear = new EventEmitter<void>();
  time = new TimeHolder();
  formattedTime = '';

  hourEnabled = true;
  minuteEnabled = true;
  secondEnabled = true;
  enabledColumns = 3;

  hourRange: ReadonlyArray<number>;

  private _nzHourStep;

  get nzHourStep(): number {
    return this._nzHourStep;
  }

  @Input()
  set nzHourStep(value: number) {
    if (this._nzHourStep !== value) {
      this._nzHourStep = value;
      this.hourRange = makeRange(24, this._nzHourStep);
    }
  }

  minuteRange: ReadonlyArray<number>;

  private _nzMinuteStep;

  get nzMinuteStep(): number {
    return this._nzMinuteStep;
  }

  @Input()
  set nzMinuteStep(value: number) {
    if (this._nzMinuteStep !== value) {
      this._nzMinuteStep = value;
      this.minuteRange = makeRange(60, this._nzMinuteStep);
    }
  }

  secondRange: ReadonlyArray<number>;

  private _nzSecondStep;

  get nzSecondStep(): number {
    return this._nzSecondStep;
  }

  @Input()
  set nzSecondStep(value: number) {
    if (this._nzSecondStep !== value) {
      this._nzSecondStep = value;
      this.secondRange = makeRange(60, this._nzSecondStep);
    }
  }

  private sub: Subscription;
  private onChange: (value: Date) => void;
  private onTouch: () => void;
  private isDisabled = false;

  constructor(private element: ElementRef, private updateCls: UpdateCls, private i18n: NzI18nService) {
    this.nzHourStep = 1;
    this.nzMinuteStep = 1;
    this.nzSecondStep = 1;
  }

  private _format: string;
  get format(): string {
    return this._format;
  }

  @Input()
  set format(value: string) {
    if (value !== this._format) {
      this._format = value;
      if (value != null) {
        this.enabledColumns = 0;
        const charSet = new Set(value);
        if (this.hourEnabled = charSet.has('H')) {
          this.enabledColumns++;
        }
        if (this.minuteEnabled = charSet.has('m')) {
          this.enabledColumns++;
        }
        if (this.secondEnabled = charSet.has('s')) {
          this.enabledColumns++;
        }
      } else {
        this.hourEnabled = true;
        this.minuteEnabled = true;
        this.secondEnabled = true;
        this.enabledColumns = 3;
      }
    }
  }

  ngOnInit(): void {
    this.formattedTime = this.i18n.formatDate(this.time.value, this._format);
    this.sub = this.time.changes.subscribe(() => {
      this.formattedTime = this.i18n.formatDate(this.time.value, this._format);
      this.changed();
      this.touched();
      this.scrollSelectionToTop();
    });
    this.setClassMap();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  writeValue(value: Date): void {
    this.time.value = value;
    this.scrollSelectionToTop();
  }

  private scrollSelectionToTop(): void {
    setTimeout(() => {
      const element = this.element.nativeElement as HTMLElement;
      const selections = element.querySelectorAll('.ant-time-picker-panel-select-option-selected');
      for (let i = 0; i < selections.length; ++i) {
        const item = selections.item(i);
        item.scrollIntoView();
      }
    });
  }

  registerOnChange(fn: (value: Date) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  clear(): void {
    this.time.clear();
    this.timeClear.emit();
  }

  protected changed(): void {
    if (this.onChange) {
      this.onChange(this.time.value);
    }
  }

  protected touched(): void {
    if (this.onTouch) {
      this.onTouch();
    }
  }

  private setClassMap(): void {
    this.updateCls.updateHostClass(this.element.nativeElement, {
      'ant-time-picker-panel': true,
      'ant-time-picker-panel-column-3': true,
      'ant-time-picker-panel-placement-bottomLeft': true
    });
  }
}
